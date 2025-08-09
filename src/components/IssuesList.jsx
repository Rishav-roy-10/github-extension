const IssuesList = ({ issues, analyzing, selectedIssue, onSelect, onGetAI, loadingAI }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex flex-col w-full h-full min-w-0">
    <div className="bg-red-900 border-b border-red-700 p-3">
      <h2 className="text-sm font-bold text-red-200">GitHub Issues & Errors</h2>
      <p className="text-[11px] text-red-400 mt-1">
        Repository issues with file locations and code details
      </p>
    </div>

    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 sm:p-3">
      {issues.length === 0 && !analyzing && (
        <div className="p-2 text-center text-gray-500 text-xs">
          Enter a GitHub repository URL and click{" "}
          <span className="font-medium">Fetch Issues</span>
        </div>
      )}

      {issues.map((issue) => (
        <div
          key={issue._id}
          onClick={() => onSelect(issue)}
          className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
            selectedIssue?._id === issue._id
              ? "bg-red-900 border-l-4 border-l-red-500"
              : ""
          }`}
        >
          <div className="flex items-start justify-between mb-2 gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-100 text-sm break-words truncate">
                #{issue.issueId} {issue.title}
              </h3>
              <div className="text-xs text-gray-400 mt-1 truncate">
                <span className="font-medium">
                  {issue.repoOwner}/{issue.repoName}
                </span>
                <span className="mx-1">•</span>
                Updated: {formatDate(issue.lastUpdatedAt)}
              </div>
            </div>

            <a
              href={issue.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 text-xs font-medium flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              Open
            </a>
          </div>

          {issue.fileRefs?.length > 0 ? (
            <div className="space-y-1">
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                Referenced Files ({issue.fileRefs.length})
              </div>

              {issue.fileRefs.map((fileRef, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-md p-2 border-l-2 border-red-400 break-words"
                >
                  <div className="mb-1 text-[11px] font-mono truncate">
                    <span className="text-gray-400">{getFileFolder(fileRef.path)}</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-blue-300">{getFileName(fileRef.path)}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-1 text-[11px]">
                    <span className="text-green-300 font-medium">
                      {getLineRange(fileRef)}
                    </span>
                    {fileRef.blobUrl && (
                      <a
                        href={fileRef.blobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Code
                      </a>
                    )}
                  </div>

                  {fileRef.snippet && (
                    <div className="bg-gray-900 rounded border border-gray-700 text-xs overflow-x-auto">
                      <pre className="p-2 text-gray-300">
                        <code>{fileRef.snippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[11px] text-gray-500 italic">
              No file references detected in this issue
            </div>
          )}

          <div className="mt-2 pt-2 border-t border-gray-700">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(issue);
                onGetAI(issue);
              }}
              disabled={loadingAI}
              className="w-full bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-500 disabled:bg-gray-600 text-xs transition"
            >
              {loadingAI && selectedIssue?._id === issue._id
                ? "Getting AI Solution..."
                : "Get AI Solution"}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default IssuesList;
