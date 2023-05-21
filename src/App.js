import {Suspense, lazy, useEffect, useState} from 'react';
import {notification} from 'antd';
import './App.css';
import { Spinner } from './components/Spinner';
import axios from 'axios';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { setUser } from './reducers/userReducer'
import { useDispatch } from 'react-redux';
import ApplicationDashboard from './pages/ApplicationDashboard.js';

const SiteLayout = lazy(() => import('./components/SiteLayout'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [loginLoading, setLoginLoading] = useState(false);
  
  const checkLogin = async () => {
    setLoginLoading(true);
    try {
      const res = await axios.get(process.env.REACT_APP_BACKEND_BASEPATH + '/auth', {
        withCredentials: true
      })
      api.success({message: 'Authenticated', description: 'You are logged in', placement: 'bottomRight'});
      dispatch(setUser({
        isSignedIn: true,
        user: res.data
      }));
      console.log("Resp",res.data);
    } catch (error) {
      api.warning({message: 'You are not logged in'});
      console.log(error);
      navigate('/login?redirect=' + location.pathname);
    } finally {
      setLoginLoading(false);
    }
  }

  useEffect(() => {
    checkLogin();
  }, [])

  if (loginLoading) {
    return (
      <Spinner size='lg'>Loading</Spinner>
    )
  }
  return (
    <>
    {contextHolder}
    <Suspense fallback={<Spinner size='lg'>Loading</Spinner>}>
    <SiteLayout>
      <Suspense fallback={<Spinner size='lg'>Loading</Spinner>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route path='/bijay' element={<ProtectedRoute path="/bijay"><h1>Home</h1></ProtectedRoute>} />
          <Route path='/' element={<ProtectedRoute path="/"><ApplicationDashboard /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </SiteLayout>
    </Suspense>
    </>
  );
}

export default App;
