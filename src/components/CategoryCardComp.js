import React from "react";
import { Plus } from "lucide-react";

const CategoryCard = ({ category, onCreateQuiz, creating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      <div className="p-6">
        <h3 className="font-semibold text-xl text-gray-800 mb-3">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {category.description}
        </p>
        <button
          className={`w-full py-2.5 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center ${
            creating ? "opacity-75 cursor-not-allowed" : ""
          }`}
          onClick={() => onCreateQuiz(category._id)}
          disabled={creating}
        >
          {creating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Quiz...
            </>
          ) : (
            "Create Quiz"
          )}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
