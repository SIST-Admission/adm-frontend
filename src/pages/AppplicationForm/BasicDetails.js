import { useRef, useState } from 'react'
import {Form, Input, Row, Col, Upload, DatePicker, Select, Switch, Button, notification, Radio} from 'antd'
import ImgCrop from 'antd-img-crop'
import {Spinner} from '../../components/Spinner'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { putFileToAws } from '../../utils/aws'
import { states, countryList } from './constants'
import moment from 'moment'
import axios from 'axios'


const BasicDetails = ({setCurrent, applicationDetailsLoading, setBasicDetailsLoading,applicationDetails }) => {
  const [api, contextHolder] = notification.useNotification();
  const [idProofLoading, setIdProofLoading] = useState(true)
  const [idProofUrl, setIdProofUrl] = useState("")
  const [loading, setloading] = useState(false)
  const fileUploadProps = {
    customRequest: async (options) => {
      try {
        console.log("File Details", options.file.type)
        putFileToAws(`${options.file.name}`, options.file, options.file.type).then((res) => {
          api.success({
            message: 'File uploaded successfully',
          });
          options.onSuccess(res);
        });
      } catch (error) {
        options.onError(error);
        console.log(error);
      }
    },
    maxCount: 1,
  };

  const [idProofFileList, setIdProofFileList] = useState([])
  const [passportPhotoFileList, setPassportPhotoFileList] = useState([])
  const [signatureFileList, setSignatureFileList] = useState([])
  
  const onIdProofChange = ({ fileList: newFileList }) => {
    setIdProofFileList(newFileList);
  };

  const onPassportPhotoChange = ({ fileList: newFileList }) => {
    setPassportPhotoFileList(newFileList);
  };

  const onSignatureChange = ({ fileList: newFileList }) => {
    setSignatureFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const IdProofUploadButton = (
    <div>
      {idProofLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        {idProofLoading ? "Uploading" : "Upload"}
        {!idProofLoading && idProofUrl != "" && "Change"}
      </div>
    </div>
  )
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


  const basicDetailsFormRef = useRef()

  const submitBasicDetails = async () => {
    try{
      const values = await basicDetailsFormRef.current.validateFields();
      console.log("Submitted Values", values);
      if (idProofFileList.length === 0) {
        api.error({
          message: 'Please upload your ID proof',
          placement: 'bottomRight',
        });
        return
      }

      if (passportPhotoFileList.length === 0) {
        api.error({
          message: 'Please upload your passport size photo',
          placement: 'bottomRight',
        });
        return
      }

      if (signatureFileList.length === 0) {
        api.error({
          message: 'Please upload your signature',
          placement: 'bottomRight',
        });
        return
      }

      console.log("ID Proof", idProofFileList[0])
  
      const payload = {
        name: values.name,
        dob: "1999-01-01",
        category: values.category,
        gender: values.gender,
        fatherName: values.fatherName,
        motherName: values.mothername,
        identityType: values.identityType,
        identityNumber: values.identityNumber,
        nationality: values.nationality,
        isCoi: values.coi === undefined ? false : values.coi === "yes" ? true : false,
        isPwd: values.pwd === undefined ? false : values.pwd === "yes" ? true : false,
        identityDocumentKey: idProofFileList[0]?.response?.Key,
        identityDocumentMimeType: idProofFileList[0]?.type,
        identityDocumentUrl: idProofFileList[0]?.response?.Location,
        passportPhotoKey: passportPhotoFileList[0]?.response?.Key,
        passportPhotoMimeType: passportPhotoFileList[0]?.type,
        passportPhotoUrl: passportPhotoFileList[0]?.response?.Location,
        signatureKey: signatureFileList[0]?.response?.Key,
        signatureMimeType: signatureFileList[0]?.type,
        signatureUrl: signatureFileList[0]?.response?.Location
      }
      setloading(true)
      setBasicDetailsLoading(true)
      const res = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH + "/applications/basicDetails", payload, {
        withCredentials: true
      })

      setCurrent(2)
      api.success({
        message: 'Basic details submitted successfully',
      });

    } catch (error) {
      error.errorFields.forEach((err) => {
        api.error({
          message: err.errors[0],
          // description: err.errors[0],
          placement: 'bottomRight',
        });
      });
    } finally {
      setloading(false)
      setBasicDetailsLoading(false)
    }
  }

  if (applicationDetailsLoading) {
    return (
      <Spinner size="md" />
    )
  }

  return (
    <div>
      {contextHolder}
      <h3 style={{marginTop: '.2em', fontSize: '1em', fontFamily: 'helvetica', textAlign:'center'}}>Basic Details</h3>  
      <Form ref={basicDetailsFormRef} layout='vertical' style={{ margin: '1em auto', maxWidth: '40em'}} >
        <Form.Item label="Full Name" name="name" rules={[
          { required: true, message: 'Please input your full name', whitespace: true },
          { pattern: /^[a-zA-Z ]+$/, message: 'Please enter a valid name' },
          { min: 3, message: 'Name must be atleast 3 characters long'}
        ]} >
          <Input placeholder="Full Name" name='name' required defaultValue={applicationDetails?.basicDetails?.name || ""} />
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Email ID" name="email" rules={[
              { required: true, message: 'Please enter your email ID', whitespace: true },
              { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email ID'  },
              { min: 6, message: 'Email ID is too short'}
              
            ]} >
            <Input placeholder="Email ID" name='email' defaultValue={applicationDetails?.basicDetails?.email || ""} required />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone no." name="phone" rules={[
              { required: true, message: 'Please enter your Phone no.', whitespace: true },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid Phone no.' },
            ]} >
              <Input placeholder="Phone no." name='phone' required />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
          <Form.Item
          label="Date of Birth"
          
          name="dob"
          rules={[
            { required: true, message: 'Date of Birth is required' },]}>
            <DatePicker name="dob" style={{width:"100%"}}/>   
        </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select a gender' }]}>
                <Select
                placeholder="Select a Gender"
                optionFilterProp="children"
                defaultValue={applicationDetails?.basicDetails?.gender || ""}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[{ value: 'male', label: 'Male'}, { label: 'Female', value: 'female' }]}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
        <Col span={12}>
            <Form.Item label="Father's Name" name="fatherName" rules={[
              { required: true, message: "Father's Name is required", whitespace: true },
              { pattern: /^[a-zA-Z ]+$/, message: 'Please enter a valid name' },
              { min: 3, message: "Father's Name must be atleast 3 characters long"}
            ]} >
            <Input placeholder="Father's Name" name='fatherName' required />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Mother's Name" name="mothername" rules={[
              { required: true, message: "Mother's Name is required", whitespace: true },
              { pattern: /^[a-zA-Z ]+$/, message: 'Please enter a valid name' },
              { min: 3, message: "Mother's Name must be atleast 3 characters long"}
            ]} >
            <Input placeholder="Mother's Name" name='mothername' required />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a Category' }]}>
                <Select
                placeholder="Select a Category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'GEN', label: 'General'},
                  { value: 'OBC', label: 'OBC' },
                  { value: 'SC', label: 'SC' },
                  { value: 'ST', label: 'ST' },
                  { value: 'EWS', label: 'EWS' },
                ]}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
              <Form.Item
                label="Nationality"
                name="nationality"
                rules={[{ required: true, message: 'Please select a Nationality' }]}>
                    <Select
                    placeholder="Select a Nationality"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    showSearch
                    options={countryList.map (country => ({ value: country, label: country }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
            </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Address" name="address"
              rules={[{ required: true, message: 'Address is required' },{ min: 10, message: 'Address must be atleast 10 characters long'}]}>
              <Input.TextArea name="address" required placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: 'Please select a State' }]}>
                    <Select
                    placeholder="Select a State"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    showSearch
                    options={states.map (state => ({ value: state, label: state }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
            </Col>
          <Col span={12}>
            <Form.Item  name="city" label="City" rules={[
              { required: true, message: 'City is required'},
              { pattern: /^[a-zA-Z ]+$/, message: 'Please enter a valid City' },
              { min: 3, message: 'City must be atleast 3 characters long'}
            ]}>
              <Input placeholder="City" name='city' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="Physically Challenged" name="pwd">
              <Radio.Group name='pwd' buttonStyle='solid' defaultValue="no">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item label="Sikkim Subject COI Holder?" name="coi">
              <Radio.Group name='coi' buttonStyle='solid' defaultValue="no">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
          <Form.Item
            label="Identity Proof Type"
            name="identityType"
            rules={[{ required: true, message: 'Please select a Proof Type' }]}>
                <Select
                placeholder="Select a Proof Type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'Aadhar Card', label: 'Aadhar Card'},
                  { value: 'Voter ID', label: 'Voter ID' },
                  { value: 'Driving License', label: 'Driving License' },
                  { value: 'Passport', label: 'Passport' },
                  { value: 'PAN Card', label: 'PAN Card' },
                ]}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Identity Number" name="identityNumber"
              rules={[{ required: true, message: 'Identity Number is required'},]}>
              <Input placeholder="Identity Number" name='identityNumber' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="ID Proof" name="idProof">
              <ImgCrop rotationSlider >
              <Upload
                name='idProof'
                {...fileUploadProps}
                listType="picture-card"
                fileList={idProofFileList}
                onChange={onIdProofChange}
                onPreview={onPreview}
              >
                {idProofFileList.length === 0 && UploadButton}
                
              </Upload>
            </ImgCrop>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Passport Size Photo" name="passportPhoto">
            <ImgCrop rotationSlider aspectSlider >
              <Upload
                name='passportPhoto'
                {...fileUploadProps}
                listType="picture-card"
                fileList={passportPhotoFileList}
                onChange={onPassportPhotoChange}
                onPreview={onPreview}
              >
                {passportPhotoFileList.length === 0 && UploadButton}
                
              </Upload>
            </ImgCrop>
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item label="Signature" name="signature">
            <ImgCrop rotationSlider >
              <Upload
                name='signature'
                {...fileUploadProps}
                listType="picture-card"
                fileList={signatureFileList}
                onChange={onSignatureChange}
                onPreview={onPreview}
              >
                {signatureFileList.length === 0 && UploadButton}
                
              </Upload>
            </ImgCrop>
            </Form.Item>
          </Col>
          <p>
          <b>Note:</b> Please upload the scanned copy of your ID Proof, Passport Size Photo and Signature.
          You can upload the files in .jpg, .jpeg, .png format only.
        </p>
        </Row>
        
      </Form>
      <div style={{ display: 'flex',justifyContent: 'center',marginTop: 'auto'}}>
        <Button style={{marginRight:'.3em'}} onClick={() => setCurrent(0)}>Previous</Button>
        <Button type="primary" loading={loading} onClick={() => submitBasicDetails()}>Submit & Next</Button>
      </div>
    </div>
  )
}

export default BasicDetails