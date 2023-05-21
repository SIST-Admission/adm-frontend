import { useState } from 'react';
import { Steps } from 'antd';
import { SolutionOutlined, TrophyOutlined, SafetyCertificateOutlined, CreditCardOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TermsAndConditions from './TermsAndConditions';
import BasicDetails from './BasicDetails';


const ApplicationForm = () => {
  const steps = [
    {
      title: 'Terms & Conditions',
      // description: 'Accept terms & conditions',
      icon: <SafetyCertificateOutlined />
    },
    {
      title: 'Basic Details',
      // description: 'Submit basic details',
      icon: <SolutionOutlined />
    },
    {
      title: 'Academic Details',
      icon: <TrophyOutlined />
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

  const [current, setCurrent] = useState(0);

  return (
    <div style={{marginTop: '1em'}}>
      <Steps style={{width: '60%', margin: '1em auto'}} items={steps} current={current} />
      <div style={{
        width: '80%',
        margin: '1em auto',
        border: '1px solid #ddd',
        padding: '1em 2em',
        borderRadius: '5px',
        shadow: '0 0 5px #ddd',
        minHeight: 'calc(100vh - 200px)',
        backgroundColor: '#fff'
      }}>
        {current === 0 && <TermsAndConditions setCurrent={setCurrent} />}
        {current === 1 && <BasicDetails setCurrent={setCurrent} />  }
      </div>
    </div>
  )
}

export default ApplicationForm;