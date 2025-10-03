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
    // Navigate straight to Chat
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
