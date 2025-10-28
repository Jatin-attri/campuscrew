type AssignmentCardProps = {
  topic: string;
  deadline: string;
  budget: number;
  requester: string;
};

export default function AssignmentCard({ topic, deadline, budget, requester }: AssignmentCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{topic}</h3>
      <p className="text-sm text-gray-500">Deadline: {new Date(deadline).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Budget: ₹{budget}</p>
      <p className="text-xs text-gray-400">Requested by: {requester}</p>
      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Apply to Help
      </button>
    </div>
  );
}

