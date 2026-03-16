# Deploy Frontend to Railway

Your frontend is now configured to deploy on Railway!

## Quick Deploy Steps:

### 1. Create New Service in Railway

1. Go to your Railway dashboard: https://railway.app/dashboard
2. Open your existing project (where Postgres and backend are)
3. Click "New" → "GitHub Repo"
4. Select: `omarhirzallah/newest-to-do-list`
5. Railway will detect it's a Node.js project

### 2. Configure the Service

Railway will auto-detect the configuration from `railway.json`, but verify:

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npx serve -s dist -p $PORT`
- **Root Directory**: `/` (leave empty or set to root)

### 3. Generate Domain

1. Go to Settings → Networking
2. Click "Generate Domain"
3. You'll get a URL like: `https://newest-to-do-list-frontend.up.railway.app`

### 4. Done!

Your app is live! Share the URL with your team:

**Login Credentials:**
- Saleh: saleh@team.com / saleh123
- Ahmad: ahmad@team.com / ahmad123
- Omar: omar@team.com / omar123

## Your Railway Project Structure:

```
Railway Project
├── Postgres (Database)
├── newest-to-do-list (Backend API)
└── newest-to-do-list (Frontend) ← New service
```

## Automatic Deployments

Every time you push to GitHub, Railway will automatically:
1. Build your frontend
2. Deploy the new version
3. Your app updates in ~2 minutes

## Troubleshooting

### Build fails?
- Check logs in Railway dashboard
- Ensure `serve` is in devDependencies

### Can't connect to backend?
- Backend URL is hardcoded: `https://newest-to-do-list-production.up.railway.app/api`
- Make sure backend service is running

### Port issues?
- Railway automatically sets `$PORT` environment variable
- The serve command uses it: `-p $PORT`
