export function SummaryCard({ label, value, variant = 'default' }) {
  return (
    <div className={`summary-card summary-${variant}`}>
      <div className="summary-label">{label}</div>
      <div className="summary-value">{value.toFixed ? value.toFixed(2) : value}</div>
    </div>
  );
}

export function SummaryGrid({ income, expenses, balance }) {
  return (
    <div className="summary-grid">
      <SummaryCard label="Total Income" value={income} variant="income" />
      <SummaryCard label="Total Expenses" value={expenses} variant="expense" />
      <SummaryCard label="Current Balance" value={balance} variant="balance" />
    </div>
  );
}