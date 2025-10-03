
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addCandidateAnswer, setCandidateScoreSummary } from "../../slices/candidateSlice";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true, // Only for development
// });

// const timerMap = {
//   Easy: 20,
//   Medium: 60,
//   Hard: 120,
// };

// export default function Chat({ candidateId }) {
//   const dispatch = useDispatch();
//   const candidate = useSelector((state) =>
//     state.candidate.candidates.find((c) => c.id === candidateId)
//   );

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [evaluating, setEvaluating] = useState(false);

//   // Generate questions based on resume
//   useEffect(() => {
//     const generateQuestions = async () => {
//       try {
//         setLoading(true);

//         const prompt = `You are an expert technical interviewer. Based on the following resume, generate 6 interview questions (2 easy, 2 medium, 2 hard).

// Resume:
// ${candidate.resumeText}

// Return ONLY a JSON array in this exact format:
// [
//   {"level": "Easy", "question": "question text here"},
//   {"level": "Easy", "question": "question text here"},
//   {"level": "Medium", "question": "question text here"},
//   {"level": "Medium", "question": "question text here"},
//   {"level": "Hard", "question": "question text here"},
//   {"level": "Hard", "question": "question text here"}
// ]

// Make questions relevant to their skills, education, and experience mentioned in the resume.`;

//         const response = await openai.chat.completions.create({
//           model: "gpt-4o-mini",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//         });

//         const generatedQuestions = JSON.parse(response.choices[0].message.content);
//         setQuestions(generatedQuestions);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error generating questions:", error);
//         alert("Failed to generate questions. Please try again.");
//         setLoading(false);
//       }
//     };

//     if (candidate && candidate.resumeText) {
//       generateQuestions();
//     }
//   }, [candidate]);

//   // Timer countdown – resets whenever question changes
//   useEffect(() => {
//     if (currentIndex >= questions.length || loading) return;

//     // Reset timer for the new question
//     const currentLevel = questions[currentIndex].level;
//     setTimeLeft(timerMap[currentLevel]);

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentIndex, questions, loading]);

//   const handleSubmit = async () => {
//     if (currentIndex >= questions.length) return;

//     // Save answer in Redux
//     dispatch(
//       addCandidateAnswer({
//         id: candidateId,
//         question: questions[currentIndex].question,
//         answer: answer || "[No Answer]",
//         timestamp: new Date().toISOString(),
//       })
//     );

//     // Reset input
//     setAnswer("");

//     // Move to next question
//     const nextIndex = currentIndex + 1;
//     setCurrentIndex(nextIndex);

//     // If finished, evaluate
//     if (nextIndex >= questions.length) {
//       evaluateInterview();
//     }
//   };

//   const evaluateInterview = async () => {
//     setEvaluating(true);

//     try {
//       const allQA = candidate.answers
//         .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`)
//         .join("\n\n");

//       const prompt = `You are an expert interviewer evaluating a candidate's interview performance.

// Resume:
// ${candidate.resumeText}

// Interview Q&A:
// ${allQA}

// Provide:
// 1. An overall score out of 100
// 2. A brief summary (2-3 sentences) of their performance

// Format your response as:
// Score: [number]
// Summary: [your summary here]`;

//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.5,
//       });

//       const result = response.choices[0].message.content;
//       const scoreMatch = result.match(/Score:\s*(\d+)/);
//       const summaryMatch = result.match(/Summary:\s*(.+)/s);

//       const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
//       const summary = summaryMatch ? summaryMatch[1].trim() : "Evaluation complete.";

//       dispatch(
//         setCandidateScoreSummary({
//           id: candidateId,
//           score,
//           summary,
//         })
//       );

//       setEvaluating(false);
//     } catch (error) {
//       console.error("Error evaluating interview:", error);
//       setEvaluating(false);
//     }
//   };

//   if (!candidate) return <div>Candidate not found!</div>;

//   if (loading) {
//     return (
//       <div>
//         <h3>Generating personalized interview questions...</h3>
//         <p>Analyzing your resume to create relevant questions. Please wait.</p>
//       </div>
//     );
//   }

//   if (evaluating) {
//     return (
//       <div>
//         <h3>Evaluating your interview...</h3>
//         <p>AI is reviewing your answers. This may take a moment.</p>
//       </div>
//     );
//   }

//   if (currentIndex >= questions.length) {
//     return (
//       <div>
//         <h2>Interview Complete!</h2>
//         <p>Thank you for completing the interview.</p>
//         {candidate.score && (
//           <div>
//             <h3>Your Score: {candidate.score}/100</h3>
//             <p>{candidate.summary}</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h3>
//         Question {currentIndex + 1} of {questions.length} (
//         {questions[currentIndex].level})
//       </h3>
//       <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
//         {questions[currentIndex].question}
//       </p>

