
// import React, { useState } from "react";
// import ResumeUpload from "../ui/components/ResumeUpload";
// import Chat from "../ui/components/Chat";
// import { useSelector } from "react-redux";

// export default function IntervieweePage() {
//   const candidates = useSelector((state) => state.candidate.candidates) || [];
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   // Candidate can only see *their own* profile
//   // So we let them select their own resume-uploaded entry
//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1>Interviewee</h1>

//       {!selectedCandidate && (
//         <>
//           <ResumeUpload />

//           {/* Show "Continue Interview" if candidate already uploaded */}
//           {candidates.length > 0 && (
//             <>
//               <h4 style={{ marginTop: "1rem" }}>Continue your interview:</h4>
//               {candidates.map((c) => (
//                 <button
//                   key={c.id}
//                   onClick={() => setSelectedCandidate(c.id)}
//                   style={{ display: "block", margin: "0.5rem 0" }}
//                 >
//                   {c.name || "Unnamed Candidate"}
//                 </button>
//               ))}
//             </>
//           )}
//         </>
//       )}

//       {selectedCandidate && <Chat candidateId={selectedCandidate} />}
//     </div>
//   );
// }
















// // src/pages/IntervieweePage.jsx
// import React, { useState } from "react";
// import ResumeUpload from "../ui/components/ResumeUpload";
// import Chat from "../ui/components/Chat";
// import { useSelector } from "react-redux";

// export default function IntervieweePage() {
//   const candidates = useSelector((state) => state.candidate.candidates) || [];
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Interviewee</h1>

//       {!selectedCandidate && (
//         <div className="space-y-6">
//           {/* Resume Upload Section */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Upload Your Resume
//             </h2>
//             <ResumeUpload />
//           </div>

//           {/* Continue Interview Section */}
//           {candidates.length > 0 && (
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Continue Your Interview
//               </h2>
//               <div className="space-y-3">
//                 {candidates.map((c) => (
//                   <button
//                     key={c.id}
//                     onClick={() => setSelectedCandidate(c.id)}
//                     className="w-full px-4 py-2 text-left rounded-md border border-gray-200 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   >
//                     {c.name || "Unnamed Candidate"}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {selectedCandidate && (
//         <div className="bg-white rounded-lg shadow p-6">
//           <Chat candidateId={selectedCandidate} />
//         </div>
//       )}
//     </div>
//   );
// }







// src/pages/IntervieweePage.jsx
import React, { useState, useEffect } from "react";
import ResumeUpload from "../ui/components/ResumeUpload";
import Chat from "../ui/components/Chat";
import { useSelector, useDispatch } from "react-redux";
import { updateCandidateField } from "../slices/candidateSlice";

export default function IntervieweePage() {
  const candidates = useSelector((state) => state.candidate.candidates) || [];
  const dispatch = useDispatch();

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    // Check if there’s a candidate mid-interview
    const ongoing = candidates.find((c) => c.progress > 0 && c.score === null);
    if (ongoing) {
      setShowWelcomeBack(true);
      setSelectedCandidate(ongoing.id);
    }
  }, [candidates]);

  const handleStartOver = () => {
    if (selectedCandidate) {
      // reset candidate’s progress
      dispatch(
        updateCandidateField({
          id: selectedCandidate,
          field: "answers",
          value: [],
        })
      );
      dispatch(
        updateCandidateField({
          id: selectedCandidate,
          field: "progress",
          value: 0,
        })
      );
      dispatch(
        updateCandidateField({
          id: selectedCandidate,
          field: "currentIndex",
          value: 0,
        })
      );
      dispatch(
        updateCandidateField({
          id: selectedCandidate,
          field: "timeLeft",
          value: 0,
        })
      );
    }
    setShowWelcomeBack(false);
    setSelectedCandidate(null);
  };

  const handleResume = () => {
    setShowWelcomeBack(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Interviewee</h1>

      {/* Welcome Back Modal
      {showWelcomeBack && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-2">Welcome Back!</h2>
            <p className="mb-4">
              You have an unfinished interview. Would you like to continue?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleStartOver}
              >
                Start Over
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={handleResume}
              >
                Resume
              </button>
            </div>
          </div>
        </div>
      )} */}

      {!selectedCandidate && (
        <div className="space-y-6">
          {/* Resume Upload Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Upload Your Resume
            </h2>
            <ResumeUpload />
          </div>

          {/* Continue Interview Section */}
          {candidates.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Continue Your Interview
              </h2>
              <div className="space-y-3">
                {candidates.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCandidate(c.id)}
                    className="w-full px-4 py-2 text-left rounded-md border border-gray-200 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {c.name || "Unnamed Candidate"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedCandidate && (
        <div className="bg-white rounded-lg shadow p-6">
          <Chat candidateId={selectedCandidate} />
        </div>
      )}
    </div>
  );
}
