// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/CardComp";
import logo from "../assets/GMI-Logo.png";
import Navbar from "../components/NavbarComp";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <Navbar/>

      {/* Premium Plans Section */}
      <div className="m-4">
        <h1 className="text-lg font-semibold">Premium Plans</h1>
        <p className="text-gray-400">Unlock more features</p>
      </div>

      {/* Create and Join Quiz Boxes */}
      <div className="flex justify-center gap-4 mt-4">
        {/* Create Quiz Box */}
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => navigate("/create-quiz")}>
          <img src={logo} alt="Create Quiz" className="w-16 h-16 mb-2" />
          <h2 className="text-lg font-semibold">Create Quiz</h2>
          <p className="text-gray-500">Create your own custom quizzes.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Start Creating</button>
        </div>

        {/* Join Quiz Box */}
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => navigate("/join-quiz")}>
          <img src={logo} alt="Join Quiz" className="w-16 h-16 mb-2" />
          <h2 className="text-lg font-semibold">Join Quiz</h2>
          <p className="text-gray-500">Participate in quizzes created by others.</p>
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg">Join Now</button>
        </div>
      </div>

      {/* Centered Card Container */}
      <div className="flex justify-center w-full mt-6 px-4">
        <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Existing Cards */}
          <div className="flex flex-col items-center space-y-4">
            <Card
              title="For Businesses & Professionals"
              description="Build custom quizzes and share them with your friends."
              imageSrc={logo}
              buttonText="Get Started"
              onClick={() => navigate("/create-quiz")}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Card
              title="For Businesses & Professionals"
              description="Build custom quizzes and share them with your friends."
              imageSrc={logo}
              buttonText="Get Started"
              onClick={() => navigate("/create-quiz")}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Card
              title="For Businesses & Professionals"
              description="Build custom quizzes and share them with your friends."
              imageSrc={logo}
              buttonText="Get Started"
              onClick={() => navigate("/create-quiz")}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Card
              title="For Businesses & Professionals"
              description="Build custom quizzes and share them with your friends."
              imageSrc={logo}
              buttonText="Get Started"
              onClick={() => navigate("/create-quiz")}
            />
          </div>

          {/* New Div for "Kahoot at School" */}
          <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold">Kahoot at School</h2>
            <p className="text-gray-500">Engaging Groups and Distance learning  for teachers and students.</p>
          </div>
        </div>
      </div>
    </>
  );
}
