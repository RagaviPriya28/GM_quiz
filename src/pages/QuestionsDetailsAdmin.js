import React from 'react';
import { useParams } from 'react-router-dom';

const DetailScoreView = () => {
  const { id } = useParams();

  
  const questionData = {
    questionNumber: 1,
    title: "Title",
    description: "Description",
    dimension: "Dimension",
    text: "Text",
    image: "/api/placeholder/800/600",
    results: {
      jachete: [
        { user: "User23", time: 1 },
        { user: "User11", time: null },
      ],
      jaime: [
        { user: "User23", time: 1 },
        { user: "User11", time: null },
      ]
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-[95%] bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold mb-8">
          Survey admin: detail Score view per question
        </h1>

        <h2 className="text-xl font-medium mb-6">Question {questionData.questionNumber}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Info and Results */}
          <div className="space-y-6">
            {/* Title info box */}
            <div className="border rounded-lg p-4">
              <table className="w-full">
                <tbody>
                  <tr><td className="py-1 text-center font-medium">title</td></tr>
                  <tr><td className="py-1 text-center">Description</td></tr>
                  <tr><td className="py-1 text-center">Dimension</td></tr>
                  <tr><td className="py-1 text-center">Text</td></tr>
                </tbody>
              </table>
            </div>

            {/* Results section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Result</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* J'achète table */}
                <div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="bg-red-600 text-white p-2">Users: NO</th>
                        <th className="bg-blue-600 text-white p-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionData.results.jachete.map((item, index) => (
                        <tr key={`jachete-${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                          <td className="p-2">{item.user}</td>
                          <td className="p-2 text-center">{item.time}</td>
                        </tr>
                      ))}
                      {/* Empty rows */}
                      {[...Array(3)].map((_, index) => (
                        <tr key={`empty-jachete-${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                          <td className="p-2">&nbsp;</td>
                          <td className="p-2">&nbsp;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* J'aime table */}
                <div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="bg-green-500 text-white p-2">Users: Yes</th>
                        <th className="bg-blue-600 text-white p-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionData.results.jaime.map((item, index) => (
                        <tr key={`jaime-${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                          <td className="p-2">{item.user}</td>
                          <td className="p-2 text-center">{item.time}</td>
                        </tr>
                      ))}
                      {/* Empty rows */}
                      {[...Array(3)].map((_, index) => (
                        <tr key={`empty-jaime-${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                          <td className="p-2">&nbsp;</td>
                          <td className="p-2">&nbsp;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center items-start">
            <img 
              src="/api/placeholder/800/600" 
              alt="Question visual"
              className="rounded-lg max-w-full h-auto shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScoreView;