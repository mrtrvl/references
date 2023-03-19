# GitHub Issue Creator

A Chrome plugin to create GitHub issues with selected text from a web page and the web page address.

## Features

- Creates GitHub issues with selected text from any web page
- Automatically includes the web page address in the issue

## Installation

> For the plugin to work, you'll need a GitHub access token with the `repo` scope. To generate one, follow these steps:

- Go to GitHub's settings page: https://github.com/settings/tokens
- Click on "Generate new token"
- Give your token a name, select the `repo` scope, and click "Generate token"
- Copy the generated token and replace the `getGithubAccessToken` function in `content.js`:


1. Clone this repository.

```bash
git clone https://github.com/mrtrvl/references.git
```

2. Rename `example.config.js` file to `config.js` and replace the placeholder GitHub access token and repository information:

```javascript
window.CONFIG = {
    githubAccessToken: "your-token-here",
    repo: "yourusername/repositoryname",
};
```

3. Install the plugin in Chrome:
- Open Chrome and go to chrome://extensions
- Enable "Developer mode" in the top-right corner
- Click "Load unpacked" and select the plugin directory you created earlier

## Usage
- Navigate to any web page.
- Select the text you want to include in the GitHub issue.
- Click on the plugin icon in the Chrome toolbar.
- Click the "Create Issue" button in the popup.
- An issue will be created in the specified GitHub repository with the selected text and the web page address.

## Icons used

<a href="https://www.flaticon.com/free-icons/star" title="star icons">Star icons created by Smashicons - Flaticon</a>


## License

MIT License

Copyright (c) [Martti Raavel] [2023]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.