import { useState } from 'react';
import { Button, Card, List, Timeline, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ApplicationStatus = ({ applicationDetails }) => {
  const navigate = useNavigate();
  const { Text } = Typography;
  const ProceedButton = () => <Button size="small" onClick={() => navigate('/apply')} >Proceed</Button>;
  const [isInMeritList, setIsInMeritList] = useState(false);
  useEffect(() => {
    applicationDetails?.submissions?.forEach(s => {
      if(s.meritListId !== null) setIsInMeritList(true)
    });
  }, [applicationDetails]);
 
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
      dot: applicationDetails.id != undefined && applicationDetails.academicDetails != null && applicationDetails?.paymentDetails.isPaid ? '' : applicationDetails.id != undefined && applicationDetails.academicDetails != null ? (<ClockCircleOutlined className="timeline-clock-icon" style={{fontSize: '16px'}} />) : "",
      color: applicationDetails.id != undefined && applicationDetails.academicDetails != null && applicationDetails?.paymentDetails.isPaid ? 'green' : applicationDetails.id != undefined && applicationDetails.academicDetails != null ? '#FAAD14' : 'grey',
      children: applicationDetails.id != undefined && applicationDetails.academicDetails != null && applicationDetails?.paymentDetails.isPaid ? (<>
        <Text type="success" style={{
          fontSize: '1em',
        }}>Pay Application Fee</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
          color: '#999'
        }}>You have paid application fee.</span>
      </>) : applicationDetails.id != undefined && applicationDetails.academicDetails != null ? (<>
        <Text type="warning" style={{
          fontSize: '1em',
        }}>Pay Application Fee</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
        }}>
          You have not paid application fee yet.<br/> Please pay application fee to proceed. <br/>
          <ProceedButton />
        </span>
      </>) : 'Pay Application Fee',
    },
    {
      title: 'Submit Application',
      description: 'Submit application',
      dot: applicationDetails?.paymentDetails !== null && applicationDetails?.paymentDetails?.isPaid && applicationDetails?.status === 'DRAFT' ?  (<ClockCircleOutlined className="timeline-clock-icon" style={{fontSize: '16px'}} />) : "",
      color: applicationDetails?.paymentDetails !== null && applicationDetails?.paymentDetails?.isPaid && applicationDetails?.status === 'DRAFT' ? '#FAAD14' : applicationDetails?.submissions != null ? 'green' : 'grey',
     children: applicationDetails?.paymentDetails !== null && applicationDetails?.paymentDetails?.isPaid && applicationDetails?.status === 'DRAFT' ? (<>
        <Text type="warning" style={{
          fontSize: '1em',
        }}>Submit Application</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
        }}>
          You have not submitted application yet.<br/> Please submit application to proceed. <br/>
          <ProceedButton />
        </span>
      </>) : applicationDetails?.submissions != null ? (<>
        <Text type="success" style={{
          fontSize: '1em',
        }}>Submit Application</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
          color: '#999'
        }}>You have submitted application.</span>
      </>) : "Submit Application",
    },
    {
      title: 'Digital Documents Verification',
      dot: applicationDetails?.status === 'SUBMITTED' ? (<ClockCircleOutlined className="timeline-clock-icon" style={{fontSize: '16px'}} />) : "",
      color: applicationDetails?.status === 'SUBMITTED' ? '#FAAD14' : applicationDetails?.status === 'APPROVED' ? 'green' : 'grey',
      description: 'Digital documents verification',
      children: applicationDetails?.status === 'SUBMITTED' ? (<>
        <Text type="warning" style={{
          fontSize: '1em', 
        }}>Digital Documents Verification</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
        }}>
          We are verifying your documents.<br/> Please wait for the verification to complete. <br/>
        </span>
      </>) : applicationDetails?.status === 'APPROVED' ? (<>
        <Text type="success" style={{
          fontSize: '1em',
        }}>Digital Documents Verification</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
          color: '#999'
        }}>Your documents have been verified.</span>
      </>) : "Digital Documents Verification",
    },
    {
      title: 'Admission Approval',
      description: 'You will get the admission approval once you make it to the merit list.',
      dot: applicationDetails?.status !== 'APPROVED' ? "" :applicationDetails?.status === 'APPROVED' && !isInMeritList? (<ClockCircleOutlined className="timeline-clock-icon" style={{fontSize: '16px', color:'#FAAD14'}} />) : "",
      children: applicationDetails?.status !== 'APPROVED' ? <>Admission Approval</> : applicationDetails?.status === 'APPROVED' && !isInMeritList ? (<>
        <Text type="warning" style={{
          fontSize: '1em',
        }}>Admission Approval</Text>
        <span style={{
           display: 'block',
           fontSize: '12px',
           color: '#999',
           maxWidth: '300px'
        }}>
         You will get the admission approval once you make it to the merit list.
         Once you get the admission approval, you will be able to pay the admission fee 
         for Provisional Admission.
        </span>
      </>) : <>
        <Text type="success" style={{
          fontSize: '1em',
        }}>Admission Approval</Text>
        <span style={{
          display: 'block',
          fontSize: '12px',
          color: '#999',
          display: 'block',
          marginBottom: '10px'
        }}>You have been approved for admission.</span>
        <span style={{
          display: 'block',
          fontSize: '12px',
          color: '#999',
          display: 'block',
          marginLeft: '10px',
        }}>Your Submissions Status</span>
        {applicationDetails?.submissions?.map((s, index) => <>
          <Card style={{
            width: '40%',
            marginBottom: '10px'
          }}>
            <Text strong>Department:</Text> <Text >{s.departmentCode === 'CSE' ? "Computer Engineering" : s.departmentCode === 'CVL' ? "Civil Engineering" : s.departmentCode}</Text> <br/>
            <Text strong>Merit Status:</Text> {s.meritListId !== null ? <Text type='success'>Enlisted</Text>: <Text type="warning">Pending</Text>}<br/>
            {s.meritListId === null ? <Text style={{
              display: 'block',
              color: '#999',
              fontSize: '12px',
              marginTop: '10px'
            }}>
              Your application is under review for this department.
              You may wait for this department or may get admission in other department.
            </Text> : <Text style={{
              display: 'block',
              color: '#999',
              fontSize: '12px',
            }}>
              Congratulations! You have been enlisted in the merit list for this department.
              </Text>}
            {s.meritListId !== null && <Button type="primary" style={{
              marginTop: '10px'
            }}
            onClick={() => navigate(`/admission/${s.id}`)}
            >Pay Admission Fee</Button>}
          </Card>
        </>)}
      </>,
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