// // src/pages/sessionJoinPage.jsx
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { addCandidateToSession } from "../slices/sessionSlice";
// import ResumeUpload from "../ui/components/ResumeUpload";

// export default function SessionJoinPage() {
//   const { id: sessionId } = useParams(); // ✅ FIXED
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const session = useSelector((state) =>
//     state.session.sessions.find((s) => s.id === sessionId)
//   );

//   const [joined, setJoined] = useState(false);
//   const [candidateId, setCandidateId] = useState(null);

//   if (!session) {
//     return (
//       <div className="p-6">
//         <h1 className="text-xl font-bold text-red-600">
//           Invalid session link.
//         </h1>
//       </div>
//     );
//   }

//   const handleCandidateSubmit = (candidateData) => {
//     dispatch(addCandidateToSession({ sessionId, candidate: candidateData }));

//     const newCandidate = session.candidates.find(
//       (c) => c.email.toLowerCase() === candidateData.email.toLowerCase()
//     );

//     if (newCandidate) {
//       setCandidateId(newCandidate.id);
//       setJoined(true);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {!joined ? (
//         <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">
//             Welcome to Session: {session.title}
//           </h1>
//           <p className="text-gray-600 mb-6">
//             Hosted by <strong>{session.interviewer}</strong>
//           </p>

//           {/* Resume Upload */}
//           <ResumeUpload onSubmit={handleCandidateSubmit} />
//         </div>
//       ) : (
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-green-600 mb-4">
//             You’ve joined the session!
//           </h1>
//           <p className="mb-6 text-gray-700">
//             Click below to start your AI-powered interview.
//           </p>
//           <button
//             onClick={() =>
//               navigate(`/session/${sessionId}/candidate/${candidateId}`)
//             }
//             className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
//           >
//             Start Interview
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }












// src/pages/SessionJoinPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ResumeUpload from "../ui/components/ResumeUpload";

export default function SessionJoinPage() {
  const { id: sessionId } = useParams();
  const navigate = useNavigate();

  const session = useSelector((state) =>
    state.session.sessions.find((s) => s.id === sessionId)
  );

  if (!session) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">
          Invalid session link.
        </h1>
      </div>
    );
  }

  const handleCandidateSubmit = (candidateData) => {
    // ✅ Navigate straight to Chat
    navigate(`/session/${sessionId}/candidate/${candidateData.id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Session: {session.title}
        </h1>
        <p className="text-gray-600 mb-6">
          Hosted by <strong>{session.interviewer}</strong>
        </p>

        {/* Resume Upload */}
        <ResumeUpload sessionId={sessionId} onSubmit={handleCandidateSubmit} />
      </div>
    </div>
  );
}
