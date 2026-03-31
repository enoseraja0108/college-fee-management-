# Netlify Deployment Guide

This project is now configured to be hosted on Netlify with serverless Python functions.

## Prerequisites

- Netlify account (free at https://netlify.com)
- Git repository pushed to GitHub, GitLab, or Bitbucket
- Node.js installed locally (for Netlify CLI)

## Deployment Steps

### Option 1: Using Netlify UI (Recommended for beginners)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository
   - Netlify will auto-detect the `netlify.toml` configuration

3. **Deploy**
   - Click "Deploy"
   - Netlify will build and deploy automatically

### Option 2: Using Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Configuration Details

The `netlify.toml` file contains:

- **Build Command**: Installs Python dependencies from `requirements.txt`
- **Functions Directory**: `api/` folder contains serverless functions
- **Rewrites**: All routes are redirected to `/api/index.py` (Flask app)
- **Environment**: Python 3.12
- **Database Path**: Set to `/tmp/rvce_fee.db` for serverless compatibility

## Important Notes

⚠️ **Database Considerations**:
- SQLite database is stored in `/tmp/` (ephemeral storage)
- Data persists during single request but is cleared on function restart
- **For production**: Consider using a persistent database service:
  - MongoDB Atlas (free tier available)
  - PostgreSQL on Railway
  - Supabase
  - AWS RDS

## Environment Variables

Set these in Netlify UI under **Site Settings** → **Build & Deploy** → **Environment**:

```
DB_PATH=/tmp/rvce_fee.db
FLASK_ENV=production
SECRET_KEY=your_secure_key
```

## Troubleshooting

### Build Fails
- Check build logs in Netlify Dashboard
- Ensure `requirements.txt` has all dependencies
- Verify Python version compatibility

### Function Timeout
- Netlify free tier has ~10s execution timeout
- Optimize database queries
- Consider upgrading to Pro for longer timeouts

### Static Files Not Loading
- Ensure `static/` and `templates/` are in project root
- Check file paths in Flask templates use `/static/` prefix

## Cost

- **Free Tier**: Includes 125,000 function invocations/month
- **Paid Tier**: $19/month or higher for more features

## Next Steps

1. Set up a proper database (recommendation: MongoDB Atlas free tier)
2. Add error logging (Netlify has built-in error tracking)
3. Configure custom domain in Netlify settings
4. Set up CI/CD for automatic deployments on git push
