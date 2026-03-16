// Hardcoded task data with localStorage persistence

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
    title: 'Schedule team meeting',
    description: 'Organize weekly sync meeting for next Monday',
    assignedTo: ['ahmad'],
    priority: 'low',
    status: 'completed',
    deadline: '2026-03-15',
    createdAt: '2026-03-13T11:00:00.000Z',
  },
  {
    id: '5',
    title: 'Review pricing strategy',
    description: 'Analyze competitor pricing and adjust our rates',
    assignedTo: ['omar'],
    priority: 'high',
    status: 'todo',
    deadline: '2026-03-19',
    createdAt: '2026-03-14T08:00:00.000Z',
  },
  {
    id: '6',
    title: 'Client presentation prep',
    description: 'Create slides for Thursday client meeting',
    assignedTo: ['omar', 'ahmad'],
    priority: 'high',
    status: 'in progress',
    deadline: '2026-03-16',
    createdAt: '2026-03-15T10:00:00.000Z',
  },
  {
    id: '7',
    title: 'Send proposal to ABC Corp',
    description: 'Finalize and send the proposal document',
    assignedTo: ['saleh'],
    priority: 'high',
    status: 'todo',
    deadline: '2026-03-14',
    createdAt: '2026-03-10T15:00:00.000Z',
  },
  {
    id: '8',
    title: 'Update product catalog',
    description: 'Add new products and remove discontinued items',
    assignedTo: ['ahmad'],
    priority: 'low',
    status: 'todo',
    deadline: '2026-03-25',
    createdAt: '2026-03-12T16:00:00.000Z',
  },
  {
    id: '9',
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

export const getTasks = () => {
  return initializeTasks();
};

export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return newTask;
};

export const updateTask = (taskId, updates) => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
};

export const deleteTask = (taskId) => {
  const tasks = getTasks();
  const filtered = tasks.filter((t) => t.id !== taskId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const subscribeToTasks = (callback) => {
  callback(getTasks());
  
  const interval = setInterval(() => {
    callback(getTasks());
  }, 1000);

  return () => clearInterval(interval);
};
