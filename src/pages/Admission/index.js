import { useState, useEffect, useRef } from 'react';
import { Steps, Card, Space, Button, Tag, Row, Col, Image, DatePicker, Table, Avatar, Descriptions, QRCode, Divider, List, notification, Alert, Skeleton } from 'antd';
import { ExclamationCircleFilled, FilePdfOutlined, FilePdfFilled, CreditCardFilled, CloseOutlined, CreditCardOutlined, CheckCircleOutlined, LoadingOutlined,DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import collegeLogo from '../../assets/collegeLogo.jpeg';
import moment from 'moment';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
const AdmissionPage = () => {
    const navigate = useNavigate();
    const {submissionId} = useParams();
    const [api, contextHolder] = notification.useNotification();
    const [current, setCurrent] = useState(0);
    const [submissionData, setSubmissionData] = useState(null);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [razorpayLoading, setRazorpayLoading] = useState(false);
    const [paymentGatewayLoading, setPaymentGatewayLoading] = useState(false);
    const steps = [
        {
            title: 'Admission Fee',
            icon: current === 0 ? <CreditCardFilled /> : <CreditCardOutlined />,
            
        },
        {
            title: 'Admission Letter',
            icon: current === 1 ? <FilePdfFilled /> : <FilePdfOutlined />,
        }
    ];

    const getSubmissionData = async () => {
        setSubmissionLoading(true);
        try {
            const res = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH + '/payments/getAdmissionOrder', {
                submissionId: Number(submissionId)
            },{withCredentials: true});
            setSubmissionData(res.data);
            window.scrollTo(0, 0);
        } catch (error) {
            console.log("Failed to get submission data", error);
            api.error({
                message: "Failed to get submission data",
                description: error.response.data.message
            })
        } finally {
            setSubmissionLoading(false);
        }
    };

    const loadRazorpay = () => {
        setRazorpayLoading(true);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://checkout.razorpay.com/v1/checkout.js`;
        script.async = true;
        script.onload = () => {
          console.log('razorpay loaded')
          setRazorpayLoaded(true);
          setRazorpayLoading(false);
        }
        document.body.appendChild(script);
    }

    const displayRazorpay = async () => {
        setPaymentGatewayLoading(true);
        if(submissionData?.payment != null && submissionData?.payment?.status === 'captured') {
            api.warning({
                message: 'Payment Already Done',
            });
            setPaymentGatewayLoading(false);
            return;
        }

        if (razorpayLoaded && submissionData?.payment != null) {
            const paymentObject = new window.Razorpay({
                key: 'rzp_test_mtawFMx1J5ch4R',
                order_id: submissionData?.payment?.rpOrderId,
                amount: submissionData?.payment?.amount,
                currency: 'INR',
                name: 'Sikkim Institute of Science and Technology',
                description: 'Admission Fee',
                prefill:{
                    name: submissionData?.application?.basic_details?.name,
                    email: submissionData?.application?.basic_details?.email,
                    contact: submissionData?.application?.basic_details?.phone,
                },
                handler: function (response){
                    // Payment successfull
                    api.success({
                        message: 'Payment Successfull',
                        description: 'Your payment was successfull.',
                        placement: 'topRight',
                    });

                    api.info({
                        message: 'Transaction Details Sent via Email',
                        description: 'Your transaction details has been sent to your registered email address. Please check your email for more details.',
                        placement: 'topRight',
                    });

                    getSubmissionData();

                }
            });
            paymentObject.on('payment.failed', function (response){
                console.log(response.error.code);
                console.log(response.error.description);
                console.log(response.error.source);
                console.log(response.error.step);
                api.error({
                    message: 'Payment Failed',
                    description: response.error.description,
                    placement: 'topRight',
                });
                getSubmissionData();
            });
            paymentObject.open();
        }
    }

    useEffect(() => {
        getSubmissionData();
    }, [submissionId]);
    useEffect(() => {
        loadRazorpay();
    }, []);

    const PaymentComponent = () => {
        return (<>
            <div>
                <h3 style={{
                    textAlign: 'center',
                }}>Admission Fee</h3>
            </div>
            <div>
                <Row gutter={12}>
                {submissionData?.payment != null && submissionData?.payment?.status === 'captured' && (<>
                    <Col span={24}>
                        <Alert 
                        action={<div style={{
                            marginTop: '0.5rem',

                        }}>
                            <Button icon={<DownloadOutlined />} style={{background: 'green'}} type='primary' onClick={() => {setCurrent(1)}}>Download Admission Letter</Button>
                        </div>}
                        style={{
                            marginBottom: '1rem',
                        }} type='success' message='Payment Successfull' description='Your payment was successfull. Provision Admission confirmed' showIcon />
                    </Col>
                </>)}
                <Col span={20}>
                    {submissionLoading ? <Skeleton active /> : (<> 
                        <Descriptions bordered column={2}>
                            <Descriptions.Item label="Application ID">{submissionData?.applicationId}</Descriptions.Item>
                            <Descriptions.Item label="Name">{submissionData?.application?.basic_details?.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{submissionData?.application?.basic_details?.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone Number">{submissionData?.application?.basic_details?.phone}</Descriptions.Item>
                            <Descriptions.Item label="Application Type">{submissionData?.application?.application_type}</Descriptions.Item>
                            <Descriptions.Item label="Category">{submissionData?.application?.basic_details?.category} {submissionData?.application?.basic_details?.isCoi && "COI"}</Descriptions.Item>
                        </Descriptions>
                    </>)}
                </Col>
                <Col span={4} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {submissionLoading ? <Skeleton.Avatar active size={160} shape='square' /> : (<>
                    <Avatar size={160} shape='square' src={submissionData?.application?.basic_details?.photoDocument?.file_url} />
                    </>)}
                </Col>
                <Col span={24}>
                    <Divider>Admission Details</Divider>
                    {submissionLoading ? <Skeleton active /> : (<>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="Department">{submissionData?.departmentDetails?.departmentName}</Descriptions.Item>
                        <Descriptions.Item label="Batch">{submissionData?.batchDetails?.batchName}</Descriptions.Item>
                        <Descriptions.Item label="Session">{submissionData?.batchDetails?.startYear} - {submissionData?.batchDetails?.endYear}</Descriptions.Item>
                    </Descriptions>
                    </>)}
                </Col>
                <Divider>Payment Details</Divider>
                <Col span={24}>
                    {submissionLoading ? <Skeleton active /> : (<>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="ID">{submissionData?.payment?.id}</Descriptions.Item>
                        <Descriptions.Item label="Amount"><span style={{
                            fontWeight: 'bold',

                        }}>Rs.{submissionData?.payment?.amount / 100} /-</span></Descriptions.Item>
                        <Descriptions.Item label="Status">{submissionData?.payment?.status === 'captured' ? <Tag color='green'>Paid</Tag> : <Tag color='red'>Pending</Tag>}</Descriptions.Item>
                        <Descriptions.Item label="Payment Date">{submissionData?.payment?.isPaid ? moment(submissionData?.payment.paymentDate).format("Do MMM, YYYY") : "-"}</Descriptions.Item>
                        <Descriptions.Item label="Payment Mode">{submissionData?.payment?.paymentMode}</Descriptions.Item>
                        <Descriptions.Item label="Tracking ID"><span style={{fontWeight:'bold'}}>{submissionData?.payment?.rpOrderId.split("_")[1]}</span></Descriptions.Item>
                     </Descriptions>
                    </>)}
                </Col>
                <Col span={24} style={{
                    padding: '1em',
                }}>
                    <span style={{
                        color: 'red',
                        fontWeight: 'bold',
                    }}>Note: </span>After successful payment, you will not be able to cancel the admission or get your admission in another department.
                    <br/>
                    <span style={{
                        color: '#999',
                        fontSize: '0.8em',
                    }}>
                        Post payment, your admission will be Provisional and will be confirmed after verification of your documents physically.
                    </span>
                </Col>
                <Col span={24} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {submissionLoading ? <Skeleton.Button style={{
                        width: '10em',
                    }} active /> : (<>
                    <Button
                    icon={<CloseOutlined />}
                    onClick={() => {
                        navigate('/');
                    }}>Cancel</Button>
                    
                    <Button type='primary'
                    style={{
                        marginLeft: '1em',
                    }}
                    icon={<CreditCardOutlined />}
                    disabled={submissionData?.payment?.status === 'captured' || submissionLoading || razorpayLoading}
                    onClick={() => {
                        displayRazorpay();
                    }}>Pay Now</Button>
                    {
                        submissionData?.payment?.status === 'captured' && (<>
                            <Button type='primary'
                            style={{
                                marginLeft: '1em',
                            }}
                            icon={<DownloadOutlined />}
                            onClick={() => {
                                setCurrent(1);
                            }}>Download Admission Letter</Button>
                        </>)
                    }
                    </>)}
                </Col>
                </Row>
            </div>
        </>);
    };

    const AdmissionLetter = () => {
        return (<>
            <div >
                <h3 style={{
                    textAlign: 'center',
                }}>Admission Letter</h3>
                <Divider />
                <div id="admission-letter" style={{
                    width: '70%',
                    margin: '1em auto',
                    border: '1px solid #ddd',
                    padding: '1em 2em',
                    borderRadius: '5px',
                    shadow: '0 0 5px #ddd',
                    minHeight: 'calc(100vh - 200px)',
                    backgroundColor: '#fff',
                    borderBottom: 'none',
                }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Image src={collegeLogo} width={80} />
                    <div>
                        <span style={{
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            marginLeft: '1em',
                        }}>Sikkim Institute of Science & Technology</span>
                        <br/>
                        <span style={{
                            fontSize: '1em',
                            marginLeft: '1em',
                            display: 'block',
                            textAlign: 'center',
                        }}>(Affiliated to Central University of Sikkim)</span>
                        <span style={{
                            fontSize: '1em',
                            marginLeft: '1em',
                            display: 'block',
                            textAlign: 'center',
                        }}>Chisopani, South Sikkim</span>
                    </div>
                </div>
                <hr />
                <span style={{
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                    display: 'block',
                    textAlign: 'center',
                }}>Provisional Admission Letter</span>
                <hr/>
                <p>
                    <Row>
                        <Col span={18} style={{
                            textAlign: 'justify',
                            padding: '.5rem 1em',
                        }}>
                        This Provisional Admission Letter is issued to <strong>{submissionData?.application?.basic_details?.name}</strong> for admission in <strong>{submissionData?.departmentDetails?.departmentName}</strong> for the session <strong>{submissionData?.batchDetails?.startYear} - {submissionData?.batchDetails?.endYear}</strong> of <strong>{submissionData?.batchDetails?.batchName}</strong> batch.<br/>
                        This letter is valid till <strong>{moment().add(1, 'month').format("Do MMM, YYYY")}</strong>. Please note that this is a provisional admission letter and your admission will be confirmed after verification of your documents physically.

                        </Col>
                        <Col span={6}>
                            <QRCode value={`${process.env.REACT_APP_URL}/applications/${submissionData?.application?.id}`} />
                        </Col>
                    </Row>
                    <Descriptions title="Admission Details" bordered column={2}>
                        <Descriptions.Item label="Application ID">{submissionData?.application?.id}</Descriptions.Item>
                        <Descriptions.Item label="Application Date">{moment(submissionData?.application?.createdAt).format("Do MMM, YYYY")}</Descriptions.Item>
                        <Descriptions.Item label="Department">{submissionData?.departmentDetails?.departmentName}</Descriptions.Item>
                        <Descriptions.Item label="Batch">{submissionData?.batchDetails?.batchName}</Descriptions.Item>
                        <Descriptions.Item label="Session">{submissionData?.batchDetails?.startYear} - {submissionData?.batchDetails?.endYear}</Descriptions.Item>
                        <Descriptions.Item label="Application Status">{submissionData?.application?.status}</Descriptions.Item>
                        <Descriptions.Item label="Payment Status">{submissionData?.payment?.status === 'captured' ? <Tag color='green'>Paid</Tag> : <Tag color='red'>Pending</Tag>}</Descriptions.Item>
                        <Descriptions.Item label="Payment Date">{submissionData?.payment?.isPaid ? moment(submissionData?.payment.paymentDate).format("Do MMM, YYYY") : "-"}</Descriptions.Item>
                        <Descriptions.Item label="Payment Mode">{submissionData?.payment?.paymentMode}</Descriptions.Item>
                        <Descriptions.Item label="Tracking ID"><span style={{fontWeight:'bold'}}>{submissionData?.payment?.rpOrderId.split("_")[1]}</span></Descriptions.Item>
                        </Descriptions>
                        <br/>
                        <hr/>
                        <p style={{
                            textAlign: 'center',
                        }}>This is a computer generated document and does not require signature.</p>
                        <p style={{
                            textAlign: 'center',
                        }}>For any queries, please contact <strong> <a href="mailto:support@sist.edu.in">support@sist.edu.in</a></strong> or call <strong>0353-270389</strong> during office hours.</p>
                
                </p>

                </div>
            </div>
            <div style={{
                textAlign: 'center',
                padding: '1em',
            }}>
                <Button type='primary'
                style={{
                    marginLeft: '1em',
                }}
                icon={<DownloadOutlined />}
                onClick={() => {
                const input = document.getElementById('admission-letter');
                    html2canvas(input)
                    .then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        const pdf = new jsPDF('p', 'mm', 'a4');
                        const imgProps= pdf.getImageProperties(imgData);
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                        pdf.save("admission-letter.pdf");
                    }
                    );
                }}>Download</Button>
            </div>

        </>);
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
              {current === 0 && <PaymentComponent />}
              {current === 1 && <AdmissionLetter />}
            </div>
          </Card>
          </>
    )

}

export default AdmissionPage;