import CartItem from "./CartItem"


const CartList = ({ carts }) => {
    return (
        <div className="col-8 d-flex flex-column m-2">
            {carts && carts.length > 0 ? (
                carts.map((cart, index) => (
                    <CartItem cart={cart} index={index} key={index} />
                ))
            ) : (
                <div className="text-center py-5">
                    <h4>No items in the cart</h4>
                </div>
            )}
        </div>
    )
}

export default CartList