import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const ConfirmApplication = () => {
    const navigate = useNavigate();
    return (
    <Result
        icon={<SmileOutlined />}
        title="Great, your application has been submitted successfully!"
        subTitle="You can check the status of your application in the dashboard."
        extra={<Button type="primary" onClick={() => navigate('/')}>Dashboard</Button>}
     />
    );
}

export default ConfirmApplication;