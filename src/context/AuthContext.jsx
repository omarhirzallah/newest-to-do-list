import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const HARDCODED_USERS = {
  'saleh@team.com': { password: 'saleh123', username: 'saleh' },
  'ahmad@team.com': { password: 'ahmad123', username: 'ahmad' },
  'omar@team.com': { password: 'omar123', username: 'omar' },
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const user = HARDCODED_USERS[email];
    if (user && user.password === password) {
      const userData = { email, username: user.username };
      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid credentials'));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
