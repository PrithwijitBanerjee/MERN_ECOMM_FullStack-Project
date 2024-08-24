import { Link } from "react-router-dom"


const CartOrder = ({ subTotal }) => {
    return (
        <div className="col-4 order p-3 m-2">
            <h4>Order Total</h4>
            <div className="d-flex flex-row py-2">
                <input type="text" className="form-control" placeholder="promo code" />
                <button className="btn btn-primary">Apply</button>
            </div>
            <div className="d-flex flex-row justify-content-between p-2">
                <span className="billing-item">items</span>
                <span className="billing-cost">$100</span>
            </div>
            <div className="d-flex flex-row justify-content-between p-2">
                <span className="billing-item">Shipping</span>
                <span className="billing-cost">$10</span>
            </div>
            <div className="d-flex flex-row justify-content-between p-2">
                <span className="billing-item">Discount</span>
                <span className="billing-cost">-$10</span>
            </div>
            <div className="d-flex flex-row justify-content-between p-2">
                <span className="billing-item fs-5">Total</span>
                <span className="billing-cost fs-5">${subTotal}</span>
            </div>
            <div className="d-flex mt-3">
                <Link to="/checkout" className="btn btn-primary flex-grow-1">Pay Now</Link>
            </div>
        </div>
    )
}

export default CartOrder