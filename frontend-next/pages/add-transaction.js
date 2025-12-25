    import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import TransactionForm from '../components/TransactionForm';
import { apiGet, apiPost, apiPut } from '../lib/api';

export default function AddTransactionPage() {
  const router = useRouter();
  const { id } = router.query;
  const isEdit = !!id;
  const [initialData, setInitialData] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      setLoadingInitial(true);
      apiGet(`/transactions/${id}`)
        .then(setInitialData)
        .catch((e) => setError(e.message || 'Failed to load transaction'))
        .finally(() => setLoadingInitial(false));
    }
  }, [id, isEdit]);

  async function handleSubmit(data) {
    setSaving(true);
    setError('');
    try {
      if (isEdit) {
        await apiPut(`/transactions/${id}`, data);
      } else {
        await apiPost('/transactions', data);
      }
      router.push('/transactions');
    } catch (e) {
      setError(e.message || 'Failed to save transaction');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Transaction' : 'Add Transaction'}
        subtitle={
          isEdit
            ? 'Update the details of the selected transaction.'
            : 'Create a new income or expense entry.'
        }
      />

      {error && <p className="error-text">{error}</p>}
      {loadingInitial && <p className="muted">Loading transaction...</p>}

      {!loadingInitial && (
        <TransactionForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={saving}
        />
      )}
    </div>
  );
}