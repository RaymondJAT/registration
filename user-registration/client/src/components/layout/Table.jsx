const Table = ({ entries = [] }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm py-6">
        No records found.
      </div>
    );
  }

  const headers = Object.keys(entries[0]);

  return (
    <div className="max-w-4xl mx-auto border rounded-md shadow-sm">
      <div className="max-h-[225px] overflow-y-auto custom-scrollbar">
        <table className="min-w-full table-fixed text-sm text-left border-collapse">
          <thead className="bg-red-900 text-white">
            <tr className="sticky top-0 z-20">
              {headers.map((header, index) => (
                <th
                  key={header}
                  className={`px-4 py-2 capitalize bg-red-900 ${
                    index === 0
                      ? "sticky left-0 z-30 bg-red-900 w-40 min-w-[10rem]"
                      : ""
                  }`}
                >
                  {header.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {entries.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((key, index) => (
                  <td
                    key={key}
                    className={`px-4 py-2 text-gray-700 whitespace-nowrap ${
                      index === 0 ? "sticky left-0 z-10 bg-white w-40" : ""
                    }`}
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
