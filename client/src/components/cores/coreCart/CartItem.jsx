import { useDispatch } from 'react-redux';
import { addToCart, removeItemCart } from "../../../reducers/cartReducer";

const CartItem = ({ cart, index }) => {
    const dispatch = useDispatch();

    const handleRemoveItem = async (productId) => {
        await dispatch(removeItemCart(productId));
    };
    const handleQuantityChanged = (productId, e) => {
        const quantity = e.target.value;
        dispatch(addToCart({ productId, quantity }));
    };
    return (
        <div className="cart-item p-3" key={index}>
            <div className="d-flex flex-row">
                <img className="col-2 img-fluid" src={cart?.productId?.pro_image} alt="..." style={{ height: '150px' }} />
                <div className="col-6 p-2">
                    <h5>{cart?.productId?.name}</h5>
                    <h6>Brand</h6>
                    <p>${cart?.productId?.price}</p>
                </div>
                <div className="col-2 p-2">
                    Quantity
                    <select name={`quantity-${index}`} id={`quantity-${index}`} onClick={(event) => handleQuantityChanged(cart?.productId, event)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>
                <div
                    className="col-2 d-flex justify-content-end align-items-start close"
                    onClick={() => handleRemoveItem(cart?.productId?._id)}
                >
                    <i className="bi bi-x-circle" />
                </div>
            </div>
        </div>
    );
}

export default CartItem;
