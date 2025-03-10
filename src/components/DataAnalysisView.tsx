import React from 'react';

interface DataAnalysisViewProps {
  data: any | null;
  query: string | null;
}

export function DataAnalysisView({ data, query }: DataAnalysisViewProps) {
  if (!data) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Run a query to view and analyze data here</p>
      </div>
    );
  }

  // Simple function to render data as a table
  const renderDataTable = () => {
    if (!data || !data.length) {
      return <p>No data available</p>;
    }

    const columns = Object.keys(data[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row[column]?.toString() || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Query Results</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{query}</pre>
        </div>
      </div>
      {renderDataTable()}
    </div>
  );
}