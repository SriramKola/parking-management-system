const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Quick Deploy - Smart Parking System');
console.log('=====================================\n');

// Check if git is initialized
try {
  execSync('git status', { stdio: 'ignore' });
  console.log('✅ Git repository detected');
} catch {
  console.log('📦 Initializing Git repository...');
  execSync('git init');
  execSync('git add .');
  execSync('git commit -m "Initial commit - Smart Parking System"');
  console.log('✅ Git repository created');
}

console.log('\n🌐 Deployment Options:');
console.log('1. Render (Free Forever) - Recommended');
console.log('2. Railway (Free Tier)');
console.log('3. Vercel (Serverless)');
console.log('4. Netlify + Render');

console.log('\n📋 Next Steps:');
console.log('1. Push code to GitHub:');
console.log('   git remote add origin https://github.com/yourusername/parking-system.git');
console.log('   git push -u origin main');
console.log('\n2. Go to render.com and deploy using the render.yaml file');
console.log('\n3. Your URL will be: https://parking-frontend-xxxx.onrender.com');

console.log('\n🎯 For Internship Profile:');
console.log('Use this URL format: https://smart-parking-system.onrender.com');
console.log('\n✨ Demo Credentials:');
console.log('Admin: admin@parking.com / admin123');
console.log('User: user@parking.com / user123');

console.log('\n📖 Read DEPLOYMENT_GUIDE.md for detailed instructions');