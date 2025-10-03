// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { evaluateCandidateSuccess } from "../slices/candidateSlice";
// import { evaluateCandidateWithAI } from "../utils/evaluateCandidate";

// export default function InterviewerPage() {
//   const candidates = useSelector((state) => state.candidate.candidates) || [];
//   const dispatch = useDispatch();

//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState("desc"); // default: highest score first
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   // Filter + sort candidates
//   const filteredCandidates = candidates
//     .filter(
//       (c) =>
//         c.name.toLowerCase().includes(search.toLowerCase()) ||
//         c.email.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortOrder === "asc") return (a.score || 0) - (b.score || 0);
//       return (b.score || 0) - (a.score || 0);
//     });

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1>Interviewer Dashboard</h1>

//       {/* Search + Sort */}
//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Search by name/email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ marginRight: "1rem", padding: "0.3rem" }}
//         />

//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           style={{ padding: "0.3rem" }}
//         >
//           <option value="desc">Sort: Score High → Low</option>
//           <option value="asc">Sort: Score Low → High</option>
//         </select>
//       </div>

//       {/* Candidates Table */}
//       <table
//         border="1"
//         cellPadding="8"
//         style={{ borderCollapse: "collapse", width: "100%" }}
//       >
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Score</th>
//             <th>Summary</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredCandidates.map((c) => (
//             <tr key={c.id}>
//               <td>{c.name || "Unnamed"}</td>
//               <td>{c.email}</td>
//               <td>{c.score !== null ? c.score : "Not evaluated yet"}</td>
//               <td>{c.summary || "No summary yet"}</td>
//               <td>
//                 <button onClick={() => setSelectedCandidate(c)}>View</button>
//                 <button
//                   style={{ marginLeft: "0.5rem" }}
//                   onClick={async () => {
//                     try {
//                       const result = await evaluateCandidateWithAI(c);
//                       dispatch(
//                         evaluateCandidateSuccess({ id: c.id, ...result })
//                       );
//                       alert(`Evaluation complete! Score: ${result.score}`);
//                     } catch (err) {
//                       alert("AI evaluation failed. Please try again.");
//                       console.error(err);
//                     }
//                   }}
//                 >
//                   Evaluate
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Candidate Detail View */}
//       {selectedCandidate && (
//         <div
//           style={{
//             marginTop: "2rem",
//             padding: "1rem",
//             border: "1px solid #ccc",
//             borderRadius: "6px",
//             background: "#fafafa",
//           }}
//         >
//           <h2>{selectedCandidate.name}</h2>
//           <p>
//             <strong>Email:</strong> {selectedCandidate.email}
//           </p>
//           <p>
//             <strong>Phone:</strong> {selectedCandidate.phone}
//           </p>
//           <p>
//             <strong>Score:</strong>{" "}
//             {selectedCandidate.score !== null
//               ? `${selectedCandidate.score}/100`
//               : "Not yet evaluated"}
//           </p>
//           <p>
//             <strong>Summary:</strong>{" "}
//             {selectedCandidate.summary || "No summary yet"}
//           </p>

//           <h3>Interview Q&A</h3>
//           {selectedCandidate.answers.length > 0 ? (
//             <ul>
//               {selectedCandidate.answers.map((a, i) => (
//                 <li key={i} style={{ marginBottom: "0.5rem" }}>
//                   <strong>Q{i + 1}:</strong> {a.question}
//                   <br />
//                   <strong>A:</strong> {a.answer}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No answers recorded yet.</p>
//           )}

//           <button
//             style={{ marginTop: "1rem" }}
//             onClick={() => setSelectedCandidate(null)}
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }







// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { evaluateCandidateSuccess } from "../slices/candidateSlice";
// import { evaluateCandidateWithAI } from "../utils/evaluateCandidate";

// export default function InterviewerPage() {
//   const candidates = useSelector((state) => state.candidate.candidates) || [];
//   const dispatch = useDispatch();

//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState("desc"); // default: highest score first
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   // Filter + sort candidates
//   const filteredCandidates = candidates
//     .filter(
//       (c) =>
//         c.name.toLowerCase().includes(search.toLowerCase()) ||
//         c.email.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortOrder === "asc") return (a.score || 0) - (b.score || 0);
//       return (b.score || 0) - (a.score || 0);
//     });

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">
//         Interviewer Dashboard
//       </h1>

//       {/* Search + Sort */}
//       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name/email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full sm:w-1/3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
//         />

