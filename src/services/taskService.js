// Hardcoded Railway backend URL - works across all devices!
const API_URL = 'https://newest-to-do-list-production.up.railway.app/api';

// Fallback to localStorage if backend is unavailable
const STORAGE_KEY = 'team_tasks';
const USE_BACKEND = true; // Set to false to use localStorage only

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Follow up with client leads',
    description: 'Contact the 5 new leads from last week',
    assignedTo: ['saleh'],
    priority: 'high',
    status: 'in progress',
    deadline: '2026-03-18',
    createdAt: '2026-03-10T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Prepare Q1 sales report',
    description: 'Compile all sales data and create presentation',
    assignedTo: ['saleh'],
    priority: 'medium',
    status: 'todo',
    deadline: '2026-03-20',
    createdAt: '2026-03-12T09:00:00.000Z',
  },
  {
    id: '3',
    title: 'Update CRM database',
    description: 'Add new contacts and update existing records',
    assignedTo: ['ahmad'],
    priority: 'medium',
    status: 'in progress',
    deadline: '2026-03-17',
    createdAt: '2026-03-11T14:00:00.000Z',
  },
  {
    id: '4',
    title: 'Client presentation prep',
    description: 'Create slides for Thursday client meeting',
    assignedTo: ['omar', 'ahmad'],
    priority: 'high',
    status: 'in progress',
    deadline: '2026-03-16',
    createdAt: '2026-03-15T10:00:00.000Z',
  },
  {
    id: '5',
    title: 'Joint sales strategy meeting',
    description: 'Collaborate on new sales approach for Q2',
    assignedTo: ['omar', 'ahmad', 'saleh'],
    priority: 'high',
    status: 'todo',
    deadline: '2026-03-22',
    createdAt: '2026-03-16T09:00:00.000Z',
  },
];

// Map API response to frontend format
const mapTaskFromAPI = (task) => ({
  id: task.id.toString(),
  title: task.title,
  description: task.description,
  assignedTo: task.assigned_to || [],
  priority: task.priority,
  status: task.status,
  deadline: task.deadline,
  createdAt: task.created_at,
});

// Map frontend format to API format
const mapTaskToAPI = (task) => ({
  title: task.title,
  description: task.description,
  assigned_to: task.assignedTo,
  priority: task.priority,
  status: task.status,
  deadline: task.deadline,
});

// Initialize tasks in localStorage if not exists (fallback)
const initializeTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  }
  return JSON.parse(stored);
};

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error('Backend unavailable');
    const tasks = await response.json();
    return tasks.map(mapTaskFromAPI);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return []; // Return empty array if backend fails
  }
};

export const addTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapTaskToAPI(task)),
    });
    if (!response.ok) throw new Error('Failed to create task');
    const newTask = await response.json();
    notifyTaskUpdate();
    return mapTaskFromAPI(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapTaskToAPI(updates)),
    });
    if (!response.ok) throw new Error('Failed to update task');
    notifyTaskUpdate();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    notifyTaskUpdate();
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const subscribeToTasks = (callback) => {
  // Initial load
  getTasks().then(callback);
  
  // Poll for updates every 5 seconds
  const interval = setInterval(async () => {
    const tasks = await getTasks();
    callback(tasks);
  }, 5000);
  
  // Listen for custom update events
  const handleTaskUpdate = async () => {
    const tasks = await getTasks();
    callback(tasks);
  };

  window.addEventListener('tasksUpdated', handleTaskUpdate);

  return () => {
    clearInterval(interval);
    window.removeEventListener('tasksUpdated', handleTaskUpdate);
  };
};

// Helper to trigger updates
const notifyTaskUpdate = () => {
  window.dispatchEvent(new Event('tasksUpdated'));
};

// Initialize database (for compatibility with App.jsx)
export const initializeDatabase = () => {
  initializeTasks();
};
