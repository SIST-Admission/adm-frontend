import { useState } from "react";
import { Row, Col, Card, Progress, Space, Typography, notification, Statistic, Button, List } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "../../components/Spinner";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const { Text } = Typography;
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await axios.get(process.env.REACT_APP_BACKEND_BASEPATH + '/applications/stats', {withCredentials: true});
            setStats(res.data);
        } catch (error) {
            console.log(error);
            api.error({
                message: 'Something went wrong',
                description: 'Unable to fetch stats',
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStats();
    }, [])

    return (
        <div style={{
            padding: '20px'

        }}>
            {contextHolder}
            {loading ? <Spinner>Loading</Spinner> : <>
            
                <Row>
                    <Col span={14}>
                    <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <h3 style={{
                            textAlign: 'center',
                            marginTop: '.5em',
                        }}>Admin Dashboard</h3>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Applications" value={Number(stats?.pending_applications) + Number(stats?.approved_applications)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Pending Applications" value={(stats?.pending_applications)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Approved Applications" value={(stats?.approved_applications)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="First Year Applications" value={(stats?.fresh_applications)} />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic title="Lateral Applications" value={(stats?.lateral_applications)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Submissions" value={(stats?.total_submissions)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Submissions" value={(stats?.total_submissions)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Merit Lists" value={(stats?.total_merit_list)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Admitted Students" value={(stats?.total_admitted)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="CSE Admitted" value={(stats?.cse_admitted)} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="CVL Admitted" value={(stats?.cvl_admitted)} />
                        </Card>
                    </Col>
                </Row>
                    </Col>
                    <Col span={10} style={{
                        padding: '20px',
                        marginTop: '40px',
                        with: '100%',
                    }}>
                        <List bordered>
                            <List.Item>
                                <Space style={{
                                    width: '100%',
                                    justifyContent: 'space-between'
                                }}>
                                    <span>Application Administration</span>
                                    <Button type="primary" icon={<ArrowRightOutlined />} size="large" shape="circle" onClick={() => {
                                        navigate('/applications')
                            
                                    }}/>
                                </Space>
                                </List.Item>
                            <List.Item>
                                <Space style={{
                                        width: '100%',
                                        justifyContent: 'space-between'
                                    }}>
                                    <span>Admission Administration</span>
                                    <Button type="primary" icon={<ArrowRightOutlined />} size="large" shape="circle" onClick={() =>{ 

                                        navigate('/meritLists')} 
                                    }/>
                                </Space>
                            </List.Item>
                        </List>
                    </Col>
                </Row>
            </>}
            
        </div>
       
    )
}

export default AdminDashboard