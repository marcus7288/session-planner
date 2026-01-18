# 🚀 Quick Start Checklist for Session Planner Deployment

## ✅ Pre-Deployment Checklist

- [ ] Download the `session-planner` folder to your computer
- [ ] Install Node.js (https://nodejs.org) - choose LTS version
- [ ] Install Git (https://git-scm.com/downloads)
- [ ] Create GitHub account (https://github.com)
- [ ] Create Netlify account (https://netlify.com)

## 📝 Step-by-Step Deployment (30 minutes)

### Part 1: Local Setup (5 minutes)

1. **Open Terminal/Command Prompt**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter

2. **Navigate to the project folder**
   ```bash
   cd path/to/session-planner
   ```
   
3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Test locally** (optional but recommended)
   ```bash
   npm run dev
   ```
   - Open browser to `http://localhost:5173`
   - Press `Ctrl + C` to stop when done

### Part 2: GitHub Setup (10 minutes)

5. **Create GitHub repository**
   - Go to https://github.com/new
   - Repository name: `session-planner`
   - Public or Private: Choose one
   - **DO NOT** check any boxes
   - Click "Create repository"

6. **Initialize Git locally**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

7. **Connect to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/session-planner.git
   git branch -M main
   git push -u origin main
   ```
   
   **Replace `YOUR_USERNAME` with your actual GitHub username!**

### Part 3: Netlify Deployment (15 minutes)

8. **Sign up for Netlify**
   - Go to https://app.netlify.com/signup
   - Click "Sign up with GitHub"
   - Authorize Netlify

9. **Deploy your site**
   - Click "Add new site" → "Import an existing project"
   - Click "GitHub"
   - Find and select `session-planner`
   - Verify settings:
     * Build command: `npm run build`
     * Publish directory: `dist`
   - Click "Deploy site"

10. **Wait for deployment** (1-2 minutes)
    - Watch the deploy log
    - When done, you'll see "Published"

11. **Visit your site!**
    - Click the URL (something like `random-name-123.netlify.app`)
    - Bookmark it!

### Part 4: Customize (Optional)

12. **Change site name**
    - In Netlify: Site settings → Site details → Change site name
    - Enter: `your-session-planner` or similar

13. **Add custom domain** (if you have one)
    - Site settings → Domain management → Add custom domain

## 🔄 Making Updates Later

Whenever you want to update your site:

```bash
# 1. Make changes to your code
# 2. Save all files
# 3. In terminal:
git add .
git commit -m "Describe what you changed"
git push
```

Netlify will automatically rebuild and deploy! (takes 1-2 minutes)

## 🆘 Troubleshooting

**"Command not found: npm"**
→ Install Node.js from https://nodejs.org

**"Command not found: git"**
→ Install Git from https://git-scm.com

**"Permission denied" when pushing to GitHub**
→ Make sure you're logged into GitHub in your browser
→ Try: `git remote set-url origin https://github.com/YOUR_USERNAME/session-planner.git`

**Site is blank on Netlify**
→ Check: Site settings → Build & deploy → Make sure publish directory is `dist`
→ Check: Deploy log for errors

**Build failed on Netlify**
→ Click on the failed deploy
→ Read the error message
→ Usually it's a missing dependency or typo

## 📧 Need Help?

1. Check the full `DEPLOYMENT_GUIDE.md` for detailed explanations
2. Check Netlify deploy logs for specific errors
3. Search the error message on Google
4. Ask on GitHub Discussions or Stack Overflow

## 🎉 Success!

Once deployed, you can:
- Share the URL with colleagues
- Use it for class planning
- Update it anytime by pushing to GitHub
- Access it from anywhere

**Your site URL:** `https://your-site-name.netlify.app`

---

**Estimated total time:** 30 minutes
**Cost:** $0 (completely free!)
