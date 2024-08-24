import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../reducers/adminProductsReducer';
import { STATUSES } from '../../utils/statusObj';
import { Vortex } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { delProductBySlug } from '../../reducers/productsReducer';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, status, pagination, error } = useSelector((state) => state.adminProducts);

    const [currentPage, setCurrentPage] = useState(pagination.page || 1);

    useEffect(() => {
        dispatch(fetchProducts(currentPage));
    }, [dispatch, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.noOfPages) {
            setCurrentPage(page);
            dispatch(fetchProducts(page));
        }
    };
    const handleDelProduct = productSlug => {
        dispatch(delProductBySlug(productSlug));
        dispatch(fetchProducts(1));
    }
    return (
        <div className="container my-5">
            <div className="row mb-5">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <button className='btn btn-outline-primary' onClick={() => navigate('/admin/addNewProduct')}>Add new product</button>
                </div>
            </div>
            {status === STATUSES.ERROR ? (
                <div className="container vh-100 justify-content-center align-items-center">
                    <h1 className="text-danger my-3">{error}</h1>
                </div>
            ) : (
                <>
                    {status === STATUSES.LOADING ? (
                        <div className='d-flex justify-content-center align-items-center h-100'>
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
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sold</th>
                                        <th>Image</th>
                                        <th>Thumbnail Images</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>{product.brand}</td>
                                            <td>${product.price.toFixed(2)}</td>
                                            <td>{product.qty}</td>
                                            <td>{product.sold}</td>
                                            <td>
                                                <img src={product.pro_image} alt={product.name} style={{ width: '70px', height: '70px' }} />
                                            </td>
                                            <td>
                                                {
                                                    product?.thumbnail_image[0] && (<img src={product.thumbnail_image[0]} alt={product.name} style={{ width: '70px', height: '70px' }} className='mx-2' />)
                                                }
                                                {
                                                    product?.thumbnail_image[1] && (<img src={product.thumbnail_image[1]} alt={product.name} style={{ width: '70px', height: '70px' }} className='mx-2' />)
                                                }
                                                {
                                                    product?.thumbnail_image[2] && (<img src={product.thumbnail_image[2]} alt={product.name} style={{ width: '70px', height: '70px' }} className='mx-2' />)
                                                }
                                            </td>
                                            <td>
                                                <button className='btn btn-outline-success mx-2' onClick={() => navigate(`/admin/editProductForm/${product?.slug}`)}>Edit</button>
                                                <button className='btn btn-outline-danger' onClick={() => handleDelProduct(product?.slug)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Custom Pagination */}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${pagination.prevPage ? '' : 'disabled'}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(pagination.prevPage)}
                                    disabled={!pagination.prevPage}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(pagination.noOfPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${pagination.nextPage ? '' : 'disabled'}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(pagination.nextPage)}
                                    disabled={!pagination.nextPage}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default AdminProducts;
