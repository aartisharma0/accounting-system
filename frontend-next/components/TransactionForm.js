import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';

const INITIAL_STATE = {
  date: '',
  description: '',
  amount: '',
  type: 'income',
  category: '',
  account_id: '',
};

export default function TransactionForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');

  // Load accounts from backend
  useEffect(() => {
    apiGet('/accounts')
      .then((data) => setAccounts(data))
      .catch(() => setAccounts([]));
  }, []);

  // Load initial data when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        date: initialData.date || '',
        description: initialData.description || '',
        amount: initialData.amount || '',
        type: initialData.type || 'income',
        category: initialData.category || '',
        account_id: initialData.account_id || '',
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Required field validation
    if (!form.date || !form.description || !form.amount || !form.type) {
      setError('Please fill the required fields.');
      return;
    }

    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      account_id: form.account_id ? parseInt(form.account_id, 10) : null,
    };

    if (Number.isNaN(payload.amount)) {
      setError('Amount must be a number.');
      return;
    }

    onSubmit(payload);
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="form-grid">

        {/* DATE */}
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* TYPE */}
        <div className="form-group">
          <label htmlFor="type">Type *</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* AMOUNT */}
        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g. 1200.00"
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Salary, Rent, Utilities..."
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group full-width">
          <label htmlFor="description">Description *</label>
          <input
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief description"
            required
          />
        </div>

        {/* ACCOUNT DROPDOWN */}
        <div className="form-group">
          <label htmlFor="account_id">Account *</label>
          <select
            id="account_id"
            name="account_id"
            value={form.account_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({acc.type})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="form-error">{error}</p>}

      {/* SUBMIT BUTTON */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Transaction'}
        </button>
      </div>
    </form>
  );
}