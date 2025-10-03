// // src/slices/sessionSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   sessions: [], // Each session = { id, title, interviewer, candidates[] }
// };

// export const sessionSlice = createSlice({
//   name: "session",
//   initialState,
//   reducers: {
//     // Create a new session
//     addSession: (state, action) => {
//       const newSession = {
//         id: crypto.randomUUID(),
//         title: action.payload.title || "Untitled Session",
//         interviewer: action.payload.interviewer || "",
//         candidates: [], // start empty
//         createdAt: new Date().toISOString(),
//       };
//       state.sessions.push(newSession);
//     },

//     // Add a candidate to a session
//     addCandidateToSession: (state, action) => {
//       const { sessionId, candidate } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         session.candidates.push({
//           id: crypto.randomUUID(),
//           name: candidate.name || "",
//           email: candidate.email || "",
//           phone: candidate.phone || "",
//           resumeText: candidate.resumeText || "",
//           answers: [],
//           score: null,
//           summary: "",
//           progress: 0,
//         });
//       }
//     },

//     // Add candidate answer
//     addCandidateAnswer: (state, action) => {
//       const { sessionId, candidateId, question, answer, timestamp } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         const candidate = session.candidates.find((c) => c.id === candidateId);
//         if (candidate) {
//           candidate.answers.push({ question, answer, timestamp });
//           candidate.progress = candidate.answers.length;
//         }
//       }
//     },

//     // Save evaluation (score + summary)
//     evaluateCandidateSuccess: (state, action) => {
//       const { sessionId, candidateId, score, summary } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         const candidate = session.candidates.find((c) => c.id === candidateId);
//         if (candidate) {
//           candidate.score = score;
//           candidate.summary = summary;
//         }
//       }
//     },

//     // Reset everything
//     resetSessions: () => initialState,
//   },
// });

// export const {
//   addSession,
//   addCandidateToSession,
//   addCandidateAnswer,
//   evaluateCandidateSuccess,
//   resetSessions,
// } = sessionSlice.actions;

// export default sessionSlice.reducer;

















// // src/slices/sessionSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   sessions: [], // { id, title, interviewer, candidates[] }
// };

// export const sessionSlice = createSlice({
//   name: "session",
//   initialState,
//   reducers: {
//     addSession: (state, action) => {
//       const newSession = {
//         id: crypto.randomUUID(),
//         title: action.payload.title || "Untitled Session",
//         interviewer: action.payload.interviewer || "",
//         candidates: [],
//         createdAt: new Date().toISOString(),
//       };
//       state.sessions.push(newSession);
//     },

//     addCandidateToSession: (state, action) => {
//       const { sessionId, candidate } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         session.candidates.push({
//           id: crypto.randomUUID(),
//           name: candidate.name || "",
//           email: candidate.email || "",
//           phone: candidate.phone || "",
//           resumeText: candidate.resumeText || "",
//           answers: [],
//           score: null,
//           summary: "",
//           progress: 0,
//         });
//       }
//     },

//     addCandidateAnswer: (state, action) => {
//       const { sessionId, candidateId, question, answer, timestamp } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         const candidate = session.candidates.find((c) => c.id === candidateId);
//         if (candidate) {
//           candidate.answers.push({ question, answer, timestamp });
//           candidate.progress = candidate.answers.length;
//         }
//       }
//     },

//     evaluateCandidateSuccess: (state, action) => {
//       const { sessionId, candidateId, score, summary } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         const candidate = session.candidates.find((c) => c.id === candidateId);
//         if (candidate) {
//           candidate.score = score;
//           candidate.summary = summary;
//         }
//       }
//     },

//     resetSessions: () => initialState,
//   },
// });

// export const {
//   addSession,
//   addCandidateToSession,
//   addCandidateAnswer,
//   evaluateCandidateSuccess,
//   updateCandidateField,   // ✅ must be here
//   updateCandidateTimer,   // ✅ must be here
//   resetSessions,
// } = sessionSlice.actions;

// export default sessionSlice.reducer;





















// // src/slices/sessionSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   sessions: [], // Each session = { id, title, interviewer, candidates[] }
// };

// export const sessionSlice = createSlice({
//   name: "session",
//   initialState,
//   reducers: {
//     // Create a new session
//     addSession: (state, action) => {
//       const newSession = {
//         id: crypto.randomUUID(),
//         title: action.payload.title || "Untitled Session",
//         interviewer: action.payload.interviewer || "",
//         candidates: [],
//         createdAt: new Date().toISOString(),
//       };
//       state.sessions.push(newSession);
//     },