//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
//         >
//           <option value="desc">Sort: Score High → Low</option>
//           <option value="asc">Sort: Score Low → High</option>
//         </select>
//       </div>

//       {/* Candidates Table */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Score
//               </th>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Summary
//               </th>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredCandidates.map((c) => (
//               <tr key={c.id}>
//                 <td className="px-6 py-4">{c.name || "Unnamed"}</td>
//                 <td className="px-6 py-4">{c.email}</td>
//                 <td className="px-6 py-4">
//                   {c.score !== null ? `${c.score}/100` : "Not evaluated yet"}
//                 </td>
//                 <td className="px-6 py-4">
//                   {c.summary || "No summary yet"}
//                 </td>
//                 <td className="px-6 py-4 space-x-2">
//                   <button
//                     onClick={() => setSelectedCandidate(c)}
//                     className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={async () => {
//                       try {
//                         const result = await evaluateCandidateWithAI(c);
//                         dispatch(
//                           evaluateCandidateSuccess({ id: c.id, ...result })
//                         );
//                         alert(`Evaluation complete! Score: ${result.score}`);
//                       } catch (err) {
//                         alert("AI evaluation failed. Please try again.");
//                         console.error(err);
//                       }
//                     }}
//                     className="px-3 py-1 text-sm rounded-md bg-green-600 text-white hover:bg-green-500"
//                   >
//                     Evaluate
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Candidate Detail View */}
//       {selectedCandidate && (
//         <div className="mt-8 bg-white shadow rounded-lg p-6">
//           {/* Candidate Info */}
//           <div className="mb-6 border-b pb-4">
//             <h2 className="text-xl font-bold text-gray-900 mb-2">
//               {selectedCandidate.name}
//             </h2>
//             <p className="text-sm text-gray-600">
//               <strong>Email:</strong> {selectedCandidate.email}
//             </p>
//             <p className="text-sm text-gray-600">
//               <strong>Phone:</strong> {selectedCandidate.phone}
//             </p>
//           </div>

//           {/* Summary + Score */}
//           <div className="mb-6 p-4 rounded-lg bg-indigo-50 border border-indigo-200">
//             <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
//             <p className="mt-2 text-gray-700">
//               {selectedCandidate.summary || "No summary yet"}
//             </p>
//             <p className="mt-3 text-lg font-bold text-indigo-700">
//               Score:{" "}
//               {selectedCandidate.score !== null
//                 ? `${selectedCandidate.score}/100`
//                 : "Not yet evaluated"}
//             </p>
//           </div>

//           {/* Interview Q&A */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Interview Q&A
//             </h3>
//             {selectedCandidate.answers.length > 0 ? (
//               <ul className="space-y-4">
//                 {selectedCandidate.answers.map((a, i) => (
//                   <li
//                     key={i}
//                     className="p-4 bg-gray-50 rounded-lg border border-gray-200"
//                   >
//                     <p className="font-medium text-gray-900">
//                       Q{i + 1}: {a.question}
//                     </p>
//                     <p className="mt-2 text-gray-700">
//                       <strong>A:</strong> {a.answer}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-600">No answers recorded yet.</p>
//             )}
//           </div>

//           {/* Close Button */}
//           <div className="mt-6">
//             <button
//               onClick={() => setSelectedCandidate(null)}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
















// // src/pages/InterviewerPage.jsx
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addSession } from "../slices/sessionSlice";
// import { evaluateCandidateSuccess } from "../slices/candidateSlice";
// import { evaluateCandidateWithAI } from "../utils/evaluateCandidate";

// export default function InterviewerPage() {
//   const sessions = useSelector((state) => state.session.sessions) || [];
//   const candidates = useSelector((state) => state.candidate.candidates) || [];
//   const dispatch = useDispatch();

//   const [title, setTitle] = useState("");
//   const [interviewer, setInterviewer] = useState("");
//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   // Create session
//   const handleCreateSession = () => {
//     if (!title.trim()) return alert("Enter a session title!");
//     dispatch(addSession({ title, interviewer }));
//     setTitle("");
//     setInterviewer("");
//   };

//   // Candidate filtering
//   const filteredCandidates = candidates
//     .filter(
//       (c) =>
//         c.name?.toLowerCase().includes(search.toLowerCase()) ||
//         c.email?.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortOrder === "asc") return (a.score || 0) - (b.score || 0);
//       return (b.score || 0) - (a.score || 0);
//     });

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Interviewer Dashboard</h1>

