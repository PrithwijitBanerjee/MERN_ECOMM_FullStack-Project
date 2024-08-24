import { useParams } from "react-router-dom";
import Breadcumb from "../components/commons/Breadcumb";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getProduct } from "../reducers/productDetailReducer";
import { STATUSES } from "../utils/statusObj";
import { Vortex } from "react-loader-spinner";
import Thumbnails from "../components/cores/coreProduct/Thumbnails";

const Product = () => {
    const { slug } = useParams();
    const [breadcumb, setBreadcumb] = useState({
        name: '',
        category: ''
    });
    const [thumbnailImages, setThumbnailImages] = useState([]);
    const { status, product, error } = useSelector(state => state?.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        if (product) {
            setBreadcumb({
                name: product?.name,
                category: product?.category?.name
            });
            setThumbnailImages(product?.thumbnail_image);
        }
    }, [product]);

    if (error) {
        return (
            <div className="text-center text-danger">
                <h2>Something Went Wrong !!!</h2>
            </div>
        );
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
        <div>
            <Breadcumb breadcumbData={breadcumb} />
            <div className="container mb-5">
                <div className="row d-flex flex-row">
                    <div className="col-md-5 product-image">
                        <img className="img-fluid" src={product?.pro_image} alt="..." style={{ height: '500px', width: '500px' }} />
                    </div>
                    <Thumbnails thumbnailImages={thumbnailImages} />
                    <div className="col-md-5">
                        <h6 className="text-uppercase text-secondary">{product?.name}</h6>
                        <h2 className="fs-3">{product?.brand} {product?.category?.name}</h2>
                        <h5 className="text-secondary fs-6 fw-bold">${product?.price}</h5>
                        <div className="text-secondary text-small">color :</div>
                        <div className="my-2">
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
                                <label className="btn btn-danger color-label" htmlFor="btnradio1">
                                    <i className="bi bi-check2" />
                                </label>
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                <label className="btn btn-success color-label" htmlFor="btnradio2">
                                    <i className="bi bi-check2" />
                                </label>
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                                <label className="btn btn-dark color-label" htmlFor="btnradio3">
                                    <i className="bi bi-check2" />
                                </label>
                            </div>
                        </div>
                        <div className="text-secondary text-small">size :</div>
                        <div className="my-2">
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="size" id="btnradio4" autoComplete="off" defaultChecked />
                                <label className="btn btn-outline-dark" htmlFor="btnradio4">S</label>
                                <input type="radio" className="btn-check" name="size" id="btnradio5" autoComplete="off" />
                                <label className="btn btn-outline-dark" htmlFor="btnradio5">M</label>
                                <input type="radio" className="btn-check" name="size" id="btnradio6" autoComplete="off" />
                                <label className="btn btn-outline-dark" htmlFor="btnradio6">L</label>
                            </div>
                        </div>
                        <button className="btn btn-dark w-100 my-5" onclick="showToast()"><i className="bi bi-cart-plus-fill" />
                            Add to Cart </button>
                        <div>
                            <span className="text-secondary text-small">Details :</span>
                            <div className="accordion accordion-flush" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Accordion Item #1
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> {product?.desc}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Accordion Item #2
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> {product?.desc}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Accordion Item #3
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> {product?.desc}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
