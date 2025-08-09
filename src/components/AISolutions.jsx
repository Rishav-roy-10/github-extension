const SectionCard = ({ title, color, children }) => {
  const colorMap = {
    orange: { border: "border-orange-700", bg: "bg-orange-900", title: "text-orange-300", text: "text-orange-200" },
    green: { border: "border-green-700", bg: "bg-green-900", title: "text-green-300", text: "text-green-200" },
    blue: { border: "border-blue-700", bg: "bg-blue-900", title: "text-blue-300", text: "text-blue-200" },
    purple: { border: "border-purple-700", bg: "bg-purple-900", title: "text-purple-300", text: "text-purple-200" },
    indigo: { border: "border-indigo-700", bg: "bg-indigo-900", title: "text-indigo-300", text: "text-indigo-200" },
    gray: { border: "border-gray-700", bg: "bg-gray-900", title: "text-gray-300", text: "text-gray-200" },
  };
  const s = colorMap[color] || colorMap.gray;
  return (
    <div className={`border ${s.border} rounded-lg p-3 ${s.bg}`}>
      <h4 className={`font-bold ${s.title} mb-2 text-sm`}>{title}</h4>
      <div className={`${s.text} text-sm whitespace-pre-wrap break-words`}>{children}</div>
    </div>
  );
};

const AISolutions = ({ selectedIssue, aiSolution, loadingAI, onGetAI }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex flex-col w-full h-full min-w-0">
    <div className="bg-green-900 border-b border-green-700 p-3">
      <h2 className="text-sm font-bold text-green-200">AI-Powered Solutions</h2>
      <p className="text-[11px] text-green-400 mt-1">Gemini AI analysis and step-by-step solutions</p>
    </div>

    <div className="flex-1 overflow-y-auto p-3">
      {!selectedIssue ? (
        <div className="flex flex-col justify-center items-center text-center text-gray-500 h-full p-2">
          <p className="text-sm font-medium mb-1">No Issue Selected</p>
          <p className="text-xs">Select an issue from the left to see AI solutions</p>
        </div>
      ) : (
        <>
          <div className="mb-3 pb-3 border-b border-gray-700">
            <h3 className="font-bold text-gray-100 mb-2 break-words text-sm">
              Analyzing: #{selectedIssue.issueId} {selectedIssue.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onGetAI(selectedIssue)}
                disabled={loadingAI}
                className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-500 disabled:bg-gray-600 text-xs transition"
              >
                {loadingAI ? "Analyzing..." : aiSolution ? "Refresh AI Solution" : "Get AI Solution"}
              </button>
              {aiSolution && (
                <span className="text-xs text-green-400 self-center">✓ AI analysis available</span>
              )}
            </div>
          </div>

          {loadingAI ? (
            <div className="text-center py-6 text-gray-400 text-xs">
              AI is analyzing the issue...
            </div>
          ) : aiSolution ? (
            <div className="space-y-3">
              {aiSolution.problemAnalysis && (
                <SectionCard title="Problem Analysis" color="orange">
                  {aiSolution.problemAnalysis}
                </SectionCard>
              )}
              {aiSolution.solutionSteps && (
                <SectionCard title="Solution Steps" color="green">
                  {aiSolution.solutionSteps}
                </SectionCard>
              )}
              {aiSolution.codeChanges && (
                <SectionCard title="Code Changes" color="blue">
                  <pre className="text-xs text-gray-200 whitespace-pre-wrap break-words overflow-x-auto">
                    {aiSolution.codeChanges}
                  </pre>
                </SectionCard>
              )}
              {aiSolution.bestPractices && (
                <SectionCard title="Best Practices" color="purple">
                  {aiSolution.bestPractices}
                </SectionCard>
              )}
              {aiSolution.testingStrategy && (
                <SectionCard title="Testing Strategy" color="indigo">
                  {aiSolution.testingStrategy}
                </SectionCard>
              )}
              {aiSolution.rawResponse && !aiSolution.problemAnalysis && (
                <SectionCard title="AI Response" color="gray">
                  {aiSolution.rawResponse}
                </SectionCard>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-xs">
              Click "Get AI Solution" to analyze this issue
            </div>
          )}
        </>
      )}
    </div>
  </div>
);

export default AISolutions;
