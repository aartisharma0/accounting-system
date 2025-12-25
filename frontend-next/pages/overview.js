import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import FiltersBar from '../components/FiltersBar';
import { SummaryGrid } from '../components/SummaryCard';
import { apiGet } from '../lib/api';

export default function OverviewPage() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    type: '',
    category: '',
    account_id: '',
  });
  const [loading, setLoading] = useState(false);

  async function loadSummary(currentFilters = filters) {
    setLoading(true);
    try {
      const data = await apiGet('/summary', currentFilters);
      setSummary(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <div>
      <PageHeader
        title="Accounts Overview"
        subtitle="High-level view of your income, expenses, and current balance."
      />

      <FiltersBar
        filters={filters}
        onChange={setFilters}
        onApply={() => loadSummary()}
      />

      {loading && <p className="muted">Loading summary...</p>}

      <SummaryGrid
        income={summary.totalIncome || 0}
        expenses={summary.totalExpenses || 0}
        balance={summary.balance || 0}
      />
    </div>
  );
}