//       <div
//         style={{
//           marginTop: "1rem",
//           padding: "0.5rem",
//           background: timeLeft < 10 ? "#ffebee" : "#f5f5f5",
//           borderRadius: "4px",
//         }}
//       >
//         <strong>Time left: {timeLeft}s</strong>
//       </div>

//       <textarea
//         value={answer}
//         onChange={(e) => setAnswer(e.target.value)}
//         rows={6}
//         style={{
//           width: "100%",
//           marginTop: "1rem",
//           padding: "0.5rem",
//           fontSize: "1rem",
//         }}
//         placeholder="Type your answer here..."
//       />

//       <button
//         onClick={handleSubmit}
//         style={{
//           marginTop: "1rem",
//           padding: "0.5rem 1rem",
//           fontSize: "1rem",
//           cursor: "pointer",
//         }}
//       >
//         Submit Answer
//       </button>

//       <div style={{ marginTop: "1rem", color: "#666" }}>
//         <strong>Progress:</strong> {currentIndex + 1} / {questions.length}
//       </div>
//     </div>
//   );
// }



















// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addCandidateAnswer, evaluateCandidateSuccess } from "../../slices/candidateSlice"; // ✅ updated import
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true, // ⚠️ Only for dev, move server-side later
// });

// const timerMap = {
//   Easy: 20,
//   Medium: 60,
//   Hard: 120,
// };

// export default function Chat({ candidateId }) {
//   const dispatch = useDispatch();
//   const candidate = useSelector((state) =>
//     state.candidate.candidates.find((c) => c.id === candidateId)
//   );

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [evaluating, setEvaluating] = useState(false);

//   // Generate questions based on resume
//   useEffect(() => {
//     const generateQuestions = async () => {
//       try {
//         setLoading(true);

//         const prompt = `You are an expert technical interviewer. Based on the following resume, generate 6 interview questions (2 easy, 2 medium, 2 hard).

// Resume:
// ${candidate.resumeText}

// Return ONLY a JSON array in this exact format:
// [
//   {"level": "Easy", "question": "question text here"},
//   {"level": "Easy", "question": "question text here"},
//   {"level": "Medium", "question": "question text here"},
//   {"level": "Medium", "question": "question text here"},
//   {"level": "Hard", "question": "question text here"},
//   {"level": "Hard", "question": "question text here"}
// ]

// Make questions relevant to their skills, education, and experience mentioned in the resume.`;

//         const response = await openai.chat.completions.create({
//           model: "gpt-4o-mini",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//         });

//         const generatedQuestions = JSON.parse(
//           response.choices[0].message.content
//         );
//         setQuestions(generatedQuestions);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error generating questions:", error);
//         alert("Failed to generate questions. Please try again.");
//         setLoading(false);
//       }
//     };

//     if (candidate && candidate.resumeText) {
//       generateQuestions();
//     }
//   }, [candidate]);

//   // Timer countdown – resets whenever question changes
//   useEffect(() => {
//     if (currentIndex >= questions.length || loading) return;

//     const currentLevel = questions[currentIndex].level;
//     setTimeLeft(timerMap[currentLevel]);

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentIndex, questions, loading]);

//   const handleSubmit = async () => {
//     if (currentIndex >= questions.length) return;

//     // Save answer in Redux
//     dispatch(
//       addCandidateAnswer({
//         id: candidateId,
//         question: questions[currentIndex].question,
//         answer: answer || "[No Answer]",
//         timestamp: new Date().toISOString(),
//       })
//     );

//     setAnswer("");

//     const nextIndex = currentIndex + 1;
//     setCurrentIndex(nextIndex);

//     if (nextIndex >= questions.length) {
//       evaluateInterview();
//     }
//   };

//   const evaluateInterview = async () => {
//     setEvaluating(true);

//     try {
//       const allQA = candidate.answers
//         .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`)
//         .join("\n\n");

//       const prompt = `You are an expert interviewer evaluating a candidate's interview performance.

// Resume:
// ${candidate.resumeText}

// Interview Q&A:
// ${allQA}

// Provide:
// 1. An overall score out of 100
// 2. A brief summary (2-3 sentences) of their performance

// Format your response as:
// Score: [number]
// Summary: [your summary here]`;

//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.5,
//       });

//       const result = response.choices[0].message.content;
//       const scoreMatch = result.match(/Score:\s*(\d+)/);
//       const summaryMatch = result.match(/Summary:\s*(.+)/s);

//       const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
//       const summary = summaryMatch
//         ? summaryMatch[1].trim()
//         : "Evaluation complete.";

//       // ✅ updated dispatch
//       dispatch(
//         evaluateCandidateSuccess({
//           id: candidateId,
//           score,
//           summary,
//         })
//       );

//       setEvaluating(false);
//     } catch (error) {
//       console.error("Error evaluating interview:", error);
//       setEvaluating(false);
//     }
//   };

