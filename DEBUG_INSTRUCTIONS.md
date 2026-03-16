# Debug Instructions - Why Tasks Don't Show

## Test the Backend Connection

### Step 1: Test Backend API Directly

Open this URL in your browser:
```
https://newest-to-do-list-production.up.railway.app/api/tasks
```

**What you should see:**
- If working: A JSON array with tasks `[{...}, {...}]`
- If empty database: An empty array `[]`
- If broken: An error message

### Step 2: Check Browser Console for Errors

On any device (PC or phone):
1. Open the app
2. Press `F12` (or long-press and "Inspect" on mobile)
3. Go to "Console" tab
4. Look for red error messages
5. Take a screenshot and share it

### Step 3: Test Creating a Task

1. Open browser console (`F12`)
2. Paste this code and press Enter:
```javascript
fetch('https://newest-to-do-list-production.up.railway.app/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Task',
    description: 'Testing backend connection',
    assigned_to: ['saleh'],
    priority: 'high',
    status: 'todo',
    deadline: '2026-03-25'
  })
})
.then(r => r.json())
.then(d => console.log('Created:', d))
.catch(e => console.error('Error:', e))
```

3. Check if it says "Created: {...}" or shows an error

## Common Issues:

### Issue 1: Database is Empty
**Solution:** The database needs to be seeded with initial tasks.

### Issue 2: CORS Error
**Symptom:** Console shows "CORS policy" error
**Solution:** Backend CORS is already configured, but Railway might need restart

### Issue 3: Backend Not Running
**Symptom:** "Failed to fetch" or "Network error"
**Solution:** Check Railway dashboard - backend service should be "Active"

### Issue 4: Wrong API URL
**Symptom:** 404 errors
**Solution:** Verify the URL is exactly: `https://newest-to-do-list-production.up.railway.app/api/tasks`

## Quick Fix - Seed Database Manually

If database is empty, run this in browser console on ANY device:

```javascript
const tasks = [
  {
    title: 'Follow up with client leads',
    description: 'Contact the 5 new leads from last week',
    assigned_to: ['saleh'],
    priority: 'high',
    status: 'in progress',
    deadline: '2026-03-18'
  },
  {
    title: 'Client presentation prep',
    description: 'Create slides for Thursday client meeting',
    assigned_to: ['omar', 'ahmad'],
    priority: 'high',
    status: 'in progress',
    deadline: '2026-03-16'
  }
];

tasks.forEach(task => {
  fetch('https://newest-to-do-list-production.up.railway.app/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(r => r.json()).then(d => console.log('Added:', d.title));
});
```

Then refresh the page - tasks should appear!

## Report Back

After testing, tell me:
1. What does `/api/tasks` URL show?
2. Any errors in console?
3. Did the manual seed work?
