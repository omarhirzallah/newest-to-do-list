import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Particles } from '../components/Particles';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials or unauthorized user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Particles />
      
      <div className="absolute inset-0 bg-gradient-to-br from-lol-dark via-lol-blue to-lol-dark opacity-50"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 rounded-2xl w-full max-w-md relative z-10"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-center mb-2 glow-text"
        >
          Task Manager
        </motion.h1>
        <p className="text-center text-gray-400 mb-8">Team Portal</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-lol-blue/50 border border-lol-cyan/30 rounded-lg focus:outline-none focus:border-lol-cyan focus:shadow-glow-cyan transition-all"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-lol-blue/50 border border-lol-cyan/30 rounded-lg focus:outline-none focus:border-lol-cyan focus:shadow-glow-cyan transition-all"
            required
          />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-lol-cyan to-lol-purple rounded-lg font-semibold hover:shadow-glow-cyan transition-all disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Enter'}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Authorized Users Only</p>
          <p className="text-xs mt-2">Saleh • Ahmad • Omar</p>
        </div>
      </motion.div>
    </div>
  );
};
