import {Suspense, lazy} from 'react';
import './App.css';
import { Spinner } from './components/Spinner';
const SiteLayout = lazy(() => import('./components/SiteLayout'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
function App() {
  return (
    <Suspense fallback={<Spinner size='lg'>Loading</Spinner>}>
    <SiteLayout>
      <Suspense fallback={<Spinner size='lg'>Loading</Spinner>}>
        <LoginPage />
      </Suspense>
    </SiteLayout>
    </Suspense>
  );
}

export default App;
