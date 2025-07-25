import React, { useEffect, useState } from 'react';

const SuccessKhalti = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch payment status from server
        fetch('/api/payment/status') // update endpoint if different
            .then((res) => res.json())
            .then((data) => {
                setPaymentData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch payment status', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!paymentData) return <p>No payment data available</p>;

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Payment Status</h2>
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                <p><strong>Transaction ID:</strong> {paymentData.transactionId}</p>
                <p><strong>PIDX:</strong> {paymentData.pidx}</p>
                <p><strong>Product ID:</strong> {paymentData.productId}</p>
                <p><strong>Amount:</strong> Rs. {paymentData.amount}</p>
                <p><strong>Status:</strong> {paymentData.status}</p>
                <p><strong>Payment Gateway:</strong> {paymentData.paymentGateway}</p>
                <p><strong>Payment Date:</strong> {new Date(paymentData.paymentDate).toLocaleString()}</p>

                <hr />
                <h4>Verification Details:</h4>
                <p><strong>Total Amount:</strong> {paymentData.dataFromVerificationReq?.total_amount}</p>
                <p><strong>Verification Status:</strong> {paymentData.dataFromVerificationReq?.status}</p>
                <p><strong>Transaction Fee:</strong> {paymentData.dataFromVerificationReq?.fee}</p>

                <hr />
                <h4>User Submitted Details:</h4>
                <p><strong>Mobile:</strong> {paymentData.apiQueryFromUser?.mobile}</p>
                <p><strong>Purchase Order ID:</strong> {paymentData.apiQueryFromUser?.purchase_order_id}</p>
                <p><strong>Purchase Order Name:</strong> {paymentData.apiQueryFromUser?.purchase_order_name}</p>
            </div>
        </div>
    );
};

export default SuccessKhalti ;
