// // src/pages/ChatWrapper.jsx
// import React from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Chat from "../ui/components/Chat";

// export default function ChatWrapper() {
//   const { id: sessionId, candidateId } = useParams();

//   const session = useSelector((state) =>
//     state.session.sessions.find((s) => s.id === sessionId)
//   );

//   if (!session) {
//     return (
//       <div className="p-6 text-red-600 font-semibold">
//         ❌ Invalid session. Please check the link.
//       </div>
//     );
//   }

//   const candidate = session.candidates.find((c) => c.id === candidateId);

//   if (!candidate) {
//     return (
//       <div className="p-6 text-red-600 font-semibold">
//         ❌ Candidate not found in this session.
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-xl font-bold text-gray-900 mb-4">
//         AI Interview for {candidate.name || "Candidate"}
//       </h1>
//       <Chat sessionId={sessionId} candidateId={candidateId} />
//     </div>
//   );
// }









// src/pages/ChatWrapper.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "../ui/components/Chat";

export default function ChatWrapper() {
  const { id: sessionId, candidateId } = useParams();

  const session = useSelector((state) =>
    state.session.sessions.find((s) => s.id === sessionId)
  );

  if (!session) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        ❌ Invalid session. Please check the link.
      </div>
    );
  }

  const candidate = session.candidates.find((c) => c.id === candidateId);

  if (!candidate) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        ❌ Candidate not found in this session.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        AI Interview for {candidate.name || "Candidate"}
      </h1>
      <Chat sessionId={sessionId} candidateId={candidateId} />
    </div>
  );
}
