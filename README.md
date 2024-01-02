# Keep Alive 
**Octocat to Keep my profile alive.**
<img src="https://github.com/sudoevans/keep-alive/assets/75899973/46d19a3e-bc41-48ca-a034-95a3377c4fb5" alt="drawing" height="400" width="400"/>

# Blog: Automate GitHub Profile Activity with GitHub Actions

## Introduction

GitHub Actions allow you to automate tasks in your repositories. In this blog post, we'll guide you through creating a simple GitHub Action that keeps your GitHub profile alive by updating a file with a random string and a timestamp.

## Prerequisites

- A GitHub account
- A repository where you want to implement the action
- Click [here](https://github.com/new) to create a new repository 

## Step 1: Create a New Workflow

1. In your repository, create a new directory named `.github/workflows`.
2. Inside this directory, create a YAML file, e.g., `keep-alive.yml`.

```yaml
name: Keep Alive

on:
  schedule:
    - cron: '* * * * *' # Run every minute for testing, you can put 11:59 UTC🕔

jobs:
  keep-alive:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14'

      - name: Run Node.js Script
        run: |
          npm install
          node index.js

      - name: Commit and Push Changes
        env:
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
        run: |
          git config user.name "Your Name"
          git config user.email "your.email@example.com"
          git add update.md
          git commit -m "Keep alive update"
          git push -u origin HEAD
```

## Step 2: Create a Node.js Script

1. Create a file named `index.js` in your repository with the following content:

```javascript
const fs = require('fs');

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function updateUpdateFile() {
  const updateContent = fs.readFileSync('update.md', 'utf-8');
  const matches = updateContent.match(/keep alive (\d+)/g);
  const keepAliveCount = matches ? parseInt(matches[matches.length - 1].match(/\d+/)[0]) + 1 : 1;
  const randomString = generateRandomString(8);
  const currentTime = getCurrentTime();
  const newContent = `${updateContent}\n${currentTime} ${randomString}  keep alive ${keepAliveCount}\n`;
  fs.writeFileSync('update.md', newContent);
  console.log(`Action kept alive  with: ${currentTime} ${randomString}  keep alive ${keepAliveCount}`);
}

updateUpdateFile();
```

## Step 3: Add a GitHub Token

1. Generate a GitHub Personal Access Token (PAT) with the `repo` scope. [here](https://github.com/settings/tokens)!
2. Go to your repository settings > Secrets.
3. Add a new secret named `GH_TOKEN` and paste your PAT.

4. Make sure to allow permissions to your repository.
![image](https://github.com/sudoevans/keep-alive/assets/75899973/37fdcba1-e08d-49c3-87d6-06b94f88569f)


Don't be lazy though 😂 🚀
