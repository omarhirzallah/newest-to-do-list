import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Users, Calendar, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const { logout } = useAuth();

  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/my-tasks', icon: CheckSquare, label: 'My Tasks' },
    { to: '/team', icon: Users, label: 'Team Board' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-20 lg:w-64 glass-panel min-h-screen p-4 flex flex-col"
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold glow-text hidden lg:block">Task Manager</h1>
        <div className="w-12 h-12 mx-auto lg:hidden bg-lol-cyan/20 rounded-lg flex items-center justify-center">
          <span className="text-lol-cyan font-bold">TM</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-lol-cyan/20 text-lol-cyan shadow-glow-cyan'
                  : 'hover:bg-lol-blue/50 text-gray-300'
              }`
            }
          >
            <Icon size={20} />
            <span className="hidden lg:block">{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-all"
      >
        <LogOut size={20} />
        <span className="hidden lg:block">Logout</span>
      </button>
    </motion.aside>
  );
};
