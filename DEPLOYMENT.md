# Deploy to Vercel

## Method 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **team-task-manager** (or your choice)
- In which directory is your code located? **./**
- Want to override the settings? **N**

### Step 4: Deploy to Production
```bash
vercel --prod
```

Your app will be live at: `https://team-task-manager.vercel.app` (or your custom domain)

---

## Method 2: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Initialize git and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/team-task-manager.git
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Vite settings
5. Click "Deploy"

That's it! Your app will be live in ~2 minutes.

---

## Method 3: Deploy via Drag & Drop

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Deploy
1. Go to https://vercel.com/new
2. Drag and drop the `dist` folder
3. Your app will be deployed instantly!

---

## Post-Deployment

### Custom Domain (Optional)
1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables
This project doesn't need any environment variables since everything is hardcoded!

### Automatic Deployments
If you used Method 2 (GitHub), every push to main branch will automatically deploy.

---

## Troubleshooting

### Build Fails
- Make sure `package.json` has correct build script
- Check that all dependencies are in `dependencies` not `devDependencies`

### 404 on Refresh
- The `vercel.json` file handles this with rewrites
- Make sure `vercel.json` is in your root directory

### Blank Page
- Check browser console for errors
- Verify build completed successfully
- Check that `dist` folder was created

---

## Your Live App

Once deployed, share these credentials with your team:

**Login Credentials:**
- Saleh: saleh@team.com / saleh123
- Ahmad: ahmad@team.com / ahmad123
- Omar: omar@team.com / omar123

**Note:** Data is stored in browser localStorage, so each user's data is local to their browser.
