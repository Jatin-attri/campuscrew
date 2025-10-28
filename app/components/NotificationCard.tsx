type NotificationCardProps = {
  title: string;
  message: string;
  date: string;
};

export default function NotificationCard({ title, message, date }: NotificationCardProps) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3">
      <h4 className="font-bold text-yellow-800">{title}</h4>
      <p className="text-sm text-yellow-700">{message}</p>
      <p className="text-xs text-yellow-600 mt-1">Posted on: {new Date(date).toLocaleDateString()}</p>
    </div>
  );
}
