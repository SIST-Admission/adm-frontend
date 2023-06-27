import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card, Segmented, Table, Tag, notification, Space, Button, Typography } from "antd";
import { ExclamationCircleOutlined, CheckCircleOutlined , CloseCircleOutlined, EyeFilled, LeftOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import moment from "moment";
import { useNavigate } from "react-router-dom";
const MeritListsPage = () => {
		const { Text } = Typography
    const navigate = useNavigate()
    const [meritLists, setMeritLists] = useState([])
    const [meritListsLoading, setMeirListsLoading] = useState(false)
    const [department, setDepatment] = useState('')

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
            width: 50,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',    
            fixed:'left',
            width: 200,
        },
        {
					title: 'Batch',
					dataIndex: 'batch',
					key: 'batch',
        },
        {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                filters : [
                    {
                        text: 'Fresh Entry',
                        value: 'Fresh Entry',
                    },
                    {
                        text: 'Lateral Entry',
                        value: 'Lateral Entry',
                    },
                ],
                onFilter: (value, record) => record.type.toLowerCase() === value.toLowerCase(),
        },
        {
            title: 'Publish Date',
            dataIndex: 'publishDate',
            key: 'publishDate',
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            title: 'Payment Deadline',
            dataIndex: 'paymentDeadline',
            key: 'paymentDeadline',
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        },
				
        {
            title: 'Auto Publish',
            dataIndex: 'status',
            key: 'status',
						render: (value, record) => value === "Published" ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
            filters: [
                {
                    text: 'Yes',
                    value: "Published",
                },
                {
                    text: 'No',
                    value: "Not Published",
                },
            ],
			onFilter: (value, record) => record.status.toLowerCase() === value.toLowerCase(),		
        },
				{
					title: 'Action',
					key: 'action',
					fixed: 'right',
					width: 100,
					render: (text, record) => (
						<Space size="middle">
							<Button shape="circle" icon={<EyeFilled />} onClick={() => navigate(`/meritLists/${record.key}`)}/>
						</Space>
					),
				}
    ]



    const loadMeritLists = async(departmentCode) => {
        setMeirListsLoading(true)
        try {
            let response = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH+ "/meritLists/getAllMeritLists", {
                departmentCode: departmentCode.toUpperCase(),
            }, {withCredentials: true})
            console.log("MeritLists", response)
		
            if (response.status === 200) {
                setMeritLists(response.data)
            }
        } catch(error) {
            
        } finally {
            setMeirListsLoading(false)
        }
    }

    useEffect(() => {
      loadMeritLists(department)
    }, [department])


    const data = meritLists.map(list => ({
				key: list?.id,
				department: list?.department?.departmentName,
				type: list?.batch.startYear === moment().year() ? "Fresh Entry" : "Lateral Entry",
				batch: list?.batch?.startYear + " - " + list?.batch?.endYear,
				publishDate: moment(list?.publishedDate).format("DD-MM-YYYY"),
				paymentDeadline: moment(list?.lastPaymentDate).format("DD-MM-YYYY"),
				status: list?.isPublished ? moment(list?.publishDate) >= moment() ? "Published" : "Auto Publish Set" : "Not Published",
		}))

		console.log("data", data)

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
                    <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={() => navigate("/")} />
                    <h3>Merit Lists</h3>
                </Space>
                <div>
                    <Segmented onChange={(value) => {
                        setDepatment(value)
                    }} value={department} options={[
                        {
                            "label": "All",
                            "value": "",
                        }, {
                            "label": "Computer Engineering",
                            "value": "CSE",
                        }, {
                            "label": "Civil Engineering",
                            "value": "CVL",
                        }
                    ]} />
                </div>
				<Button type="primary" onClick={() => navigate("/meritLists/new")}>Create Merit List</Button>
            </div>
       }>
        <Table 
            size={3} 
            columns={columns} 
            dataSource={data} 
            loading={meritListsLoading} 
            scroll={{y: 450, x: 1000}}
						onRow={(record, rowIndex) => {
							return {
								onClick: event => {
									navigate(`/meritLists/details/${record.key}`)
								}
							}	
						}}
        />
       </Card>
    </div>

    )

}

export default MeritListsPage;