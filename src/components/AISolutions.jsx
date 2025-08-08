export const AISolutions = ({ selectedIssue, aiSolution, loadingAI, onGetAI }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
    <div className="bg-green-900 border-b border-green-700 p-4">
      <h2 className="text-lg font-bold text-green-200">AI-Powered Solutions</h2>
      <p className="text-sm text-green-400 mt-1">Gemini AI analysis and step-by-step solutions</p>
    </div>

    <div className="max-h-[600px] overflow-y-auto">
      {!selectedIssue ? (
        <div className="p-8 text-center text-gray-500">
          <p className="text-lg font-medium mb-2">No Issue Selected</p>
          <p>Select an issue from the left to see AI solutions</p>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-4 pb-4 border-b border-gray-700">
            <h3 className="font-bold text-gray-100 mb-2">Analyzing: #{selectedIssue.issueId} {selectedIssue.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => onGetAI(selectedIssue)}
                disabled={loadingAI}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 disabled:bg-gray-600 text-sm transition"
              >
                {loadingAI ? 'Analyzing...' : (aiSolution ? 'Refresh AI Solution' : 'Get AI Solution')}
              </button>

              {aiSolution && (
                <div className="text-xs text-green-400 self-center">✓ AI analysis available</div>
              )}
            </div>
          </div>

          {loadingAI ? (
            <div className="text-center py-8">
              <p className="text-gray-400">AI is analyzing the issue...</p>
            </div>
          ) : aiSolution ? (
            <div className="space-y-4">
              {aiSolution.problemAnalysis && (
                <div className="border border-orange-700 rounded-lg p-4 bg-orange-900">
                  <h4 className="font-bold text-orange-300 mb-2">Problem Analysis</h4>
                  <div className="text-sm text-orange-200 whitespace-pre-wrap">{aiSolution.problemAnalysis}</div>
                </div>
              )}

              {aiSolution.solutionSteps && (
                <div className="border border-green-700 rounded-lg p-4 bg-green-900">
                  <h4 className="font-bold text-green-300 mb-2">Solution Steps</h4>
                  <div className="text-sm text-green-200 whitespace-pre-wrap">{aiSolution.solutionSteps}</div>
                </div>
              )}

              {aiSolution.codeChanges && (
                <div className="border border-blue-700 rounded-lg p-4 bg-blue-900">
                  <h4 className="font-bold text-blue-300 mb-2">Code Changes</h4>
                  <div className="bg-gray-900 rounded border border-gray-700 p-3">
                    <pre className="text-sm text-gray-200 whitespace-pre-wrap overflow-x-auto">{aiSolution.codeChanges}</pre>
                  </div>
                </div>
              )}

              {aiSolution.bestPractices && (
                <div className="border border-purple-700 rounded-lg p-4 bg-purple-900">
                  <h4 className="font-bold text-purple-300 mb-2">Best Practices</h4>
                  <div className="text-sm text-purple-200 whitespace-pre-wrap">{aiSolution.bestPractices}</div>
                </div>
              )}

              {aiSolution.testingStrategy && (
                <div className="border border-indigo-700 rounded-lg p-4 bg-indigo-900">
                  <h4 className="font-bold text-indigo-300 mb-2">Testing Strategy</h4>
                  <div className="text-sm text-indigo-200 whitespace-pre-wrap">{aiSolution.testingStrategy}</div>
                </div>
              )}

              {aiSolution.rawResponse && !aiSolution.problemAnalysis && (
                <div className="border border-gray-700 rounded-lg p-4 bg-gray-900">
                  <h4 className="font-bold text-gray-300 mb-2">AI Response</h4>
                  <div className="text-sm text-gray-200 whitespace-pre-wrap">{aiSolution.rawResponse}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Click "Get AI Solution" to analyze this issue</p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);


