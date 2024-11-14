
"use client";


import { useState } from 'react';

export default function InterviewPage() {
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [nextQuestion, setNextQuestion] = useState('Start by answering the first question.');

  async function handleUserResponse() {
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userResponse }),
    });
    console.log("User response:", userResponse); //  the user response
    console.log("Fetch response:", response); //  the entire response

    if (response.ok) {
      const data = await response.json();
      setFeedback(data.feedback);
      setNextQuestion(data.nextQuestion);
    } else {
      const errorText = await response.text();
      setFeedback(`Error generating feedback. ${errorText}`);
    }
  } catch (error) {
    console.error("Error submitting user response:", error);
    setFeedback('Network error. Please try again.');
  }
}








  
  // async function handleUserResponse() {
  //   const response = await fetch('/api/query', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userResponse }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     setFeedback(data.feedback);
  //     setNextQuestion(data.nextQuestion);
  //   } else {
      
  //     console.error('Error submitting user response:', response.statusText);
  //     setFeedback('Error generating feedback. Please try again.');
  //   }

  //   // Clear the input field after submitting
  //   setUserResponse('');
  // }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Interview Session</h2>

      <div className="mb-4">
        <p className="text-lg font-semibold">Question:</p>
        <p>{nextQuestion}</p>
      </div>

      <div className="mb-4">
        <textarea
          className="w-full border p-2"
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          placeholder="Type your response here..."
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUserResponse}
      >
        Submit Response
      </button>

      <div className="mt-4">
        <p className="text-lg font-semibold">Feedback:</p>
        <p>{feedback}</p>
      </div>
    </div>
  );
}













