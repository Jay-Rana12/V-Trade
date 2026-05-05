import { defineConfig } from 'vite';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

try {
  const rootDir = 'c:\\xampp\\htdocs\\redesign';
  const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

  const badStyle = 'style="height: 50px; filter: brightness(0) invert(1);"';
  const goodStyle = 'style="height: 50px;"';

  files.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (content.includes(badStyle)) {
      content = content.split(badStyle).join(goodStyle);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Removed filter from footer in ${file}`);
    }
  });
} catch (e) {
  console.error('Failed to update HTML logos:', e);
}

let backendProcess = null;

export default defineConfig({
  plugins: [
    {
      name: 'start-backend-automatically',
      configureServer(server) {
        if (!backendProcess) {
          console.log('\n=================================================');
          console.log('🚀 AUTOMATICALLY STARTING BACKEND DATABASE SERVER...');
          console.log('=================================================\n');
          
          // Automatically spawn the backend server in the background
          backendProcess = spawn('node', ['../admin_server.js'], {
            cwd: __dirname,
            stdio: 'inherit',
            shell: true
          });

          backendProcess.on('error', (err) => {
            console.error('❌ Failed to start backend:', err);
          });
        }
      }
    }
  ],
  server: {
    host: true, // Listen on all local IPs
  }
});
