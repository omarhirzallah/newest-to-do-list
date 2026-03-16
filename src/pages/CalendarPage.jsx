import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { format, isPast, isToday, isTomorrow, parseISO } from 'date-fns';
import { Calendar, AlertCircle } from 'lucide-react';
import { subscribeToTasks } from '../services/taskService';

export const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((allTasks) => {
      const sorted = [...allTasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      setTasks(sorted);
    });
    return unsubscribe;
  }, []);

  const categorizedTasks = {
    overdue: tasks.filter((t) => isPast(parseISO(t.deadline)) && t.status !== 'completed'),
    today: tasks.filter((t) => isToday(parseISO(t.deadline))),
    tomorrow: tasks.filter((t) => isTomorrow(parseISO(t.deadline))),
    upcoming: tasks.filter((t) => {
      const date = parseISO(t.deadline);
      return !isPast(date) && !isToday(date) && !isTomorrow(date);
    }),
  };

  const Section = ({ title, tasks, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-xl"
    >
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${color}`}>
        {title === 'Overdue' && <AlertCircle size={20} />}
        {title}
        <span className="ml-auto text-sm">({tasks.length})</span>
      </h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-lol-blue/30 p-4 rounded-lg border border-lol-cyan/20">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{task.title}</h3>
              <span className="text-xs px-2 py-1 bg-lol-purple/30 rounded capitalize">{task.priority}</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{task.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span className="capitalize">
                {Array.isArray(task.assignedTo) 
                  ? task.assignedTo.join(', ') 
                  : task.assignedTo}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {format(parseISO(task.deadline), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p className="text-center text-gray-400 py-4">No tasks</p>}
      </div>
    </motion.div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold glow-text mb-6">Calendar & Deadlines</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Overdue" tasks={categorizedTasks.overdue} color="text-red-400" />
        <Section title="Due Today" tasks={categorizedTasks.today} color="text-yellow-400" />
        <Section title="Due Tomorrow" tasks={categorizedTasks.tomorrow} color="text-orange-400" />
        <Section title="Upcoming" tasks={categorizedTasks.upcoming} color="text-lol-cyan" />
      </div>
    </div>
  );
};
