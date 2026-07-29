type StatCardProps = {
  title: string;
  amount: string;
  color: string;
};

export default function StatCard({
  title,
  amount,
  color,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className={`text-3xl font-bold mt-3 ${color}`}>
        {amount}
      </h2>
    </div>
  );
}