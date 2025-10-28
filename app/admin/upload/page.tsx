export default function UploadPage() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload Resource</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Title" className="input" />
        <select className="input">
          <option>Notes</option>
          <option>Question Paper</option>
        </select>
        <input type="file" className="input" />
        <button className="btn">Upload</button>
      </form>
    </div>
  );
}
