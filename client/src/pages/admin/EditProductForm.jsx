import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductBySlug, updateProduct } from '../../reducers/productsReducer'; // Assuming these actions exist
import { STATUSES } from '../../utils/statusObj';
import { getAllCategories } from '../../reducers/categoryReducer';

const EditProductForm = () => {
    const { slug } = useParams();

    const navigate = useNavigate();
    const [proImagePreview, setProImagePreview] = useState(null);
    const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
    const [initialValues, setInitialValues] = useState({
        name: '',
        desc: '',
        price: '',
        qty: '',
        brand: '',
        category: '', // Initialize as empty string to be populated later
        sold: 0,
        pro_image: null,
        thumbnail_image: [],
        shipping_charge: 0,
    });

    const dispatch = useDispatch();
    const { status, categories, error } = useSelector(state => state.categories);
    const productDetails = useSelector(state => state.products.product);
    useEffect(() => {
        dispatch(fetchProductBySlug(slug));
        dispatch(getAllCategories());
    }, [dispatch, slug]);

    useEffect(() => {
        if (productDetails) {
            setInitialValues(prevValues => ({
                ...prevValues,
                name: productDetails.name || '',
                desc: productDetails.desc || '',
                price: productDetails.price || '',
                qty: productDetails.qty || '',
                brand: productDetails.brand || '',
                category: productDetails.category || '',
                sold: productDetails.sold || 0,
                shipping_charge: productDetails.shipping_charge || 0,
            }));

            setProImagePreview(productDetails.pro_image);
            setThumbnailPreviews(productDetails.thumbnail_image || []);
        }
    }, [productDetails]);

    useEffect(() => {
        if (categories.length > 0 && productDetails) {
            const matchedCategory = categories.find(cat => cat._id === productDetails.category);
            if (matchedCategory) {
                setInitialValues(prevValues => ({
                    ...prevValues,
                    category: matchedCategory._id
                }));
            }
        }
    }, [categories, productDetails]);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('desc', values.desc);
            formData.append('price', Number(values.price));
            formData.append('qty', Number(values.qty));
            formData.append('brand', values.brand);
            formData.append('category', values.category); // Use the category value from the form
            formData.append('sold', Number(values.sold));
            // Ensure the file data is appended correctly
            if (values.pro_image) formData.append('pro_image', values.pro_image);

            // Ensure thumbnail_image array is appended correctly
            values.thumbnail_image.forEach((image, index) => {
                formData.append(`thumbnail_image[${index}]`, image);
            });
            formData.append('shipping_charge', Number(values.shipping_charge));

            // Update the product with the slug
            await updateProduct(slug, formData);
            navigate('/admin/products');
        },
        onReset: () => {
            setProImagePreview(productDetails?.pro_image || null);
            setThumbnailPreviews(productDetails?.thumbnail_image || []);
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
        return (
            <div className="container vh-100 justify-content-center align-items-center">
                <h1 className="text-danger my-3">{error}</h1>
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ width: '30rem' }}>
                        <div className="card-body">
                            <h5 className="card-title mb-2">Edit Product</h5>
                            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
                                        rows="3"
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
                                        value={formik.values.category.name} // Ensure the correct value is set
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
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
                                    {formik.touched.sold && formik.errors.sold ? (
                                        <div className="text-danger">{formik.errors.sold}</div>
                                    ) : null}
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
                                    {formik.touched.shipping_charge && formik.errors.shipping_charge ? (
                                        <div className="text-danger">{formik.errors.shipping_charge}</div>
                                    ) : null}
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

                                <button type="submit" className="btn btn-primary">Update Product</button>
                                <button type="reset" className="btn btn-secondary mx-2">Reset Form</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProductForm;
