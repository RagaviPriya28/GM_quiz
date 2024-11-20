// TrueFalseSlide.js
import React from 'react';

const TrueFalseSlide = ({ question, setQuestion }) => (
  <div>
    <h3>True/False Question</h3>
    <input
      type="text"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Enter your question here"
    />
    {/* Add true/false options */}
  </div>
);

export default TrueFalseSlide;
