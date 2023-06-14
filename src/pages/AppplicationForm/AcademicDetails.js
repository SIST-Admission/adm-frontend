import { useRef, useState } from 'react'
import {Form, Input, Row, Col, Upload, DatePicker, Select, Switch, Button, notification, Radio, Card, Space, Tag, Divider} from 'antd'
import ImgCrop from 'antd-img-crop'
import {Spinner} from '../../components/Spinner'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { putFileToAws } from '../../utils/aws'
import { boards, classXsubjects } from './constants'
import moment from 'moment'
import axios from 'axios'

const AcademicDetails = ({
  applicationDetails,
  setCurrent,
  setAcademicDetailsLoading,
}) => {
  const [api, contextHolder] = notification.useNotification()
  const [xiiComputedPercentage, setXiiComputedPercentage] = useState(0)
  const [xiiTotalMarks, setXiiTotalMarks] = useState(0)
  const [xiiObtainedMarks, setXiiObtainedMarks] = useState(0)
  const academicDetailsRef = useRef()
  const [loading, setLoading] = useState(false)
 
  const [classXMarksheetFileList, setClassXMarksheetFileList] = useState([])
  const [classXIIMarksheetFileList, setClassXIIMarksheetFileList] = useState([])

  const [diplomaMarksheetFileList, setDiplomaMarksheetFileList] = useState([])

  const [lateralDidPassClassXII, setLateralDidPassClassXII] = useState(false)
  const [didAppearForCUET, setDidAppearForCUET] = useState(false)
  const [didAppearForJEE, setDidAppearForJEE] = useState(false)
  const [didAppearForJEEAdvanced, setDidAppearForJEEAdvanced] = useState(false)

  const onClassXMarksheetFileListChange = ({ fileList: newFileList }) => {
    setClassXMarksheetFileList(newFileList)
  }

  const onClassXIIMarksheetFileListChange = ({ fileList: newFileList }) => {
    setClassXIIMarksheetFileList(newFileList)
  }

  const onDiplomaMarksheetFileListChange = ({ fileList: newFileList }) => {
    setDiplomaMarksheetFileList(newFileList)
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

const ClassXIISubjectWiseDetails = () => <>
              <Col span={8}>
                <Form.Item
                  label="Subject Name"
                  name="xii_subjectName_1">
                    <Select
                    name="xii_subjectName_1"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    showSearch
                    options={classXsubjects.map (subject => ({ value: subject, label: subject, disabled: subject !== 'Physics' }))}
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
                  name="xii_subjectName_2">
                    <Select
                    name="xii_subjectName_2"
                    placeholder="Select a Subject Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    showSearch
                    options={classXsubjects.map (subject => ({ value: subject, label: subject, disabled: subject !== 'Mathematics'   }))}
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

                    options={classXsubjects.map (subject => ({ value: subject, label: subject, disabled: subject === 'Mathematics' || subject === 'Physics' }))}
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
  </>

  const Diploma = () => <p>Diploma Details</p>

  const validateClassXII = (values) => {
    console.log("Inside validateClassXII")
    const errors = [];
    if (values?.xii_subjectsPassed === "no" || values?.xii_subjectsPassed === undefined) {
      errors.push("You must have passed Class XII for applying to this course");
      return errors;
    }

    // Check Subjects Duplications
    let subjects = [];
    subjects.push(values?.xii_subjectName_1);
    subjects.push(values?.xii_subjectName_2);
    subjects.push(values?.xii_subjectName_3);
    console.log("subjects", subjects);
    let uniqueSubjects = [...new Set(subjects)];
    if (subjects.length !== uniqueSubjects.length) {
      errors.push("Subjects cannot be duplicated");
    }

    let subjectsTotalMarks = [];
    subjectsTotalMarks.push(Number(values?.xii_totalMarks_1));
    subjectsTotalMarks.push(Number(values?.xii_totalMarks_2));
    subjectsTotalMarks.push(Number(values?.xii_totalMarks_3));
  
    let subjectsMarksObtained = [];
    subjectsMarksObtained.push(Number(values?.xii_marksObtained_1));
    subjectsMarksObtained.push(Number(values?.xii_marksObtained_2));
    subjectsMarksObtained.push(Number(values?.xii_marksObtained_3));
  

    let totalMarks = subjectsTotalMarks.reduce((a, b) => a + b, 0);
    let totalMarksObtained = subjectsMarksObtained.reduce((a, b) => a + b, 0);
    let totalPercentage = totalMarksObtained / totalMarks * 100;
    setXiiTotalMarks(totalMarks);
    setXiiObtainedMarks(totalMarksObtained);
    setXiiComputedPercentage(totalPercentage);

    if (totalPercentage < 45){
      errors.push("You must have passed Class XII with minimum 45% marks for applying to this course");
    }

    console.log("Errors Class XII", errors);
    return errors;
  }

  const submitDiplomaAcademicDetails = async () => {
    
  }

  const submitAcademicDetails = async () => {
    try {
      const values = await academicDetailsRef.current.validateFields();
      let errors = [];
      if (applicationDetails.applicationType === "FRESHER"){
        // Validate Class XII
        errors = [...errors, ...validateClassXII(values)]
      } else {
        // Validate Diploma
      }

      if (errors.length > 0) {
        errors.forEach(error => api.error({
          message: error
        }));
        return;
      }

      if (values.x_percentage <= 10){
        // Convert CGPA to Percentage
        values.x_percentage = values.x_percentage * 9.5;
      }

      console.log("Success Values", values);
   
      // Build the payload
      let payload = {
        class10Details: {
          schoolName: values.x_schoolName,
          boardName: values.x_board,
          yearOfPass: moment(values.yearOfPassing).format("YYYY"),
          percentage: parseFloat(values.x_percentage),
          rollNumber: values.x_rollNumber,
          marksheet: {
            key: values.x_marksheet.file.response.Key,
            url: values.x_marksheet.file.response.Location,
            mimeType: values.x_marksheet.file.type
          }
        },
        diplomaDetails: applicationDetails.applicationType !== "FRESHER" ? {
          collegeName: values.diploma_university,
          yearOfPass: moment(values.diploma_yearOfPassing).format("YYYY"),
          department: values.diploma_department,
          cgpa: parseFloat(values.diploma_cgpa),
          marksheet: {
            key: values.diploma_marksheet.file.response.Key,
            url: values.diploma_marksheet.file.response.Location,
            mimeType: values.diploma_marksheet.file.type
          }
        } : null,
        class12Details: applicationDetails.applicationType === "FRESHER" || (applicationDetails.applicationType="LATERAL" && lateralDidPassClassXII) ? {
          schoolName: values.xii_schoolName,
          boardName: values.xii_board,
          rollNumber: values.xii_rollNumber,
          yearOfPass: moment(values.xii_yearOfPassing).format("YYYY"),
          percentage: xiiComputedPercentage,
          totalMarks: xiiTotalMarks,
          obtained: xiiObtainedMarks,
          subjects: [
            {
              subjectName: values.xii_subjectName_1,
              totalMarks: Number(values.xii_totalMarks_1),
              obtained: Number(values.xii_marksObtained_1)
            },
            {
              subjectName: values.xii_subjectName_2,
              totalMarks: Number(values.xii_totalMarks_2),
              obtained: Number(values.xii_marksObtained_2)
            },
            {
              subjectName: values.xii_subjectName_3,
              totalMarks: Number(values.xii_totalMarks_3),
              obtained: Number(values.xii_marksObtained_3)
            }
          ],
          marksheet: {
            key: values.xii_marksheet.file.response.Key,
            url: values.xii_marksheet.file.response.Location,
            mimeType: values.xii_marksheet.file.type
          }
        } : null,
        cuetDetails: didAppearForCUET ? {
          rank: Number(values.cuet_rank),
          score: Number(values.cuet_score),
          yearOfPass: moment(values.cuet_yearOfPassing).format("YYYY"),
        } : null,
        jeeMainsDetails: didAppearForJEE ? {
          rank: Number(values.jee_rank),
          score: Number(values.jee_score),
          yearOfPass: moment(values.jee_yearOfPassing).format("YYYY"),
        } : null,
        jeeAdvancedDetails: didAppearForJEE && didAppearForJEEAdvanced ? {
          rank: Number(values.jeeAdvanced_rank),
          score: Number(values.jeeAdvanced_score),
          yearOfPass: moment(values.jeeAdvanced_yearOfPassing).format("YYYY"),
        } : null,
      }
      console.log("Payload", payload);
      setLoading(true);
      setAcademicDetailsLoading(true);
      try {
        const res = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH +'/applications/academicDetails', payload, {withCredentials: true});
        api.success({
          message: res.data.message
        });
        // setCurrent(3);
      } catch (error) {
        console.log("Error", error);
        api.error({
          message: error.response.data.message
        });
      } finally {
        setLoading(false);
        setAcademicDetailsLoading(false);
      }

    }  catch (error) {
      error.errorFields.forEach((err) => {
        console.log("Error", err);
        api.error({
          message: err.errors[0],
          // description: err.errors[0],
          placement: 'bottomRight',
        });
      });
    } finally {
      setLoading(false);
      setAcademicDetailsLoading(false);
    }
  }

  console.log("APP TYPE", applicationDetails)

  return (
    <div>
      {contextHolder}
        <h3 style={{textAlign: 'center'}}>Academic Details</h3>
       <Form ref={academicDetailsRef} layout='vertical' style={{ margin: '1em auto'}}>
          <Card title="Class X Metric Details" bordered={false} style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={16}>
              <Form.Item
                label="Board"
                name="x_board"
                rules={[{ required: true, message: 'Please select a Board' }]}>
                    <Select
                    name="x_board"
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
                  name="x_yearOfPassing"
                  rules={[{ required: true, message: 'Please select a Year of Passing' }]}>
                    <DatePicker picker="year" style={{ width: '100%' }} />
                </Form.Item>
                </Col>
                <Col span={16}>
                <Form.Item
                  label="School Name"
                  name="x_schoolName"
                  rules={[{ required: true, message: 'Please enter your School Name' }]}>
                    <Input placeholder="Enter your School Name" />
                </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                      label="Roll Number"
                      name="x_rollNumber"
                      rules={[{ required: true, message: 'Roll No. / Reg. No.' }]}>
                        <Input placeholder="Enter your Roll Number / Registration Number" />
                    </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    style={{ marginBottom: '.6em' }}
                    label="CGPA / Percentage"
                    name="x_percentage"
                    rules={[{ required: true, message: 'Please enter your CGPA / Percentage' }]}>
                      <Input placeholder="Enter your CGPA / Percentage" style={{ width: '100%' }} />
                  </Form.Item>
                  <span>If any above furnished details are missmatched, in such case your candidature will be cancelled</span>
                </Col>
                <Col span={8}>
                  <ImgCrop rotationSlider aspectSlider zoomSlider cropShape='rect'>
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
                </Row>
              </Card>

                <Divider />
                { applicationDetails.applicationType === 'FRESHER' ? (<>
                {/* If Fresher */}
                <Card title="Class XII Details" bordered={false} style={{ width: '100%' }}>
                    <Row gutter={16}>
                      <Col span={16}>
                      <Form.Item
                        label="Board"
                        name="xii_board"
                        rules={[{ required: true, message: 'Please select a Board' }]}>
                            <Select
                            name="xii_board"
                            placeholder="Select a Board"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            showSearch
                            options={boards.map (board => ({ value: board, label: board }))}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item
                          label="Year of Passing"
                          name="xii_yearOfPassing"
                          rules={[{ required: true, message: 'Please select a Year of Passing' }]}>
                            <DatePicker picker="year" style={{ width: '100%' }} />
                        </Form.Item>
                        </Col>
                        <Col span={16}>
                        <Form.Item
                          label="School Name"
                          name="xii_schoolName"
                          rules={[{ required: true, message: 'Please enter your School Name' }]}>
                            <Input placeholder="Enter your School Name" />
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                              label="Roll Number"
                              name="xii_rollNumber"
                              rules={[{ required: true, message: 'Roll No. / Reg. No.' }]}>
                                <Input placeholder="Enter your Roll Number / Registration Number" />
                            </Form.Item>
                        </Col>
                       
                        {/* Class XII Subject Wise details */}
                        <ClassXIISubjectWiseDetails />
                        <Col span={8}>
                          <Form.Item
                            label="Have you passed in all subjects?"
                            name="xii_subjectsPassed"
                            rules={[{ required: true, message: 'Please select an option' }]}>
                              <Radio.Group>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                              </Radio.Group>
                          </Form.Item>
                          <p> If you have completed your Diploma, in such case you need not pass in all subjects</p>
                        </Col>
                        <Col span={8}>
                          {xiiComputedPercentage != 0 &&
                          <Tag color={xiiComputedPercentage >= 60 && xiiComputedPercentage <= 100 ? 'green' : 'volcano'}>Computed Percentage: {xiiComputedPercentage.toFixed(2)}%</Tag>
                        }
                          <p>If any above furnished details are missmatched, in such case your candidature will be cancelled</p>
                        </Col>
                        <Col span={8}>
                          <ImgCrop rotationSlider aspectSlider zoomSlider cropShape='rect'>
                            <Form.Item
                              label="Upload Class XII Marksheet"
                              name="xii_marksheet"
                              rules={[{ required: true, message: 'Please upload your Class XII Marksheet' }]}>
                                <Upload
                                  name='xii_marksheet'
                                  {...fileUploadProps}
                                  listType="picture-card"
                                  fileList={classXIIMarksheetFileList}
                                  onChange={onClassXIIMarksheetFileListChange}
                                  onPreview={onPreview}>
                                  {classXIIMarksheetFileList.length === 0 && UploadButton}
                                </Upload>
                            </Form.Item>
                          </ImgCrop>
                        </Col>
                    </Row>
                  </Card>
                
                </>) : (<>
                {/* If Lateral */}
                {/* Diploma Details */}
                <Card title="Diploma Details" bordered={false} style={{ width: '100%', marginTop: '1em' }}>
                  <Row gutter={16}>
                    <Col span={16}>
                    <Form.Item
                      label="university"
                      name="diploma_university"
                      rules={[{ required: true, message: 'Please Enter College / University name' }]}>
                        <Input placeholder="Enter College / University name" />
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                      label="Year of Passing"
                      name="diploma_yearOfPassing"
                      rules={[{ required: true, message: 'Please select a Year of Passing' }]}>
                        <DatePicker picker="year" style={{ width: '100%' }} />
                    </Form.Item>
                    </Col>
                    <Col span={16}>
                    <Form.Item
                      label="Department / Branch / Specialization"
                      name="diploma_department"
                      rules={[{ required: true, message: 'Please Select Department / Branch / Specialization' }]}>
                        <Select
                        name="diploma_department"
                        placeholder="Select Department / Branch / Specialization"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        showSearch
                        options={[
                          { value: 'computerScience', label: 'Computer Science' },
                          { value: 'electronics', label: 'Electronics' },
                          { value: 'mechanical', label: 'Mechanical' },
                          { value: 'civil', label: 'Civil' },
                          { value: 'electrical', label: 'Electrical' },
                          { value: 'Mechatronics', label: 'Mechatronics' },
                          { value: 'others', label: 'Others' }
                        ]}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    </Col>
                    
                    <Col span={8}>
                      <Form.Item
                      label="CGPA"
                      name="diploma_cgpa"
                      rules={[{ required: true, message: 'Please enter your CGPA'}]}>
                        <Input placeholder="CGPA" style={{ width: '100%' }} />
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                          <Form.Item
                            label="Do you have any active backlog(s)?"
                            name="dipolma_activeBacklogs"
                            rules={[{ required: true, message: 'Please select an option' }]}>
                              <Radio.Group>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                              </Radio.Group>
                          </Form.Item>
                    </Col>
                    <Col span={8}>
                      <span>
                        Please Upload your Consolidated Marksheet or Semester Wise Marksheet combined in a single PDF file
                      </span>
                    </Col>
                    <Col span={8}>
                      <ImgCrop rotationSlider aspectSlider zoomSlider cropShape='rect'>
                        <Form.Item
                          label="Upload Diploma Marksheet"
                          name="diploma_marksheet"
                          rules={[{ required: true, message: 'Please upload your Diploma Marksheet' }]}>
                            <Upload
                              name='diploma_marksheet'
                              {...fileUploadProps}
                              listType="picture-card"
                              fileList={diplomaMarksheetFileList}
                              onChange={onDiplomaMarksheetFileListChange}
                              onPreview={onPreview}>
                              {diplomaMarksheetFileList.length === 0 && UploadButton}
                            </Upload>
                        </Form.Item>
                      </ImgCrop>
                    </Col>
                    
                  </Row>
                </Card>
                </>)}
                {/* Competetive Exam Details */}
                <Card title="Competetive Exam Details" bordered={false} style={{ width: '100%', marginTop: '1em' }}>
                  <Col span={24}>
                    <Space>
                      <p>Did you appear for Common University Entrance Test (CUET) Exam ?</p>
                      <Switch checkedChildren="Yes" unCheckedChildren="No" checked={didAppearForCUET} onChange={setDidAppearForCUET} />
                    </Space>
                  </Col>
                  {didAppearForCUET && (<>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="Rank"
                          name="cuet_rank"
                          rules={[{ required: true, message: 'Please enter your rank' }]}>
                            <Input placeholder="Enter your rank" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Score"
                          name="cuet_score"
                          rules={[{ required: true, message: 'Please enter your score' }]}>
                            <Input placeholder="Enter your score" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Year of Appearing"
                          name="cuet_yearOfAppearing"
                          rules={[{ required: true, message: 'Please select a Year of Appearing' }]}>
                            <DatePicker picker="year" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>)}
                  {applicationDetails.applicationType === 'FRESHER' && (<>
                  <Col span={24}>
                    <Space>
                      <p>Did you appear for JEE main ?</p>
                      <Switch checkedChildren="Yes" unCheckedChildren="No" checked={didAppearForJEE} onChange={setDidAppearForJEE} />
                    </Space>
                  </Col>
                  </>)}
                  { didAppearForJEE && (<>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="Rank"
                          name="jee_rank"
                          rules={[{ required: true, message: 'Please enter your rank' }]}>
                            <Input placeholder="Enter your rank" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Score"
                          name="jee_score"
                          rules={[{ required: true, message: 'Please enter your score' }]}>
                            <Input placeholder="Enter your score" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Year of Appearing"
                          name="jee_yearOfAppearing"
                          rules={[{ required: true, message: 'Please select a Year of Appearing' }]}>
                            <DatePicker picker="year" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Space>
                          <p>Did you appear for JEE Advanced ?</p>
                          <Switch checkedChildren="Yes" unCheckedChildren="No" checked={didAppearForJEEAdvanced} onChange={setDidAppearForJEEAdvanced} />
                        </Space>
                      </Col>
                      {didAppearForJEEAdvanced && (<>
                        
                          <Col span={8}>
                            <Form.Item
                              label="Rank"
                              name="jeeAdvanced_rank"
                              rules={[{ required: true, message: 'Please enter your rank' }]}>
                                <Input placeholder="Enter your rank" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label="Score"
                              name="jeeAdvanced_score"
                              rules={[{ required: true, message: 'Please enter your score' }]}>
                                <Input placeholder="Enter your score" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label="Year of Appearing"
                              name="jeeAdvanced_yearOfAppearing"
                              rules={[{ required: true, message: 'Please select a Year of Appearing' }]}>
                                <DatePicker picker="year" style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                          
                        </>)}
                    </Row>
                  </>)}
                </Card>
        </Form>
       <div style={{ display: 'flex',justifyContent: 'center',marginTop: 'auto'}}>
        {/* <Button style={{marginRight:'.3em'}} onClick={() => setCurrent(0)}>Previous</Button> */}
        <Button type="primary" loading={loading} onClick={() => submitAcademicDetails()}>Submit & Next</Button>
      </div>
    </div>
  )
}

export default AcademicDetails;