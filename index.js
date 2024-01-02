const fs = require('fs');

function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}





function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function updateReadme() {
  // Read the current content of Update.md
  const readmeContent = fs.readFileSync('Update.md', 'utf-8');

  // Increment the keep alive count
  const matches = readmeContent.match(/keep alive (\d+)/g);
  const keepAliveCount = matches ? parseInt(matches[matches.length - 1].match(/\d+/)[0]) + 1 : 1;

  // Generate a random string
  const randomString = generateRandomString(8);

  // Get the current time
  const currentTime = getCurrentTime();

  // Append the time, random string, and the incremented count to README.md
  const newContent = `${readmeContent}\n${currentTime} ${randomString}  keep alive ${keepAliveCount}\n`;

  // Write the updated content back to README.md
  fs.writeFileSync('Update.md', newContent);

  console.log(`Kept alive with: ${currentTime} ${randomString}  keep alive ${keepAliveCount}`);
}

updateReadme();
