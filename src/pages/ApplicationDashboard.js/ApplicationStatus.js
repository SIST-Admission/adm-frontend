import { Button, Timeline, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ApplicationStatus = ({ applicationDetails }) => {
  const navigate = useNavigate();
  const { Text } = Typography;
  const ProceedButton = () => <Button size="small" onClick={() => navigate('/apply')} >Proceed</Button>;
  
  // if (applicationDetails.id == undefined) return (<p>Application Not Submitted</p>)
  const applicationStatus = [
    {
      children: (<>
      {applicationDetails.id == undefined ? (<>
        <Text type="warning">Accept Terms & Conditions</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
        }}>You have not accepted terms & conditions yet.<br/> Please accept terms & conditions to proceed. <br/>
        <ProceedButton />
        </span>
      </>) : (<>
        <Text type="success">Accept Terms & Conditions</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
          color: '#999'
        }}>You have accepted terms & conditions.</span>
      </>)}
      
      </>),
      color: applicationDetails.id == undefined ? '#FAAD14' : 'green'
    },
    {
      title: 'Submit Basic Details',
      description: 'Submit basic details like name, email, phone number, etc.',
      dot: applicationDetails.id == undefined ? "" : applicationDetails?.basicDetails == null ? (<ClockCircleOutlined className="timeline-clock-icon" style={{fontSize: '16px',}} />) : "" ,
      children: applicationDetails.id == undefined ? 'Basic Details' : applicationDetails == null ? <>
      </> : applicationDetails?.basicDetails == null ?  (<>
        <Text type="warning" style={{
          fontSize: '1em',
        }}>Submit Basic Details</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
        }}>
          You have not submitted basic details yet.<br/> Please submit basic details to proceed. <br/>
          <ProceedButton />
        </span>
      </>) : (<>
        <Text type="success" style={{
          fontSize: '1em',
        }}>Submit Basic Details</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
          color: '#999'
        }}>You have submitted basic details.</span>
      </>),
      color: applicationDetails.id == undefined ? 'grey' : applicationDetails?.basicDetails == null ? '#FAAD14' : 'green'
    },

    {
      title: 'Submit Academic Details',
      description: 'Submit academic details like 10th, 12th, etc.',
      dot:applicationDetails.id == undefined || applicationDetails?.basicDetails ?.id== null ?'' : applicationDetails?.basicDetails != null && applicationDetails?.academicDetails == null || undefined ? (<ClockCircleOutlined className="timeline-clock-icon" style={{fontSize: '16px',}} />) : "" ,
      children: applicationDetails.id == undefined || applicationDetails?.basicDetails ?.id== null ? 'Submit Academic Details' : applicationDetails?.basicDetails != null && applicationDetails?.academicDetails == null || undefined ?  (<>
        <Text type="warning" style={{
          fontSize: '1em',
        }}>Submit Academic Details</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
        }}>
          You have not submitted academic details yet.<br/> Please submit academic details to proceed. <br/>
          <ProceedButton />
        </span>
      </>) : (<>
        <Text type="success" style={{
          fontSize: '1em',
        }}>Submit Academic Details</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
          color: '#999'
        }}>You have submitted academic details.</span>
      </>),
      color:applicationDetails.id == undefined || applicationDetails?.basicDetails ?.id== null ? 'grey' : applicationDetails?.basicDetails != null && applicationDetails?.academicDetails == null || undefined ? '#FAAD14' : 'green'
    },
    {
      title: 'Pay Application Fee',
      description: 'Pay application fee',
      children: 'Pay Application Fee',
      color: 'grey'
    },
    {
      title: 'Soft Verification',
      description: 'Soft verification of application',
      children: 'Soft Verification',
      color: 'grey'
    },
    {
      title: 'Digital Documents Verification',
      description: 'Digital documents verification',
      children: 'Digital Documents Verification',
      color: 'grey'
    },
    {
      title: 'Hard Documents Verification',
      description: 'Hard documents verification',
      children: 'Hard Documents Verification',
      color: 'grey'
    },
   
    {
      title: 'Successfull Admission',
      description: 'Successfull admission',
      children: 'Successfull Admission',
      color: 'grey'
    }

  ];

  return (
    <Timeline items={applicationStatus} />
  )
}

export default ApplicationStatus;