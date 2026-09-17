const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Smart Parking App Deployment...\n');

// Kill existing processes
exec('taskkill /F /IM ngrok.exe', () => {});
exec('taskkill /F /IM node.exe', () => {});

setTimeout(() => {
  // Start backend
  console.log('📡 Starting backend server...');
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'backend'),
    shell: true,
    stdio: 'pipe'
  });

  setTimeout(() => {
    // Start backend ngrok
    console.log('🌐 Creating backend tunnel...');
    const backendTunnel = spawn('ngrok', ['http', '5000', '--log=stdout'], {
      shell: true,
      stdio: 'pipe'
    });

    let backendUrl = '';
    backendTunnel.stdout.on('data', (data) => {
      const output = data.toString();
      const match = output.match(/url=https:\/\/([a-z0-9-]+\.ngrok\.io)/);
      if (match && !backendUrl) {
        backendUrl = match[0].replace('url=', '');
        console.log(`✅ Backend URL: ${backendUrl}`);
        
        // Update frontend API URL
        const apiPath = path.join(__dirname, 'frontend', 'src', 'services', 'api.js');
        let apiContent = fs.readFileSync(apiPath, 'utf8');
        apiContent = apiContent.replace(
          /const API_BASE_URL = '[^']*';/,
          `const API_BASE_URL = '${backendUrl}/api';`
        );
        fs.writeFileSync(apiPath, apiContent);
        console.log('🔧 Updated frontend API configuration');

        // Start frontend
        setTimeout(() => {
          console.log('🎨 Starting frontend server...');
          const frontend = spawn('npm', ['run', 'dev'], {
            cwd: path.join(__dirname, 'frontend'),
            shell: true,
            stdio: 'pipe'
          });

          setTimeout(() => {
            // Start frontend ngrok
            console.log('🌐 Creating frontend tunnel...');
            const frontendTunnel = spawn('ngrok', ['http', '5173', '--log=stdout'], {
              shell: true,
              stdio: 'pipe'
            });

            frontendTunnel.stdout.on('data', (data) => {
              const output = data.toString();
              const match = output.match(/url=https:\/\/([a-z0-9-]+\.ngrok\.io)/);
              if (match) {
                const frontendUrl = match[0].replace('url=', '');
                console.log('\n🎉 DEPLOYMENT COMPLETE! 🎉');
                console.log('================================');
                console.log(`🌍 Your Smart Parking App is live at:`);
                console.log(`📱 ${frontendUrl}`);
                console.log('================================');
                console.log('✨ Share this URL with anyone to access your app!');
                
                // Open browser
                exec(`start ${frontendUrl}`);
              }
            });
          }, 3000);
        }, 2000);
      }
    });
  }, 3000);
}, 2000);