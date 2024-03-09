import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routeConfig, RoutePath, AppRoutes } from 'shared/config/routeConfig/routeConfig';

function AppRouter () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to={RoutePath[AppRoutes.SIGNIN]} />} />
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
