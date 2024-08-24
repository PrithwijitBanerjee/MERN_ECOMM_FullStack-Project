

const OrderFailure = () => {
  return (
    <div className="container my-5">
      <div>
        <h1 className="text-center">e-Shopper</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="login-box m-auto mt-5 col-4 text-center">
          <h3 className="text-center">Payment Failure</h3>
          <i className="bi bi-emoji-frown-fill text-danger success-icon" />
          <h6>Sorry, we couldn't complete the order due to payment issue. Please try again</h6>
        </div>
      </div>
    </div>
  )
}

export default OrderFailure