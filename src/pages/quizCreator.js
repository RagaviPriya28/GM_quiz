import React, { useState } from 'react';
import {
  Plus,
  Settings,
  X,
  CheckSquare,
  ToggleLeft,
  MessageSquare,
  BarChart3,
  ListChecks,
  Trash2,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import Modal from '../models/CreateQuestion';



const ImageUploadArea = ({ image, setImage }) => {
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="mb-4">
        {image ? (
          <div className="relative">
            <img 
              src={image} 
              alt="Question" 
              className="w-full max-h-64 object-contain rounded-lg"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <Upload className="w-8 h-8" />
              <div className="text-sm font-medium">Click to upload image</div>
              <div className="text-xs">PNG, JPG up to 10MB</div>
            </div>
          </label>
        )}
      </div>
    );
  };
  
  // Modified MultipleChoiceSlide Component
  const MultipleChoiceSlide = ({ question, setQuestion }) => {
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [image, setImage] = useState(null);
  
    const handleOptionChange = (index, value) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
    };
  
    return (
      <div className="space-y-4">
        
        
        <input
          type="text"
          placeholder="Type your question here"
          className="w-full text-xl px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <ImageUploadArea image={image} setImage={setImage} />
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
                className="w-4 h-4"
              />
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button 
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  const newOptions = options.filter((_, i) => i !== index);
                  setOptions(newOptions);
                  if (correctAnswer === index) setCorrectAnswer(0);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        
        {options.length < 6 && (
          <button
            onClick={() => setOptions([...options, ''])}
            className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            Add Option
          </button>
        )}
      </div>
    );
  };
  
  // Similarly update other slide components
  const TrueFalseSlide = ({ question, setQuestion }) => {
    const [correctAnswer, setCorrectAnswer] = useState('true');
    const [image, setImage] = useState(null);
    
    return (
      <div className="space-y-4">
        
        
        <input
          type="text"
          placeholder="Type your question here"
          className="w-full text-xl px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

       <ImageUploadArea image={image} setImage={setImage} />
        
        <div className="space-y-3">
          {['true', 'false'].map((option) => (
            <div key={option} className="flex items-center gap-3">
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === option}
                onChange={() => setCorrectAnswer(option)}
                className="w-4 h-4"
              />
              <div className="flex-1 px-4 py-2 border rounded-lg bg-gray-50">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const OpenEndedSlide = ({ question, setQuestion }) => {
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [image, setImage] = useState(null);
    
    return (
      <div className="space-y-4">
        
        
        <input
          type="text"
          placeholder="Type your question here"
          className="w-full text-xl px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <ImageUploadArea image={image} setImage={setImage} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correct Answer (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter the correct answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>
    );
  };
  
  const PollSlide = ({ question, setQuestion }) => {
    const [options, setOptions] = useState(['', '']);
    const [image, setImage] = useState(null);
  
    const handleOptionChange = (index, value) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
    };
  
    return (
      <div className="space-y-4">
        
        <input
          type="text"
          placeholder="Type your poll question here"
          className="w-full text-xl px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <ImageUploadArea image={image} setImage={setImage} />
        
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button 
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  const newOptions = options.filter((_, i) => i !== index);
                  setOptions(newOptions);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        
        {options.length < 6 && (
          <button
            onClick={() => setOptions([...options, ''])}
            className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            Add Option
          </button>
        )}
      </div>
    );
  };
const QuizCreator = () => {
  const [questionText, setQuestionText] = useState('');
  const [timeLimit, setTimeLimit] = useState('20 seconds');
  const [points, setPoints] = useState('Standard');
  const [answerType, setAnswerType] = useState('Single select');
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  const questionTypes = [
    { id: 'multiple_choice', name: 'Multiple Choice', icon: CheckSquare, description: 'Students select one correct answer' },
    { id: 'multiple_select', name: 'Multiple Select', icon: ListChecks, description: 'Students can select multiple correct answers' },
    { id: 'true_false', name: 'True/False', icon: ToggleLeft, description: 'Simple true or false question' },
    { id: 'open_ended', name: 'Open Ended', icon: MessageSquare, description: 'Students provide a text answer' },
    { id: 'poll', name: 'Poll', icon: BarChart3, description: 'Gather student opinions' }
  ];

  const handleQuestionTypeSelect = (type) => {
    setSelectedQuestionType(type);
    setIsAddQuestionOpen(false);
  };

  const renderQuestionSlide = () => {
    switch (selectedQuestionType) {
      case 'multiple_choice':
        return <MultipleChoiceSlide question={questionText} setQuestion={setQuestionText} />;
      case 'multiple_select':
        return <MultipleChoiceSlide question={questionText} setQuestion={setQuestionText} />;
      case 'true_false':
        return <TrueFalseSlide question={questionText} setQuestion={setQuestionText} />;
      case 'open_ended':
        return <OpenEndedSlide question={questionText} setQuestion={setQuestionText} />;
      case 'poll':
        return <PollSlide question={questionText} setQuestion={setQuestionText} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Top Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text">
              GMI
            </span>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter the title..."
                className="w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              Exit
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Save
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Left Sidebar */}
        <div className="w-48">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="font-medium text-gray-700 mb-2">1 Quiz</div>
            <div className="border-2 border-blue-500 rounded-lg p-3 bg-white">
              <input
                type="text"
                placeholder="Question"
                className="w-full text-sm"
                readOnly
              />
              <div className="text-gray-400 text-sm mt-2">20</div>
            </div>
            
            <button 
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setIsAddQuestionOpen(true)}
            >
              Add question
            </button>
            <button className="w-full mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Add slide
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {selectedQuestionType ? (
              renderQuestionSlide()
            ) : (
              <div className="text-center text-gray-500 py-12">
                Select a question type to get started
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
         <div className="w-64">
           <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Question type
               </label>
               <select className="w-full p-2 border rounded-lg">
                 <option>Quiz</option>
               </select>
             </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time limit
               </label>
               <select 
                className="w-full p-2 border rounded-lg"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              >
                <option>20 seconds</option>
                <option>30 seconds</option>
                <option>1 minute</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              >
                <option>Standard</option>
                <option>Double</option>
                <option>No points</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer options
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                value={answerType}
                onChange={(e) => setAnswerType(e.target.value)}
              >
                <option>Single select</option>
                <option>Multiple select</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                Delete
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                Duplicate
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Modal */}
      <Modal 
        isOpen={isAddQuestionOpen} 
        onClose={() => setIsAddQuestionOpen(false)}
      >
        <div className="grid gap-4">
          {questionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleQuestionTypeSelect(type.id)}
              className="flex items-center gap-4 w-full p-4 text-left hover:bg-gray-50 rounded-lg group"
            >
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100">
                <type.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-medium">{type.name}</div>
                <div className="text-sm text-gray-500">{type.description}</div>
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default QuizCreator;