//   if (!candidate) return <div>Candidate not found!</div>;

//   if (loading) {
//     return (
//       <div>
//         <h3>Generating personalized interview questions...</h3>
//         <p>Analyzing your resume to create relevant questions. Please wait.</p>
//       </div>
//     );
//   }

//   if (evaluating) {
//     return (
//       <div>
//         <h3>Evaluating your interview...</h3>
//         <p>AI is reviewing your answers. This may take a moment.</p>
//       </div>
//     );
//   }

//   if (currentIndex >= questions.length) {
//     return (
//       <div>
//         <h2>Interview Complete!</h2>
//         <p>Thank you for completing the interview.</p>
//         {candidate.score && (
//           <div>
//             <h3>Your Score: {candidate.score}/100</h3>
//             <p>{candidate.summary}</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h3>
//         Question {currentIndex + 1} of {questions.length} (
//         {questions[currentIndex].level})
//       </h3>
//       <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
//         {questions[currentIndex].question}
//       </p>

//       <div
//         style={{
//           marginTop: "1rem",
//           padding: "0.5rem",
//           background: timeLeft < 10 ? "#ffebee" : "#f5f5f5",
//           borderRadius: "4px",
//         }}
//       >
//         <strong>Time left: {timeLeft}s</strong>
//       </div>

//       <textarea
//         value={answer}
//         onChange={(e) => setAnswer(e.target.value)}
//         rows={6}
//         style={{
//           width: "100%",
//           marginTop: "1rem",
//           padding: "0.5rem",
//           fontSize: "1rem",
//         }}
//         placeholder="Type your answer here..."
//       />

//       <button
//         onClick={handleSubmit}
//         style={{
//           marginTop: "1rem",
//           padding: "0.5rem 1rem",
//           fontSize: "1rem",
//           cursor: "pointer",
//         }}
//       >
//         Submit Answer
//       </button>

//       <div style={{ marginTop: "1rem", color: "#666" }}>
//         <strong>Progress:</strong> {currentIndex + 1} / {questions.length}
//       </div>
//     </div>
//   );
// }










// // src/ui/components/Chat.jsx
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addCandidateAnswer,
//   evaluateCandidateSuccess,
//   updateCandidateField,
//   updateCandidateTimer,
// } from "../../slices/candidateSlice";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true, // ⚠️ move server-side later
// });

// const timerMap = {
//   Easy: 20,
//   Medium: 60,
//   Hard: 120,
// };

// export default function Chat({ candidateId }) {
//   const dispatch = useDispatch();
//   const candidate = useSelector((state) =>
//     state.candidate.candidates.find((c) => c.id === candidateId)
//   );

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [answer, setAnswer] = useState("");
//   const [evaluating, setEvaluating] = useState(false);

//   // ✅ Use persisted currentIndex & timer from Redux
//   const currentIndex = candidate?.currentIndex || 0;
//   const timeLeft = candidate?.timeLeft || 0;

//   // Generate questions based on resume
//   useEffect(() => {
//     const generateQuestions = async () => {
//       try {
//         setLoading(true);

//         const prompt = `You are an expert technical interviewer. Based on the following resume, generate 6 interview questions (2 easy, 2 medium, 2 hard).

// Resume:
// ${candidate.resumeText}

// Return ONLY a JSON array in this exact format:
// [
//   {"level": "Easy", "question": "question text here"},
//   {"level": "Easy", "question": "question text here"},
//   {"level": "Medium", "question": "question text here"},
//   {"level": "Medium", "question": "question text here"},
//   {"level": "Hard", "question": "question text here"},
//   {"level": "Hard", "question": "question text here"}
// ]`;

//         const response = await openai.chat.completions.create({
//           model: "gpt-4o-mini",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//         });

//         const generatedQuestions = JSON.parse(
//           response.choices[0].message.content
//         );
//         setQuestions(generatedQuestions);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error generating questions:", error);
//         alert("Failed to generate questions. Please try again.");
//         setLoading(false);
//       }
//     };

//     if (candidate && candidate.resumeText && questions.length === 0) {
//       generateQuestions();
//     }
//   }, [candidate]);

//   // Timer countdown synced with Redux
//   useEffect(() => {
//     if (loading || currentIndex >= questions.length) return;

//     // Reset timer on new question if not resuming
//     if (!candidate.timeLeft || candidate.timeLeft <= 0) {
//       const currentLevel = questions[currentIndex].level;
//       dispatch(
//         updateCandidateTimer({ id: candidateId, timeLeft: timerMap[currentLevel] })
//       );
//     }

//     const interval = setInterval(() => {
//       if (candidate.timeLeft > 0) {
//         dispatch(
//           updateCandidateTimer({
//             id: candidateId,
//             timeLeft: candidate.timeLeft - 1,
//           })
//         );
//       } else {
//         handleSubmit();
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentIndex, questions, loading, candidate.timeLeft]);

