import React from 'react';
import { Link } from 'react-router-dom';

const SurveyScoreboard = () => {
  // Sample data - replace with your actual data
  const surveyData = [
    { id: 1, title: 'Titre 1', jachete: 10, jaime: 6 },
    { id: 2, title: 'Titre 2', jachete: 20, jaime: 39 },
    // Add more rows as needed
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-[95%] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Survey admin: Scoreboard at the end
        </h2>
        
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-left p-4 w-1/2">Title</th>
                <th className="text-center p-4 bg-green-500">YES</th>
                <th className="text-center p-4 bg-red-600">NO</th>
              </tr>
            </thead>
            <tbody>
              {surveyData.map((row, index) => (
                <tr 
                  key={row.id}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}
                >
                  <td className="p-4">
                    <Link 
                      to={`/detail/${row.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {row.title}
                    </Link>
                  </td>
                  <td className="text-center p-4">{row.jachete}</td>
                  <td className="text-center p-4">{row.jaime}</td>
                </tr>
              ))}
              {/* Add empty rows to match the layout */}
              {[...Array(6)].map((_, index) => (
                <tr key={`empty-${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                  <td className="p-4">&nbsp;</td>
                  <td className="p-4">&nbsp;</td>
                  <td className="p-4">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SurveyScoreboard;