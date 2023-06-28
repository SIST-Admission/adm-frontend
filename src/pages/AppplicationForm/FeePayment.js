import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, List, Switch, Row, Descriptions, Tag, Button, Divider, Skeleton, notification, Alert } from "antd";
import axios from 'axios';
import moment from 'moment';

const FeePayment = ({
    applicationDetails,
    setCurrent
}) => {
    const userDetails = useSelector(state => state.userStore.user);
    const [api, contextHolder] = notification.useNotification();
    const [orderDetails, setOrderDetails] = useState(null);
    const [batches, setBatches] = useState([]);
    const [batchesLoading, setBatchesLoading] = useState(false);
    const [selectedBatches, setSelectedBatches] = useState([]);
    const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);
    const [razorpayLoading, setRazorpayLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [paymmentGatewayLoading, setPaymentGatewayLoading] = useState(false);

    const [submitApplicationLoading, setSubmitApplicationLoading] = useState(false);

    const [computerEngg, setComputerEngg] = useState(false);
    const [civilEngg, setCivilEngg] = useState(false);

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

    const loadBatches = async () => {
        setBatchesLoading(true);
        try {
            let res = await axios.get(process.env.REACT_APP_BACKEND_BASEPATH + `/batches/getAllBatches`, {
                withCredentials: true
              });
            setBatches(res.data);
        } catch (error) {
            setBatches([]);
            api.error({
                message: 'Error',
                description: 'Unable to load batches. Please try again later.',
                placement: 'topRight',
            });
        } finally{
            setBatchesLoading(false);
        }
    }

    useEffect(() => {
        loadRazorpay();
    }, [])

    useEffect(() => {
        getOrderDetails();
    }, [userDetails?.user?.id])

    const getOrderDetails = async () => {
        setOrderDetailsLoading(true);
        try {
            let resp = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH + '/payments/getOrder', {}, {withCredentials: true})
            setOrderDetails(resp.data);
            if (resp.data.status === 'paid') {
                await loadBatches();
            }
        } catch (error) {
            setOrderDetails(null);
        } finally {
            setOrderDetailsLoading(false);
        }
    }

    const displayRazorpay = async () => {
        setPaymentGatewayLoading(true);
        if(orderDetails != null && orderDetails.status === 'captured') {
            setPaymentGatewayLoading(false);
            return;
        }

        if (razorpayLoaded && orderDetails != null) {
            const paymentObject = new window.Razorpay({
                key: 'rzp_test_mtawFMx1J5ch4R',
                order_id: orderDetails?.id,
                amount: orderDetails?.amount,
                currency: orderDetails?.currency,
                name: 'Sikkim Institute of Science and Technology',
                description: 'Application Fee',
                prefill:{
                    name: userDetails?.user?.name,
                    email: userDetails?.user?.email,
                    contact: userDetails?.user?.phone,
                },
                handler: function (response){
                    // Payment successfull
                    api.success({
                        message: 'Payment Successfull',
                        description: 'Your payment was successfull. Please wait while we take you to the next step.',
                        placement: 'topRight',
                    });

                    api.info({
                        message: 'Transaction Details Sent via Email',
                        description: 'Your transaction details has been sent to your registered email address. Please check your email for more details.',
                        placement: 'topRight',
                    });

                    getOrderDetails();
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
                getOrderDetails();
            });
            paymentObject.open();
        }
    }

    const submitApplication = async () => {
        if (orderDetails?.status !== 'paid') {
            api.error({
                message: 'Payment Pending',
                description: 'Please make the payment to continue.',
                placement: 'topRight',
            });
            return;
        }

        if (selectedBatches.length === 0) {
            api.error({
                message: 'No Batches Selected',
                description: 'Please select atleast one batch to continue.',
                placement: 'topRight',
            });
            return;
        }
        console.log("batches")
        // Build Payload
        let payload = [];
        selectedBatches.forEach(batchCode => {
            let deptCode = batches.filter(b => b.batchCode === batchCode)[0].departmentCode;
            payload.push({
                batchCode: batchCode,
                departmentCode: deptCode,
            })
        });

        try {
            setSubmitApplicationLoading(true);
            let resp = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH + '/applications/submitApplication', {
                submissions: payload
            }, {withCredentials: true});
            api.success({
                message: 'Application Submitted',
                description: 'Your application has been submitted successfully. Please wait while we take you to the next step.',
                placement: 'topRight',
            });
            setCurrent(4);
        } catch (error) {
            api.error({
                message: 'Error',
                description: 'Unable to submit application. Please try again later.',
                placement: 'topRight',
            });
        } finally {
            setSubmitApplicationLoading(false);
        }
    }

    const Status = ({status}) => {
        switch(status) {
            case 'created':
                return <Tag color="blue">Pending</Tag>
            case 'authorized':
                return <Tag color="blue">Processing</Tag>
            case 'paid':
                return <Tag color="green">Success</Tag>
            case 'refunded':
                return <Tag color="red">Refunded</Tag>
            case 'failed':
                return <Tag color="red">Failed</Tag>
            case 'cancelled':
                return <Tag color="red">Cancelled</Tag>
            case 'expired':
                return <Tag color="red">Expired</Tag>
            case 'pending':
                return <Tag color="blue">Pending</Tag>
            default:
                return <Tag color="blue">Pending</Tag>
        }
    }

    return (
        <div style={{
            height: '100%',
            position: 'relative',
        }}>
            {contextHolder}
             <h3 style={{textAlign: 'center'}}>Application Fee</h3>
             <Row gutter={15}>
                { !orderDetailsLoading && orderDetails?.status === 'paid' && (<>
                    <Col span={24}>
                        <Alert style={{
                            width: '80%',
                            margin: '1em auto',
                        }} 
                        message="Payment Successfull" 
                        description="Your payment was successfull. You may now proceed to the next step."
                        type="success" showIcon />
                    </Col>
                </>)}
                <Col span={24}>
                    {orderDetailsLoading ? (<><Skeleton style={{
                    width: '80%',
                    margin: '1em auto',
                    }}/></>) : (<>
                  <Descriptions style={{
                    width: '80%',
                    margin: '1em auto',
                  }}>
                    <Descriptions.Item label="Application ID">{applicationDetails?.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{applicationDetails?.basicDetails?.name}</Descriptions.Item>
                    <Descriptions.Item label="Tracking ID">{orderDetails?.id ? orderDetails.id.split("_")[1]: '-'}</Descriptions.Item>
                    <Descriptions.Item label="Application Date">{moment(applicationDetails?.applicationStartDate).format("DD-MM-YYYY    ")}</Descriptions.Item>
                    <Descriptions.Item label="Application Status">
                        <Tag color="yellow">Pending</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Application Fee">Rs. {orderDetails?.amount / 100}</Descriptions.Item>
                    <Descriptions.Item label="Payment Mode">Online</Descriptions.Item>
                    <Descriptions.Item label="Payment Status">
                        <Status status={orderDetails?.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Attempts">{orderDetails?.attempts}</Descriptions.Item>
                  </Descriptions>
    
                  {orderDetails?.status === 'paid' && (<>
                    <Divider>Submit Application</Divider>
                    <p style={{textAlign: 'center'}}>Please select the departments you wish to apply for.</p>
                    <List bordered style={{
                        width: '50%',
                        margin: '1em auto',
                    }}>
                        {batchesLoading ? (<><Skeleton active /></>) : (<>
                            {batches.map((batch) => <List.Item key={batch.batchCode}>
                            <span>{batch.batchName}</span>
                            <Switch checked={selectedBatches.includes(batch.batchCode)} onChange={(v) => {
                                if(v) {
                                    setSelectedBatches([...selectedBatches, batch.batchCode]);
                                } else {
                                    setSelectedBatches(selectedBatches.filter((item) => item !== batch.batchCode));
                                }
                            }} style={{float: 'right'}}  />
                            </List.Item>)}
                        
                        </>)}
                    </List>
                  </>)}
                    </>)}
                 </Col>
             </Row>
             
        <div style={{
            marginTop: '1em',
            textAlign: 'center', 
        }}>
        
        {/* <Button style={{marginRight:'.3em'}} onClick={() => setCurrent(0)}>Previous</Button> */}
        {orderDetailsLoading ? (<><Skeleton.Button style={{marginRight:'.3em', width:'10em'}} active size="large" /></>) : orderDetails?.status === 'paid' ? (<>
            <Button loading={submitApplicationLoading} disabled={selectedBatches.length === 0} type="primary" onClick={() => submitApplication()}>Confirm & Submit</Button>
        </>) :(<>
            <Button type="primary" onClick={() => displayRazorpay()}>Proceed to Payment</Button>
        </>)}
      </div>
        </div>
    );
};

export default FeePayment;