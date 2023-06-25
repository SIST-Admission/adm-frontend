import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({children, path}) => {
    const userDetails = useSelector(state => state.userStore.user);
    
    if (userDetails?.isSignedIn && userDetails?.user?.role === 'ADMIN') {
      return children
    }else {
      return <Navigate to={"/login?redirect="+path} />
    }
  }

export default AdminRoute;