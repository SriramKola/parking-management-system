@echo off
echo Installing Netlify CLI...
npm install -g netlify-cli

echo Deploying to Netlify...
cd frontend
netlify deploy --prod --dir=dist

echo Your app is now live!
pause