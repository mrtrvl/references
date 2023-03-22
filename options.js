/* eslint-disable no-undef */
function saveOptions() {
  const accessToken = document.getElementById('accessToken').value;
  const repoElements = document.querySelectorAll("#repoList input[type='text']");
  const repos = Array.from(repoElements).map((element) => element.value);

  chrome.storage.sync.set({ accessToken, repos }, () => {
    const status = document.getElementById('status');
    status.className = 'statusMessage';
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.classList.add('fadeOut');
      setTimeout(() => {
        status.textContent = '';
        status.className = '';
      }, 1000);
    }, 2000);
  });
}

function addRepoInput(value = '') {
  const repoWrapper = document.createElement('div');
  const repoInput = document.createElement('input');
  repoInput.type = 'text';
  repoInput.value = value;
  repoInput.readOnly = true;
  repoInput.title = `GitHub repository: ${value}`;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.className = 'removeRepoBtn';
  removeButton.onclick = () => {
    repoWrapper.remove();
  };

  repoWrapper.appendChild(repoInput);
  repoWrapper.appendChild(removeButton);
  const repoList = document.getElementById('repoList');
  repoList.appendChild(repoWrapper);
}

function restoreOptions() {
  chrome.storage.sync.get(['accessToken', 'repos'], (data) => {
    document.getElementById('accessToken').value = data.accessToken || '';
    if (Array.isArray(data.repos) && data.repos.length > 0) {
      data.repos.forEach((repo) => {
        addRepoInput(repo);
      });
    } else {
      addRepoInput();
    }
  });
}

document.getElementById('saveBtn').addEventListener('click', saveOptions);
document.getElementById('addRepoBtn').addEventListener('click', () => {
  const newRepoInput = document.getElementById('newRepo');
  const newRepoValue = newRepoInput.value.trim();

  if (newRepoValue) {
    addRepoInput(newRepoValue);
    newRepoInput.value = '';
  } else {
    // eslint-disable-next-line no-alert
    alert('Please enter a valid repository name.');
  }
});
document.addEventListener('DOMContentLoaded', restoreOptions);
