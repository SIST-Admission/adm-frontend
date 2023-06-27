import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Card, Segmented, Space, Table, Tag, notification } from "antd";
import { ExclamationCircleOutlined, CheckCircleOutlined , CloseCircleOutlined, EyeFilled, LeftOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { string } from "i/lib/util";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const ApplicationsPage = () => {
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [applicationsLoading, setApplicationsLoading] = useState(false)
    const [appCategory, setAppCategory] = useState('All')

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
            width: 50,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',    
            fixed:'left',
            width: 200,
            render: (value, record) => <>
                <Avatar src={record.profilePicture} size="large" />
                <a style={{
                    marginLeft: '1em',
                }} onClick={() => navigate(`/applications/${record.key}`)}>{value}</a>
            </>,
        },
        {
            title: 'Application Type',
            dataIndex: 'applicationType',
            key: 'applicationType',
            filterMode: 'menu',
            filters: [
                {
                    text: 'Lateral Entry',
                    value: 'LATERAL',
                },
                {
                    text: 'Fresh Entry',
                    value: 'FRESHER',
                }
            ],
            onFilter: (value, record) => record.applicationType.toLowerCase() === value.toLowerCase(),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            title: 'Applied For',
            dataIndex: 'appliedFor',
            key: 'appliedFor',
            filters: [
                {
                    text: 'CSE',
                    value: 'CSE',
                },
                {
                    text: 'CVL',
                    value: 'CVL',
                },
            ],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filterSearch: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value) => {
               switch(value) {
                case "SUBMITTED": 
                    return <Tag icon={<ExclamationCircleOutlined />} color="warning">PENDING</Tag>
                case "APPROVED":
                    return <Tag icon={<CheckCircleOutlined />} color="green">APPROVED</Tag>
                case "REJECTED":
                    return <Tag icon={<CloseCircleOutlined />} color="red">REJECTED</Tag>
                default:
                    return <Tag color="blue">value</Tag>
               }
            }
        },
    ]



    const loadApplications = async(status) => {
        setApplicationsLoading(true)
        try {
            let response = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH+ "/applications/getAllApplications", {
                status: status.toUpperCase()
            }, {withCredentials: true})
            console.log("Applications", response)
            if (response.status === 200) {
                setApplications(response.data)
            }
        } catch(error) {
            
        } finally {
            setApplicationsLoading(false)
        }
    }

    useEffect(() => {
        if (appCategory === 'All' || appCategory === '') {
            loadApplications("")
        } else if (appCategory === 'Pending' || appCategory === 'SUBMITTED') {
            loadApplications("SUBMITTED")
        } else {
            loadApplications(appCategory)
        }
    }, [appCategory])


    const data = applications?.map((application) => ({
        key: application.id,
        name: application?.basic_details?.name,
        profilePicture: application?.basic_details?.photoDocument.file_url,
        applicationType: string.capitalize(application?.application_type),
        date: moment(application?.application_start_date).format('DD MMM YYYY'),
        email: application?.basic_details?.email,
        appliedFor: application?.submissions?.map((submission) => submission.departmentCode).join(', '),
        status: application?.status,
        email: application?.basic_details?.email,
    }))

    return (
    <div style={{
        width: '80%',
        margin: '1em auto',
    }}>
       <Card title={
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2px px solid #000',
            }}>
                <Space>
                <Button shape='circle' icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} />
                <h3>Applications</h3>
                </Space>
                <div>
                    <Segmented onChange={(value) => {
                        setAppCategory(value)
                    }} value={appCategory} options={['All', 'Pending', 'Approved', 'Rejected']} />
                </div>
            </div>
       }>
        <Table 
            size={3} 
            columns={columns} 
            dataSource={data} 
            loading={applicationsLoading} 
            scroll={{y: 450, x: 1000}}
        />
       </Card>
    </div>

    )

}

export default ApplicationsPage;