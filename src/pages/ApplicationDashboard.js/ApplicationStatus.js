import { Button, Timeline, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const ApplicationStatus = () => {
  const { Text } = Typography;
  const applicationStatus = [
    {
      children: (<>
      <Text type="success">Accept Terms & Conditions</Text>
      <span style={{
        display: 'block',
        fontSize: '12px',
        color: '#999'
      }}>You have accepted terms & conditions.</span>
      </>),
      color: 'green'
    },
    {
      title: 'Submit Basic Details',
      description: 'Submit basic details like name, email, phone number, etc.',
      dot: <ClockCircleOutlined className="timeline-clock-icon" style={{
        fontSize: '16px',
      }} />,
      children: (<>
        <Text type="warning" style={{
          fontSize: '1em',
        }}>Submit Basic Details</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
        }}>
          You have not submitted basic details yet.<br/> Please submit basic details to proceed. <br/>
          <Button size="small" >Proceed</Button>
        </span>
      </>),
      color: '#FAAD14'
    },

    {
      title: 'Submit Academic Details',
      description: 'Submit academic details like 10th, 12th, etc.',
      children: 'Submit Academic Details',
      color: 'grey'
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