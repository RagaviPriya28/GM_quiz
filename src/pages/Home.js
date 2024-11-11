import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GMI-Logo.png";

const Card = ({ title, description, imageSrc, buttonText, onClick }) => (
  <div className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 h-[500px] w-full max-w-[400px]">
    <h3 className="bg-[#3166c7] text-white text-center py-2 rounded-t-lg">
      {title}
    </h3>
    <img
      src={imageSrc}
      alt="card image"
      className="h-[200px] w-full border-b-4"
    />
    <div className="p-5">
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <div className="border-b-4 p-2">
        <div className="flex items-center h-12 p-3 gap-4 justify-between">
          {/* Left: Logo with Welcome Message */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logo}
              alt="GMI"
              className="h-10 w-10 rounded-full cursor-pointer "
              onClick={() => navigate("/")}
            />
            <div>
              <h1 className="text-lg font-semibold">Welcome to GMI!</h1>
              <p className="text-sm text-gray-500">
                Engage, learn, and have fun
              </p>
            </div>
          </div>

          {/* Right: Login and Register Buttons */}
          <div className="flex gap-2">
            <button
              className="hover:bg-gray-200 m-4 py-1 px-2 rounded-lg bg-red-100"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="m-4">
        <h1 className="text-lg font-semibold">Premium Plans</h1>
        <p className="text-gray-400">Unlock more features</p>
      </div>

      {/* Cards */}

      <div className="flex justify-center mt-6 sm:pl-10">
        <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            title="For Businesses & Professionals"
            description="Build custom quizzes and share them with your friends."
            imageSrc={logo}
            buttonText="Get Started"
            onClick={() => navigate("/create-quiz")}
          />
          <Card
            title="For Businesses & Professionals"
            description="Build custom quizzes and share them with your friends."
            imageSrc={logo}
            buttonText="Get Started"
            onClick={() => navigate("/create-quiz")}
          />
          <Card
            title="For Businesses & Professionals"
            description="Build custom quizzes and share them with your friends."
            imageSrc={logo}
            buttonText="Get Started"
            onClick={() => navigate("/create-quiz")}
          />
          <Card
            title="For Businesses & Professionals"
            description="Build custom quizzes and share them with your friends."
            imageSrc={logo}
            buttonText="Get Started"
            onClick={() => navigate("/create-quiz")}
          />
        </div>
      </div>
    </>
  );
}
