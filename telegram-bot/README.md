# Task Manager Telegram Bot

A Telegram bot to manage tasks for Saleh, Ahmad, and Omar.

## ✅ Everything is Hardcoded - No Setup Needed!

Bot Token: `8553890523:AAE-kpeYfUPq-AgnLNKIBuVzLA8Wj3syZcE`
Backend: `https://kind-insight-production.up.railway.app/api`

## 🚀 Quick Deploy to Railway

1. Go to Railway dashboard
2. Click **"New"** → **"GitHub Repo"**
3. Select your repository: `omarhirzallah/newest-to-do-list`
4. Set **Root Directory** to: `telegram-bot`
5. Click **Deploy**

That's it! No environment variables needed.

## 📱 Start Using

1. Open Telegram
2. Search for your bot (the name you gave to @BotFather)
3. Send `/start`

## Features

✅ Quick task creation - just type your task
✅ Natural language support
✅ Auto-detect priority, deadlines
✅ View your tasks with /mytasks
✅ View all team tasks with /alltasks
✅ Secure - only authorized Telegram users

## Commands

- `/start` - Welcome message
- `/newtask` - Create detailed task
- `/mytasks` - View your tasks
- `/alltasks` - View all team tasks
- `/help` - Show help

## Quick Add Examples

Just type naturally:
- "Call client tomorrow"
- "Prepare report by Friday high priority"
- "Meeting with team"

## Authorized Users

Only these Telegram usernames can use the bot. To add/change users, edit line 10 in `bot.js`:

```javascript
const AUTHORIZED_USERS = ['saleh', 'ahmad', 'omar'];
```

Replace with actual Telegram usernames (without @).

