
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














// import { useState } from "react";
// import axios from "axios";
// export default function InterviewPage() {
//   const [question, setQuestion] = useState("Hi! Thank you for joining today’s interview. Before we dive into technical questions, let’s start with a quick introduction. Could you please share your name, and give me a brief overview of your experience in frontend development? I’d love to hear about any roles or projects you've worked on, along with any specific frameworks or tools you specialize in.");
//   const [response, setResponse] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const apiResponse = await axios.post("http://localhost:3000/api/interview", {
//         question,
//         response,
//       });
//       console.log("API Response:", apiResponse.data);

//       setFeedback(apiResponse.data.feedback);
//       setQuestion(apiResponse.data.nextQuestion);
//       setResponse("");
//     } catch (error) {
//       console.log("Error")
//       // console.log("API Key:", process.env.OPENAI_API_KEY);
//       console.log("Error submitting response:", error);
//       setFeedback("An error occurred while submitting your response. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Interview Question</h1>
//       <p>{question}</p>
//       <textarea
//         value={response}
//         onChange={(e) => setResponse(e.target.value)}
//         placeholder="Type your response here"
//       />
//       <button onClick={handleSubmit} disabled={loading}>
//         Submit
//       </button>
//       {feedback && <p>Feedback: {feedback}</p> }
//       {/* {question && <p>Next Question: {question}</p>} */}
//     </div>
//   );
// }
