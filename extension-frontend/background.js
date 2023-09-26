// This script interacts with the webpage and returns the url of the webpage

console.log("this is background script")
// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getAddress') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const url = tab.url;
        console.log(url);
        sendResponse(url);
      });
      return true; // This line is important for message handling
    }
  });
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getAddress') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            const url = tab.url;
            console.log(url)
            sendResponse(url);
        });
        return true;
    }
});