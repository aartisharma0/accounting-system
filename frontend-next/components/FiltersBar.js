import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';

export default function FiltersBar({ filters, onChange, onApply }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    apiGet('/accounts')
      .then((data) => setAccounts(data))
      .catch(() => setAccounts([]));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onApply();
  }

  return (
    <form className="filters-bar card" onSubmit={handleSubmit}>
      <div className="filters-grid">

        {/* FROM DATE */}
        <div className="form-group">
          <label>From</label>
          <input
            type="date"
            name="from"
            value={filters.from || ''}
            onChange={handleChange}
          />
        </div>

        {/* TO DATE */}
        <div className="form-group">
          <label>To</label>
          <input
            type="date"
            name="to"
            value={filters.to || ''}
            onChange={handleChange}
          />
        </div>

        {/* TYPE */}
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={filters.type || ''} onChange={handleChange}>
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={filters.category || ''}
            onChange={handleChange}
            placeholder="All categories"
          />
        </div>

        {/* ACCOUNT DROPDOWN */}
        <div className="form-group">
          <label>Account</label>
          <select
            name="account_id"
            value={filters.account_id || ''}
            onChange={handleChange}
          >
            <option value="">All accounts</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({acc.type})
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="filters-actions">
        <button type="submit" className="btn btn-secondary">
          Apply filters
        </button>
      </div>
    </form>
  );
}