//   const handleSubmit = async () => {
//     if (currentIndex >= questions.length) return;

//     // Save answer
//     dispatch(
//       addCandidateAnswer({
//         id: candidateId,
//         question: questions[currentIndex].question,
//         answer: answer || "[No Answer]",
//         timestamp: new Date().toISOString(),
//       })
//     );

//     setAnswer("");

//     // Move to next question
//     const nextIndex = currentIndex + 1;
//     dispatch(updateCandidateField({ id: candidateId, field: "currentIndex", value: nextIndex }));
//     dispatch(updateCandidateTimer({ id: candidateId, timeLeft: 0 }));

//     if (nextIndex >= questions.length) {
//       evaluateInterview();
//     }
//   };

//   const evaluateInterview = async () => {
//     setEvaluating(true);

//     try {
//       const allQA = candidate.answers
//         .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`)
//         .join("\n\n");

//       const prompt = `You are an expert interviewer evaluating a candidate's interview performance.

// Resume:
// ${candidate.resumeText}

// Interview Q&A:
// ${allQA}

// Provide:
// 1. An overall score out of 100
// 2. A brief summary (2-3 sentences) of their performance

// Format your response as:
// Score: [number]
// Summary: [your summary here]`;

//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.5,
//       });

//       const result = response.choices[0].message.content;
//       const scoreMatch = result.match(/Score:\s*(\d+)/);
//       const summaryMatch = result.match(/Summary:\s*(.+)/s);

//       const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
//       const summary = summaryMatch
//         ? summaryMatch[1].trim()
//         : "Evaluation complete.";

//       dispatch(
//         evaluateCandidateSuccess({
//           id: candidateId,
//           score,
//           summary,
//         })
//       );

//       setEvaluating(false);
//     } catch (error) {
//       console.error("Error evaluating interview:", error);
//       setEvaluating(false);
//     }
//   };

//   // ---------------- UI ----------------
//   if (!candidate) return <div>Candidate not found!</div>;

//   if (loading) {
//     return (
//       <div>
//         <h3>Generating personalized interview questions...</h3>
//         <p>Analyzing your resume to create relevant questions. Please wait.</p>
//       </div>
//     );
//   }

//   if (evaluating) {
//     return (
//       <div>
//         <h3>Evaluating your interview...</h3>
//         <p>AI is reviewing your answers. This may take a moment.</p>
//       </div>
//     );
//   }

//   if (currentIndex >= questions.length) {
//     return (
//       <div>
//         <h2>Interview Complete!</h2>
//         <p>Thank you for completing the interview.</p>
//         {candidate.score && (
//           <div>
//             <h3>Your Score: {candidate.score}/100</h3>
//             <p>{candidate.summary}</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-white rounded-lg shadow">
//       <h3 className="text-lg font-semibold text-gray-800">
//         Question {currentIndex + 1} of {questions.length} (
//         {questions[currentIndex].level})
//       </h3>
//       <p className="mt-4 text-gray-700 text-lg">{questions[currentIndex].question}</p>

//       <div
//         className={`mt-4 p-2 rounded ${
//           timeLeft < 10 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-800"
//         }`}
//       >
//         <strong>Time left: {timeLeft}s</strong>
//       </div>

//       <textarea
//         value={answer}
//         onChange={(e) => setAnswer(e.target.value)}
//         rows={6}
//         className="w-full mt-4 p-2 border rounded text-gray-800"
//         placeholder="Type your answer here..."
//       />

//       <button
//         onClick={handleSubmit}
//         className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
//       >
//         Submit Answer
//       </button>

//       <div className="mt-2 text-sm text-gray-600">
//         <strong>Progress:</strong> {currentIndex + 1} / {questions.length}
//       </div>
//     </div>
//   );
// }





























// // src/ui/components/Chat.jsx
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addCandidateAnswer,
//   evaluateCandidateSuccess,
//   updateCandidateTimer,
//   updateCandidateField,
// } from "../../slices/sessionSlice";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true, // ⚠️ Move to backend later
// });

// const timerMap = {
//   Easy: 20,
//   Medium: 60,
//   Hard: 120,
// };

// export default function Chat({ sessionId, candidateId }) {
//   const dispatch = useDispatch();

//   // ✅ Find candidate inside the correct session
//   const candidate = useSelector((state) => {
//     const session = state.session.sessions.find((s) => s.id === sessionId);
//     return session?.candidates.find((c) => c.id === candidateId);
//   });

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [answer, setAnswer] = useState("");
//   const [evaluating, setEvaluating] = useState(false);

//   const currentIndex = candidate?.currentIndex || 0;
//   const timeLeft = candidate?.timeLeft || 0;

//   // Generate AI questions
//   useEffect(() => {
//     const generateQuestions = async () => {
//       try {
//         setLoading(true);

