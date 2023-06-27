import { useEffect, useState } from "react";
import { Card, Space, Button, Descriptions, Divider, Table, Avatar, Skeleton } from "antd";
import { ExclamationCircleOutlined, CheckCircleFilled , CloseCircleFilled, EyeFilled, LeftOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const ListDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [details, setDetails] = useState({})
    const [candidates, setCandidates] = useState([])
    const [detailsLoading, setDetailsLoading] = useState(false)
    const fetchCandidates = async () => {
        setDetailsLoading(true)
        try {
            const res = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH+"/meritLists/getListedCandidates", {
                meritListId: Number(id)
            }, {withCredentials: true})
            let candidates = res.data.submissions.map((candidate, index) => {
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
            setCandidates(candidates)
            setDetails(res.data.meritListDetails)
        } catch (error) {
            console.log("Failed to get list Details", error)
        } finally {
            setDetailsLoading(false)
        }
    }

    useEffect(() => {
        fetchCandidates()
    }, [])

    return (<>
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
                    <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={() => navigate("/meritLists")} />
                    <h3>Merit List Details</h3>
                </Space>
            </div>
       }>   
            {detailsLoading ? <Skeleton active/> : (
            <Descriptions>
                <Descriptions.Item label="ID">{details?.id}</Descriptions.Item>
                <Descriptions.Item label="Department">{details?.department?.departmentName}</Descriptions.Item>
                <Descriptions.Item label="Batch">{details?.batch?.startYear} - {details?.batch?.endYear}</Descriptions.Item>
                <Descriptions.Item label="Publish Date">{moment(details?.publishedDate).format("Do MMM, YYYY")}</Descriptions.Item>
                <Descriptions.Item label="Last Payment Date">{moment(details?.lastPaymentDate).format("Do MMM, YYYY")}</Descriptions.Item>
            </Descriptions>
            )}
            <Divider>Listed Candidates</Divider>
            <Table
        dataSource={candidates}
        loading={detailsLoading}
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
                <a onClick={() => window.open(`${process.env.REACT_APP_URL}/applications/${record.appId}`)}>{text}</a>
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
                title: details?.batch?.startYear === moment().year() ? 'XII Percentage' : 'Diploma Percentage',
                dataIndex: details?.batch?.startYear === moment().year() ? 'classXIIPercentage' : 'diplomaPercentage',
                key: details?.batch?.startYear === moment().year() ? 'classXIIPercentage' : 'diplomaPercentage',
                sorter: details?.batch?.startYear === moment().year() ? (a, b) => a.classXIIPercentage - b.classXIIPercentage : (a, b) => a.diplomaPercentage - b.diplomaPercentage,
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
            {
                title: 'Admitted',
                dataIndex: 'admitted',
                key: 'admitted',
                render: (value) => value ? <CheckCircleFilled style={{color: 'green'}} /> : <CloseCircleFilled style={{color: 'red'}} />
            }
           
        ]} 
        />
       </Card>
    </div>
    </>);
}

export default ListDetails;