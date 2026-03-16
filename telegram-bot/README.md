# Task Manager Telegram Bot

A Telegram bot to manage tasks for Saleh, Ahmad, and Omar.

## Features

- ✅ Quick task creation (just type your task)
- ✅ Detailed task creation with /newtask
- ✅ View your tasks with /mytasks
- ✅ View all team tasks with /alltasks
- ✅ Auto-detect priority, deadlines, and assignments
- ✅ Natural language support

## Setup

### 1. Create Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Choose a name: `Task Manager Bot`
4. Choose a username: `YourTeamTaskBot` (must end with 'bot')
5. Copy the bot token

### 2. Configure Environment

Create `.env` file:
```
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
API_URL=https://kind-insight-production.up.railway.app/api
```

### 3. Run Locally (Test)

```bash
cd telegram-bot
npm install
npm start
```

### 4. Deploy to Railway

1. Go to Railway dashboard
2. Click "New" → "GitHub Repo"
3. Select your repository
4. Set **Root Directory** to `telegram-bot`
5. Add environment variables:
   - `TELEGRAM_BOT_TOKEN`: Your bot token
   - `API_URL`: `https://kind-insight-production.up.railway.app/api`
6. Deploy!

## Usage

### Quick Add (Natural Language)
Just type your task:
- "Call client tomorrow"
- "Prepare report by Friday high priority"
- "Meeting with @ahmad and @omar"

### Commands

- `/start` - Welcome message
- `/newtask` - Create detailed task (step-by-step)
- `/mytasks` - View your tasks
- `/alltasks` - View all team tasks
- `/help` - Show help

### Examples

**Quick add:**
```
Follow up with client by tomorrow
```

**With priority:**
```
Urgent: Send proposal to ABC Corp
```

**Assign to others:**
```
@ahmad please review the document
```

**Detailed task:**
```
/newtask
→ Title: Prepare Q1 report
→ Description: Include sales data and projections
→ Assign: saleh
→ Priority: high
→ Deadline: 2026-03-25
```

## Authorized Users

Only these Telegram usernames can use the bot:
- @saleh
- @ahmad
- @omar

To add more users, edit `AUTHORIZED_USERS` in `bot.js`.

## Features

✅ Natural language task creation
✅ Auto-detect deadlines (today, tomorrow, Friday, dates)
✅ Auto-detect priority (high, medium, low)
✅ Auto-detect assignments (@username)
✅ View personal and team tasks
✅ Secure (only authorized users)
✅ Connected to your existing backend
