import { useEffect, useState } from "react";


const OrderSuccess = () => {
  const [orderId, setOrderId] = useState('0000');
  const generateRandomNo = () => {
    const str = '0123456789abcdefghijklmnopqrstuvwxyz';
    let res = "";
    for (let i = 0; i < 10; i++) {
      res += str[Math.floor(Math.random() * str.length)];
      setOrderId(res);
    }
  };
  useEffect(() => {
    generateRandomNo();
  }, []);
  return (
    <div className="container my-5">
      <div>
        <h1 className="text-center">e-Shopper</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="login-box m-auto mt-5 col-4 text-center">
          <h3 className="text-center">Order #{orderId} Successful</h3>
          <i className="bi bi-check-circle-fill text-success success-icon" />
          <h6>We will deliver your order in X days</h6>
          <a href="/">Go Back To Home</a>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess