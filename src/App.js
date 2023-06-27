import {Suspense, lazy, useEffect, useState} from 'react';
import {notification} from 'antd';
import './App.css';
import { Spinner } from './components/Spinner';
import axios from 'axios';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux';
import ApplicationDashboard from './pages/ApplicationDashboard/index.js';
import ApplicationForm from './pages/AppplicationForm';
import AdminRoute from './AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import ApplicationsPage from './pages/ApplicationsPage';
import Application from './pages/ApplicationsPage/Application';
import MeritListPage from './pages/MeritListPage';
import CreateMeritList from './pages/MeritListPage/CreateMeritList';
import ListDetails from './pages/MeritListPage/ListDetails';
import AdmissionPage from './pages/Admission';

const SiteLayout = lazy(() => import('./components/SiteLayout'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [loginLoading, setLoginLoading] = useState(false);
  const userDetails = useSelector(state => state.userStore.user);

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
          <Route path='/' element={<ProtectedRoute path="/">
              {userDetails?.user?.role === 'ADMIN' ? <AdminDashboard /> : <ApplicationDashboard />}
            </ProtectedRoute>} />
          <Route path='/apply' element={<ProtectedRoute path="/"><ApplicationForm /></ProtectedRoute>} />
          <Route path='/admission/:submissionId' element={<ProtectedRoute path="/admission/:submissionId"><AdmissionPage /></ProtectedRoute>} />
          <Route path='/applications' element={<AdminRoute path="/applications">
              <ApplicationsPage />
          </AdminRoute>} />
          <Route path='/applications/:id' element={<AdminRoute path="/applications/:id">
            <Application />
          </AdminRoute>} />
          <Route path='/meritLists' element={<AdminRoute path="/meritLists">
            <MeritListPage />
          </AdminRoute>} />
          <Route path='/meritLists/new' element={<AdminRoute path="/meritLists/new">
            <CreateMeritList />
          </AdminRoute>} />
          <Route path='/meritLists/details/:id' element={<AdminRoute path="/meritLists/details/:id">
            <ListDetails />
          </AdminRoute>} />
          
        </Routes>
      </Suspense>
    </SiteLayout>
    </Suspense>
    </>
  );
}

export default App;
