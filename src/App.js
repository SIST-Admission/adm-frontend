import {Suspense, lazy} from 'react';
import './App.css';
import { Spinner } from './components/Spinner';
const SiteLayout = lazy(() => import('./components/SiteLayout'));

function App() {
  return (
    <Suspense fallback={<Spinner size='lg'>Loading</Spinner>}>
    <SiteLayout>
      
    </SiteLayout>
    </Suspense>
  );
}

export default App;
