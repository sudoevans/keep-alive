const fs = require('fs');

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function updateReadme() {
  // Read the current content of README.md
  const readmeContent = fs.readFileSync('README.md', 'utf-8');

  // Increment the keep alive count
  const matches = readmeContent.match(/keep alive (\d+)/g);
  const keepAliveCount = matches ? parseInt(matches[matches.length - 1].match(/\d+/)[0]) + 1 : 1;

  // Generate a random string
  const randomString = generateRandomString(8);

  // Append the random string and the incremented count to README.md
  const newContent = `${readmeContent}\n${randomString}  keep alive ${keepAliveCount}\n`;

  // Write the updated content back to README.md
  fs.writeFileSync('README.md', newContent);

  console.log(`Updated README.md with: ${randomString}  keep alive ${keepAliveCount}`);
}

updateReadme();
