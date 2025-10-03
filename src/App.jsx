
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import IntervieweePage from "./pages/IntervieweePage";
import InterviewerPage from "./pages/InterviewerPage";
import SessionJoinPage from "./pages/sessionJoinPage";
import ChatWrapper from "./pages/ChatWrapper";

export default function App() {
  return (
    <div>
      <Routes>
        {/* Public landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Interview flows */}
        <Route path="/interviewee" element={<IntervieweePage />} />
        <Route path="/interviewer" element={<InterviewerPage />} />

        {/* ✅ Session join link (must come BEFORE 404) */}
        <Route path="/session/:id" element={<SessionJoinPage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<h2 className="p-6">404 - Page Not Found</h2>} />

        <Route path="/session/:id" element={<SessionJoinPage />} />
        <Route path="/session/:id/candidate/:candidateId" element={<ChatWrapper />} />
        <Route path="*" element={<h2 className="p-6">404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}
