import { CiLogin, CiLogout } from 'react-icons/ci';

import useAuth from './hooks/useAuth';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

import AuthForm from './AuthForm';
import AuthModal from './AuthModal';

const Auth = () => {
  const { modalShow, logout, setModalShow } = useAuth();
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      {isLoggedIn ? (
        <CiLogout
          className="text-light"
          onClick={logout}
          size="22"
          style={{ cursor: 'pointer' }}
          title="Log Out"
        />
      ) : (
        <CiLogin
          className="text-light"
          onClick={() => setModalShow(true)}
          size="22"
          style={{ cursor: 'pointer' }}
          title="Log In"
        />
      )}
      <AuthModal show={modalShow} onHide={() => setModalShow(false)}>
        <AuthForm closeModal={() => setModalShow(false)} />
      </AuthModal>
    </>
  );
};

export default Auth;
