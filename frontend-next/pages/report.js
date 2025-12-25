import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { apiGet } from '../lib/api';

export default function ReportPage() {
  const today = new Date();
  const defaultMonth = today.toISOString().slice(0, 7); // YYYY-MM

  const [month, setMonth] = useState(defaultMonth);
  const [report, setReport] = useState({
    month: defaultMonth,
    totalIncome: 0,
    totalExpenses: 0,
  });
  const [loading, setLoading] = useState(false);

  const balance = (report.totalIncome || 0) - (report.totalExpenses || 0);

  async function loadReport(selectedMonth = month) {
    setLoading(true);
    try {
      const data = await apiGet('/report', { month: selectedMonth });
      setReport(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport(defaultMonth);
  }, []);

  function handleMonthChange(e) {
    setMonth(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    loadReport(month);
  }

  function downloadCsv() {
    const rows = [
      ['Month', 'Total Income', 'Total Expenses', 'Balance'],
      [report.month, report.totalIncome, report.totalExpenses, balance],
    ];
    const csvContent = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${report.month}.csv`;
    a.click();
  }

  return (
    <div>
      <PageHeader
        title="Monthly Report"
        subtitle="Compare total income and expenses for a selected month."
      />

      <div className="card report-card">
        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="month">Month</label>
            <input
              id="month"
              type="month"
              value={month}
              onChange={handleMonthChange}
            />
          </div>
          <div className="report-actions">
            <button type="submit" className="btn btn-secondary">
              Load report
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={downloadCsv}
            >
              Export CSV
            </button>
          </div>
        </form>

        {loading && <p className="muted">Loading report...</p>}

        <div className="report-summary">
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th className="text-right">Total Income</th>
                <th className="text-right">Total Expenses</th>
                <th className="text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{report.month}</td>
                <td className="text-left">
                  {Number(report.totalIncome || 0).toFixed(2)}
                </td>
                <td className="text-left">
                  {Number(report.totalExpenses || 0).toFixed(2)}
                </td>
                <td className="text-left">
                  {Number(balance).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="report-chart-hint">
          <p className="muted">
            Income and Expenses Management.
          </p>
        </div>
      </div>
    </div>
  );
}