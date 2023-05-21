import {Form, Input, Row, Col, Upload, DatePicker, Select, Switch, Button} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { putFileToAws } from '../../utils/aws'


const BasicDetails = ({setCurrent}) => {

  const fileUploadProps = {
    customRequest: async (options) => {
      try {
        putFileToAws(`${options.file.name}`, options.file, "image/png").then((res) => {
          alert(res.key);
          options.onSuccess(res);
        });
      } catch (error) {
        options.onError(error);
        console.log(error);
      }
    },
    maxCount: 1,
  };

  const UploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <div>
      <h3 style={{marginTop: '.2em', fontSize: '1em', fontFamily: 'helvetica', textAlign:'center'}}>Demographic Details</h3>  
      <Form layout='vertical' style={{ margin: '1em auto', width: '50%',}}>
        <Form.Item label="Full Name">
          <Input placeholder="Full Name" />
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Email ID">
              <Input placeholder="Email ID" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone Number">
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Date of Birth">
              <DatePicker style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Gender">
              <Select placeholder="Gender">
                <Select.Option>Male</Select.Option>
                <Select.Option>Female</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Father's Name">
              <Input placeholder="Father's Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Mother's Name">
              <Input placeholder="Mother's Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Category">
            <Select placeholder="Category" style={{width:'100%'}}>
              <Select.Option>General</Select.Option>
              <Select.Option>OBC</Select.Option>
              <Select.Option>SC</Select.Option>
              <Select.Option>ST</Select.Option>
            </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Nationality">
              <Select placeholder="Nationality" style={{width:'100%'}}>
                <Select.Option>Indian</Select.Option>
                <Select.Option>Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Physically Challenged">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Subject of Sikkim?">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Identity Type">
              <Select placeholder="Identity Type" style={{width:'100%'}}>
                <Select.Option>Aadhar Card</Select.Option>
                <Select.Option>PAN Card</Select.Option>
                <Select.Option>Voter ID</Select.Option>
                <Select.Option>Passport</Select.Option>
                <Select.Option>Driving License</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Identity Number">
              <Input placeholder="Identity Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="ID Proof">
              <Upload
                listType="picture-card"
                showUploadList={false}
                {...fileUploadProps}
              >
                {UploadButton}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Passport Size Photo">
              <Upload
                listType="picture-card"
                showUploadList={false}
                {...fileUploadProps}
              >
                {UploadButton}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Signature">
              <Upload
                listType="picture-card"
                showUploadList={false}
              >
                {UploadButton}
              </Upload>
            </Form.Item>
          </Col>
          <p>
          <b>Note:</b> Please upload the scanned copy of your ID Proof, Passport Size Photo and Signature.
          You can upload the files in .jpg, .jpeg, .png format only.
        </p>
        </Row>
        
      </Form>
      <div style={{ display: 'flex',justifyContent: 'center',marginTop: 'auto'}}>
        <Button style={{marginRight:'.3em'}}>Previous</Button>
        <Button type="primary" onClick={() => setCurrent(1)}>Accept & Continue</Button>
      </div>
    </div>
  )
}

export default BasicDetails