import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSliders } from "../../../reducers/bannerReducer";
import { STATUSES } from "../../../utils/statusObj";
import { Vortex } from 'react-loader-spinner';

const Carousel = () => {
    const { status, sliders, error } = useSelector(state => state.banners);
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0); // Track the active slide

    useEffect(() => {
        dispatch(getAllSliders());
    }, [dispatch]);

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? sliders.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleIndicatorClick = (index) => {
        setActiveIndex(index);
    };
    if (error) {
        return (<div className="text-center text-danger">
            <h2>Something Went Wrong !!!</h2>
        </div>);
    }
    return (
        <>
            <div id="carouselExampleDark" className="carousel carousel-dark slide mb-5" data-bs-ride="carousel">
                {status === STATUSES.LOADING ? (
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
                        <ol className="carousel-indicators">
                            {sliders.map((_, index) => (
                                <li
                                    key={index}
                                    data-bs-target="#carouselExampleDark"
                                    data-bs-slide-to={index}
                                    className={index === activeIndex ? "active" : ""}
                                    onClick={() => handleIndicatorClick(index)}
                                />
                            ))}
                        </ol>
                        <div className="carousel-inner">
                            {sliders.length !== 0 &&
                                sliders.map((slider, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                                        data-bs-interval={3000}
                                    >
                                        <img src={slider?.slider_image} className="d-block w-100" alt="..." />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>{slider?.title}</h5>
                                            <p>{slider?.desc}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <a
                            className="carousel-control-prev"
                            href="#carouselExampleDark"
                            role="button"
                            data-bs-slide="prev"
                            onClick={handlePrev}
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#carouselExampleDark"
                            role="button"
                            data-bs-slide="next"
                            onClick={handleNext}
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </a>
                    </>
                )}
            </div>
            {/* End of Carousel */}
        </>
    );
};

export default Carousel;
