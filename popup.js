/* eslint-disable no-undef */

// Function to get the saved options from storage
function getOptions() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['accessToken', 'repos', 'lastUsedRepo'], (options) => {
      resolve(options);
    });
  });
}

// Function to populate the repository select element
async function populateRepoSelect() {
  const repoSelect = document.getElementById('repoSelect');
  const options = await getOptions();

  options.repos.forEach((repo) => {
    const option = document.createElement('option');
    option.value = repo;
    option.text = repo;
    repoSelect.add(option);
  });
}

async function setDefaultRepo() {
  const repoSelect = document.getElementById('repoSelect');
  const options = await getOptions();
  if (options.lastUsedRepo) {
    repoSelect.value = options.lastUsedRepo;
  }
}

// Load the repositories and populate the select element
populateRepoSelect().then(setDefaultRepo);

document.getElementById('createIssue').addEventListener('click', () => {
  const issueTitle = document.getElementById('issueTitle').value;
  const selectedRepo = document.getElementById('repoSelect').value;

  // Save the last used repository
  chrome.storage.sync.set({ lastUsedRepo: selectedRepo });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    setTimeout(() => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'createIssue',
        title: issueTitle,
        repo: selectedRepo,
      });
    }, 100);
  });
});
