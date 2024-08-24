import YourCart from "../components/cores/coreCheckout/YourCart";
import { useFormik } from 'formik';
import { orderValidation } from "../utils/orderValidation";
import { placedUsrOrder } from "../reducers/orderReducer";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Checkout = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            shippingAddress1: '',
            shippingAddress2: '',
            city: '',
            phone: '',
            zip: '',
            country: '',
            cardName: '',
            cardNo: '',
            expiration: '',
            cvv: ''
        },
        validationSchema: orderValidation,
        onSubmit: async (data, { resetForm }) => {
            try {
                const formData = {
                    shippingAddress1: data.shippingAddress1,
                    shippingAddress2: data.shippingAddress2,
                    city: data.city,
                    phone: +data.phone,
                    zip: +data.zip,
                    country: data.country,
                };
                const res = await placedUsrOrder(formData);
                resetForm();
                toast.success(res, {
                    theme: 'colored'
                });
                navigate('/orderSuccess');
            } catch (error) {
                toast.error(error, {
                    theme: 'colored'
                });
                navigate('/orderFailure');
            }
        }
    });

    return (
        <div className="container mb-5">
            <main>
                <div className="py-5 text-center">
                    <h2>Checkout</h2>
                </div>
                <div className="row g-3">
                    <YourCart />
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Shipping address</h4>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">John Doe</h5>
                                <h6 className="card-subtitle mb-2 text-muted ">111, Sapphire Street, NJ, 11111</h6>
                                <p className="card-text">+91-1111111111</p>
                                <input type="checkbox" name="address" id="use-address" /> Use this Address
                            </div>
                        </div>
                        <hr className="my-4" />
                        <h5>OR</h5>
                        <h4 className="mb-3">Add New Address</h4>
                        <form className="needs-validation" onSubmit={formik.handleSubmit}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="shippingAddress1" className="form-label">Shipping Address 1</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="shippingAddress1"
                                        placeholder="Primary Shipping Address"
                                        value={formik.values.shippingAddress1}
                                        onChange={formik.handleChange}
                                        name="shippingAddress1"
                                    />
                                    <div className="text-danger">
                                        {formik.errors.shippingAddress1 && formik.touched.shippingAddress1 && formik.errors.shippingAddress1}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="shippingAddress2" className="form-label">Shipping Address 2</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="shippingAddress2"
                                        placeholder="Secondary Shipping Address"
                                        value={formik.values.shippingAddress2}
                                        onChange={formik.handleChange}
                                        name="shippingAddress2"
                                    />
                                    <div className="text-danger">
                                        {formik.errors.shippingAddress2 && formik.touched.shippingAddress2 && formik.errors.shippingAddress2}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="city" className="form-label">City<span className="text-muted" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        placeholder="Enter Your City Name"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        name="city"
                                    />
                                    <div className="text-danger">
                                        {formik.errors.city && formik.touched.city && formik.errors.city}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="phone" className="form-label">Phone No</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        placeholder="+91 xxxxxxxx"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        name="phone"
                                    />
                                    <div className="text-danger">
                                        {formik.errors.phone && formik.touched.phone && formik.errors.phone}
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select
                                        className="form-select"
                                        id="country"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        name="country"
                                    >
                                        <option value="">Choose Country</option>
                                        <option value="USA">United States</option>
                                        <option value="India">India</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                    </select>
                                    <div className="text-danger">
                                        {formik.errors.country && formik.touched.country && formik.errors.country}
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Zip Code<span className="text-muted">(Optional)</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zip"
                                        placeholder="Enter your zip code"
                                        value={formik.values.zip}
                                        onChange={formik.handleChange}
                                        name="zip"
                                    />
                                    <div className="text-danger">
                                        {formik.errors.zip && formik.touched.zip && formik.errors.zip}
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="my-3">
                                <div className="form-check">
                                    <input
                                        id="credit"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        value="credit"
                                        defaultChecked
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        id="debit"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        value="debit"
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        id="paypal"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        value="paypal"
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                </div>
                            </div>
                            <div className="row gy-3">
                                <div className="col-md-6">
                                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cc-name"
                                        placeholder="Name on Card"
                                        value={formik.values.cardName}
                                        onChange={formik.handleChange}
                                        name="cardName"
                                    />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="text-danger">
                                        {formik.errors.cardName && formik.touched.cardName && formik.errors.cardName}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cc-number"
                                        placeholder="Credit Card No"
                                        value={formik.values.cardNo}
                                        onChange={formik.handleChange}
                                        name="cardNo"
                                    />
                                    <div className="text-danger">
                                        {formik.errors.cardNo && formik.touched.cardNo && formik.errors.cardNo}
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="cc-expiration"
                                        placeholder="MM/YY"
                                        value={formik.values.expiration}
                                        onChange={formik.handleChange}
                                        name="expiration"
                                    />
                                    <div className="text-danger">
                                        {formik.errors.expiration && formik.touched.expiration && formik.errors.expiration}
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cc-cvv"
                                        placeholder="CVV"
                                        value={formik.values.cvv}
                                        onChange={formik.handleChange}
                                        name="cvv"
                                    />
                                    <div className="text-danger">
                                        {formik.errors.cvv && formik.touched.cvv && formik.errors.cvv}
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;
