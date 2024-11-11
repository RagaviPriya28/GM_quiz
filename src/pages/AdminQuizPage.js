import React from "react";

export default function AdminQuizPage() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="text-center text-2xl font-bold text-gray-800 mb-6">
        Survey Admin
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between m-4 lg:m-10 space-y-6 lg:space-y-0 bg-white rounded-lg shadow-lg p-6 lg:h-screen">
        {/* Left Side */}
        <div className="lg:w-1/2 space-y-4 pr-4">
          <h1 className="text-xl font-semibold text-gray-800">Quiz Title</h1>
          <h2 className="text-lg font-medium text-gray-700">
            Quiz Description
          </h2>
          <h3 className="text-md text-gray-600">Location</h3>
          <h4 className="text-md text-gray-600">Date</h4>
          <h4 className="text-md text-gray-600">Time</h4>

          {/* Centered Button */}
          <div className="flex justify-center mt-6">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-200 w-48">
              Start
            </button>
          </div>
        </div>

        {/* Vertical Divider between Left and Right */}
        <div className="hidden lg:block border-l border-gray-300 mx-4"></div>

        {/* Right Side */}
        <div className="lg:w-1/2 space-y-6 flex flex-col items-center pl-4">
          {/* Right Side Upper: QR Code Placeholder */}
          <div className="w-full flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
              QR Code
            </div>
          </div>

          {/* Horizontal Divider in Right Side */}
          <div className="w-full border-t border-gray-300 my-4"></div>

          {/* Right Side Lower */}
          <div className="w-full space-y-4">
            <h1 className="text-lg font-semibold text-gray-800 text-center">
              Number of Participants Joined: 20
            </h1>

            {/* Participant List */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner overflow-y-auto max-h-[400px] h-[300px] sm:h-[400px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 1</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 2</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 3</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 4</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 5</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 6</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 7</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 8</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 9</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 10</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 11</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 12</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 13</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 14</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 15</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 16</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 17</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 18</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 19</h1>
                <h1 className="bg-red-200 p-3 rounded-xl pl-4">User 20</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
