import { useRef, useState } from 'react'
import {Form, Input, Row, Col, Upload, DatePicker, Select, Switch, Button, notification, Radio, Card, Space, Tag} from 'antd'
import ImgCrop from 'antd-img-crop'
import {Spinner} from '../../components/Spinner'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { putFileToAws } from '../../utils/aws'
import { boards, classXsubjects } from './constants'
import moment from 'moment'
import axios from 'axios'

const AcademicDetails = () => {
  const [api, contextHolder] = notification.useNotification()
  const [computedPercentage, setComputedPercentage] = useState(0)
  const academicDetailsRef = useRef()
 
  const [classXMarksheetFileList, setClassXMarksheetFileList] = useState([])
  const onClassXMarksheetFileListChange = ({ fileList: newFileList }) => {
    setClassXMarksheetFileList(newFileList)
  }
 
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

  const ClassXSubjectWiseDetails = () => <>
    <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="x_subjectName_1"
                  rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                    <Select
                    name="x_subjectName_1"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    showSearch
                    options={classXsubjects.map (subject => ({ value: subject, label: subject }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Total Marks"
                  name="x_totalMarks_1"
                  rules={[{ required: true, message: 'Please Total Marks' }]}>
                    <Input placeholder="Enter your Total Marks" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Marks Obtained"
                  name="x_marksObtained_1"
                  rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                    <Input placeholder="Enter your Marks Obtained" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="x_subjectName_2"
                  rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                    <Select
                    name="x_subjectName_2"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    options={classXsubjects.map (subject => ({ value: subject, label: subject }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Total Marks"
                  name="x_totalMarks_2"
                  rules={[{ required: true, message: 'Please Total Marks' }]}>
                    <Input placeholder="Enter your Total Marks" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Marks Obtained"
                  name="x_marksObtained_2"
                  rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                    <Input placeholder="Enter your Marks Obtained" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="x_subjectName_3"
                  rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                    <Select
                    name="x_subjectName_3"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    options={classXsubjects.map (subject => ({ value: subject, label: subject }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Total Marks"
                  name="x_totalMarks_3"
                  rules={[{ required: true, message: 'Please Total Marks' }]}>
                    <Input placeholder="Enter your Total Marks" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Marks Obtained"
                  name="x_marksObtained_3"
                  rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                    <Input placeholder="Enter your Marks Obtained" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="x_subjectName_4"
                  rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                    <Select
                    name="x_subjectName_4"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    options={classXsubjects.map (subject => ({ value: subject, label: subject }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Total Marks"
                    name="x_totalMarks_4"
                    rules={[{ required: true, message: 'Please Total Marks' }]}>
                      <Input placeholder="Enter your Total Marks" />
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Marks Obtained"
                    name="x_marksObtained_4"
                    rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                      <Input placeholder="Enter your Marks Obtained" />
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Subject Name"
                    name="x_subjectName_5"
                    rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                      <Select
                      name="x_subjectName_5"
                      placeholder="Select a Subject Name"
                      optionFilterProp="children"
                      filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                      showSearch
                      options={classXsubjects.map (subject => ({ value: subject, label: subject }))}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Total Marks"
                    name="x_totalMarks_5"
                    rules={[{ required: true, message: 'Please Total Marks' }]}>
                      <Input placeholder="Enter your Total Marks" />
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Marks Obtained"
                    name="x_marksObtained_5"
                    rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                      <Input placeholder="Enter your Marks Obtained" />
                  </Form.Item>
                  </Col>
  </>

const ClassXIISubjectWiseDetails = () => <>
              <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="xii_subjectName_1"
                  rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                    <Select
                    name="xii_subjectName_1"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    showSearch
                    options={classXsubjects.map (subject => ({ value: subject, label: subject }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Total Marks"
                  name="xii_totalMarks_1"
                  rules={[{ required: true, message: 'Please Total Marks' }]}>
                    <Input placeholder="Enter your Total Marks" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Marks Obtained"
                  name="xii_marksObtained_1"
                  rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                    <Input placeholder="Enter your Marks Obtained" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="xii_subjectName_2"
                  rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                    <Select
                    name="xii_subjectName_2"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    options={boards.map (board => ({ value: board, label: board }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Total Marks"
                  name="xii_totalMarks_2"
                  rules={[{ required: true, message: 'Please Total Marks' }]}>
                    <Input placeholder="Enter your Total Marks" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Marks Obtained"
                  name="xii_marksObtained_2"
                  rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                    <Input placeholder="Enter your Marks Obtained" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="xii_subjectName_3"
                  rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                    <Select
                    name="xii_subjectName_3"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    options={boards.map (board => ({ value: board, label: board }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Total Marks"
                  name="xii_totalMarks_3"
                  rules={[{ required: true, message: 'Please Total Marks' }]}>
                    <Input placeholder="Enter your Total Marks" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Marks Obtained"
                  name="xii_marksObtained_3"
                  rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                    <Input placeholder="Enter your Marks Obtained" />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="xii_subjectName_4"
                  rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                    <Select
                    name="xii_subjectName_4"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    options={boards.map (board => ({ value: board, label: board }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Total Marks"
                    name="xii_totalMarks_4"
                    rules={[{ required: true, message: 'Please Total Marks' }]}>
                      <Input placeholder="Enter your Total Marks" />
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Marks Obtained"
                    name="xii_marksObtained_4"
                    rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                      <Input placeholder="Enter your Marks Obtained" />
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Subject Name"
                    name="xii_subjectName_5"
                    rules={[{ required: true, message: 'Please enter your Subject Name' }]}>
                      <Select
                      name="xii_subjectName_5"
                      placeholder="Select a Subject Name"
                      optionFilterProp="children"
                      filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                      showSearch
                      options={boards.map (board => ({ value: board, label: board }))}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Total Marks"
                    name="xii_totalMarks_5"
                    rules={[{ required: true, message: 'Please Total Marks' }]}>
                      <Input placeholder="Enter your Total Marks" />
                  </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                    label="Marks Obtained"
                    name="xii_marksObtained_5"
                    rules={[{ required: true, message: 'Please enter your Marks Obtained' }]}>
                      <Input placeholder="Enter your Marks Obtained" />
                  </Form.Item>
                  </Col>
  </>

  const Diploma = () => <p>Diploma Details</p>

  const validateClassX = async (values) => {
    console.log("Inside validateClassX")
    const errors = [];
    if (values?.classXSubjectsPassed === "no" || values?.classXSubjectsPassed === undefined) {
      errors.push("You must have passed Class X for applying to this course");
      return errors;
    }

    let subjectsPercentage = [];
    subjectsPercentage.push(values?.x_marksObtained_1 / values?.x_totalMarks_1 * 100);
    subjectsPercentage.push(values?.x_marksObtained_2 / values?.x_totalMarks_2 * 100);
    subjectsPercentage.push(values?.x_marksObtained_3 / values?.x_totalMarks_3 * 100);
    subjectsPercentage.push(values?.x_marksObtained_4 / values?.x_totalMarks_4 * 100);
    subjectsPercentage.push(values?.x_marksObtained_5 / values?.x_totalMarks_5 * 100);

    let totalPercentage = subjectsPercentage.reduce((a, b) => a + b, 0) / subjectsPercentage.length;
    setComputedPercentage(totalPercentage);
    if (totalPercentage < 60) {
      errors.push("You must have atleast 60% in Class X for applying to this course");
    } else if (totalPercentage > 100) {
      errors.push("Total Percentage cannot be greater than 100");
    } else {
      api.success({
        message: "Class X Details Validated Successfully"
      });
    }
    console.log("Errors Class X", errors);
    return errors;
  }

  const submitAcademicDetails = async () => {
    try {
      const values = await academicDetailsRef.current.validateFields();
      console.log("Submitted Values", values);
      validateClassX(values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }



  return (
    <div>
      {contextHolder}
        <h3 style={{textAlign: 'center'}}>Academic Details</h3>
       <Form ref={academicDetailsRef} layout='vertical' style={{ margin: '1em auto'}} onChange={(values) => {
        setComputedPercentage(67);
       }} >
          <Card title="Class X Metric Details" bordered={false} style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={16}>
              <Form.Item
                label="Board"
                name="board"
                rules={[{ required: true, message: 'Please select a Board' }]}>
                    <Select
                    name="board"
                    placeholder="Select a Board"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    showSearch
                    options={boards.map (board => ({ value: board, label: board }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item
                  label="Year of Passing"
                  name="yearOfPassing"
                  rules={[{ required: true, message: 'Please select a Year of Passing' }]}>
                    <DatePicker picker="year" style={{ width: '100%' }} />
                </Form.Item>
                </Col>
                <Col span={16}>
                <Form.Item
                  label="School Name"
                  name="schoolName"
                  rules={[{ required: true, message: 'Please enter your School Name' }]}>
                    <Input placeholder="Enter your School Name" />
                </Form.Item>
                </Col>
                <Col span={8}>
               
                </Col>
                {/* Class X Subject Wise details */}
                <Col span={24}>
                  <p style={{
                    textAlign: 'center',
                    fontSize: '1.2em',

                  }}>Please Enter Subject wise details of top 5 scoring subjects</p>
                </Col>
                <ClassXSubjectWiseDetails />
                <Col span={8}>
                  <Form.Item
                    label="Have you passed in all subjects?"
                    name="classXSubjectsPassed"
                    rules={[{ required: true, message: 'Please select an option' }]}>
                      <Radio.Group>
                        <Radio.Button value="yes">Yes</Radio.Button>
                        <Radio.Button value="no">No</Radio.Button>
                      </Radio.Group>
                  </Form.Item>
                  <p>
                    If you have not passed in all subjects, in such case your candidature will be cancelled
                  </p>
                </Col>
                <Col span={8}>
                  {computedPercentage != 0 && 
                  <Tag color={computedPercentage >= 60 && computedPercentage <= 100 ? 'green' : 'volcano'} style={{
                    fontSize: '1.2em',
                    padding: '0.5em 1em'
                  }}>Computed Percentage: {computedPercentage.toFixed(2)}%</Tag>
                }
                  <p>If any above furnished details are missmatched, in such case your candidature will be cancelled</p>
                </Col>
                <Col span={8}>
                  <ImgCrop rotate aspectSlider zoomSlider cropShape='rect'>
                    <Form.Item
                      label="Upload Class X Marksheet"
                      name="x_marksheet"
                      rules={[{ required: true, message: 'Please upload your Class X Marksheet' }]}>
                        
                        <Upload
                          name='signature'
                          {...fileUploadProps}
                          listType="picture-card"
                          fileList={classXMarksheetFileList}
                          onChange={onClassXMarksheetFileListChange}
                          onPreview={onPreview}>
                          {classXMarksheetFileList.length === 0 && UploadButton}
                        </Upload>
                  </Form.Item>
                </ImgCrop>
                </Col>

                {/* Class XII Subject Wise details */}
                {/* Show if Fresher */}
                
            </Row>
          </Card>
       </Form>
       <div style={{ display: 'flex',justifyContent: 'center',marginTop: 'auto'}}>
        {/* <Button style={{marginRight:'.3em'}} onClick={() => setCurrent(0)}>Previous</Button> */}
        <Button type="primary" onClick={() => submitAcademicDetails()}>Submit & Next</Button>
      </div>
    </div>
  )
}

export default AcademicDetails;