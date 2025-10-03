import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidates: [],
};

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    // Add a new candidate
    addCandidate: (state, action) => {
      if (!Array.isArray(state.candidates)) {
        console.warn("state.candidates was not an array, reinitializing");
        state.candidates = [];
      }

      const newCandidate = {
        id: crypto.randomUUID(), // ✅ safer than Date.now()
        name: action.payload.name || "",
        email: action.payload.email || "",
        phone: action.payload.phone || "",
        resumeText: action.payload.resumeText || "",
        answers: [],
        score: null,
        summary: "",
        progress: 0,
        currentIndex: 0, // ✅ track current question
        timeLeft: 0, // ✅ track remaining time
      };

      state.candidates.push(newCandidate);
    },

    // Update candidate fields dynamically (name, email, resumeText, progress, etc.)
    updateCandidateField: (state, action) => {
      const { id, field, value } = action.payload;
      const candidate = state.candidates.find((c) => c.id === id);
      if (candidate) {
        candidate[field] = value;
      }
    },

    // Add an answer for a candidate
    addCandidateAnswer: (state, action) => {
      const { id, question, answer, timestamp } = action.payload;
      const candidate = state.candidates.find((c) => c.id === id);
      if (candidate) {
        candidate.answers.push({ question, answer, timestamp });
        candidate.progress = candidate.answers.length;
        candidate.currentIndex = candidate.answers.length; // ✅ move to next question
      }
    },

    // Update time left (for countdown timers if needed)
    updateCandidateTimer: (state, action) => {
      const { id, timeLeft } = action.payload;
      const candidate = state.candidates.find((c) => c.id === id);
      if (candidate) {
        candidate.timeLeft = timeLeft;
      }
    },

    // Update final score + summary after evaluation
    evaluateCandidateSuccess: (state, action) => {
      const { id, score, summary } = action.payload;
      const candidate = state.candidates.find((c) => c.id === id);
      if (candidate) {
        candidate.score = score;
        candidate.summary = summary;
      }
    },

    // Reset all candidates
    resetCandidates: () => initialState,
  },
});

export const {
  addCandidate,
  updateCandidateField,
  addCandidateAnswer,
  updateCandidateTimer,
  evaluateCandidateSuccess,
  resetCandidates,
} = candidateSlice.actions;

export default candidateSlice.reducer;
