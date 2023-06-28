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

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [api, contextHolder] = notification.useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [confrimPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    // validation
    if(!email || !password || !phone || !name) {
      api.error({
        message: 'Registration Failed',
        description: 'All Fields are mandatory!',
      });
      return;
    }

    if(password !== confrimPassword) {
        api.error({
            message: 'Registration Failed',
            description: 'Password and Confirm Password should be same!',
            });
            return;
    }

    setLoading(true);
    try {
      const payload = {email, password, phone, name}
      const response = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH +'/users/', payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      console.log(response);
      
        api.success({
          message: 'Registration Success',
          description: 'You may now login with your credentials',
        });
        alert("Registration Successfull");
        navigate('/login');
      
    }catch(error) {
      api.error({
        message: 'Registration Failed',
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
          <h1><LoginOutlined /> Register</h1>

            <Input size="large" placeholder="Full Name" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}}  />}  
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Input size="large" placeholder="Phone Number" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}}  />}  
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <Input size="large" placeholder="Email ID" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}}  />}  
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input size="large" placeholder="Password" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}} />} type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Input size="large" placeholder="Confirm Password" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}} />} type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confrimPassword}
            />
            <div style={{display: 'flex', justifyContent:'space-between'}}>
              <Button type="primary"
                loading={loading}
                onClick={() => register()}
              >
                <LoginOutlined /> 
                Register
              </Button>
              <Button 
              onClick={() => navigate('/login')}
              type="link" >
                Login
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
            By Registereing in, you agree to our <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>
          </span>
        </div>
      </div>
    </div>
  </>);
};

export default RegisterPage;