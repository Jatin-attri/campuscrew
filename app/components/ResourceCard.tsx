type ResourceCardProps = {
  title: string;
  subject: string;
  year: string;
  fileUrl: string;
};

export default function ResourceCard({ title, subject, year, fileUrl }: ResourceCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">Subject: {subject} | Year: {year}</p>
      <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block">
        Download
      </a>
    </div>
  );
}
