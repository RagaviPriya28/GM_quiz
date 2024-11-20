// MultipleChoiceSlide.js
import React from 'react';

const MultipleChoiceSlide = ({ question, setQuestion }) => (
  <div>
    <h3>Multiple Choice Question</h3>
    <input
      type="text"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Enter your question here"
    />
    {/* Add more fields for answer options */}
  </div>
);

export default MultipleChoiceSlide;
