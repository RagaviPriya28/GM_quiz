import React from "react";
import logo from "../assets/gm-admin.png";

export default function AdminQuizPage() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Main Content */}

      {/* Fetcch Quiz details on quiz admin page using URL: http://localhost:5000/api/quizzes/6732dfbc3e154e085cc1c1c8 */}
      <div className="flex  flex-col lg:flex-row justify-between m-4 lg:m-10 space-y-6 lg:space-y-0 bg-white rounded-lg shadow-lg p-6 lg:h-screen">
        {/* Left Side */}
        <div className="lg:w-1/2 space-y-4 pr-4">
          <img src={logo} alt="logo"/>

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
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATZSURBVO3BQY4bSRAEwfAC//9lXx3zVECjk6PRIszwj1QtOaladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhZ98hKQn6RmAnKj5gbIG2qeAHKjZgLyk9S8cVK16KRq0UnVok+WqdkE5A0gk5pJzQRkUnMDZFJzo+YNNZuAbDqpWnRSteikatEnXwbkCTVPqJmA3ACZ1ExqfhKQSc0TQJ5Q800nVYtOqhadVC365B8H5JuA3KiZgExqJiCTmv+Tk6pFJ1WLTqoWffKPU3MDZFLzhpoJyBtAJjX/spOqRSdVi06qFn3yZWp+EpAbIE+omYDcqJmA3Kh5Q81vclK16KRq0UnVok+WAflJQCY1E5BJzQRkUjMBmdRMQJ5QMwGZ1NwA+c1OqhadVC06qVr0yUtqfjM1E5BJzY2aCcgNkE1q/iUnVYtOqhadVC365CUgk5oJyI2aCcgTat4AcqPmRs0E5AbIE0AmNTdAJjUTkBs1b5xULTqpWnRSteiTZUBu1Dyh5gkgT6iZgExAnlAzAblRMwG5AXKj5kbNBGTTSdWik6pFJ1WLPlmmZgIyAXkCyI2aGzUTkCfU3ACZ1NyomYBMaiYgN2pugNyo2XRSteikatFJ1aJPlgGZ1PwkNU8AmdR8E5BJzRtAbtTcAJnUvHFSteikatFJ1SL8I4uATGpugExqJiBPqJmA3Ki5AXKjZgIyqbkBMql5A8iNmm86qVp0UrXopGrRJ7+cmgnIDZAbNROQSc2NmgnIpOYGyBNAJjU3am6A3Kh546Rq0UnVopOqRZ+8BOQNNTdAJjVPALlRMwGZ1ExANqmZgExqJiCTmgnI33RSteikatFJ1SL8Iy8AeULNBORGzQ2QTWomIJOaCcikZhOQSc0EZFJzA2RSs+mkatFJ1aKTqkWfLFNzA2RScwPkRs0EZFJzA+QJIE8AmdTcAJnUTEB+s5OqRSdVi06qFn3ykppNQCY1T6iZgExq3lAzAfmb1NwA+UknVYtOqhadVC365CUgk5oJyBNqJiBPqJnUTEAmNROQGyA3QJ4AsgnIjZpvOqladFK16KRq0ScvqblR8wSQSc0EZFJzA2STmhsgN0CeAPKEmgnITzqpWnRSteikatEny4BMaiYgN2omIDdAbtRMQCYgbwD5m4D8JidVi06qFp1ULcI/8g8D8oSaN4DcqLkBcqPmCSCb1LxxUrXopGrRSdWiT14C8pPUPKFmAjKpuQFyo2YCsgnIpOYJNROQSc2mk6pFJ1WLTqoWfbJMzSYgT6iZgNwA2aTmBsgTap5Qc6Pmm06qFp1ULTqpWvTJlwF5Qs0Tam7U3ACZ1LwBZFIzqZmATEA2AZnUTEAmNW+cVC06qVp0UrXok38ckBs1N2omIJOab1IzAZnUTEBugExqJiCTmk0nVYtOqhadVC365H8OyKRmE5BJzQTkm9RMQG7UTEAmNW+cVC06qVp0UrXoky9T801qngByo+YJNTdqJiA3ar4JyKRm00nVopOqRSdViz5ZBuQnAZnUTECeAHKjZgIyqZmATGomIE+omYBMav6mk6pFJ1WLTqoW4R+pWnJSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQt+g+c+y5cCJMQcgAAAABJRU5ErkJggg=="
              alt="code"
            />
            {/* <div>img</div> */}
            <a href="http://localhost:3000"
              className="mt-4 text-blue-500 hover:underline"
            >
              Join Quiz
            </a>
          </div>

          {/* Horizontal Divider in Right Side */}
          <div className="w-full border-t border-gray-300 my-4"></div>

          {/* Right Side Lower */}
          <div className="w-full space-y-4">
            <h1 className="text-lg font-semibold text-gray-800">Joined: 20</h1>

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
