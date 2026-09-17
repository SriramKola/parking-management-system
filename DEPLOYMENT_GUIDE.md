# 🚀 Deployment Guide - Smart Parking Management System

## Quick Deploy URLs (Choose One)

### Option 1: Render (Recommended - Free Forever)
**Best for: Full-stack deployment with database**

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/parking-management-system.git
   git push -u origin main
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Blueprint"
   - Connect your GitHub repo
   - Render will auto-deploy using `render.yaml`
   - **Your URL**: `https://parking-frontend-xxxx.onrender.com`

### Option 2: Railway (Free Tier)
**Best for: Quick deployment**

1. **Deploy Backend**
   ```bash
   npm install -g @railway/cli
   railway login
   cd backend
   railway deploy
   ```

2. **Deploy Frontend**
   ```bash
   cd ../frontend
   railway deploy
   ```
   - **Your URL**: `https://parking-system-xxxx.railway.app`

### Option 3: Vercel + MongoDB Atlas
**Best for: Serverless deployment**

1. **Setup Database**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create free cluster
   - Get connection string

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```
   - **Your URL**: `https://parking-management-xxxx.vercel.app`

### Option 4: Netlify + Render
**Best for: Separate frontend/backend**

1. **Deploy Backend to Render**
   - Upload backend folder to GitHub
   - Deploy on Render
   - Get backend URL

2. **Deploy Frontend to Netlify**
   - Update `netlify.toml` with backend URL
   - Drag & drop `frontend/dist` to Netlify
   - **Your URL**: `https://parking-system-xxxx.netlify.app`

## 🎯 Recommended for Internship Profile

**Use Render (Option 1)** - It's free, reliable, and gives you a professional URL like:
`https://smart-parking-system.onrender.com`

## 📱 Demo Credentials

Add these to your deployment for demo purposes:

**Admin Account:**
- Email: admin@parking.com
- Password: admin123

**User Account:**
- Email: user@parking.com  
- Password: user123

## 🔧 Environment Variables for Production

**Backend (.env):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parking
JWT_SECRET=your-super-secret-jwt-key-here
PORT=10000
NODE_ENV=production
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 📋 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas database created
- [ ] Environment variables configured
- [ ] Backend deployed and running
- [ ] Frontend deployed and connected
- [ ] Demo accounts created
- [ ] URL tested and working

## 🌟 Your Live URL

Once deployed, your URL will be:
**`https://smart-parking-system.onrender.com`**

Use this URL in your internship applications!

## 🚨 Troubleshooting

**Common Issues:**
1. **CORS Error**: Add your frontend URL to backend CORS config
2. **Database Connection**: Check MongoDB URI and whitelist IPs
3. **Build Fails**: Ensure all dependencies in package.json
4. **API Not Found**: Verify VITE_API_URL in frontend

## 📞 Support

If you need help with deployment, the URLs above will give you a working application that you can showcase in your internship profile!