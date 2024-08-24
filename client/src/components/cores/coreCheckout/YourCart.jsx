import { useDispatch, useSelector } from "react-redux"
import { STATUSES } from "../../../utils/statusObj";
import { useEffect } from "react";
import { getAllCarts } from "../../../reducers/cartReducer";


const YourCart = () => {
    const dispatch = useDispatch();
    const { carts, subTotal, error, status } = useSelector(state => state?.cartInfo);
    useEffect(() => {
        dispatch(getAllCarts());
    }, [dispatch]);
    if (status === STATUSES.ERROR) {
        return (
            <div className="container vh-100 justify-content-center align-items-center">
                <h1 className="text-danger my-3">{error}</h1>
            </div>
        );
    }
    return (
        <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge bg-secondary rounded-pill">{carts?.length}</span>
            </h4>
            <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 className="my-0">Total</h6>
                        <small className="text-muted">Cart Items</small>
                    </div>
                    <span className="text-muted">${carts?.length}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                        <h6 className="my-0">Promo code</h6>
                        <small>EXAMPLECODE</small>
                    </div>
                    <span className="text-success">−$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${subTotal}</strong>
                </li>
            </ul>
        </div>
    )
}

export default YourCart