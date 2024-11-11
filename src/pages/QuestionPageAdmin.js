import React from "react";

export default function QuestionPageAdmin() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between m-4 lg:m-10 space-y-6 lg:space-y-0 bg-white rounded-lg shadow-lg p-6">
        {/* Left side */}
        <div className="lg:w-1/2 space-y-4 pr-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-800">Quiz Title</h1>
            <h2 className="text-lg font-medium text-gray-700">Description</h2>
            <h3 className="text-md text-gray-600">Dimensions</h3>
            <h4 className="text-md text-gray-600">Year</h4>
          </div>
          <div className="mt-6">
            <p className="text-lg font-medium text-gray-800">Timer: 10:00</p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block border-l border-gray-300 mx-4"></div>

        {/* Right side */}
        <div className="lg:w-1/2 space-y-6 flex flex-col items-end justify-start">
          {/* Top right side */}
          <div className="flex space-x-4 text-center justify-end w-full">
            <div className="text-lg font-semibold text-black bg-red-700 p-4 rounded-full">
              <p className="text-xl font-bold">10</p>
            </div>
            <div className="text-lg font-semibold text-black bg-green-700 p-4 rounded-full">
              <p className="text-xl font-bold">6</p>
            </div>
          </div>

          {/* Image in the middle */}
          <div className="w-full flex justify-center my-4">
            <img
              src="https://via.placeholder.com/400"
              alt="Quiz image"
              className="rounded-lg shadow-md w-80 h-80 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-200">
          Next
        </button>
      </div>
    </>
  );
}
