import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { STATUSES } from '../../../utils/statusObj';
import { Vortex } from 'react-loader-spinner';
import { useEffect } from 'react';
import { getAllProducts, setCurrentPage } from '../../../reducers/productsReducer';
import { addToCart } from '../../../reducers/cartReducer';

const ProductList = () => {
    const navigate = useNavigate();
    const { status, products, error, currentPage } = useSelector(state => state?.products);
    const { status: status1, category, error: error1 } = useSelector(state => state?.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts()); // Fetch products when component mounts
    }, [dispatch, currentPage]); // Trigger useEffect when currentPage changes

    const goToProductDetails = slug => {
        navigate(`/product/${slug}`);
    };
    const handleAddToCart = async (productId, quantity) => {
        dispatch(addToCart({ productId, quantity }));
    };
    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page)); // Update the current page
    };

    if (error || error1) {
        return (
            <div className="text-center text-danger">
                <h2>{error ? error : error1}</h2>
            </div>
        );
    }
    const RenderProductItems = () => {
        return (<div id="products" className="row d-flex justify-content-center">
            {status === STATUSES?.LOADING ? (
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
            ) : (
                <>
                    {products?.products?.length !== 0 && products?.products?.map((product, index) => (
                        <div className="col-xl-3 col-lg-4 col-md-6 position-relative" key={index}>
                            <div className="card product-item">
                                <i className="bi bi-heart-fill position-absolute liked" />
                                <i className="bi bi-heart position-absolute like" />
                                <img
                                    src={product?.pro_image}
                                    onClick={() => goToProductDetails(product?.slug)}
                                    className="card-img-top"
                                    alt="..."
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Click to See Product Details"
                                    style={{ height: '270px' }}
                                />
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted  fw-light">{product?.category?.name}</h6>
                                    <h5 className="card-title">{product?.name}</h5>
                                    <p className="card-text price">
                                        ${product?.price}
                                        <span className="float-end rating-stars">
                                            <i className="bi bi-star-fill" />
                                            <i className="bi bi-star-fill" />
                                            <i className="bi bi-star-fill" />
                                        </span>
                                    </p>
                                    <div className="text-center">
                                        <Link
                                            className="btn btn-dark w-100"
                                            onClick={() => handleAddToCart(product?._id, 1)}
                                            role="button"
                                        >
                                            Add To Cart
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex align-items-center justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className={`page-item ${!products?.pagination?.prevPage ? 'disabled' : ''}`}>
                                            <Link
                                                className="page-link"
                                                onClick={() => handlePageChange(products?.pagination?.prevPage)}
                                                role="button"
                                            >
                                                Previous
                                            </Link>
                                        </li>
                                        {[...Array(products?.pagination?.noOfPages)].map((_, idx) => (
                                            <li
                                                key={idx + 1}
                                                className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                                            >
                                                <Link
                                                    className="page-link"
                                                    onClick={() => handlePageChange(idx + 1)}
                                                    role="button"
                                                >
                                                    {idx + 1}
                                                </Link>
                                            </li>
                                        ))}
                                        <li className={`page-item ${!products?.pagination?.nextPage ? 'disabled' : ''}`}>
                                            <Link
                                                className="page-link"
                                                onClick={() => handlePageChange(products?.pagination?.nextPage)}
                                                role="button"
                                            >
                                                Next
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>);
    }
    const RenderCategoryItems = () => {
        return (
            <div id="products" className="row d-flex justify-content-center">
                {status1 === STATUSES?.LOADING ? (
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
                ) : (
                    <>
                        {category?.category?.products?.length !== 0 ? category?.category?.products?.map((product, index) => (
                            <div className="col-xl-3 col-lg-4 col-md-6 position-relative" key={index}>
                                <div className="card product-item">
                                    <i className="bi bi-heart-fill position-absolute liked" />
                                    <i className="bi bi-heart position-absolute like" />
                                    <img
                                        src={product?.pro_image}
                                        onClick={() => goToProductDetails(product?.slug)}
                                        className="card-img-top"
                                        alt="..."
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Click to See Product Details"
                                        style={{ height: '270px' }}
                                    />
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-muted  fw-light">{product?.category?.name}</h6>
                                        <h5 className="card-title">{product?.name}</h5>
                                        <p className="card-text price">
                                            ${product?.price}
                                            <span className="float-end rating-stars">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                            </span>
                                        </p>
                                        <div className="text-center">
                                            <Link
                                                className="btn btn-dark w-100"
                                                onClick={() => handleAddToCart(product?._id, 1)}
                                                role="button"
                                            >
                                                Add To Cart
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (<div className="col-xl-3 col-lg-4 col-md-6 position-relative" style={{ minHeight: '10vh' }}>
                            <p>No item presents in this category</p>
                        </div>)}
                    </>
                )}
            </div>
        );
    }
    return (
        <>
            <div className="container mb-5">
                {
                    category ? <RenderCategoryItems /> : <RenderProductItems />
                }
            </div>
        </>
    );
};

export default ProductList;
