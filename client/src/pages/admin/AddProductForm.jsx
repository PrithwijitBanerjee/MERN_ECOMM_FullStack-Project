import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../utils/statusObj';
import { getAllCategories } from '../../reducers/categoryReducer';
import { addNewProduct } from '../../reducers/productsReducer';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const navigate = useNavigate();
    const [proImagePreview, setProImagePreview] = useState(null);
    const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
    const dispatch = useDispatch();
    const { status, categories, error } = useSelector(state => state?.categories);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);
    const formik = useFormik({
        initialValues: {
            name: '',
            desc: '',
            price: '',
            qty: '',
            brand: '',
            category: '',
            sold: 0,
            pro_image: null,
            thumbnail_image: [],
            shipping_charge: 0
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Product name is required'),
            desc: Yup.string().required('Description is required'),
            price: Yup.number().required('Price is required'),
            qty: Yup.number().required('Quantity is required'),
            brand: Yup.string().required('Brand is required'),
            category: Yup.string().required('Category is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('desc', values.desc);
            formData.append('price', Number(values.price));  // Convert to number
            formData.append('qty', Number(values.qty));      // Convert to number
            formData.append('brand', values.brand);
            formData.append('category', values.category);
            formData.append('sold', Number(values.sold));    // Convert to number
            formData.append('pro_image', values.pro_image);
            values.thumbnail_image.forEach((image) => {
                formData.append('thumbnail_image', image);
            });
            formData.append('shipping_charge', Number(values.shipping_charge));  // Convert to number

            // Handle API request with formData here
            await addNewProduct(formData);
            resetForm();
            setProImagePreview(null);
            setThumbnailPreviews([]);
            navigate('/admin/products');
        },
        onReset: () => {
            setProImagePreview(null);
            setThumbnailPreviews([]);
        },
    });

    const handleProImageChange = (event) => {
        const file = event.target.files[0];
        setProImagePreview(URL.createObjectURL(file));
        formik.setFieldValue('pro_image', file);
    };

    const handleThumbnailChange = (event) => {
        const files = Array.from(event.target.files).slice(0, 3); // Limit to 3 images
        const previews = files.map(file => URL.createObjectURL(file));
        setThumbnailPreviews(previews);
        formik.setFieldValue('thumbnail_image', files);
    };
    if (status === STATUSES.ERROR) {
        return (<div className="container vh-100 justify-content-center align-items-center">
            <h1 className="text-danger my-3">{error}</h1>
        </div>);
    }
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ width: '30rem' }}>
                        <div className="card-body">
                            <h5 className="card-title mb-2">Add Product</h5>
                            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                                {/* Other form fields here */}
                                <div className="form-group">
                                    <label htmlFor="name">Product Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-danger">{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="desc">Description</label>
                                    <textarea
                                        id="desc"
                                        name="desc"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.desc}
                                    />
                                    {formik.touched.desc && formik.errors.desc ? (
                                        <div className="text-danger">{formik.errors.desc}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.price}
                                    />
                                    {formik.touched.price && formik.errors.price ? (
                                        <div className="text-danger">{formik.errors.price}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="qty">Quantity</label>
                                    <input
                                        id="qty"
                                        name="qty"
                                        type="number"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.qty}
                                    />
                                    {formik.touched.qty && formik.errors.qty ? (
                                        <div className="text-danger">{formik.errors.qty}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="brand">Brand</label>
                                    <input
                                        id="brand"
                                        name="brand"
                                        type="text"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.brand}
                                    />
                                    {formik.touched.brand && formik.errors.brand ? (
                                        <div className="text-danger">{formik.errors.brand}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        name="category"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.category}
                                    >
                                        <option value="" label="Select category" />
                                        {
                                            categories?.length !== 0 && categories?.map((category, index) => (
                                                <option value={category?._id} label={category?.name} key={index} />
                                            ))
                                        }
                                    </select>
                                    {formik.touched.category && formik.errors.category ? (
                                        <div className="text-danger">{formik.errors.category}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="sold">Sold</label>
                                    <input
                                        id="sold"
                                        name="sold"
                                        type="number"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.sold}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="shipping_charge">Shipping Charge</label>
                                    <input
                                        id="shipping_charge"
                                        name="shipping_charge"
                                        type="number"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.shipping_charge}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pro_image">Product Image</label>
                                    <input
                                        id="pro_image"
                                        name="pro_image"
                                        type="file"
                                        className="form-control"
                                        onChange={handleProImageChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {proImagePreview && (
                                        <img src={proImagePreview} alt="Product Preview" style={{ width: '100px', marginTop: '10px' }} />
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="thumbnail_image">Thumbnail Images (3 images)</label>
                                    <input
                                        id="thumbnail_image"
                                        name="thumbnail_image"
                                        type="file"
                                        className="form-control"
                                        multiple
                                        onChange={handleThumbnailChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="thumbnail-previews" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        {thumbnailPreviews.map((preview, index) => (
                                            <img key={index} src={preview} alt={`Thumbnail Preview ${index + 1}`} style={{ width: '60px' }} />
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">Add Product</button>
                                <button type="reset" className="btn btn-secondary mx-2">Reset Form</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;
