import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRouter from './components/layout/private';
import PublicRoutes from './components/layout/public';
import Dashboard from './pages/dashboard';
import UsersList from './pages/users';
import CreateUser from './pages/users/create';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PublicRoutes />} />
        <Route path='/*' element={<PrivateRouter />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users/' element={<UsersList />} />
          <Route path='users/create' element={<CreateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