//         const prompt = `You are an expert interviewer. Based on this resume, generate 6 interview questions (2 easy, 2 medium, 2 hard).

// Resume:
// ${candidate.resumeText}

// Return ONLY JSON:
// [
//   {"level": "Easy", "question": "q1"},
//   {"level": "Easy", "question": "q2"},
//   {"level": "Medium", "question": "q3"},
//   {"level": "Medium", "question": "q4"},
//   {"level": "Hard", "question": "q5"},
//   {"level": "Hard", "question": "q6"}
// ]`;

//         const response = await openai.chat.completions.create({
//           model: "gpt-4o-mini",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//         });

//         const generated = JSON.parse(response.choices[0].message.content);
//         setQuestions(generated);
//         setLoading(false);
//       } catch (err) {
//         console.error("❌ Error generating questions:", err);
//         alert("Failed to generate questions.");
//         setLoading(false);
//       }
//     };

//     if (candidate?.resumeText && questions.length === 0) generateQuestions();
//   }, [candidate]);

//   // Timer countdown
//   useEffect(() => {
//     if (loading || currentIndex >= questions.length) return;

//     // Reset timer if starting new question
//     if (!candidate.timeLeft || candidate.timeLeft <= 0) {
//       const currentLevel = questions[currentIndex].level;
//       dispatch(
//         updateCandidateTimer({
//           sessionId,
//           candidateId,
//           timeLeft: timerMap[currentLevel],
//         })
//       );
//     }

//     const interval = setInterval(() => {
//       if (candidate.timeLeft > 0) {
//         dispatch(
//           updateCandidateTimer({
//             sessionId,
//             candidateId,
//             timeLeft: candidate.timeLeft - 1,
//           })
//         );
//       } else {
//         handleSubmit();
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentIndex, questions, loading, candidate?.timeLeft]);

//   const handleSubmit = () => {
//     if (currentIndex >= questions.length) return;

//     dispatch(
//       addCandidateAnswer({
//         sessionId,
//         candidateId,
//         question: questions[currentIndex].question,
//         answer: answer || "[No Answer]",
//         timestamp: new Date().toISOString(),
//       })
//     );

//     setAnswer("");
//     const nextIndex = currentIndex + 1;
//     dispatch(
//       updateCandidateField({
//         sessionId,
//         candidateId,
//         field: "currentIndex",
//         value: nextIndex,
//       })
//     );
//     dispatch(updateCandidateTimer({ sessionId, candidateId, timeLeft: 0 }));

//     if (nextIndex >= questions.length) evaluateInterview();
//   };

//   const evaluateInterview = async () => {
//     setEvaluating(true);

//     try {
//       const allQA = candidate.answers
//         .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`)
//         .join("\n\n");

//       const prompt = `Evaluate this interview.

// Resume:
// ${candidate.resumeText}

// Interview:
// ${allQA}

// Return:
// Score: [number]
// Summary: [short summary]`;

//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.5,
//       });

//       const result = response.choices[0].message.content;
//       const scoreMatch = result.match(/Score:\s*(\d+)/);
//       const summaryMatch = result.match(/Summary:\s*(.+)/s);

//       const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
//       const summary = summaryMatch ? summaryMatch[1].trim() : "Evaluation done.";

//       dispatch(
//         evaluateCandidateSuccess({ sessionId, candidateId, score, summary })
//       );
//     } catch (err) {
//       console.error("❌ Evaluation error:", err);
//     } finally {
//       setEvaluating(false);
//     }
//   };

//   // ---------------- UI ----------------
//   if (!candidate) return <div>❌ Candidate not found in session.</div>;
//   if (loading) return <p>⚡ Generating questions...</p>;
//   if (evaluating) return <p>🤖 Evaluating answers...</p>;

//   if (currentIndex >= questions.length) {
//     return (
//       <div className="p-6 bg-green-50 rounded-lg">
//         <h2 className="text-xl font-bold">✅ Interview Complete</h2>
//         {candidate.score && (
//           <div className="mt-4">
//             <h3 className="font-semibold">Score: {candidate.score}/100</h3>
//             <p>{candidate.summary}</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-white rounded-lg shadow">
//       <h3 className="text-lg font-semibold text-gray-800">
//         Question {currentIndex + 1}/{questions.length} ({questions[currentIndex].level})
//       </h3>
//       <p className="mt-4 text-gray-700 text-lg">{questions[currentIndex].question}</p>

//       <div
//         className={`mt-4 p-2 rounded ${
//           timeLeft < 10 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-800"
//         }`}
//       >
//         ⏳ Time left: {timeLeft}s
//       </div>

//       <textarea
//         value={answer}
//         onChange={(e) => setAnswer(e.target.value)}
//         rows={6}
//         className="w-full mt-4 p-2 border rounded text-gray-800"
//         placeholder="Type your answer..."
//       />

