interface BudgetAlertProps {
  status: "safe" | "warning" | "danger";
  percentage: number;
}

export default function BudgetAlert({
  status,
  percentage,
}: BudgetAlertProps) {
  if (status === "safe") return null;

  return (
    <div
      className={`rounded-xl p-4 text-white ${
        status === "danger"
          ? "bg-red-500"
          : "bg-yellow-500"
      }`}
    >
      {status === "danger"
        ? `🚨 Budget terlampaui (${percentage.toFixed(
            0
          )}%)`
        : `⚠ Budget hampir habis (${percentage.toFixed(
            0
          )}%)`}
    </div>
  );
}