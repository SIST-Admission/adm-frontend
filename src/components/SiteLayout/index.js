import { Layout } from 'antd';
import './index.scss';
import { Navbar,Text } from "@nextui-org/react";
import sistLogo from './logo.jpg'
import { useSelector, useDispatch } from 'react-redux';
import {   useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../reducers/userReducer';

const { Footer } = Layout;

const SiteLayout = ({ children }) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userStore.user);

  const logout = async () => {
    try {
      await axios.get(process.env.REACT_APP_BACKEND_BASEPATH + '/users/logout', {
        withCredentials: true
      })
      dispatch(setUser({
        isSignedIn: false,
        isAdmin: false,
        user: null
      }))
      navigate('/login');
    } catch (error) {
      alert("Error logging out");
      console.log(error);
    }
  }


  return (
    <>
      <Navbar isBordered variant="sticky" size={87}>
        <Navbar.Brand>
          <img style={{
            width: "35px",
            height: "35px",
          }} src={sistLogo} alt="logo" />
          <Text b color="inherit" style={{
            fontFamily: "helvetica",
            marginLeft: "10px",
          }}>
            Sikkim Institute of Science and Technology<br/>
            <span style={{
              fontSize: "12px",
              color: "gray",
            }}>Admission Portal | 2023 Admissions</span>
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="highlight" style={{
          fontFamily: "helvetica",
        }}>

          {userDetails?.isSignedIn ? (
            <>
              <Navbar.Link className='nav-link' onClick={() => navigate('/')} isActive={pathname == '/dashboard'}>Dashboard</Navbar.Link>
              <Navbar.Link onClick={() => logout()} className='nav-link' isActive={pathname == '/logout'}>
               Log out
              </Navbar.Link>
            </>
          ) : (
            <>
            <Navbar.Link className='nav-link' onClick={() => navigate('/')} isActive={pathname == '/'}>Home</Navbar.Link>
            <Navbar.Link className='nav-link' onClick={() => navigate('/prospectus')} isActive={pathname == '/prospectus'}>Prospectus</Navbar.Link>
            <Navbar.Link className='nav-link' onClick={() => navigate('/contactus')} isActive={pathname == '/contactus'}>Contact Us</Navbar.Link>  
          </>
          )}

        </Navbar.Content>
      </Navbar>
      <main style={{
        minHeight: "calc(100vh - 64px)",
      }}>
        {children}
      </main>
      <Footer style={{ textAlign: 'center' }}>SIST ©2023 Created by SIST</Footer>
    </>
  );
}

export default SiteLayout;