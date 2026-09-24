

import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import TranscriptDisplay from "./components/TranscriptDisplay";
import "./styles/App.css";

const App: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");

  const handleTranscript = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setTranscript(data.transcript);
  };

  const handleSummarize = async () => {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: transcript }),
    });

    const data = await response.json();
    setSummary(data.summary);
  };

  return (
    <div className="App">
      <h1>Transcript Summarizer</h1>
      <FileUploader onFileUpload={handleTranscript} />
      <TranscriptDisplay transcript={transcript} summary={summary} />
      {transcript && (
        <button onClick={handleSummarize} className="summarize-button">
          Summarize
        </button>
      )}
    </div>
  );
};

export default App;


