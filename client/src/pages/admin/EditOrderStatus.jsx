import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from 'yup';
import { editOrderById } from "../../reducers/orderReducer";

const EditOrderStatus = () => {
    const { order_id } = useParams();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            orderStatus: ''
        },
        validationSchema: Yup.object().shape({
            orderStatus: Yup.string().required('**Order Status is required')
        }),
        onSubmit: async (data, { resetForm }) => {
            await editOrderById(order_id, data);
            resetForm();
            navigate('/admin/orders');
        }
    });
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ width: '30rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Edit Order</h5>
                            <div className="card-text">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <select
                                            id="orderStatus"
                                            name="orderStatus"
                                            className="form-control"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.orderStatus}
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <div className="text-danger">
                                            {
                                                formik.errors && formik.touched.orderStatus && formik.errors.orderStatus
                                            }
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary mx-2 my-2">Update Product</button>
                                    <button type="reset" className="btn btn-secondary my-2" onClick={formik.handleReset}>Reset Form</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrderStatus