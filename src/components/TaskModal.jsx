import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

export const TaskModal = ({ isOpen, onClose, onSave, task = null }) => {
  const [formData, setFormData] = useState(
    task || {
      title: '',
      description: '',
      assignedTo: ['saleh'],
      priority: 'medium',
      status: 'todo',
      deadline: '',
    }
  );

  const toggleUser = (user) => {
    const currentAssigned = Array.isArray(formData.assignedTo) ? formData.assignedTo : [formData.assignedTo];
    if (currentAssigned.includes(user)) {
      const updated = currentAssigned.filter((u) => u !== user);
      setFormData({ ...formData, assignedTo: updated.length > 0 ? updated : [user] });
    } else {
      setFormData({ ...formData, assignedTo: [...currentAssigned, user] });
    }
  };

  const isUserAssigned = (user) => {
    const assigned = Array.isArray(formData.assignedTo) ? formData.assignedTo : [formData.assignedTo];
    return assigned.includes(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-panel p-6 rounded-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold glow-text">{task ? 'Edit Task' : 'New Task'}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-lol-blue/50 border border-lol-cyan/30 rounded-lg focus:outline-none focus:border-lol-cyan"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-lol-blue/50 border border-lol-cyan/30 rounded-lg focus:outline-none focus:border-lol-cyan h-24"
              />

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Assign To (select one or more)</label>
                <div className="flex flex-wrap gap-2">
                  {['saleh', 'ahmad', 'omar'].map((user) => (
                    <button
                      key={user}
                      type="button"
                      onClick={() => toggleUser(user)}
                      className={`px-4 py-2 rounded-lg capitalize transition-all ${
                        isUserAssigned(user)
                          ? 'bg-gradient-to-r from-lol-cyan to-lol-purple text-white shadow-glow-cyan'
                          : 'bg-lol-blue/50 border border-lol-cyan/30 text-gray-300 hover:border-lol-cyan'
                      }`}
                    >
                      {user}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="px-4 py-2 bg-lol-blue/50 border border-lol-cyan/30 rounded-lg focus:outline-none focus:border-lol-cyan"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-4 py-2 bg-lol-blue/50 border border-lol-cyan/30 rounded-lg focus:outline-none focus:border-lol-cyan"
                >
                  <option value="todo">To Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-4 py-2 bg-lol-blue/50 border border-lol-cyan/30 rounded-lg focus:outline-none focus:border-lol-cyan"
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-lol-cyan to-lol-purple rounded-lg font-semibold hover:shadow-glow-cyan transition-all"
              >
                {task ? 'Update Task' : 'Create Task'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
