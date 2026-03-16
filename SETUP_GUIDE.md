# Quick Setup Guide

## Installation

```bash
npm install
npm run dev
```

That's it! No backend, no database, no configuration needed.

## Login Credentials

Use these hardcoded credentials:

- **Saleh:** saleh@team.com / saleh123
- **Ahmad:** ahmad@team.com / ahmad123
- **Omar:** omar@team.com / omar123

## Features

- 8 sample tasks pre-loaded
- Data persists in browser localStorage
- Real-time updates across all pages
- No internet connection required after initial load

## Sample Data Included

The app comes with 8 pre-configured tasks:
- 3 tasks for Saleh (including 1 overdue)
- 3 tasks for Ahmad (including 1 completed)
- 2 tasks for Omar

## Resetting Data

To reset to default tasks, open browser console and run:
```javascript
localStorage.removeItem('team_tasks');
```
Then refresh the page.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy to any static hosting service.
