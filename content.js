import CONFIG from "./config.js";

function getGithubAccessToken() {
    return Promise.resolve(CONFIG.githubAccessToken);
  }

async function createIssue(text, url) {
    const token = await getGithubAccessToken();
    const repo = CONFIG.repo;
    const title = `Issue from: ${url}`;
    const body = `**URL**: ${url}\n\n**Selected Text**:\n${text}`;

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

        if (selectedText) {
            createIssue(selectedText, pageUrl);
        } else {
            alert("Please select some text on the page before creating an issue.");
        }
    }
});

function getGithubAccessToken() {
    return Promise.resolve("your-token-here");
}
