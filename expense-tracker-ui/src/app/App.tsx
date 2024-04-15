import { UnauthorizedLayout } from 'pages/layouts/UnauthorizedLayout';
import { AppRouter } from './providers/router';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState } from 'entities/User';
import { AuthorizedLayout } from 'pages/layouts/AuthorizedLayout';
import { initAuthData } from 'entities/User/model/services/initAuthData';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuth, isLoading } = useSelector(getUserState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(initAuthData());
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuth && location.pathname !== '/signin') {
      navigate('/signin');
    } else if (isAuth && location.pathname === '/signin') {
      navigate('/dashboard');
    }
  }, [isLoading, isAuth]);

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
