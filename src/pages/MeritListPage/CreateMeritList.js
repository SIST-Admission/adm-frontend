import { useState, useEffect, useRef } from 'react';
import { Steps, Card, Space, Button, Form, Row, Col, Select, DatePicker, Table, Avatar, Descriptions, Switch, Divider, List, notification } from 'antd';
import { ExclamationCircleFilled, CheckCircleFilled, CloseOutlined, CreditCardOutlined, CheckCircleOutlined, LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
const CreateMeritList = () => {
    const navigate = useNavigate();
    const [notificationApi, contextHolder] = notification.useNotification();
    const [createListLoading, setCreateListLoading] = useState(false);
    const [current, setCurrent] = useState(0);
    const [departments, setDepartments] = useState([{
        label:'Computer Engineering',
        value: 'CSE'
    },{
        label:'Civil Engineering',
        value: 'CVL'
    }]);
    const [departmentsLoading, setDepartmentsLoading] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [basicDetails, setBasicDetails] = useState({});

    const steps = [
        {
          title: 'Details',
        },
        {
          title: 'Add Candidates',
          // description: 'Submit basic details',
        },
        {
          title: 'Publish',         
        }
      ];

      const basicDetailsFormRef = useRef(null);

      const saveBasicDetails = async () => {
        try {
          const values = await basicDetailsFormRef.current.validateFields();
          setBasicDetails(values);
          setCurrent(1);
        } catch (error) {
          console.log(error);
        }
      }

      const BasicDetails = () => (<>
        <h3 style={{marginTop: 0, textAlign: 'center'}}>Details</h3>
        <Form ref={basicDetailsFormRef} layout='vertical' style={{ margin: '1em auto', maxWidth: '30em'}}>
            <Form.Item label='Type' name='type'
            rules={[{ required: true, message: 'Merit List Type is required' }]}
            >
                <Select
                    placeholder="Select a Type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        {
                            label: 'Lateral Entry',
                            value: '2022'
                        },
                        {
                            label: 'First Year',
                            value: '2023'
                        }
                    ]}
                    style={{ width: '100%' }}
                    
                />
            </Form.Item>
            <Form.Item label='Department' name='department'
            rules={[{ required: true, message: 'Please select a department!' }]}
            >
                <Select
                    placeholder="Select a Department"
                    optionFilterProp="children"
                    filterOption={(input, option) =>(option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={departments}
                    style={{ width: '100%' }}
                    loading={departmentsLoading}
                />
            </Form.Item>
            <Form.Item label='Admission Fee Payment Deadline' name='lastPaymentDate'
            rules={[{ required: true, message: 'Please select a date!' }]}
            >
                <DatePicker 
                    disabledDate={(current) => current && current < moment().endOf('day')}
                style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label='Merit List Publish Date' name='publishDate'
            rules={[{ required: true, message: 'Please select a date!' }]}
            >
                <DatePicker
                    disabledDate={(current) => current && current < moment().endOf('day')}
                style={{ width: '100%' }} />
            </Form.Item>
            <Button type='primary' onClick={saveBasicDetails} style={{width: '100%'}}>Next</Button>
            <Button onClick={() => navigate('/meritLists')} 
                icon={<CloseOutlined />}
            style={{
                width: '100%',
                marginTop: '1em'
            }}>Cancel</Button>
        </Form>
      </>);

    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [selectedCandidateData, setSelectedCandidateData] = useState([]);
    const [candidatesLoading, setCandidatesLoading] = useState(false);
    const [candidatesList, setCandidatesList] = useState([]);
    const fetchCandidates = async () => {
        setCandidatesLoading(true);
        try {
            if (!basicDetails?.department || !basicDetails?.type) {
                return;
            }
            const { data } = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH+"/meritLists/getUnListedCandidates", {
                "departmentCode": basicDetails?.department,
                "year": basicDetails?.type
            }, {withCredentials: true});
            console.log(data);
            let candidates = data.map((candidate, index) => {
                return {
                    key: candidate?.id,
                    name: candidate?.application?.basic_details?.name,
                    photo: candidate?.application?.basic_details?.photoDocument?.file_url,
                    category: candidate?.application?.basic_details?.category?.trim(),
                    classXIIPercentage: candidate?.application?.academic_details?.classXIIDetails?.percentage,
                    jeeMainsRank: candidate?.application?.academic_details?.jeeMainsRank ? candidate?.application?.academic_details?.jeeMainsRank : '-',
                    jeeAdvancedRank: candidate?.application?.academic_details?.jeeAdvancedRank ? candidate?.application?.academic_details?.jeeAdvancedRank : '-',
                    cuetRank: candidate?.application?.academic_details?.cuetRank ? candidate?.application?.academic_details?.cuetRank : '-',
                    coi: candidate?.application?.basic_details?.isCoi,
                    admitted: candidate?.isAdmitted,
                    appId: candidate?.application?.id,
                    diplomaPercentage: candidate?.application?.academic_details?.diplomaDetails?.cgpa,
                }
            });
            console.log(candidates);
            setCandidatesList(candidates);
        } catch (error) {
            console.log(error);
        } finally {
            setCandidatesLoading(false);
        }
    }
         
      const AddCandidates = () => (<>
        <h3 style={{marginTop: 0, textAlign: 'center'}}>Add Candidates</h3>
        <p>Total Candidates: {selectedCandidates.length}</p>
        <Table
        dataSource={candidatesList}
        columns={[{
            title: '#',
            dataIndex: 'key',
            key: 'key',
            },
            {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Space>
                <Avatar src={record.photo} />
                <span onClick={() => window.open("http://localhost:3000", "Application", "height=800,width=12000")}>{text}</span>
            </Space>,
            },
            {
                title: 'COI',
                dataIndex: 'coi',
                key: 'coi',
                render : (value) => value ? <span style={{
                    display: 'inline-block',
                    width: '1em',
                    height: '1em',
                    borderRadius: '50%',
                    backgroundColor: 'green'
                }}></span> : <span
                style={{
                    display: 'inline-block',
                    width: '1em',
                    height: '1em',
                    borderRadius: '50%',
                    backgroundColor: 'red'
                }}
                ></span>
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
                filters: [
                    {
                        text: 'General',
                        value: 'GEN',
                    },
                    {
                        text: 'OBC',
                        value: 'OBC',
                    },
                    {
                        text: 'SC',
                        value: 'SC',
                    },
                    {
                        text: 'ST',
                        value: 'ST',
                    }
                ],
                onFilter: (value, record) => record.category.indexOf(value) === 0,
            },
            {
                title: Number(basicDetails?.type) === Number(moment().year()) ? 'Class XII Percentage' : 'Diploma Percentage',
                dataIndex: Number(basicDetails?.type) === Number(moment().year()) ? 'classXIIPercentage' : 'diplomaPercentage',
                key: 'classXIIPercentage',
                sorter: Number(basicDetails?.type) === Number(moment().year()) ? (a, b) => a.classXIIPercentage - b.classXIIPercentage : (a, b) => a.diplomaPercentage - b.diplomaPercentage,
            },
            {
                title: 'JEE Mains Rank',
                dataIndex: 'jeeMainsRank',
                key: 'jeeMainsRank',
                sorter: (a, b) => a.jeeMainsRank - b.jeeMainsRank,
            },
            {
                title: 'JEE Adv Rank',
                dataIndex: 'jeeAdvancedRank',
                key: 'jeeAdvancedRank',
                sorter: (a, b) => a.jeeAdvancedRank - b.jeeAdvancedRank,
            },
            {
                title: 'CUET Rank',
                dataIndex: 'cuetRank',
                key: 'cuetRank',
                sorter: (a, b) => a.cuetRank - b.cuetRank,
            },
           
        ]} 
        rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedCandidates,
            onChange: (selectedRowKeys, selectedRows) => {
                setSelectedCandidates(selectedRowKeys);
                setSelectedCandidateData(selectedRows);
            },
        }}
        loading={candidatesLoading}
        />
        <Space align='center' style={{
            width: '100%',
            justifyContent: 'center',

        }}>

        <Button onClick={() => setCurrent(0)} style={{
            width: '10em',
        }}>Previous</Button>
        <Button type='primary' disabled={
            selectedCandidates.length === 0
        } onClick={() => setCurrent(2)} style={{
            width: '10em',
        }}>Next</Button>
        </Space>
    </>);

    const [autoPublish, setAutoPublish] = useState(true);

    const Publish = () => (<>
        <h3 style={{marginTop: 0, textAlign: 'center'}}>Publish</h3>
        <Row>
            <Col span={24}>
                <Descriptions column={2} title="Merit List Details" bordered>
                    <Descriptions.Item label="Department">{basicDetails.department}</Descriptions.Item>
                    <Descriptions.Item label="Year">{basicDetails.type}</Descriptions.Item>
                    <Descriptions.Item label="Payment Deadline">{basicDetails.lastPaymentDate.format("Do MMM, YYYY")}</Descriptions.Item>
                    <Descriptions.Item label="Publish Date">{basicDetails.lastPaymentDate.format("Do MMM, YYYY")}</Descriptions.Item>
                    <Descriptions.Item label="Auto Publish">
                        <Switch value={autoPublish} defaultChecked={autoPublish} onChange={(value) => setAutoPublish(value)} />
                    </Descriptions.Item>
                </Descriptions>
                <br/>
                <Row gutter={12}>
                    <Col span={24}>
                    <Descriptions title="Candidate Statistics" column={2} bordered>
                    <Descriptions.Item label="Total">{selectedCandidates.length}</Descriptions.Item>
                    <Descriptions.Item label="General">{selectedCandidateData.filter(candidate => candidate.category == 'GEN').length}</Descriptions.Item>
                    <Descriptions.Item label="OBC">{selectedCandidateData.filter(candidate => candidate.category == 'OBC').length}</Descriptions.Item>
                    <Descriptions.Item label="SC">{selectedCandidateData.filter(candidate => candidate.category == 'SC').length}</Descriptions.Item>
                    <Descriptions.Item label="ST">{selectedCandidateData.filter(candidate => candidate.category == 'ST').length}</Descriptions.Item>
                    <Descriptions.Item label="COI">{selectedCandidateData.filter(candidate => candidate.coi).length}</Descriptions.Item>
                    </Descriptions>  
                    </Col> 
                </Row> 
            </Col>
            <Col span={24}>
            <Space align='center' style={{
                            width: '100%',
                            justifyContent: 'center',
                            marginTop: '3em'
                        }}>
                        <Button onClick={() => setCurrent(1)} style={{
                            width: '10em',
                        }}>Previous</Button>
                        <Button type='primary' onClick={() => submitData()} loading={createListLoading} style={{
                            width: '10em',
                        }}>Confirm</Button>
                    </Space>
            </Col>
        </Row>
    </>)
    useEffect(() => {
        if (current == 1){
            fetchCandidates();
        }
    }, [current]);
    
    const submitData = async () => {
       
        setCreateListLoading(true);
        const data = {
            departmentCode: basicDetails.department,
            year: basicDetails.type,
            lastPaymentDate: basicDetails.lastPaymentDate.format("YYYY-MM-DD"),
            publishedDate: basicDetails.publishDate.format("YYYY-MM-DD"),
            submissionIds : selectedCandidates,
            isPublished: autoPublish,
        }
       try {
        const res = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH+"/meritLists/createList", data, {
            withCredentials: true,
        });
        if (res.status == 200 || res.status == 201){
            notificationApi.success({
                message: "Merit List Created Successfully",
                description: "Merit List has been created successfully",
            });
            navigate('/meritLists');
        }
       } catch (error) {
              console.log(error);
                notificationApi.error({
                    message: "Error",
                    description: "Something went wrong",
                });
        } finally {
            setCreateListLoading(false);
        }
    }

    return (
        <>
            {contextHolder}
      
        <Card
        style={{
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
              {current === 0 && <BasicDetails />}
              {current === 1 && <AddCandidates />}
              {current === 2 && <Publish />}
            </div>
          </Card>
          </>
    )

}

export default CreateMeritList;