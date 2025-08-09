import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import GitHubIssueAnalyzer from "../components/GitHubIssueAnalyzer";
import Footer from "../components/Footer";

export default function PopupApp() {
  const [detectedRepoUrl, setDetectedRepoUrl] = useState("");

  useEffect(() => {
    // Listen for messages from background.js
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "REPO_DETECTED") {
        setDetectedRepoUrl(message.repoUrl);
      }
    });
  }, []);

  return (
    <div className="w-full h-full bg-gray-900 text-gray-200 flex items-start justify-center p-2 sm:p-3 overflow-hidden">
      <div className="w-full max-w-[900px] flex flex-col h-full rounded-lg overflow-hidden">
        <NavBar />
        <div className="flex-1 min-h-0">
          <GitHubIssueAnalyzer autoRepoUrl={detectedRepoUrl} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
