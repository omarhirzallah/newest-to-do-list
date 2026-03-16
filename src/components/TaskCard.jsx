import { motion } from 'framer-motion';
import { Calendar, User, AlertCircle, Trash2, Edit } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';

export const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  const isOverdue = isPast(new Date(task.deadline)) && task.status !== 'completed';
  const isDueToday = isToday(new Date(task.deadline));

  const priorityColors = {
    low: 'border-green-500/50 bg-green-500/10',
    medium: 'border-yellow-500/50 bg-yellow-500/10',
    high: 'border-red-500/50 bg-red-500/10',
  };

  const statusColors = {
    todo: 'bg-gray-500',
    'in progress': 'bg-blue-500',
    completed: 'bg-green-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(11, 197, 234, 0.3)' }}
      className={`glass-panel p-4 rounded-lg border-2 ${
        isOverdue ? 'border-red-500 shadow-glow-gold' : priorityColors[task.priority]
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} className="text-lol-cyan hover:text-lol-gold transition-colors">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(task.id)} className="text-red-400 hover:text-red-600 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-3">{task.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded text-xs ${statusColors[task.status]} text-white`}>
          {task.status}
        </span>
        <span className="px-2 py-1 rounded text-xs bg-lol-purple/30 text-lol-purple">
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-1 flex-wrap">
          <User size={14} />
          <span className="capitalize">
            {Array.isArray(task.assignedTo) 
              ? task.assignedTo.join(', ') 
              : task.assignedTo}
          </span>
        </div>
        <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : isDueToday ? 'text-yellow-400' : ''}`}>
          {isOverdue && <AlertCircle size={14} />}
          <Calendar size={14} />
          <span>{format(new Date(task.deadline), 'MMM dd')}</span>
        </div>
      </div>

      {task.status !== 'completed' && (
        <button
          onClick={() => onToggle(task.id)}
          className="mt-3 w-full py-2 bg-lol-cyan/20 hover:bg-lol-cyan/30 rounded text-lol-cyan transition-all"
        >
          Mark Complete
        </button>
      )}
    </motion.div>
  );
};
