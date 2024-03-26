import { UnauthorizedLayout } from 'pages/layouts/UnauthorizedLayout';
import { AppRouter } from './providers/router';
import './styles/index.scss';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState } from 'entities/User';
import { AuthorizedLayout } from 'pages/layouts/AuthorizedLayout';
import { initAuthData } from 'entities/User/model/services/initAuthData';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(getUserState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initAuthData());
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  }, [isAuth]);

  return (
    <Suspense fallback="">
      { isAuth
        ? (
        <AuthorizedLayout className='app'>
        <AppRouter />
      </AuthorizedLayout>
          )
        : (
        <UnauthorizedLayout className='app'>
        <AppRouter />
      </UnauthorizedLayout>
          )}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          className: 'toast'
        }}
        />
    </Suspense>
  );
};

export default App;
