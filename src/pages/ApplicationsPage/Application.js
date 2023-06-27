import {useEffect, useState} from 'react'; 
import { Card, Row, Col, Descriptions, notification, Skeleton, Tag, Divider, Image, Typography, Button, Space, message, Tooltip } from 'antd';
import {useParams} from 'react-router-dom'
import { ExclamationCircleOutlined, CheckCircleOutlined , CloseCircleOutlined, EyeFilled, LeftOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import placeHolderImage from '../../assets/placeholder-image.png'
const Application = ({mode}) => {
    const navigate = useNavigate();
    const {Text} = Typography;
    const {id} = useParams();
    const [api, contextHolder] = notification.useNotification();
    const [messageApi, messageHolder] = message.useMessage();
    
    const [photoVisible, setPhotoVisible] = useState(false)
    const [classXMarkSheetVisible, setClassXMarkSheetVisible] = useState(false)
    const [classXIIMarkSheetVisible, setClassXIIMarkSheetVisible] = useState(false)
    const [diplomaMarkSheetVisible, setDiplomaMarkSheetVisible] = useState(false)
    const [signatureDocumentVisible, setSignatureDocumentVisible] = useState(false)
    const [idProofVisible, setIdProofVisible] = useState(false)

    const [loading, setLoading] = useState(false)
    const [application, setApplication] = useState(null)

    const fetchApplication = async () => {
      setLoading(true)
      try {
        const {data} = await axios.get(process.env.REACT_APP_BACKEND_BASEPATH+`/applications/${id}`, {withCredentials: true})
        console.log("Fetched Application", data)
        setApplication(data)
        api.warning({
          message: 'Note',
          description: 'You will be able to approve the application only if all the documents are approved individually.',
        })
      } catch (e) {
        console.error(e)
        api.error({
          message: 'Error',
          description: e.response.data.message,
        });
      } finally { 
        setLoading(false)
      }
    }
    useEffect(() => {
        fetchApplication()
    }, [])

    const updateDocumentStatus = async (document, status) => {
      messageApi.loading({
        content: 'Updating Document Status',
        key: 'updateDocumentStatus',
        duration: 0,
      })
      const payload = {
        documentId: document.id,
        status: status,
        isVerified: true,
      }
      try {
        const {data} = await axios.put(process.env.REACT_APP_BACKEND_BASEPATH+`/applications/updateDocumentStatus`, payload, {withCredentials: true})
        console.log("Updated Document Status", data)
        const application = await axios.get(process.env.REACT_APP_BACKEND_BASEPATH+`/applications/${id}`, {withCredentials: true})
        console.log("Fetched Application", data)
        setApplication(application.data)
        messageApi.success({
          content: 'Document Status Updated',
          key: 'updateDocumentStatus',
          duration: 2,
        })
      } catch (e) {
        console.error(e)
        messageApi.error({
          content: e.response.data.message,
          key: 'updateDocumentStatus',
          duration: 2,
        })
      }
    }

    const updateApplicationStatus = async (appId, status) => {
      messageApi.loading({
        content: status === 'APPROVED' ? 'Approving Application' : 'Rejecting Application',
        key: 'updateApplicationStatus',
        duration: 0,
      })
      try {
        const {data} = await axios.put(process.env.REACT_APP_BACKEND_BASEPATH+`/applications/updateApplicationStatus`, {id: appId, status: status}, {withCredentials: true})
        console.log("Updated Application Status", data)
        const application = await axios.get(process.env.REACT_APP_BACKEND_BASEPATH+`/applications/${id}`, {withCredentials: true})
        console.log("Fetched Application", data)
        setApplication(application.data)
        messageApi.success({
          content: status === 'APPROVED' ? 'Application Approved' : 'Application Rejected',
          key: 'updateApplicationStatus',
          duration: 2,
        })
      } catch (e) {
        console.error(e)
        messageApi.error({
          content: e.response.data.message,
          key: 'updateApplicationStatus',
          duration: 2,
        })
      }
    }

    return (<>
        {messageHolder}
        {contextHolder}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 1em',
        }}>
          <Space style={{
            marginTop: '1em',
          }}>
            <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={() => navigate('/applications')} />
            <span style={{
              fontSize: '1.3em',
              fontFamily: 'helvetica',
              fontWeight: 'bolder',
            }}>
              <Space style={{
                alignItems: 'center',
              }}>
                <span>Digital Document Verification </span>
              </Space>
            </span>
          </Space>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '1em',
            marginBottom: '0.5em',
          }}>
              {!loading && <>
                  {application?.status === 'SUBMITTED' ? <Tag icon={<ExclamationCircleOutlined />} color='orange'>Pending</Tag> : application?.status === 'APPROVED' ? <Tag icon={<CheckCircleOutlined />} color='green'>Approved</Tag> : <Tag icon={<CloseCircleOutlined />} color='red'>Rejected</Tag>}
                </>}
            </div>
        </div>
        <Row style={{
          padding: '1em',
        }} gutter={12}>
          <Col span={16}>
            <Card>
              {loading ?<><Skeleton active /> <br/> <Skeleton active /><br/> <Skeleton active /></>: <>
                <Descriptions bordered column={2} title="Application Details">
                  <Descriptions.Item label="Application ID">{application?.id}</Descriptions.Item>
                  <Descriptions.Item label="Application Type">{application?.applicationType}</Descriptions.Item>
                  <Descriptions.Item label="Applied For">
                   {
                      application?.submissions.map(s => <div>
                        <Tag color='blue' style={{
                          fontSize: '1em',
                        }}>
                          {s.departmentCode}
                        </Tag>
                      </div>)
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="Submission Date">{moment(application?.paymentDetails?.paymentDate).format("DD/MM/YYYY")}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Descriptions bordered column={2} title="Applicant Details">
                  <Descriptions.Item label="Name" span={2}>{application?.basicDetails?.name}</Descriptions.Item>
                  <Descriptions.Item label="Father's Name">{application?.basicDetails?.fatherName}</Descriptions.Item>
                  <Descriptions.Item label="Mother's Name">{application?.basicDetails?.motherName}</Descriptions.Item>
                  <Descriptions.Item label="Date of Birth">{moment(application?.basicDetails?.dob).format("DD/MM/YYYY")}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{application?.basicDetails?.gender}</Descriptions.Item>
                  <Descriptions.Item label="email" span={2}>{application?.basicDetails?.email}</Descriptions.Item>
                  <Descriptions.Item label="Mobile Number">{application?.basicDetails?.phone}</Descriptions.Item>
                  <Descriptions.Item label="Category">{application?.basicDetails?.category}</Descriptions.Item>
                  <Descriptions.Item label="COI">{application?.basicDetails?.isCoi ? "Yes" : "No"}</Descriptions.Item>
                  <Descriptions.Item label="PWD">{application?.basicDetails?.isPwd ? "Yes":"No"}</Descriptions.Item>
                  <Descriptions.Item label="Nationality">{application?.basicDetails?.nationality}</Descriptions.Item>
                  <Descriptions.Item label="Identity">{application?.basicDetails?.identityType}</Descriptions.Item>
                  <Descriptions.Item label="Identity Number" span={2}>
                    <Space size={20}>
                      {application?.basicDetails?.identityNumber}
                      {application?.basicDetails?.identityDocument?.is_verified ? application?.basicDetails?.identityDocument?.status === 'APPROVED' ? 
                          <Tag icon={<CheckCircleOutlined />} color="success"> Approved</Tag> :
                          <Tag icon={<CloseCircleOutlined />} color="red"> Rejected</Tag> :
                          <Tag icon={<ExclamationCircleOutlined />} color="warning"> Pending Verification</Tag>}
                      <Button shape='round' onClick={() => setIdProofVisible(true)} icon={<EyeFilled />} size="small">View</Button>
                      {/* <Button type="primary" icon={<CheckCircleOutlined />} shape='round' style={{backgroundColor:'#5cb85c'}} size="small">Approve</Button>
                      <Button type="primary" shape='round' danger icon={<CloseCircleOutlined />} size="small">Reject</Button> */}
                    </Space>
                    </Descriptions.Item>
                  <Descriptions.Item label="Address" span={2}>{application?.basicDetails?.address}</Descriptions.Item>
                </Descriptions>
                <Divider>Academic Details</Divider>
                <Descriptions bordered column={2} title="Class X">
                  <Descriptions.Item label="Class X Board">{application?.academicDetails?.classXDetails?.board}</Descriptions.Item>
                  <Descriptions.Item label="Year of Passing">{application?.academicDetails?.classXDetails?.yearOfPassing}</Descriptions.Item>
                  <Descriptions.Item label="Roll Number">{application?.academicDetails?.classXDetails?.rollNumber}</Descriptions.Item>
                  <Descriptions.Item label="Percentage">{application?.academicDetails?.classXDetails?.percentage}</Descriptions.Item>
                  <Descriptions.Item label="Marksheet">
                    <Space>
                      {application?.academicDetails?.classXDetails?.marksheetDocument?.is_verified ? application?.academicDetails?.classXDetails?.marksheetDocument?.status === 'APPROVED' ? 
                          <Tag icon={<CheckCircleOutlined />} color="success"> Approved</Tag> :
                          <Tag icon={<CloseCircleOutlined />} color="red"> Rejected</Tag> :
                          <Tag icon={<ExclamationCircleOutlined />} color="warning"> Pending Verification</Tag>}
                      <Button shape='round' onClick={() => setClassXMarkSheetVisible(true)} icon={<EyeFilled />} size="small">View</Button>
                      {/* <Button type="primary" icon={<CheckCircleOutlined />} shape='round' style={{backgroundColor:'#5cb85c'}} size="small">Approve</Button>
                      <Button type="primary" shape='round' danger icon={<CloseCircleOutlined />} size="small">Reject</Button> */}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
                <br />
                {application?.academicDetails?.classXIIDetails && <>
                <Descriptions bordered column={2} title="Class XII">
                  <Descriptions.Item label="Class XII Board">{application?.academicDetails?.classXIIDetails?.board}</Descriptions.Item>
                  <Descriptions.Item label="Year of Passing">{application?.academicDetails?.classXIIDetails?.yearOfPassing}</Descriptions.Item>
                  <Descriptions.Item label="Roll Number">{application?.academicDetails?.classXIIDetails?.rollNumber}</Descriptions.Item>
                  <Descriptions.Item label="Percentage">{application?.academicDetails?.classXIIDetails?.percentage}</Descriptions.Item>
                  <Descriptions.Item label="Marksheet">
                    <Space>
                    {application?.academicDetails?.classXIIDetails?.marksheetDocument?.is_verified ?application?.academicDetails?.classXIIDetails?.marksheetDocument?.status === 'APPROVED' ? 
                          <Tag icon={<CheckCircleOutlined />} color="success"> Approved</Tag> :
                          <Tag icon={<CloseCircleOutlined />} color="red"> Rejected</Tag> :
                          <Tag icon={<ExclamationCircleOutlined />} color="warning"> Pending Verification</Tag>}
                      <Button shape='round' onClick={() => setClassXIIMarkSheetVisible(true)} icon={<EyeFilled />} size="small">View</Button>
                      {/* <Button type="primary" icon={<CheckCircleOutlined />} shape='round' style={{backgroundColor:'#5cb85c'}} size="small">Approve</Button>
                      <Button type="primary" shape='round' danger icon={<CloseCircleOutlined />} size="small">Reject</Button> */}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
                </>}
                {application?.academicDetails?.cuetRank && <>
                <Descriptions bordered column={2} title="Centeal University Entrance Test (CUET)">
                  <Descriptions.Item label="CUCET Rank">{application?.academicDetails?.cuetRank}</Descriptions.Item>
                  <Descriptions.Item label="CUCET Score">{application?.academicDetails?.cuetRank}</Descriptions.Item>
                </Descriptions>
                <Divider />
                </>}
                {application?.academicDetails?.jeeMainsRank && <>
                <Descriptions bordered column={2} title="Joint Entrance Examination (JEE) Mains">
                  <Descriptions.Item label="CUCET Rank">{application?.academicDetails?.jeeMainsRank}</Descriptions.Item>
                  <Descriptions.Item label="CUCET Score">{application?.academicDetails?.jeeMainsMarks}</Descriptions.Item>
                </Descriptions>
                <Divider />
                </>}
                {application?.academicDetails?.jeeAdvancedRank && <>
                <Descriptions bordered column={2} title="Joint Entrance Examination (JEE) Mains">
                  <Descriptions.Item label="CUCET Rank">{application?.academicDetails?.jeeMainsRank}</Descriptions.Item>
                  <Descriptions.Item label="CUCET Score">{application?.academicDetails?.jeeMainsMarks}</Descriptions.Item>
                </Descriptions>
                <Divider />
                </>}
                {application?.academicDetails?.diplomaDetails && <>
                  <Descriptions bordered column={2} title="Diploma">
                    <Descriptions.Item label="College / University" span={2}>{application?.academicDetails?.diplomaDetails?.collegeName}</Descriptions.Item>
                    <Descriptions.Item label="Department">{application?.academicDetails?.diplomaDetails?.department}</Descriptions.Item>
                    <Descriptions.Item label="Year of Passing">{application?.academicDetails?.diplomaDetails?.yearOfPassing}</Descriptions.Item>
                    <Descriptions.Item label="CGPA" span={2}>{application?.academicDetails?.diplomaDetails?.cgpa}</Descriptions.Item>
                    <Descriptions.Item label="Marksheet" span={2}>
                      <Space>
                        <Tag icon={<ExclamationCircleOutlined />} color="warning"> Pending Verification</Tag>
                        <Button shape='round' onClick={() => setDiplomaMarkSheetVisible(true)} icon={<EyeFilled />} size="small">View</Button>
                        {/* <Button type="primary" icon={<CheckCircleOutlined />} shape='round' style={{backgroundColor:'#5cb85c'}} size="small">Approve</Button>
                        <Button type="primary" shape='round' danger icon={<CloseCircleOutlined />} size="small">Reject</Button> */}
                      </Space>
                    </Descriptions.Item>
                  </Descriptions>
                </>}
              </>}
             
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Documents">
              {loading ? 
              [1,2,3].map((item) => (
              
              <Row key={item} gutter={12}>
                <Col span={6}>
                  <Skeleton.Image active style={{ minWidth: '100%' }} />
                </Col>
                <Col span={12}>
                  <Skeleton.Button active style={{ minWidth: '10em' }} /> <br/> <br/>
                  <Skeleton.Button active style={{ minWidth: '10em' }} />
                </Col>
                <Divider />
              </Row>
              )) : <>
              <Card style={{
                borderLeft: application?.basicDetails?.photoDocument?.is_verified ? application?.basicDetails?.photoDocument?.status  === "APPROVED" ? '5px solid #5cb85c' : '5px solid #d9534f' : '5px solid #f0ad4e',
              }}>
                <Row gutter={12}>
                  <Col span={12}>
                <Image           
                preview={{
                  visible: photoVisible,
                  onVisibleChange: (visible, prevVisible) => setPhotoVisible(visible),
                  title: 'Photo', 
                }} src={application?.basicDetails?.photoDocument?.file_url} fallback={placeHolderImage} />
                </Col>
                <Col span={12} style={{
                  textAlign: 'center',
                }}>
                    <span style={{
                      display: 'block',
                      marginBottom: '.5em',
                      color: '#999',
                      fontSize: '1.2em',
                    }}>Candidate Photo</span>
                    {application?.basicDetails?.photoDocument.is_verified ? <>
                      {application?.basicDetails?.photoDocument.status === "APPROVED" ? 
                        <Space>
                          <CheckCircleOutlined style={{color: '#5cb85c', fontSize:'2em'}} />
                          <Text strong style={{color: '#5cb85c'}}>Approved</Text>
                        </Space> 
                        :
                        <Space>
                        <CloseCircleOutlined style={{color: '#d9534f',fontSize:'2em'}}/>
                        <Text strong style={{color: '#d9534f'}}>Rejected</Text>
                      </Space>
                      }
                    </> : 
                    <Space>
                      <ExclamationCircleOutlined style={{color: '#f0ad4e',fontSize:'2em'}}/>
                      <Text strong style={{color: '#f0ad4e'}}>Pending</Text>
                    </Space>
                    }
                  <Space direction='vertical' style={{
                    width: '100%',
                    marginTop: '1em',
                  }}>
                    <Button shape='round'  icon={<EyeFilled />} onClick={() => setPhotoVisible(true)} style={{display:'block', width:'100%'}}>View</Button>
                    {application?.status !== "APPROVED" && <>
                      {application?.basicDetails?.photoDocument?.is_verified ? application?.basicDetails?.photoDocument?.status === "APPROVED" ? 
                        <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.basicDetails?.photoDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          : 
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.basicDetails?.photoDocument, "APPROVED")
                            }}
                          >Approve</Button> : <>
                          
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.basicDetails?.photoDocument, "APPROVED")
                            }}
                          >Approve</Button>
                          <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.basicDetails?.photoDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          </>
                        }
                    </>}
                  </Space>
                </Col>
                </Row>
              </Card>
              <Divider />
              {/* Signature */}
              <Card style={{
                borderLeft: application?.basicDetails?.signatureDocument?.is_verified ? application?.basicDetails?.signatureDocument?.status  === "APPROVED" ? '5px solid #5cb85c' : '5px solid #d9534f' : '5px solid #f0ad4e',
              }}>
                <Row gutter={12}>
                  <Col span={12}>
                <Image           
                preview={{
                  visible: signatureDocumentVisible,
                  onVisibleChange: (visible, prevVisible) => setSignatureDocumentVisible(visible),
                  title: 'Photo', 
                }} src={application?.basicDetails?.signatureDocument?.file_url} fallback={placeHolderImage} />
                </Col>
                <Col span={12} style={{
                  textAlign: 'center',
                }}>
                    <span style={{
                      display: 'block',
                      marginBottom: '.5em',
                      color: '#999',
                      fontSize: '1.2em',
                    }}>Candidate Signature</span>
                    {application?.basicDetails?.signatureDocument.is_verified ? <>
                      {application?.basicDetails?.signatureDocument.status === "APPROVED" ? 
                        <Space>
                          <CheckCircleOutlined style={{color: '#5cb85c', fontSize:'2em'}} />
                          <Text strong style={{color: '#5cb85c'}}>Approved</Text>
                        </Space> 
                        :
                        <Space>
                        <CloseCircleOutlined style={{color: '#d9534f',fontSize:'2em'}}/>
                        <Text strong style={{color: '#d9534f'}}>Rejected</Text>
                      </Space>
                      }
                    </> : 
                    <Space>
                      <ExclamationCircleOutlined style={{color: '#f0ad4e',fontSize:'2em'}}/>
                      <Text strong style={{color: '#f0ad4e'}}>Pending</Text>
                    </Space>
                    }
                  <Space direction='vertical' style={{
                    width: '100%',
                    marginTop: '1em',
                  }}>
                    <Button shape='round'  icon={<EyeFilled />} onClick={() => setSignatureDocumentVisible(true)} style={{display:'block', width:'100%'}}>View</Button>
                    {application?.status !== "APPROVED" && <>
                      {application?.basicDetails?.signatureDocument?.is_verified ? application?.basicDetails?.signatureDocument?.status === "APPROVED" ? 
                        <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.basicDetails?.signatureDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          : 
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.basicDetails?.signatureDocument, "APPROVED")
                            }}
                          >Approve</Button> : <>
                          
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.basicDetails?.signatureDocument, "APPROVED")
                            }}
                          >Approve</Button>
                          <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.basicDetails?.signatureDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          </>
                        }
                    </>}
                  </Space>
                </Col>
                </Row>
              </Card>
              <Divider />
              <Card style={{
                borderLeft: application?.basicDetails?.identityDocument?.is_verified ? application?.basicDetails?.identityDocument?.status  === "APPROVED" ? '5px solid #5cb85c' : '5px solid #d9534f' : '5px solid #f0ad4e',
              }}>
                <Row gutter={12}>
                  <Col span={12}>
                <Image           
                preview={{
                  visible: idProofVisible,
                  onVisibleChange: (visible, prevVisible) => setIdProofVisible(visible),
                  title: 'Photo', 
                }} src={application?.basicDetails?.identityDocument?.file_url} fallback={placeHolderImage} />
                </Col>
                <Col span={12} style={{
                  textAlign: 'center',
                }}>
                    <span style={{
                      display: 'block',
                      marginBottom: '.5em',
                      color: '#999',
                      fontSize: '1.2em',
                    }}>ID Proof</span>
                    {application?.basicDetails?.identityDocument?.is_verified ? <>
                      {application?.basicDetails?.identityDocument?.status === "APPROVED" ? 
                        <Space>
                          <CheckCircleOutlined style={{color: '#5cb85c', fontSize:'2em'}} />
                          <Text strong style={{color: '#5cb85c'}}>Approved</Text>
                        </Space> 
                        :
                        <Space>
                        <CloseCircleOutlined style={{color: '#d9534f',fontSize:'2em'}}/>
                        <Text strong style={{color: '#d9534f'}}>Rejected</Text>
                      </Space>
                      }
                    </> : 
                    <Space>
                      <ExclamationCircleOutlined style={{color: '#f0ad4e',fontSize:'2em'}}/>
                      <Text strong style={{color: '#f0ad4e'}}>Pending</Text>
                    </Space>
                    }
                  <Space direction='vertical' style={{
                    width: '100%',
                    marginTop: '1em',
                  }}>
                    <Button shape='round'  icon={<EyeFilled />} onClick={() => setIdProofVisible(true)} style={{display:'block', width:'100%'}}>View</Button>
                    {application?.status !== "APPROVED" && <>
                      {application?.basicDetails?.identityDocument?.is_verified ? application?.basicDetails?.identityDocument?.status === "APPROVED" ? 
                        <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.basicDetails?.identityDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          : 
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.basicDetails?.identityDocument, "APPROVED")
                            }}
                          >Approve</Button> : <>
                          
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.basicDetails?.identityDocument, "APPROVED")
                            }}
                          >Approve</Button>
                          <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.basicDetails?.identityDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          </>
                        }
                    </>}
                  </Space>
                </Col>
                </Row>
              </Card>
              <Divider />
              <Card style={{
                borderLeft: application?.academicDetails?.classXDetails?.marksheetDocument?.is_verified ? application?.academicDetails?.classXDetails?.marksheetDocument?.status  === "APPROVED" ? '5px solid #5cb85c' : '5px solid #d9534f' : '5px solid #f0ad4e',
              }}>
                <Row gutter={12}>
                  <Col span={12}>
                <Image           
                preview={{
                  visible: classXMarkSheetVisible,
                  onVisibleChange: (visible, prevVisible) => setClassXMarkSheetVisible(visible),
                  title: 'Photo', 
                }} src={application?.academicDetails?.classXDetails?.marksheetDocument?.file_url} fallback={placeHolderImage} />
                </Col>
                <Col span={12} style={{
                  textAlign: 'center',
                }}>
                    <span style={{
                      display: 'block',
                      marginBottom: '.5em',
                      color: '#999',
                      fontSize: '1.2em',
                    }}>Class X Marksheet</span>
                    {application?.academicDetails?.classXDetails?.marksheetDocument?.is_verified ? <>
                      {application?.academicDetails?.classXDetails?.marksheetDocument?.status === "APPROVED" ? 
                        <Space>
                          <CheckCircleOutlined style={{color: '#5cb85c', fontSize:'2em'}} />
                          <Text strong style={{color: '#5cb85c'}}>Approved</Text>
                        </Space> 
                        :
                        <Space>
                        <CloseCircleOutlined style={{color: '#d9534f',fontSize:'2em'}}/>
                        <Text strong style={{color: '#d9534f'}}>Rejected</Text>
                      </Space>
                      }
                    </> : 
                    <Space>
                      <ExclamationCircleOutlined style={{color: '#f0ad4e',fontSize:'2em'}}/>
                      <Text strong style={{color: '#f0ad4e'}}>Pending</Text>
                    </Space>
                    }
                  <Space direction='vertical' style={{
                    width: '100%',
                    marginTop: '1em',
                  }}>
                    <Button shape='round'  icon={<EyeFilled />} onClick={() => setClassXMarkSheetVisible(true)} style={{display:'block', width:'100%'}}>View</Button>
                    {application?.status !== "APPROVED" && <>
                      {application?.academicDetails?.classXDetails?.marksheetDocument?.is_verified ? application?.academicDetails?.classXDetails?.marksheetDocument?.status === "APPROVED" ? 
                        <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.academicDetails?.classXDetails?.marksheetDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          : 
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.academicDetails?.classXDetails?.marksheetDocument, "APPROVED")
                            }}
                          >Approve</Button> : <>
                          
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.academicDetails?.classXDetails?.marksheetDocument, "APPROVED")
                            }}
                          >Approve</Button>
                          <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.academicDetails?.classXDetails?.marksheetDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          </>
                        }
                    </>}
                    
                  </Space>
                </Col>
                </Row>
              </Card>
              <Divider />
              {application?.academicDetails?.classXIIDetails &&<>
                <Card style={{
                borderLeft: application?.academicDetails?.classXIIDetails?.marksheetDocument?.is_verified ? application?.academicDetails?.classXIIDetails?.marksheetDocument?.status  === "APPROVED" ? '5px solid #5cb85c' : '5px solid #d9534f' : '5px solid #f0ad4e',
              }}>
                <Row gutter={12}>
                  <Col span={12}>
                <Image           
                preview={{
                  visible: classXIIMarkSheetVisible,
                  onVisibleChange: (visible, prevVisible) => setClassXIIMarkSheetVisible(visible),
                  title: 'Photo', 
                }} src={application?.academicDetails?.classXIIDetails?.marksheetDocument?.file_url} fallback={placeHolderImage} />
                </Col>
                <Col span={12} style={{
                  textAlign: 'center',
                }}>
                    <span style={{
                      display: 'block',
                      marginBottom: '.5em',
                      color: '#999',
                      fontSize: '1.2em',
                    }}>Class XII Marksheet</span>
                    {application?.academicDetails?.classXIIDetails?.marksheetDocument?.is_verified ? <>
                      {application?.academicDetails?.classXIIDetails?.marksheetDocument?.status === "APPROVED" ? 
                        <Space>
                          <CheckCircleOutlined style={{color: '#5cb85c', fontSize:'2em'}} />
                          <Text strong style={{color: '#5cb85c'}}>Approved</Text>
                        </Space> 
                        :
                        <Space>
                        <CloseCircleOutlined style={{color: '#d9534f',fontSize:'2em'}}/>
                        <Text strong style={{color: '#d9534f'}}>Rejected</Text>
                      </Space>
                      }
                    </> : 
                    <Space>
                      <ExclamationCircleOutlined style={{color: '#f0ad4e',fontSize:'2em'}}/>
                      <Text strong style={{color: '#f0ad4e'}}>Pending</Text>
                    </Space>
                    }
                  <Space direction='vertical' style={{
                    width: '100%',
                    marginTop: '1em',
                  }}>
                    <Button shape='round'  icon={<EyeFilled />} onClick={() => setClassXIIMarkSheetVisible(true)} style={{display:'block', width:'100%'}}>View</Button>
                    {application?.status !== "APPROVED" && <>
                      {application?.academicDetails?.classXIIDetails?.marksheetDocument?.is_verified ? application?.academicDetails?.classXIIDetails?.marksheetDocument?.status === "APPROVED" ? 
                        <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.academicDetails?.classXIIDetails?.marksheetDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          : 
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.academicDetails?.classXIIDetails?.marksheetDocument, "APPROVED")
                            }}
                          >Approve</Button> : <>
                          
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.academicDetails?.classXIIDetails?.marksheetDocument, "APPROVED")
                            }}
                          >Approve</Button>
                          <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.academicDetails?.classXIIDetails?.marksheetDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          </>
                        }
                    </>}
                    
                  </Space>
                </Col>
                </Row>
              </Card>
              </>}
              {application?.academicDetails?.diplomaDetails && <>
                <Card style={{
                borderLeft: application?.academicDetails?.diplomaDetails?.marksheetDocument?.is_verified ? application?.academicDetails?.diplomaDetails?.marksheetDocument?.status  === "APPROVED" ? '5px solid #5cb85c' : '5px solid #d9534f' : '5px solid #f0ad4e',
              }}>
                <Row gutter={12}>
                  <Col span={12}>
                <Image           
                preview={{
                  visible: diplomaMarkSheetVisible,
                  onVisibleChange: (visible, prevVisible) => setDiplomaMarkSheetVisible(visible),
                  title: 'Photo', 
                }} src={application?.academicDetails?.diplomaDetails?.marksheetDocument?.file_url} fallback={placeHolderImage} />
                </Col>
                <Col span={12} style={{
                  textAlign: 'center',
                }}>
                    <span style={{
                      display: 'block',
                      marginBottom: '.5em',
                      color: '#999',
                      fontSize: '1.2em',
                    }}>Diploma Marksheet</span>
                    {application?.academicDetails?.diplomaDetails?.marksheetDocument?.is_verified ? <>
                      {application?.academicDetails?.diplomaDetails?.marksheetDocument?.status === "APPROVED" ? 
                        <Space>
                          <CheckCircleOutlined style={{color: '#5cb85c', fontSize:'2em'}} />
                          <Text strong style={{color: '#5cb85c'}}>Approved</Text>
                        </Space> 
                        :
                        <Space>
                        <CloseCircleOutlined style={{color: '#d9534f',fontSize:'2em'}}/>
                        <Text strong style={{color: '#d9534f'}}>Rejected</Text>
                      </Space>
                      }
                    </> : 
                    <Space>
                      <ExclamationCircleOutlined style={{color: '#f0ad4e',fontSize:'2em'}}/>
                      <Text strong style={{color: '#f0ad4e'}}>Pending</Text>
                    </Space>
                    }
                  <Space direction='vertical' style={{
                    width: '100%',
                    marginTop: '1em',
                  }}>
                    <Button shape='round'  icon={<EyeFilled />} onClick={() => setDiplomaMarkSheetVisible(true)} style={{display:'block', width:'100%'}}>View</Button>
                    {application?.status !== "APPROVED" && <>
                      {application?.academicDetails?.diplomaDetails?.marksheetDocument?.is_verified ? application?.academicDetails?.diplomaDetails?.marksheetDocument?.status === "APPROVED" ? 
                        <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.academicDetails?.diplomaDetails?.marksheetDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          : 
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.academicDetails?.diplomaDetails?.marksheetDocument, "APPROVED")
                            }}
                          >Approve</Button> : <>
                          
                          <Button shape='round' icon={<CheckCircleOutlined />} type="primary" style={{display:'block', width:'100%', backgroundColor:'#5cb85c'}}
                            onClick={() => {
                              updateDocumentStatus(application?.academicDetails?.diplomaDetails?.marksheetDocument, "APPROVED")
                            }}
                          >Approve</Button>
                          <Button shape='round' type="primary" icon={<CloseCircleOutlined />} danger style={{display:'block', width:'100%'}}
                          onClick={() => {
                            updateDocumentStatus(application?.academicDetails?.diplomaDetails?.marksheetDocument, "REJECTED")
                          }}
                          >Reject</Button>
                          </>
                        }
                    </>}
                  </Space>
                </Col>
                </Row>
              </Card>
              </>}
              </>}
            </Card>
            
          </Col>
          <Col span={24} style={{
            marginTop: '1em',
            textAlign: 'center',
            backgroundColor: '#fff',
            padding: '1em',
            width: '100%',
            position: 'fixed',
            bottom: '0',
            left: '35%',
            transform: 'translateX(-35%)',
            borderTop: '1px solid #e8e8e8',
          }}>
            {!loading && <>
            <Tooltip title={application?.status === 'APPROVED' ? 'Application Already Approved' : 'Approve Application'}>
              <Button
                disabled={
                  application?.status === "APPROVED" ||
                  application?.basicDetails?.photoDocument?.status !== "APPROVED" ||
                  application?.basicDetails?.signatureDocument?.status !== "APPROVED" ||
                  application?.academicDetails?.classXDetails?.marksheetDocument?.status !== "APPROVED" ||
                  (application?.academicDetails?.classXIIDetails && application?.academicDetails?.classXIIDetails?.marksheetDocument?.status !== "APPROVED") ||
                  (application?.academicDetails?.diplomaDetails && application?.academicDetails?.diplomaDetails?.marksheetDocument?.status !== "APPROVED")
                }
                onClick={() => {
                  if (application)
                  updateApplicationStatus(application.id, "APPROVED")
                }}
                icon={<CheckCircleOutlined/>} disabl type='primary' shape='round' style={{
                backgroundColor: application?.status === "APPROVED" ? '#fff' : '#5cb85c',
                boxShadow: '0 0 10px rgba(0,0,0,.2)',
              }}>Approve Application</Button>
            </Tooltip>
              <Button
              onClick={() => {
                if (application)
                updateApplicationStatus(application.id, "REJECTED")
              }}
                disabled={application?.status === "REJECTED"}
              icon={
                <CloseCircleOutlined />
              } shape='round' type="primary" danger style={{
                marginLeft: '1em',
              }}>Reject Application</Button>
              {application?.status === "SUBMITTED" ? <Tag color="#f0ad4e" style={{float: 'right', marginTop:'.5em'}} icon={<ExclamationCircleOutlined />}>Pending</Tag> :
              application?.status === "APPROVED" ? <Tag color="#5cb85c" style={{float: 'right', marginTop:'.5em'}} icon={<CheckCircleOutlined />}>Approved</Tag> :
              <Tag color="#d9534f" style={{float: 'right', marginTop:'.5em'}} icon={<CloseCircleOutlined />}>Rejected</Tag>}
            </>}
          </Col>
        </Row>
    </>)
}

export default Application;