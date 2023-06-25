import { useState } from "react";
import { Card, Input, Button, notification  } from "antd";
import { LoginOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";

import './index.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [api, contextHolder] = notification.useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    // validation
    if(!email || !password) {
      api.error({
        message: 'Login Failed',
        description: 'Please enter email and password',
      });
      return;
    }
    setLoading(true);
    try {
      const payload = {email, password}
      const response = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH +'/users/login', payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      console.log(response);
      if(response.status === 200) {
        api.success({
          message: 'Login Success',
          description: 'You have successfully logged in',
        });
        dispatch(setUser({
          isSignedIn: true,
          user: response.data
        }));
        console.log("Redirect: ", redirect)
        if (redirect && redirect === '/login') {
          navigate('/');
        } else if(redirect) {
          navigate(redirect);
        } else {
          navigate('/');
        }
      }
    }catch(error) {
      api.error({
        message: 'Login Failed',
        description: error.response.data.message,
      });
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return (<>
    {contextHolder}
    <div className="login-page">
      <div className="content">
        <div>
          <Card className="login-card">
          <h1><LoginOutlined /> Login</h1>
            <Input size="large" placeholder="Email ID" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}} icon={faIdBadge} />}  
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input size="large" placeholder="Password" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}} icon={faLock} />} type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div style={{display: 'flex', justifyContent:'space-between'}}>
              <Button type="primary"
                loading={loading}
                onClick={() => login()}
              >
                <LoginOutlined /> 
                Login
              </Button>
              <Button type="link" >
                Forgot Password
              </Button>
            </div>
          </Card>
          <span style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '1em',
            color: '#444',
            fontFamily: 'helvetica',
            fontSize: '12px'
          }}>
            By logging in, you agree to our <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>
          </span>
        </div>
      </div>
    </div>
  </>);
};

export default LoginPage;