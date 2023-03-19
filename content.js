function getGithubAccessToken() {
    return Promise.resolve(window.CONFIG.githubAccessToken);
}

async function createIssue(text, pageUrl, title) {
    const token = await getGithubAccessToken();
    const repo = window.CONFIG.repo;
    const body = `**Selected Text**:\n${text}\n\n**URL**: ${pageUrl}`;

    const url = `https://api.github.com/repos/${repo}/issues`;
    const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
    });

    const issue = {
        title,
        body,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(issue),
    });

    if (response.ok) {
        alert("GitHub issue created successfully!");
    } else {
        alert("Error creating GitHub issue. Please check your access token and repository settings.");
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "createIssue") {
      const selectedText = window.getSelection().toString();
      const pageUrl = window.location.href;
      const issueTitle = request.title || `Issue from ${pageUrl}`;
  
      if (selectedText) {
        createIssue(selectedText, pageUrl, issueTitle);
      } else {
        alert("Please select some text on the page before creating an issue.");
      }
    }
  });
  

