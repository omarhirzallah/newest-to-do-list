import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TaskCard } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';
import { useTaskActions } from '../hooks/useTaskActions';
import { subscribeToTasks } from '../services/taskService';
import { Plus } from 'lucide-react';

export const TeamBoardPage = () => {
  const [tasks, setTasks] = useState([]);
  const { isModalOpen, setIsModalOpen, editingTask, setEditingTask, editTask, deleteTask, toggleComplete, saveTask } = useTaskActions();

  useEffect(() => {
    const unsubscribe = subscribeToTasks(setTasks);
    return unsubscribe;
  }, []);

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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold glow-text">Team Board</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lol-cyan to-lol-purple rounded-lg hover:shadow-glow-cyan"
        >
          <Plus size={20} />
          New Task
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(userTasks).map(([user, userTaskList]) => (
          <motion.div
            key={user}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lol-cyan to-lol-purple flex items-center justify-center font-bold">
                {user[0].toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold capitalize">{user}</h2>
              <span className="ml-auto text-sm text-gray-400">{userTaskList.length}</span>
            </div>

            <div className="space-y-3">
              {userTaskList.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={editTask}
                  onDelete={deleteTask}
                  onToggle={toggleComplete}
                />
              ))}
              {userTaskList.length === 0 && (
                <p className="text-center text-gray-400 py-8">No tasks</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={saveTask}
        task={editingTask}
      />
    </div>
  );
};
