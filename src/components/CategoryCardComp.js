import React, { useContext } from "react";
import { Plus } from "lucide-react";
import { QuizContext } from "../context/QuizContext";

const CategoryCard = ({ category }) => {
  const { createQuiz } = useContext(QuizContext);

  const handleCreateQuiz = () => {
    createQuiz(category._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[200px] overflow-hidden">
      {/* Content Container with Fixed Height and Overflow */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {category.name}
        </h3>

        {/* Description with Line Clamping */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {category.description || "No description available"}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center mt-auto">
          <button
            onClick={handleCreateQuiz}
            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
