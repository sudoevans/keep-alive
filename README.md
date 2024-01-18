# Keep Alive 
![image](https://github.com/sudoevans/keep-alive/assets/75899973/1d7a3ace-f3dc-4f6a-a1e9-aedf0dbd56f9)

**Octocat to Keep my pyrofile alive.**

![keep-alive-removebg-preview](https://github.com/sudoevans/keep-alive/assets/75899973/e5fea844-e00b-403d-9bf4-3f8553003599)

## Action 
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


Add a GitHub Token

1. Generate a GitHub Personal Access Token (PAT) with the `repo` scope. [here](https://github.com/settings/tokens)!
2. Go to your repository settings > Secrets.
3. Add a new secret named `GH_TOKEN` and paste your PAT.

4. Make sure to allow permissions to your repository.
![image](https://github.com/sudoevans/keep-alive/assets/75899973/37fdcba1-e08d-49c3-87d6-06b94f88569f)


Don't be lazy though 😂 🚀