//       <button
//         onClick={handleSubmit}
//         className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
//       >
//         Submit Answer
//       </button>

//       <div className="mt-2 text-sm text-gray-600">
//         Progress: {currentIndex + 1}/{questions.length}
//       </div>
//     </div>
//   );
// }






















// // src/ui/components/Chat.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addCandidateAnswer,
//   evaluateCandidateSuccess,
//   updateCandidateTimer,
//   updateCandidateField,
// } from "../../slices/sessionSlice";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true, // ⚠️ Move to backend in production
// });

// const timerMap = {
//   Easy: 20,
//   Medium: 60,
//   Hard: 120,
// };

// export default function Chat({ sessionId, candidateId }) {
//   const dispatch = useDispatch();

//   // ✅ Candidate inside session
//   const candidate = useSelector((state) => {
//     const session = state.session.sessions.find((s) => s.id === sessionId);
//     return session?.candidates.find((c) => c.id === candidateId);
//   });

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [answer, setAnswer] = useState("");
//   const [evaluating, setEvaluating] = useState(false);

//   const currentIndex = candidate?.currentIndex || 0;
//   const timeLeft = candidate?.timeLeft || 0;

//   const intervalRef = useRef(null);

//   // Generate AI questions
//   useEffect(() => {
//     const generateQuestions = async () => {
//       try {
//         setLoading(true);

//         const prompt = `You are an expert interviewer. Based on this resume, generate 6 interview questions (2 easy, 2 medium, 2 hard).

// Resume:
// ${candidate?.resumeText || "No resume provided."}

// Return ONLY JSON:
// [
//   {"level": "Easy", "question": "q1"},
//   {"level": "Easy", "question": "q2"},
//   {"level": "Medium", "question": "q3"},
//   {"level": "Medium", "question": "q4"},
//   {"level": "Hard", "question": "q5"},
//   {"level": "Hard", "question": "q6"}
// ]`;

//         const response = await openai.chat.completions.create({
//           model: "gpt-4o-mini",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//         });

//         console.log(response);
//         const generated = JSON.parse(safeParseJSON(response.choices[0].message.content));
//         setQuestions(generated);
//       } catch (err) {
//         console.error("❌ Error generating questions:", err);
//         alert("Failed to generate questions.");
//       } finally {
//         setLoading(false);
//       }
//     };



//     if (candidate?.resumeText && questions.length === 0) generateQuestions();
//   }, [candidate]);

//   // Timer countdown
//   useEffect(() => {
//     if (loading || currentIndex >= questions.length) return;

//     // Reset timer if starting new question
//     if (!candidate.timeLeft || candidate.timeLeft <= 0) {
//       const currentLevel = questions[currentIndex].level;
//       dispatch(
//         updateCandidateTimer({
//           sessionId,
//           candidateId,
//           timeLeft: timerMap[currentLevel],
//         })
//       );
//     }

//     intervalRef.current = setInterval(() => {
//       if (candidate.timeLeft > 0) {
//         dispatch(
//           updateCandidateTimer({
//             sessionId,
//             candidateId,
//             timeLeft: candidate.timeLeft - 1,
//           })
//         );
//       } else {
//         clearInterval(intervalRef.current);
//         handleSubmit(); // auto-submit on timeout
//       }
//     }, 1000);

//     return () => clearInterval(intervalRef.current);
//   }, [currentIndex, questions, loading, candidate?.timeLeft]);

//   const handleSubmit = () => {
//     if (currentIndex >= questions.length) return;

//     dispatch(
//       addCandidateAnswer({
//         sessionId,
//         candidateId,
//         question: questions[currentIndex].question,
//         answer: answer || "[No Answer]",
//         timestamp: new Date().toISOString(),
//       })
//     );

//     setAnswer("");
//     const nextIndex = currentIndex + 1;

//     dispatch(
//       updateCandidateField({
//         sessionId,
//         candidateId,
//         field: "currentIndex",
//         value: nextIndex,
//       })
//     );
//     dispatch(updateCandidateTimer({ sessionId, candidateId, timeLeft: 0 }));

//     if (nextIndex >= questions.length) {
//       evaluateInterview();
//     }
//   };

//   const evaluateInterview = async () => {
//     setEvaluating(true);

//     try {
//       const allQA = candidate.answers
//         .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`)
//         .join("\n\n");

//       const prompt = `Evaluate this interview.

// Resume:
// ${candidate.resumeText}

// Interview:
// ${allQA}

// Return:
// Score: [number]
// Summary: [short summary]`;

//       const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.5,
//       });

//       const result = response.choices[0].message.content;
//       const scoreMatch = result.match(/Score:\s*(\d+)/);
//       const summaryMatch = result.match(/Summary:\s*(.+)/s);

//       const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
//       const summary = summaryMatch ? summaryMatch[1].trim() : "Evaluation done.";

