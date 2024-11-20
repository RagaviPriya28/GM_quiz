// OpenEndedSlide.js
import React from 'react';

const OpenEndedSlide = ({ question, setQuestion }) => (
  <div>
    <h3>Open-ended Question</h3>
    <input
      type="text"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Enter your question here"
    />
  </div>
);

export default OpenEndedSlide;
