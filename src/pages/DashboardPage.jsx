import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { isPast } from 'date-fns';
import { CheckCircle, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import { useTaskActions } from '../hooks/useTaskActions';
import { subscribeToTasks } from '../services/taskService';

export const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const { editTask, deleteTask, toggleComplete } = useTaskActions();

  useEffect(() => {
    const unsubscribe = subscribeToTasks(setTasks);
    return unsubscribe;
  }, []);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    pending: tasks.filter((t) => t.status !== 'completed').length,
    overdue: tasks.filter((t) => isPast(new Date(t.deadline)) && t.status !== 'completed').length,
  };

  const statCards = [
    { label: 'Total Tasks', value: stats.total, icon: ListTodo, color: 'from-blue-500 to-cyan-500' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-yellow-500 to-orange-500' },
    { label: 'Overdue', value: stats.overdue, icon: AlertCircle, color: 'from-red-500 to-pink-500' },
  ];

  const userTasks = {
    saleh: tasks.filter((t) => {
      const assigned = Array.isArray(t.assignedTo) ? t.assignedTo : [t.assignedTo];
      return assigned.includes('saleh');
    }),
    ahmad: tasks.filter((t) => {
      const assigned = Array.isArray(t.assignedTo) ? t.assignedTo : [t.assignedTo];
      return assigned.includes('ahmad');
    }),
    omar: tasks.filter((t) => {
      const assigned = Array.isArray(t.assignedTo) ? t.assignedTo : [t.assignedTo];
      return assigned.includes('omar');
    }),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(userTasks).map(([user, userTaskList]) => {
          const completed = userTaskList.filter((t) => t.status === 'completed').length;
          const progress = userTaskList.length > 0 ? (completed / userTaskList.length) * 100 : 0;

          return (
            <motion.div
              key={user}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-6 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lol-cyan to-lol-purple flex items-center justify-center font-bold text-lg">
                  {user[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold capitalize">{user}</h3>
                  <p className="text-sm text-gray-400">{userTaskList.length} tasks</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-lol-blue/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="bg-gradient-to-r from-lol-cyan to-lol-purple h-2 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {userTaskList.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={editTask}
                    onDelete={deleteTask}
                    onToggle={toggleComplete}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
