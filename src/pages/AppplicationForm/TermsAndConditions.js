import { useState } from "react";
import { Button, Popconfirm, notification } from "antd";
import axios from "axios";
const TermsAndConditions = ({setCurrent, setTermsLoading}) => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const startApplication = async (applicationType) => {
    setLoading(true);
    setTermsLoading(true);
    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH + "/applications/start", { applicationType }, {
        withCredentials: true
      });
      setCurrent(1);
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400){
        api.error({
          message: 'Application Failed',
          description: 'You have already started an application',
        });
        setCurrent(1);
        window.scrollTo(0, 0);
      }
      api.error({
        message: 'Application Failed',
        description: err.response.data.message,
      });
    }finally{
      setLoading(false);
      setTermsLoading(false);
    }
  }

  return (
    <div>
      {contextHolder}
      <h3 style={{marginTop: '.2em', fontSize: '1em', fontFamily: 'helvetica', textAlign:'center'}}>Terms & Conditions</h3>  
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Nullam ut massa id odio imperdiet facilisis.</li>
          <li>Sed sit amet leo in mi vulputate porta.</li>
          <li>Nullam sit amet tellus tincidunt, dapibus neque blandit, pretium neque.</li>
          <li>Nullam ut massa id odio imperdiet facilisis.</li>
          <li>Praesent consequat metus quis vulputate dictum.</li>
          <li>Curabitur pharetra nunc id tincidunt porta.</li>
          <li>Mauris ut turpis et sapien lacinia laoreet.</li>
          <li>Aliquam dignissim massa ac metus mollis, eget dapibus dolor fringilla.</li>
        </ul>
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Nullam ut massa id odio imperdiet facilisis.</li>
          <li>Sed sit amet leo in mi vulputate porta.</li>
          <li>Nullam sit amet tellus tincidunt, dapibus neque blandit, pretium neque.</li>
          <li>Nullam ut massa id odio imperdiet facilisis.</li>
          <li>Praesent consequat metus quis vulputate dictum.</li>
          <li>Curabitur pharetra nunc id tincidunt porta.</li>
          <li>Mauris ut turpis et sapien lacinia laoreet.</li>
          <li>Aliquam dignissim massa ac metus mollis, eget dapibus dolor fringilla.</li>
        </ul>
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      {/* Nav */}
      <div style={{ display: 'flex',justifyContent: 'center',marginTop: 'auto'}}>
        {/* <Button style={{marginRight:'.3em'}}>Previous</Button> */}
        <Popconfirm
          title="Are you a Lateral Entry Student?"
          onConfirm={() => startApplication("LATERAL")}
          okText="Yes"
          cancelText="No I'm a Fresher"
          onCancel={() => startApplication("FRESHER")}
        >
          <Button loading={loading} type="primary">Accept & Continue</Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default TermsAndConditions;