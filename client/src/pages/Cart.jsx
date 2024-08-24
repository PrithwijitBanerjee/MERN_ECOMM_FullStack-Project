import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../utils/statusObj';
import { Vortex } from "react-loader-spinner";
import { useEffect } from 'react';
import { getAllCarts } from '../reducers/cartReducer';
import CartList from '../components/cores/coreCart/CartList';
import CartOrder from '../components/cores/coreCart/CartOrder';

const Cart = () => {
    const { status, carts, error, subTotal } = useSelector(state => state?.cartInfo);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCarts());
    }, [dispatch]);
    if (status === STATUSES.ERROR) {
        return (<div className='text-center'>
            <h2 className='text-danger'>{!!(error) && 'Something Went Wrong !!!'}</h2>
        </div>);
    }
    if (status === STATUSES?.LOADING) {
        return (
            <div className="text-center">
                <Vortex
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
            </div>
        );
    }
    return (
        <div className="container mb-5">
            <div className="d-flex flex-row align-items-start">
                <CartList carts={carts} />
                <CartOrder subTotal={subTotal} />
            </div>
        </div>
    )
}

export default Cart