//       dispatch(
//         evaluateCandidateSuccess({ sessionId, candidateId, score, summary })
//       );
//     } catch (err) {
//       console.error("❌ Evaluation error:", err);
//     } finally {
//       setEvaluating(false);
//     }
//   };



//   function safeParseJSON(input) {
//   try {
//     // Step 1: Remove code block markers like ```json ... ```
//     let cleaned = input.trim()
//       .replace(/^```(json)?/i, "")  // remove starting ```
//       .replace(/```$/, "");         // remove ending ```

//     // Step 2: Fix common trailing commas before ] or }
//     cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

//     // Step 3: Ensure it’s a valid JSON array/object
//     return JSON.parse(cleaned);
//   } catch (err) {
//     console.error("❌ Failed to parse JSON:", err.message);
//     return []; // return empty array fallback
//   }
// }



//   // ---------------- UI ----------------
//   if (!candidate) return <div>❌ Candidate not found in session.</div>;
//   if (loading) return <p className="p-4">⚡ Generating questions...</p>;
//   if (evaluating) return <p className="p-4">🤖 Evaluating answers...</p>;

//   if (currentIndex >= questions.length) {
//     return (
//       <div className="p-6 bg-green-50 rounded-lg">
//         <h2 className="text-xl font-bold">✅ Interview Complete</h2>
//         {candidate.score !== null && (
//           <div className="mt-4">
//             <h3 className="font-semibold">Score: {candidate.score}/100</h3>
//             <p>{candidate.summary}</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-white rounded-lg shadow">
//       <h3 className="text-lg font-semibold text-gray-800">
//         Question {currentIndex + 1}/{questions.length} ({questions[currentIndex].level})
//       </h3>
//       <p className="mt-4 text-gray-700 text-lg">{questions[currentIndex].question}</p>

//       <div
//         className={`mt-4 p-2 rounded ${
//           timeLeft < 10 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-800"
//         }`}
//       >
//         ⏳ Time left: {timeLeft}s
//       </div>

//       <textarea
//         value={answer}
//         onChange={(e) => setAnswer(e.target.value)}
//         rows={6}
//         className="w-full mt-4 p-2 border rounded text-gray-800"
//         placeholder="Type your answer..."
//       />

//       <button
//         onClick={handleSubmit}
//         className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
//       >
//         Submit Answer
//       </button>

//       <div className="mt-2 text-sm text-gray-600">
//         Progress: {currentIndex + 1}/{questions.length}
//       </div>
//     </div>
//   );
// }





















// src/ui/components/Chat.jsx
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCandidateAnswer,
  evaluateCandidateSuccess,
  updateCandidateTimer,
  updateCandidateField,
} from "../../slices/sessionSlice";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // ⚠️ Move to backend in production
});

const timerMap = {
  Easy: 20,
  Medium: 60,
  Hard: 120,
};

