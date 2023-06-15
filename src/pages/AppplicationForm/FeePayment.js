import { useEffect, useState } from 'react';
import { Card, Col, List, Switch, Row, Descriptions, Tag, Button } from "antd";
import axios from 'axios';

const FeePayment = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [razorpayLoading, setRazorpayLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [paymmentGatewayLoading, setPaymentGatewayLoading] = useState(false);

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

    useEffect(() => {
        loadRazorpay();
        getOrderDetails();
    }, [])

    const getOrderDetails = async () => {
        try {
            let resp = await axios.post(process.env.REACT_APP_BACKEND_BASEPATH + '/payments/getOrder', {}, {withCredentials: true})
            setOrderDetails(resp.data);
        } catch (error) {
            setOrderDetails(null);
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
                order_id: orderDetails.id,
                amount: orderDetails.amount,
                currency: orderDetails.currency,
                name: 'Sikkim Institute of Science and Technology',
                description: 'Application Fee',
                prefill:{
                    name: "Bijay Sharma",
                    email: "yoursbijay@outlook.com",
                    contact: "9832046671"
                },
                handler: function (response){
                    console.log(response);
                }
            })

            paymentObject.on('payment.failed', function (response){
                console.log(response);
            });
            paymentObject.on('payment.success', function (response){
                alert('Payment Successful');
                console.log(response);
            });
            paymentObject.open();
        }
    }

    return (
        <div style={{
            height: '100%',
            position: 'relative',
        }}>
             <h3 style={{textAlign: 'center'}}>Application Fee</h3>
             <Row gutter={15}>
                <Col span={24}>
                  <Descriptions style={{
                    width: '100%',
                    margin: '1em auto',
                  }}>
                    <Descriptions.Item label="Tracking ID">123456789</Descriptions.Item>
                    <Descriptions.Item label="Application Date">2021-08-01</Descriptions.Item>
                    <Descriptions.Item label="Application Status">Pending</Descriptions.Item>
                    <Descriptions.Item label="Application Fee">Rs. 500</Descriptions.Item>
                    <Descriptions.Item label="Payment Mode">Online</Descriptions.Item>
                    <Descriptions.Item label="Payment Status">
                      <Tag color="blue">Pending</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Date">-</Descriptions.Item>
                    <Descriptions.Item label="Payment ID">-</Descriptions.Item>
                    <Descriptions.Item label="Payment Remarks">-</Descriptions.Item>
                    <Descriptions.Item label="Payment Receipt">-</Descriptions.Item>
                    <Descriptions.Item label="Payment Attempts">0</Descriptions.Item>
                  </Descriptions>
                 </Col>
                {/* <Col span={24}>
                    <Card title="Apply For?" style={{
                        width: '50%',
                        margin: '1em auto',
                    }}>
                        <List>
                            <List.Item>
                                <span>B.Tech Computer Engineering</span>
                                <Switch style={{float: 'right'}} />
                            </List.Item>
                            <List.Item>
                                <span>B.Tech Civil Engineering</span>
                                <Switch style={{float: 'right'}} />
                            </List.Item>
                        </List>
                    </Card>
                </Col> */}
             </Row>
             
        <div style={{
            marginTop: '1em',
            textAlign: 'center', 
        }}>

        {/* <Button style={{marginRight:'.3em'}} onClick={() => setCurrent(0)}>Previous</Button> */}
        <Button type="primary" onClick={() => displayRazorpay()}>Proceed to Payment</Button>
      </div>
        </div>
    );
};

export default FeePayment;