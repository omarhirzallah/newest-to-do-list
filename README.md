# Team Task Manager - League of Legends Inspired

A secure, private task management web app for a 3-person sales team with League of Legends-inspired aesthetics.

## Features

- Hardcoded authentication (Saleh, Ahmad, Omar only)
- Real-time task management with localStorage
- Team dashboard with progress tracking
- Calendar view with deadline tracking
- Overdue task highlighting
- Dark fantasy UI with animations
- Mobile responsive
- No backend setup required - works immediately!

## Tech Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Framer Motion
- Lucide Icons
- date-fns
- localStorage for data persistence

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

That's it! No Firebase, no backend setup needed.

## Login Credentials

Use these hardcoded credentials to login:

- **Saleh:** saleh@team.com / saleh123
- **Ahmad:** ahmad@team.com / ahmad123
- **Omar:** omar@team.com / omar123

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── context/         # React context (Auth)
├── hooks/           # Custom hooks
├── services/        # Task service with localStorage
└── App.jsx          # Main app with routing
```

## Data Storage

- All data stored in browser localStorage
- 8 sample tasks included by default
- Data persists across sessions
- No backend or database required

## Security

- Only 3 hardcoded users can access
- Protected routes require authentication
- No public signup available
- Perfect for small private teams

## Pages

- **Login** - Animated login with validation
- **Dashboard** - Team overview with stats and 3-column board
- **My Tasks** - Personal task list
- **Team Board** - All tasks organized by user
- **Calendar** - Deadline tracking with overdue alerts

## Deploy to Vercel

Your project is ready to deploy! Choose one of these methods:

### Method 1: Vercel CLI (Fastest)
```bash
npm install -g vercel
vercel login
vercel
```

### Method 2: GitHub + Vercel Dashboard
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Method 3: Drag & Drop
1. The `dist` folder is already built
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag the `dist` folder
4. Done!

📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions.
