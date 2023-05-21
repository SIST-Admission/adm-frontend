import { Card, Input, Button } from "antd";
import { LoginOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import './index.scss';

const index = () => {

  const login = async () => {
    const payload = {
      email: 'bijay@kloudone.com',
      password: 'test@123'
    }

    try {
      const response = await axios.post('https://backend.sistadm.us/users/login', payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      console.log(response);
    }catch(error) {
      console.log(error);
    }
  }

  return (<>
    <div className="login-page">
      <div className="content">
        <div>
          <Card className="login-card">
          <h1><LoginOutlined /> Login</h1>
            <Input size="large" placeholder="Email ID" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}} icon={faIdBadge} />}  />
            <Input size="large" placeholder="Password" prefix={<FontAwesomeIcon size="lg" style={{marginRight: '.5em', color: '#555'}} icon={faLock} />} type="password" />
            <div style={{display: 'flex', justifyContent:'space-between'}}>
              <Button type="primary"
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

export default index;