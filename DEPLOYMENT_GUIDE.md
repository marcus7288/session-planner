# GitHub and Netlify Deployment Guide

## Step 1: Install Git (if not already installed)

Check if Git is installed:
```bash
git --version
```

If not installed, download from: https://git-scm.com/downloads

## Step 2: Create a GitHub Repository

1. Go to https://github.com and sign in (or create an account)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `session-planner`
5. Choose "Public" or "Private"
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 3: Initialize Git in Your Project

Open a terminal/command prompt in your project folder and run:

```bash
# Navigate to project directory
cd session-planner

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Session Planner application"
```

## Step 4: Connect to GitHub

Copy the commands from GitHub (shown after creating the repo) or use these:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/session-planner.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
If your GitHub username is "profmaine", the command would be:
```bash
git remote add origin https://github.com/profmaine/session-planner.git
```

## Step 5: Deploy to Netlify

### Option A: Netlify UI (Recommended for First Time)

1. Go to https://www.netlify.com/
2. Click "Sign up" (or "Log in" if you have an account)
3. Choose "Sign up with GitHub" for easier integration
4. Once logged in, click "Add new site" → "Import an existing project"
5. Click "GitHub" (authorize Netlify to access your repos if prompted)
6. Search for and select `session-planner`
7. **Build settings** (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`
8. Click "Deploy site"

Your site will be live in 1-2 minutes!

### Option B: Netlify CLI (Advanced)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: session-planner (or custom name)
# - Build command: npm run build
# - Publish directory: dist

# Deploy
netlify deploy --prod
```

## Step 6: Update Your Site

Whenever you make changes:

```bash
# Save your changes in your code editor

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Netlify will automatically rebuild and deploy!
```

## Step 7: Custom Domain (Optional)

1. In Netlify dashboard, click on your site
2. Go to "Domain settings"
3. Click "Add custom domain"
4. Follow instructions to connect your domain

## Troubleshooting

### Issue: "Permission denied (publickey)"
**Solution:** Set up SSH keys or use HTTPS instead:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/session-planner.git
```

### Issue: Build fails on Netlify
**Solution:** Check the deploy log in Netlify dashboard for specific errors

### Issue: Site is blank after deployment
**Solution:** 
1. Check browser console for errors
2. Verify the publish directory is set to `dist`
3. Check that `netlify.toml` is in the repository

## Quick Reference Commands

```bash
# Check git status
git status

# See commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull origin main

# View remote repositories
git remote -v
```

## Project Structure

```
session-planner/
├── src/
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── netlify.toml         # Netlify configuration
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## Next Steps

1. Share your site URL with colleagues
2. Customize the design and features
3. Add analytics (Netlify Analytics available)
4. Set up form submissions if needed
5. Configure environment variables in Netlify for any API keys

## Resources

- [GitHub Documentation](https://docs.github.com)
- [Netlify Documentation](https://docs.netlify.com)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Vite Documentation](https://vitejs.dev)

---

**Your Netlify URL will be:** `https://your-site-name.netlify.app`

You can customize this in Netlify settings!
