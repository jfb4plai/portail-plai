const { execSync } = require('child_process');
const path = require('path');
process.chdir(path.join(__dirname));
require('child_process').spawn('npx', ['vite', '--port', '3458'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});
