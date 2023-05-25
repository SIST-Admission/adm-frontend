import { useState, useEffect } from 'react';
import { Steps, Card } from 'antd';
import { SolutionOutlined, TrophyOutlined, SafetyCertificateOutlined, CreditCardOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TermsAndConditions from './TermsAndConditions';
import BasicDetails from './BasicDetails';
import { Spinner } from '../../components/Spinner';
import AcademicDetails from './AcademicDetails';


const ApplicationForm = ({startFrom}) => {
  const [current, setCurrent] = useState(startFrom || 0);
  const [termsLoading, setTermsLoading] = useState(false);
  const [basicDetailsLoading, setBasicDetailsLoading] = useState(false);
  const [academicDetailsLoading, setAcademicDetailsLoading] = useState(false);
  const [applicationDetailsLoading, setApplicationDetailsLoading] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState({});
  const userDetails = useSelector(state => state.userStore.user);
  const fetchApplicationDetails = async () => {
    setApplicationDetailsLoading(true);
    let res;
    try {
      res = await axios.get(process.env.REACT_APP_BACKEND_BASEPATH + `/applications/${userDetails?.user?.id}`, {
        withCredentials: true
      });
      setApplicationDetails(res.data);
      if (res.data?.basicDetails != null){
          setCurrent(2);
      } else if (res.data?.id != 0) {
          setCurrent(1);
      } else {
          setCurrent(0);
      }
      console.log("application Details", res.data);
    } catch (error) {
      if (res.status === 400 && res.data?.error?.message === 'Application does not exist') {
        setApplicationDetails({});
        setApplicationDetailsLoading(false);
        return;
      }
      console.log(error);
      alert('Something went wrong');
    }finally {
      setApplicationDetailsLoading(false);
    }
  }

  useEffect(() => {
    if(userDetails?.user?.id) {
      fetchApplicationDetails();
    }
  }, [])

  const steps = [
    {
      title: 'Terms & Conditions',
      // description: 'Accept terms & conditions',
      icon: termsLoading ? <LoadingOutlined /> : <SafetyCertificateOutlined />
    },
    {
      title: 'Basic Details',
      // description: 'Submit basic details',
      icon: current === 1 && applicationDetailsLoading ? <LoadingOutlined /> : (<SolutionOutlined />)
    },
    {
      title: 'Academic Details',
      icon: current === 2 && applicationDetailsLoading ? <LoadingOutlined /> : (<TrophyOutlined />)
      // description: 'Submit academic details',
    },
    {
      title: 'Application Fee',
      // description: 'Pay application fee',
      icon: <CreditCardOutlined />
    },
    {
      title: 'Confirm',
      icon: <CheckCircleOutlined />
      // description: 'Confirm application',
    }
  ];

  if (current == 0 && applicationDetailsLoading){
    return <Spinner />
  }

  return (
    <Card style={{
      backgroundColor: '#f5f5f5',
    }}>
      <Steps style={{width: '60%', margin: '1em auto'}} items={steps} current={current} />
      <div style={{
        width: '70%',
        margin: '1em auto',
        border: '1px solid #ddd',
        padding: '1em 2em',
        borderRadius: '5px',
        shadow: '0 0 5px #ddd',
        minHeight: 'calc(100vh - 200px)',
        backgroundColor: '#fff',
      }}>
        {current === 0 && <TermsAndConditions setTermsLoading={setTermsLoading} setCurrent={setCurrent} />}
        {current === 1 && <BasicDetails setBasicDetailsLoading={setBasicDetailsLoading} applicationDetailsLoading={applicationDetailsLoading} applicationDetails={applicationDetails} setCurrent={setCurrent} />  }
        {current === 2 && <AcademicDetails applicationDetails={applicationDetails} setCurrent={setCurrent} setAcademicDetailsLoading={setAcademicDetailsLoading} />}
        {current === 3 && <div>Application Fee</div>}
      </div>
    </Card>
  )
}

export default ApplicationForm;