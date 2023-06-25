import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({children, path}) => {
  const userDetails = useSelector(state => state.userStore.user);
  
  if (!userDetails?.isSignedIn) {
    return <Navigate to={"/login"+path} />
  }else {
    return children
  }
}

export default ProtectedRoute;
