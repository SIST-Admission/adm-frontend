import { Row, Col, Card, Progress, Space, Typography, Descriptions, Statistic, Button, List } from "antd"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { Text } = Typography;
    return (
        <div>
        <Row gutter={24} align="middle" style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}> 
        <Col span={24}>
            <h2 style={{
                textAlign: 'center',
                fontSize: '2em',
                color: '#444',
                fontFamily: 'helvetica',
            }}>Admin Dashboard</h2>
        </Col>

       <Col span={8}>
        <Card>
            <Row>
                <Col span={24}>
                    <h3 style={{
                        textAlign: 'center',
                        fontSize: '1.5em',
                        color: '#444',
                        fontFamily: 'helvetica',
                        marginTop: '0',
                    }}>Applications</h3>
                </Col>
                <Col span={10}>
                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068'}} strokeLinecap="butt" percent={50} type="dashboard" />
                </Col>
                <Col span={14}>
                    <Row style={{
                       marginTop: '0 auto',
                    }}>
                        <Col span={12}>
                            <Statistic title="Applications" value={100} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Evaluated" value={50} />
                        </Col>
                        <Col>
                            <Button type="primary" 
                            onClick={() => navigate('/applications')}
                            style={{
                                marginTop: '1em',
                            }}>Validate Applications</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
       </Col>

       <Col span={8}>
        <Card>
            <Row>
                <Col span={24}>
                    <h3 style={{
                        textAlign: 'center',
                        fontSize: '1.5em',
                        color: '#444',
                        fontFamily: 'helvetica',
                        marginTop: '0',
                    }}>Computer Engineering</h3>
                </Col>
                <Col span={10}>
                    <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068'}} strokeLinecap="butt" percent={50} type="dashboard" />
                </Col>
                <Col span={14}>
                    <Row style={{
                       marginTop: '0 auto',
                    }}>
                        <Col span={12}>
                            <Statistic title="Total Seats" value={100} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Admitted" value={50} />
                        </Col>
                        <Col>
                            <Button type="primary" style={{
                                marginTop: '1em',
                            }}>View Applications</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
       </Col>

       <Col span={24}>
       </Col>

       </Row>
        </div>
       
    )
}

export default AdminDashboard