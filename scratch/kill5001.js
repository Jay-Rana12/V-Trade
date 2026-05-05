const { execSync } = require('child_process');
try {
    const out = execSync('netstat -ano | findstr :5001').toString();
    const lines = out.split('\n');
    for (let line of lines) {
        if (line.includes('LISTENING')) {
            const parts = line.trim().split(/\s+/);
            const pid = parts[parts.length - 1];
            if (pid) {
                console.log('Killing PID ' + pid);
                execSync('taskkill /PID ' + pid + ' /F');
            }
        }
    }
} catch (e) {
    console.log('No process found on port 5001 or error: ', e.message);
}
