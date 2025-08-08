export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export const getFileFolder = (filePath) => {
  const parts = filePath.split('/');
  return parts.slice(0, -1).join('/') || 'root';
};

export const getFileName = (filePath) => filePath.split('/').pop();

export const getLineRange = (fileRef) => {
  if (fileRef.startLine && fileRef.endLine) return `Lines ${fileRef.startLine}-${fileRef.endLine}`;
  if (fileRef.line) return `Line ${fileRef.line}`;
  return 'Full file';
};


