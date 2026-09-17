#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying Parking Management System to Netlify...\n');

// Step 1: Build the frontend
console.log('📦 Building frontend...');
try {
    process.chdir('frontend');
    execSync('npm install', { stdio: 'inherit' });
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Frontend built successfully!\n');
} catch (error) {
    console.error('❌ Frontend build failed:', error.message);
    process.exit(1);
}

// Step 2: Create _redirects file for Netlify
const redirectsContent = `# API redirects to backend
/api/*  https://parking-backend-api.onrender.com/api/:splat  200

# SPA fallback
/*  /index.html  200
`;

fs.writeFileSync('dist/_redirects', redirectsContent);
console.log('✅ Created _redirects file for Netlify\n');

// Step 3: Instructions for manual deployment
console.log('🌐 DEPLOYMENT INSTRUCTIONS:\n');
console.log('1. Go to https://netlify.com');
console.log('2. Sign up/Login with GitHub');
console.log('3. Drag & drop the "frontend/dist" folder to Netlify');
console.log('4. Your app will be live at: https://[random-name].netlify.app\n');

console.log('📋 OR use Netlify CLI:');
console.log('   npm install -g netlify-cli');
console.log('   netlify deploy --prod --dir=dist\n');

console.log('🎉 Your Parking Management System is ready for deployment!');
console.log('📱 Demo URL will be: https://smart-parking-[random].netlify.app');