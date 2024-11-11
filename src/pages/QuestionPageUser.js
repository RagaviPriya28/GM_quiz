import React from 'react';

const SurveyQuestion = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-[80%] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Survey user: page 2: question 1
        </h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-[90%] aspect-[16/9] relative">
            <img 
              src="/api/placeholder/1200/800"
              alt="Artwork"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <button 
            className="px-16 py-4 bg-green-600 text-white rounded-md hover:bg--600 transition-colors font-medium text-xl"
            onClick={() => console.log("J'achète clicked")}
          >
            YES
          </button>
          
          <button 
            className="px-16 py-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium text-xl"
            onClick={() => console.log("J'aime clicked")}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestion;