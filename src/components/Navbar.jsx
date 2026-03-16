import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Bell } from 'lucide-react';

export const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel p-4 flex items-center justify-between"
    >
      <div>
        <h2 className="text-xl font-semibold">Welcome, {currentUser?.username}</h2>
        <p className="text-sm text-gray-400">Manage your team tasks</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-lol-blue/50 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lol-cyan to-lol-purple flex items-center justify-center font-bold">
          {currentUser?.username?.[0].toUpperCase()}
        </div>
      </div>
    </motion.nav>
  );
};