//       {/* --- Create Session --- */}
//       <div className="bg-white p-6 rounded-lg shadow mb-8">
//         <h2 className="text-lg font-semibold mb-4">Create a New Session</h2>
//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Session Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border rounded p-2 flex-1"
//           />
//           <input
//             type="text"
//             placeholder="Interviewer Name/Email"
//             value={interviewer}
//             onChange={(e) => setInterviewer(e.target.value)}
//             className="border rounded p-2 flex-1"
//           />
//           <button
//             onClick={handleCreateSession}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
//           >
//             Create Session
//           </button>
//         </div>
//       </div>

//       {/* --- List Sessions --- */}
//       <h2 className="text-xl font-semibold mb-4">Your Sessions</h2>
//       <ul className="space-y-4 mb-10">
//         {sessions.map((s) => (
//           <li key={s.id} className="bg-white p-4 rounded-lg shadow">
//             <h3 className="font-bold text-lg">{s.title}</h3>
//             <p className="text-gray-600">ID: {s.id}</p>
//             <p className="text-gray-600">Interviewer: {s.interviewer}</p>
//             <p className="text-sm text-gray-500">
//               Created: {new Date(s.createdAt).toLocaleString()}
//             </p>
//             <div className="mt-2 flex items-center">
//               <input
//                 readOnly
//                 value={`${window.location.origin}/session/${s.id}`}
//                 className="border p-2 rounded w-2/3 text-sm"
//               />
//               <button
//                 onClick={() =>
//                   navigator.clipboard.writeText(
//                     `${window.location.origin}/session/${s.id}`
//                   )
//                 }
//                 className="ml-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-500"
//               >
//                 Copy Link
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* --- Candidates Section --- */}
//       <h2 className="text-xl font-semibold mb-4">All Candidates</h2>

//       {/* Search + Sort */}
//       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name/email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full sm:w-1/3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
//         />
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
//         >
//           <option value="desc">Sort: Score High → Low</option>
//           <option value="asc">Sort: Score Low → High</option>
//         </select>
//       </div>

//       {/* Candidates Table */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Score
//               </th>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Summary
//               </th>
//               <th className="px-6 py-3 text-left font-semibold text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredCandidates.map((c) => (
//               <tr key={c.id}>
//                 <td className="px-6 py-4">{c.name || "Unnamed"}</td>
//                 <td className="px-6 py-4">{c.email}</td>
//                 <td className="px-6 py-4">
//                   {c.score !== null ? `${c.score}/100` : "Not evaluated yet"}
//                 </td>
//                 <td className="px-6 py-4 truncate max-w-xs">
//                   {c.summary || "No summary yet"}
//                 </td>
//                 <td className="px-6 py-4 space-x-2">
//                   <button
//                     onClick={() => setSelectedCandidate(c)}
//                     className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={async () => {
//                       try {
//                         const result = await evaluateCandidateWithAI(c);
//                         dispatch(
//                           evaluateCandidateSuccess({ id: c.id, ...result })
//                         );
//                         alert(`Evaluation complete! Score: ${result.score}`);
//                       } catch (err) {
//                         alert("AI evaluation failed. Please try again.");
//                         console.error(err);
//                       }
//                     }}
//                     className="px-3 py-1 text-sm rounded-md bg-green-600 text-white hover:bg-green-500"
//                   >
//                     Evaluate
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Candidate Detail Modal */}
//       {selectedCandidate && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             {/* Header */}
//             <div className="flex justify-between items-center border-b pb-3 mb-4">
//               <h2 className="text-xl font-bold text-gray-900">
//                 Candidate Profile
//               </h2>
//               <button
//                 onClick={() => setSelectedCandidate(null)}
//                 className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
//               >
//                 Close
//               </button>
//             </div>

//             {/* Candidate Info */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <p className="text-sm text-gray-600">
//                   <strong>Name:</strong> {selectedCandidate.name}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Email:</strong> {selectedCandidate.email}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Phone:</strong> {selectedCandidate.phone}
//                 </p>
//               </div>
//               <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
//                 <h3 className="text-lg font-semibold text-gray-900">Score</h3>
//                 <p className="mt-2 text-2xl font-bold text-indigo-700">
//                   {selectedCandidate.score !== null
//                     ? `${selectedCandidate.score}/100`
//                     : "Not yet evaluated"}
//                 </p>
//               </div>
//             </div>

//             {/* Summary */}
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
//               <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
//               <p className="mt-2 text-gray-700">
//                 {selectedCandidate.summary || "No summary yet"}
//               </p>
//             </div>

