import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TaskCard } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';
import { useTaskActions } from '../hooks/useTaskActions';
import { subscribeToTasks } from '../services/taskService';
import { Plus } from 'lucide-react';

export const MyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const { isModalOpen, setIsModalOpen, editingTask, setEditingTask, editTask, deleteTask, toggleComplete, saveTask } = useTaskActions();

  useEffect(() => {
    const unsubscribe = subscribeToTasks((allTasks) => {
      const userTasks = allTasks.filter((t) => {
        const assigned = Array.isArray(t.assignedTo) ? t.assignedTo : [t.assignedTo];
        return assigned.includes(currentUser.username);
      });
      setTasks(userTasks);
    });
    return unsubscribe;
  }, [currentUser]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold glow-text">My Tasks</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={editTask}
            onDelete={deleteTask}
            onToggle={toggleComplete}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No tasks assigned to you yet</p>
        </div>
      )}

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
