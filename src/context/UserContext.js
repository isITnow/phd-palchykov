import { createContext, useContext, useState, useEffect } from 'react';

const initValue = JSON.parse(localStorage.getItem('auth'))?.user || null;

const UserContext = createContext(initValue);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initValue);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('auth'))?.user;
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context == null) {
    throw new Error('Make sure to wrap the user inside provider');
  }

  return context;
};

export default UserContextProvider;
