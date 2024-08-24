import DataTable from 'react-data-table-component';
import { Vortex } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../utils/statusObj';
import { useEffect } from 'react';
import { cancelUsrOrder, getAllOrders } from '../../reducers/orderReducer';
import { useNavigate } from 'react-router-dom';

const OrderLists = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, orders, error } = useSelector(state => state?.orders);
    const handleCancelOrder = orderId => {
        dispatch(cancelUsrOrder(orderId));
    };
    const handleEditOrder = orderId => {
        navigate(`editOrderStatus/${orderId}`);
    }
    const columns = [
        {
            name: 'Ordered_Items',
            selector: row => (
                <select>
                    {row?.items?.map((item, index) => (
                        <option key={index}>
                            {item?.productId?.name} - Qty: {item?.quantity} - Price: ${item?.price}
                        </option>
                    ))}
                </select>
            ),
            wrap: true,
        },
        {
            name: 'Shipping_Address1',
            selector: row => row?.shippingAddress1,
        },
        {
            name: 'Shipping_Address2',
            selector: row => row?.shippingAddress2,
        },
        {
            name: 'City',
            selector: row => row?.city,
        },
        {
            name: 'Zip_Code',
            selector: row => row?.zip,
        },
        {
            name: 'Country',
            selector: row => row?.country,
        },
        {
            name: 'Phone No',
            selector: row => row?.phone,
        },
        {
            name: 'Total_Amt',
            selector: row => `$${row?.totalAmount}`,
        },
        {
            name: 'Order_Status',
            selector: row => (
                <div style={{ padding: '7px', backgroundColor: 'purple', color: 'white', fontWeight: 'bolder', borderRadius: '10px' }}>
                    {row?.status}
                </div>
            ),
        },
        {
            name: 'User_EmailId',
            selector: row => row?.user?.email,
        },
        {
            name: 'Actions',
            selector: row => (
                <>
                    <button className='btn btn-outline-success my-2' onClick={() => handleEditOrder(row?._id)}>Edit Status</button>
                    <button className='btn btn-outline-danger my-2' onClick={() => handleCancelOrder(row?._id)}>Delete Order</button>
                </>
            ),
            wrap: true,
        },
    ];
    const customStyles = {
        headCells: {
            style: {
                fontSize: '16px', // increase font size
                fontWeight: 'bold', // make it bold
            },
        },
        cells: {
            style: {
                textAlign: 'center'
            }
        }
    };
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);
    if (status === STATUSES.ERROR) {
        return (<div className="container vh-100 d-flex justify-content-center align-items-center">
            <h1 className="text-danger my-3">{error}</h1>
        </div>);
    }
    return (
        <div>
            <h2>Users Orders list</h2>
            <DataTable
                data={orders}
                columns={columns}
                responsive
                striped
                pagination
                customStyles={customStyles}
                noDataComponent={status === STATUSES.LOADING ? (
                    <div className="spinner-container">
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
                ) : 'No records to display'}
            />
        </div>
    )
}

export default OrderLists