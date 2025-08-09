chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "GET_ACTIVE_TAB_URL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ url: tabs[0]?.url });
    });
    return true; // Keeps the message channel open for async sendResponse
  }
});