//             {/* Interview Q&A */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Interview Q&A
//               </h3>
//               {selectedCandidate.answers.length > 0 ? (
//                 <ul className="space-y-4">
//                   {selectedCandidate.answers.map((a, i) => (
//                     <li
//                       key={i}
//                       className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
//                     >
//                       <p className="font-medium text-gray-900">
//                         Q{i + 1}: {a.question}
//                       </p>
//                       <p className="mt-2 text-gray-700">
//                         <strong>A:</strong> {a.answer}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600">No answers recorded yet.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
























// src/pages/InterviewerPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSession } from "../slices/sessionSlice";

export default function InterviewerPage() {
  const sessions = useSelector((state) => state.session.sessions) || [];
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // ✅ Create session
  const handleCreateSession = () => {
    if (!title.trim()) return alert("Enter a session title!");
    dispatch(addSession({ title, interviewer }));
    setTitle("");
    setInterviewer("");
  };

  // ✅ Flatten all candidates across sessions
  const allCandidates = sessions.flatMap((s) =>
    s.candidates.map((c) => ({
      ...c,
      sessionTitle: s.title,
      sessionId: s.id,
      interviewer: s.interviewer,
    }))
  );

  // ✅ Search + Sort
  const filteredCandidates = allCandidates
    .filter(
      (c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return (a.score || 0) - (b.score || 0);
      return (b.score || 0) - (a.score || 0);
    });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Interviewer Dashboard</h1>

      {/* --- Create Session --- */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Create a New Session</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <input
            type="text"
            placeholder="Interviewer Name/Email"
            value={interviewer}
            onChange={(e) => setInterviewer(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={handleCreateSession}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
          >
            Create Session
          </button>
        </div>
      </div>

      {/* --- List Sessions --- */}
      <h2 className="text-xl font-semibold mb-4">Your Sessions</h2>
      <ul className="space-y-4 mb-10">
        {sessions.map((s) => (
          <li key={s.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{s.title}</h3>
            <p className="text-gray-600">ID: {s.id}</p>
            <p className="text-gray-600">Interviewer: {s.interviewer}</p>
            <p className="text-sm text-gray-500">
              Created: {new Date(s.createdAt).toLocaleString()}
            </p>
            <div className="mt-2 flex items-center">
              <input
                readOnly
                value={`${window.location.origin}/session/${s.id}`}
                className="border p-2 rounded w-2/3 text-sm"
              />
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/session/${s.id}`
                  )
                }
                className="ml-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-500"
              >
                Copy Link
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* --- Candidates Section --- */}
      <h2 className="text-xl font-semibold mb-4">All Candidates (from all sessions)</h2>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 rounded-md border-gray-300 shadow-sm px-3 py-2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm px-3 py-2"
        >
          <option value="desc">Sort: Score High → Low</option>
          <option value="asc">Sort: Score Low → High</option>
        </select>
      </div>

      {/* Candidates Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Session</th>
              <th className="px-6 py-3 text-left">Score</th>
              <th className="px-6 py-3 text-left">Summary</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCandidates.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4">{c.name || "Unnamed"}</td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4">{c.sessionTitle}</td>
                <td className="px-6 py-4">
                  {c.score !== null ? `${c.score}/100` : "Not evaluated yet"}
                </td>
                <td className="px-6 py-4 truncate max-w-xs">
                  {c.summary || "No summary yet"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedCandidate(c)}
                    className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Candidate Profile
              </h2>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Close
              </button>
            </div>

            {/* Candidate Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {selectedCandidate.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {selectedCandidate.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {selectedCandidate.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Session:</strong> {selectedCandidate.sessionTitle}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h3 className="text-lg font-semibold text-gray-900">Score</h3>
                <p className="mt-2 text-2xl font-bold text-indigo-700">
                  {selectedCandidate.score !== null
                    ? `${selectedCandidate.score}/100`
                    : "Not yet evaluated"}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
              <p className="mt-2 text-gray-700">
                {selectedCandidate.summary || "No summary yet"}
              </p>
            </div>

            {/* Interview Q&A */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Interview Q&A
              </h3>
              {selectedCandidate.answers.length > 0 ? (
                <ul className="space-y-4">
                  {selectedCandidate.answers.map((a, i) => (
                    <li
                      key={i}
                      className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                    >
                      <p className="font-medium text-gray-900">
                        Q{i + 1}: {a.question}
                      </p>
                      <p className="mt-2 text-gray-700">
                        <strong>A:</strong> {a.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No answers recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