export default function Chat({ sessionId, candidateId }) {
  const dispatch = useDispatch();

  // ✅ Candidate inside session
  const candidate = useSelector((state) => {
    const session = state.session.sessions.find((s) => s.id === sessionId);
    return session?.candidates.find((c) => c.id === candidateId);
  });

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);

  const currentIndex = candidate?.currentIndex || 0;
  const timeLeft = candidate?.timeLeft || 0;

  const intervalRef = useRef(null);

  // ---------------- safe JSON parser ----------------
  function safeParseJSON(input) {
    try {
      if (input == null) return null;

      // If it's already an object/array, return it directly
      if (typeof input === "object") return input;

      // Normalize to string
      let s = String(input).trim();

      // Remove code fences like ```json ... ```
      s = s.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, "").trim();

      // Quick attempt: try JSON.parse directly
      try {
        return JSON.parse(s);
      } catch (e) {
        // continue
      }

      // Try to extract the first {...} or [...] block from the text (handles extra commentary)
      const m = s.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (m) {
        let candidate = m[1];
        // remove trailing commas before } or ]
        candidate = candidate.replace(/,\s*([}\]])/g, "$1");
        return JSON.parse(candidate);
      }

      // If nothing worked, return null
      console.warn("safeParseJSON: could not parse input into JSON");
      return null;
    } catch (err) {
      console.error("safeParseJSON error:", err);
      return null;
    }
  }

  // Generate AI questions
  useEffect(() => {
    const generateQuestions = async () => {
      if (!candidate) return;

      try {
        setLoading(true);

        const prompt = `You are an expert interviewer. Based on this resume, generate 6 interview questions (2 easy, 2 medium, 2 hard).

Resume:
${candidate?.resumeText || "No resume provided."}

Return ONLY JSON:
[
  {"level": "Easy", "question": "q1"},
  {"level": "Easy", "question": "q2"},
  {"level": "Medium", "question": "q3"},
  {"level": "Medium", "question": "q4"},
  {"level": "Hard", "question": "q5"},
  {"level": "Hard", "question": "q6"}
]`;

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        });

        // Defensive extraction of text from the OpenAI response
        const choice = response?.choices?.[0];
        const raw =
          choice?.message?.content ??
          choice?.message ??
          choice?.text ??
          choice ??
          null;

        // Helpful debug when something goes wrong
        // console.debug("OpenAI raw response:", response, "extracted:", raw);

        const parsed = safeParseJSON(raw);

        if (!parsed || !Array.isArray(parsed)) {
          console.error("Could not parse questions from model output. Raw extracted value:", raw);
          alert("AI returned an unexpected response format. Check console for details.");
          setQuestions([]);
          return;
        }

        setQuestions(parsed);
      } catch (err) {
        console.error("❌ Error generating questions:", err);
        alert("Failed to generate questions. See console for details.");
      } finally {
        setLoading(false);
      }
    };

    if (candidate?.resumeText && questions.length === 0) generateQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidate]);

  // Timer countdown
  useEffect(() => {
    if (loading || currentIndex >= questions.length) return;

    // Reset timer if starting new question
    if (!candidate.timeLeft || candidate.timeLeft <= 0) {
      const currentLevel = questions[currentIndex].level;
      dispatch(
        updateCandidateTimer({
          sessionId,
          candidateId,
          timeLeft: timerMap[currentLevel],
        })
      );
    }

    // clear any existing interval to avoid duplicates
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!candidate) return;

      if (candidate.timeLeft > 0) {
        dispatch(
          updateCandidateTimer({
            sessionId,
            candidateId,
            timeLeft: candidate.timeLeft - 1,
          })
        );
      } else {
        clearInterval(intervalRef.current);
        handleSubmit(); // auto-submit on timeout
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions, loading, candidate?.timeLeft]);

  const handleSubmit = () => {
    if (currentIndex >= questions.length) return;

    // ensure interval is cleared so we don't double-submit
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    dispatch(
      addCandidateAnswer({
        sessionId,
        candidateId,
        question: questions[currentIndex].question,
        answer: answer || "[No Answer]",
        timestamp: new Date().toISOString(),
      })
    );

    setAnswer("");
    const nextIndex = currentIndex + 1;

    dispatch(
      updateCandidateField({
        sessionId,
        candidateId,
        field: "currentIndex",
        value: nextIndex,
      })
    );
    dispatch(updateCandidateTimer({ sessionId, candidateId, timeLeft: 0 }));

    if (nextIndex >= questions.length) {
      evaluateInterview();
    }
  };

  const evaluateInterview = async () => {
    setEvaluating(true);

    try {
      const allQA = candidate.answers
        .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`)
        .join("\n\n");

      const prompt = `Evaluate this interview.\n\nResume:\n${candidate.resumeText}\n\nInterview:\n${allQA}\n\nReturn:\nScore: [number]\nSummary: [short summary]`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
      });

      const result = response.choices?.[0]?.message?.content ?? response.choices?.[0]?.text ?? response.choices?.[0];
      const scoreMatch = String(result).match(/Score:\s*(\d+)/);
      const summaryMatch = String(result).match(/Summary:\s*(.+)/s);

      const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
      const summary = summaryMatch ? summaryMatch[1].trim() : "Evaluation done.";

      dispatch(evaluateCandidateSuccess({ sessionId, candidateId, score, summary }));
    } catch (err) {
      console.error("❌ Evaluation error:", err);
    } finally {
      setEvaluating(false);
    }
  };

  // ---------------- UI ----------------
  if (!candidate) return <div>❌ Candidate not found in session.</div>;
  if (loading) return <p className="p-4">⚡ Generating questions...</p>;
  if (evaluating) return <p className="p-4">🤖 Evaluating answers...</p>;

  if (currentIndex >= questions.length) {
    return (
      <div className="p-6 bg-green-50 rounded-lg">
        <h2 className="text-xl font-bold">✅ Interview Complete</h2>
        {candidate.score !== null && (
          <div className="mt-4">
            <h3 className="font-semibold">Score: {candidate.score}/100</h3>
            <p>{candidate.summary}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800">
        Question {currentIndex + 1}/{questions.length} ({questions[currentIndex].level})
      </h3>
      <p className="mt-4 text-gray-700 text-lg">{questions[currentIndex].question}</p>

      <div
        className={`mt-4 p-2 rounded ${
          timeLeft < 10 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-800"
        }`}
      >
        ⏳ Time left: {timeLeft}s
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={6}
        className="w-full mt-4 p-2 border rounded text-gray-800"
        placeholder="Type your answer..."
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
      >
        Submit Answer
      </button>

      <div className="mt-2 text-sm text-gray-600">Progress: {currentIndex + 1}/{questions.length}</div>
    </div>
  );
}
