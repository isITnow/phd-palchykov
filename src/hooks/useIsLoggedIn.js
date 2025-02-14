import { useUser } from '@/context/UserContext';

const useIsLoggedIn = () => {
  const { user } = useUser();

  return Boolean(user);
};

export default useIsLoggedIn;
