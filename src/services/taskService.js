// Temporary localStorage solution until backend is deployed
// This will work on single device until you configure Railway backend

const STORAGE_KEY = 'team_tasks';

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

// Initialize tasks in localStorage if not exists
const initializeTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  }
  return JSON.parse(stored);
};

export const getTasks = async () => {
  return Promise.resolve(initializeTasks());
};

export const addTask = async (task) => {
  const tasks = initializeTasks();
  const newTask = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  notifyTaskUpdate();
  return newTask;
};

export const updateTask = async (taskId, updates) => {
  const tasks = initializeTasks();
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    notifyTaskUpdate();
  }
};

export const deleteTask = async (taskId) => {
  const tasks = initializeTasks();
  const filtered = tasks.filter((t) => t.id !== taskId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  notifyTaskUpdate();
};

export const subscribeToTasks = (callback) => {
  // Initial load
  getTasks().then(callback);
  
  // Listen for custom update events
  const handleTaskUpdate = async () => {
    const tasks = await getTasks();
    callback(tasks);
  };

  window.addEventListener('tasksUpdated', handleTaskUpdate);

  return () => {
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
