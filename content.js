/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function getGithubAccessToken() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('accessToken', ({ accessToken }) => {
      resolve(accessToken);
    });
  });
}

async function createIssue(text, pageUrl, title, repo) {
  const token = await getGithubAccessToken();
  const body = `**Selected Text**:\n${text}\n\n**URL**: ${pageUrl}`;

  const url = `https://api.github.com/repos/${repo}/issues`;
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `token ${token}`,
  });

  const issue = {
    title,
    body,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(issue),
  });

  if (response.ok) {
    alert('GitHub issue created successfully!');
  } else {
    alert('Error creating GitHub issue. Please check your access token and repository settings.');
  }
}

async function getRepos() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('repos', (data) => {
      resolve(data.repos || []);
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'createIssue') {
    const selectedText = window.getSelection().toString();
    const pageUrl = window.location.href;
    const issueTitle = request.title || `Issue from ${pageUrl}`;
    const selectedRepo = request.repo;

    if (selectedText) {
      createIssue(selectedText, pageUrl, issueTitle, selectedRepo);
    } else {
      alert('Please select some text on the page before creating an issue.');
    }
  }
});
