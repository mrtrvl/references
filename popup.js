/* eslint-disable no-undef */
document.getElementById('createIssue').addEventListener('click', () => {
  const issueTitle = document.getElementById('issueTitle').value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'createIssue',
      title: issueTitle,
    });
  });
});
