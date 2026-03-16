import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';

// Hardcoded configuration - no setup needed!
const BOT_TOKEN = '8553890523:AAE-kpeYfUPq-AgnLNKIBuVzLA8Wj3syZcE';
const API_URL = 'https://kind-insight-production.up.railway.app/api';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Authorized users (Telegram usernames)
const AUTHORIZED_USERS = ['saleh', 'ahmad', 'omar'];

// User state for multi-step task creation
const userStates = {};

// Check if user is authorized
const isAuthorized = (username) => {
  return AUTHORIZED_USERS.includes(username?.toLowerCase());
};

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  if (!isAuthorized(username)) {
    bot.sendMessage(chatId, '❌ Unauthorized. Only Saleh, Ahmad, and Omar can use this bot.');
    return;
  }

  const welcomeMessage = `
🎮 Welcome to Task Manager Bot!

Commands:
/newtask - Create a new task
/mytasks - View your tasks
/alltasks - View all team tasks
/help - Show this message

Quick add: Just type your task and I'll create it!
Example: "Follow up with client by Friday"
  `;

  bot.sendMessage(chatId, welcomeMessage);
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
📋 Task Manager Bot Commands:

/newtask - Create a detailed task
/mytasks - View your tasks
/alltasks - View all team tasks
/help - Show this help

Quick Add:
Just type your task naturally:
• "Call client tomorrow"
• "Prepare report by Friday high priority"
• "Meeting with team"

I'll automatically detect:
✅ Deadlines (today, tomorrow, Friday, dates)
✅ Priority (high, medium, low)
✅ Assignments (@saleh, @ahmad, @omar)
  `);
});

// New task command (detailed)
bot.onText(/\/newtask/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  if (!isAuthorized(username)) {
    bot.sendMessage(chatId, '❌ Unauthorized.');
    return;
  }

  userStates[chatId] = { step: 'title' };
  bot.sendMessage(chatId, '📝 What\'s the task title?');
});

// My tasks command
bot.onText(/\/mytasks/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username?.toLowerCase();

  if (!isAuthorized(username)) {
    bot.sendMessage(chatId, '❌ Unauthorized.');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();
    
    const myTasks = tasks.filter(t => t.assigned_to.includes(username));

    if (myTasks.length === 0) {
      bot.sendMessage(chatId, '📭 You have no tasks assigned.');
      return;
    }

    let message = `📋 Your Tasks (${myTasks.length}):\n\n`;
    
    myTasks.forEach((task, i) => {
      const status = task.status === 'completed' ? '✅' : task.status === 'in progress' ? '🔄' : '⏳';
      const priority = task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢';
      message += `${i + 1}. ${status} ${priority} ${task.title}\n`;
      message += `   📅 ${task.deadline}\n`;
      message += `   Status: ${task.status}\n\n`;
    });

    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, '❌ Error fetching tasks.');
  }
});

// All tasks command
bot.onText(/\/alltasks/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  if (!isAuthorized(username)) {
    bot.sendMessage(chatId, '❌ Unauthorized.');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();

    if (tasks.length === 0) {
      bot.sendMessage(chatId, '📭 No tasks yet.');
      return;
    }

    let message = `📋 All Team Tasks (${tasks.length}):\n\n`;
    
    ['saleh', 'ahmad', 'omar'].forEach(user => {
      const userTasks = tasks.filter(t => t.assigned_to.includes(user));
      if (userTasks.length > 0) {
        message += `👤 ${user.toUpperCase()} (${userTasks.length}):\n`;
        userTasks.slice(0, 3).forEach(task => {
          const status = task.status === 'completed' ? '✅' : '⏳';
          message += `  ${status} ${task.title}\n`;
        });
        message += '\n';
      }
    });

    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, '❌ Error fetching tasks.');
  }
});

// Handle regular messages (quick task creation)
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const username = msg.from.username?.toLowerCase();

  // Skip if it's a command
  if (text?.startsWith('/')) return;

  if (!isAuthorized(username)) {
    bot.sendMessage(chatId, '❌ Unauthorized.');
    return;
  }

  // Handle multi-step task creation
  if (userStates[chatId]) {
    await handleTaskCreationStep(chatId, text, username);
    return;
  }

  // Quick task creation from natural language
  await createQuickTask(chatId, text, username);
});

// Handle multi-step task creation
async function handleTaskCreationStep(chatId, text, username) {
  const state = userStates[chatId];

  if (state.step === 'title') {
    state.title = text;
    state.step = 'description';
    bot.sendMessage(chatId, '📄 Task description? (or type "skip")');
  } else if (state.step === 'description') {
    state.description = text === 'skip' ? '' : text;
    state.step = 'assign';
    bot.sendMessage(chatId, '👤 Assign to? (saleh/ahmad/omar or "me")');
  } else if (state.step === 'assign') {
    const assignTo = text.toLowerCase() === 'me' ? username : text.toLowerCase();
    state.assignedTo = [assignTo];
    state.step = 'priority';
    bot.sendMessage(chatId, '🎯 Priority? (high/medium/low)');
  } else if (state.step === 'priority') {
    state.priority = text.toLowerCase();
    state.step = 'deadline';
    bot.sendMessage(chatId, '📅 Deadline? (YYYY-MM-DD or "today"/"tomorrow")');
  } else if (state.step === 'deadline') {
    state.deadline = parseDeadline(text);
    
    // Create the task
    await createTask(chatId, state);
    delete userStates[chatId];
  }
}

// Quick task creation from natural language
async function createQuickTask(chatId, text, username) {
  const task = {
    title: text,
    description: '',
    assigned_to: [username],
    priority: detectPriority(text),
    status: 'todo',
    deadline: detectDeadline(text) || getTomorrow(),
  };

  // Detect assignments
  const mentions = text.match(/@(saleh|ahmad|omar)/gi);
  if (mentions) {
    task.assigned_to = mentions.map(m => m.substring(1).toLowerCase());
  }

  await createTask(chatId, task);
}

// Create task via API
async function createTask(chatId, taskData) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      bot.sendMessage(chatId, `✅ Task created!\n\n📝 ${taskData.title}\n📅 ${taskData.deadline}\n👤 ${taskData.assigned_to.join(', ')}`);
    } else {
      bot.sendMessage(chatId, '❌ Failed to create task.');
    }
  } catch (error) {
    bot.sendMessage(chatId, '❌ Error creating task.');
  }
}

// Helper functions
function detectPriority(text) {
  if (/high|urgent|important|asap/i.test(text)) return 'high';
  if (/low|minor/i.test(text)) return 'low';
  return 'medium';
}

function detectDeadline(text) {
  if (/today/i.test(text)) return getToday();
  if (/tomorrow/i.test(text)) return getTomorrow();
  if (/friday/i.test(text)) return getNextFriday();
  
  // Try to match YYYY-MM-DD format
  const dateMatch = text.match(/\d{4}-\d{2}-\d{2}/);
  if (dateMatch) return dateMatch[0];
  
  return null;
}

function parseDeadline(text) {
  if (text.toLowerCase() === 'today') return getToday();
  if (text.toLowerCase() === 'tomorrow') return getTomorrow();
  return text; // Assume it's already in YYYY-MM-DD format
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

function getNextFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
  const friday = new Date(today);
  friday.setDate(today.getDate() + daysUntilFriday);
  return friday.toISOString().split('T')[0];
}

console.log('🤖 Telegram bot is running...');
