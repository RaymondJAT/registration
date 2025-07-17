const Table = ({ entries = [] }) => {
  const headers = ["full_name", "contact", "email"];

  return (
    <>
      <div className="max-w-4xl mx-auto border-2 rounded-md shadow-sm">
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          <table
            className="w-full table-fixed text-sm text-left border-collapse font-mono"
            style={{ fontSize: "0.80rem" }}
          >
            <thead className="bg-red-900 text-white">
              <tr className="sticky top-0 z-20">
                {headers.map((header, index) => (
                  <th
                    key={header}
                    className={`px-4 py-2 capitalize bg-red-900 ${
                      index === 0
                        ? "sticky left-0 z-30 bg-red-900 w-48 min-w-[12rem] pr-6"
                        : index === 1
                        ? "pr-3"
                        : index === 2
                        ? "pl-2"
                        : ""
                    }`}
                  >
                    {header.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-400 bg-white">
              {entries.length > 0 ? (
                entries.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((key, index) => (
                      <td
                        key={key}
                        className={`px-4 py-2 text-gray-700 whitespace-nowrap ${
                          index === 0
                            ? "sticky left-0 z-10 bg-white w-48 pr-6"
                            : index === 1
                            ? "pr-3"
                            : index === 2
                            ? "pl-2"
                            : ""
                        }`}
                      >
                        {row[key] || "-"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="text-center text-gray-500 text-sm py-2"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