//     // Add a candidate to a session
//     addCandidateToSession: (state, action) => {
//       const { sessionId, candidate } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         session.candidates.push({
//           id: crypto.randomUUID(),
//           name: candidate.name || "",
//           email: candidate.email || "",
//           phone: candidate.phone || "",
//           resumeText: candidate.resumeText || "",
//           answers: [],
//           score: null,
//           summary: "",
//           progress: 0,
//           currentIndex: 0,
//           timeLeft: 0,
//         });
//       }
//     },

//     // Update candidate field (name, email, phone, resume, currentIndex, etc.)
//     updateCandidateField: (state, action) => {
//       const { sessionId, candidateId, field, value } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         const candidate = session.candidates.find((c) => c.id === candidateId);
//         if (candidate) candidate[field] = value;
//       }
//     },

//     // Update timer per candidate
//     updateCandidateTimer: (state, action) => {
//       const { sessionId, candidateId, timeLeft } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         const candidate = session.candidates.find((c) => c.id === candidateId);
//         if (candidate) candidate.timeLeft = timeLeft;
//       }
//     },

//     // Add candidate answer
//     addCandidateAnswer: (state, action) => {
//       const { sessionId, candidateId, question, answer, timestamp } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         const candidate = session.candidates.find((c) => c.id === candidateId);
//         if (candidate) {
//           candidate.answers.push({ question, answer, timestamp });
//           candidate.progress = candidate.answers.length;
//         }
//       }
//     },

//     // Save evaluation (score + summary)
//     evaluateCandidateSuccess: (state, action) => {
//       const { sessionId, candidateId, score, summary } = action.payload;
//       const session = state.sessions.find((s) => s.id === sessionId);
//       if (session) {
//         const candidate = session.candidates.find((c) => c.id === candidateId);
//         if (candidate) {
//           candidate.score = score;
//           candidate.summary = summary;
//         }
//       }
//     },

//     // Reset everything
//     resetSessions: () => initialState,
//   },
// });

// export const {
//   addSession,
//   addCandidateToSession,
//   addCandidateAnswer,
//   updateCandidateField,
//   updateCandidateTimer,
//   evaluateCandidateSuccess,
//   resetSessions,
// } = sessionSlice.actions;

// export default sessionSlice.reducer;














// src/slices/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: [], // Each session = { id, title, interviewer, candidates[] }
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // ✅ Create a new session
    addSession: (state, action) => {
      const newSession = {
        id: crypto.randomUUID(),
        title: action.payload.title || "Untitled Session",
        interviewer: action.payload.interviewer || "",
        candidates: [],
        createdAt: new Date().toISOString(),
      };
      state.sessions.push(newSession);
    },

    // ✅ Add a candidate to a session
    addCandidateToSession: (state, action) => {
      const { sessionId, candidate } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        // check duplicate by email
        const exists = session.candidates.find(
          (c) => c.email.toLowerCase() === candidate.email.toLowerCase()
        );

        if (!exists) {
          session.candidates.push({
            id: crypto.randomUUID(),
            name: candidate.name || "",
            email: candidate.email || "",
            phone: candidate.phone || "",
            resumeText: candidate.resumeText || "",
            answers: [],
            score: null,
            summary: "",
            progress: 0,
            currentIndex: 0,
            timeLeft: 0,
          });
        } else {
          // if already exists → update resume text
          exists.resumeText = candidate.resumeText || exists.resumeText;
        }
      }
    },

    // ✅ Update candidate field (name, phone, resumeText, currentIndex, etc.)
    updateCandidateField: (state, action) => {
      const { sessionId, candidateId, field, value } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        const candidate = session.candidates.find((c) => c.id === candidateId);
        if (candidate) candidate[field] = value;
      }
    },

    // ✅ Update timer per candidate
    updateCandidateTimer: (state, action) => {
      const { sessionId, candidateId, timeLeft } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        const candidate = session.candidates.find((c) => c.id === candidateId);
        if (candidate) candidate.timeLeft = timeLeft;
      }
    },

    // ✅ Add candidate answer
    addCandidateAnswer: (state, action) => {
      const { sessionId, candidateId, question, answer, timestamp } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        const candidate = session.candidates.find((c) => c.id === candidateId);
        if (candidate) {
          candidate.answers.push({ question, answer, timestamp });
          candidate.progress = candidate.answers.length;
        }
      }
    },

    // ✅ Save evaluation (score + summary)
    evaluateCandidateSuccess: (state, action) => {
      const { sessionId, candidateId, score, summary } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        const candidate = session.candidates.find((c) => c.id === candidateId);
        if (candidate) {
          candidate.score = score;
          candidate.summary = summary;
        }
      }
    },

    // ✅ Reset all sessions
    resetSessions: () => initialState,
  },
});

export const {
  addSession,
  addCandidateToSession,
  updateCandidateField,
  updateCandidateTimer,
  addCandidateAnswer,
  evaluateCandidateSuccess,
  resetSessions,
} = sessionSlice.actions;

export default sessionSlice.reducer;
