import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedAuth = JSON.parse(localStorage.getItem('auth'));
      return storedAuth?.user || null;
    } catch (error) {
      console.error('Error parsing auth from localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'auth') {
        const newAuth = event.newValue ? JSON.parse(event.newValue) : null;
        setUser(newAuth?.user || null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateUser = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};

export default UserContextProvider;
