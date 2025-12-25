import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import FiltersBar from "../../components/FiltersBar";
import { apiGet, apiDelete } from "../../lib/api";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    type: "",
    category: "",
    account_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadTransactions(currentFilters = filters) {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet("/transactions", currentFilters);
      const items = Array.isArray(data) ? data : data.items || [];
      setTransactions(items);
    } catch (e) {
      setError(e.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function handleDelete(id) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmation) return;
    try {
      await apiDelete(`/transactions/${id}`);
      loadTransactions();
    } catch (e) {
      alert(e.message || "Failed to delete transaction");
    }
  }

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="Manage your income and expenses with filters and quick actions."
        actions={
          <Link href="/add-transaction" className="btn btn-primary">
            + Add Transaction
          </Link>
        }
      />

      <FiltersBar
        filters={filters}
        onChange={setFilters}
        onApply={() => loadTransactions()}
      />

      <div className="card">
        <div className="table-wrapper">
          {loading && <p className="muted">Loading transactions...</p>}
          {error && <p className="error-text">{error}</p>}

          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                <th>Category</th>
                <th>Account</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center muted">
                    No transactions found. Try adjusting your filters or add a
                    new transaction.
                  </td>
                </tr>
              )}
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.type === "income" ? "badge-income" : "badge-expense"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="text-right">{Number(t.amount).toFixed(2)}</td>
                  <td>{t.category || "-"}</td>
                  <td>
                    {t.account ? `${t.account.name} (${t.account.type})` : "-"}
                  </td>

                  <td className="text-right">
                    <div className="table-actions">
                      <Link
                        href={`/add-transaction?id=${t.id}`}
                        className="btn btn-ghost"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-ghost btn-danger"
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
