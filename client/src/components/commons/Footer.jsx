import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <>
            <div className="footer mt-auto bg-dark text-light">
                <div className="container py-3">
                    <div className="row d-flex footer-items">
                        <div className="col-lg-4">
                            <h5>Categories</h5>
                            <ul>
                                <li><Link href="">Watches</Link></li>
                                <li><Link href="">Mobiles</Link></li>
                                <li><Link href="">Tablets</Link></li>
                                <li><Link href="">Audio</Link></li>
                                <li><Link href="">Drones</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-4">
                            <h5>Useful Links</h5>
                            <ul>
                                <li><Link href="">Terms</Link></li>
                                <li><Link href="">Privacy</Link></li>
                                <li><Link href="">About us</Link></li>
                                <li><Link href="">Mission</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-4">
                            <h5>Get Updates</h5>
                            <div className="d-flex subscribe">
                                <input type="text" className="form-control" />
                                <button className="btn btn-warning">Subscribe</button>
                            </div>
                            <div className="mt-2">
                                <div className="btn-group me-2 social-icons" role="group" aria-label="First group">
                                    <button type="button" className="btn btn-secondary mx-1 d-flex flex-column justify-content-center align-items-center">
                                        <i className="bi bi-facebook" />
                                    </button>
                                    <button type="button" className="btn btn-secondary mx-1 d-flex flex-column justify-content-center align-items-center">
                                        <i className="bi bi-instagram" />
                                    </button>
                                    <button type="button" className="btn btn-secondary mx-1 d-flex flex-column justify-content-center align-items-center">
                                        <i className="bi bi-twitter" />
                                    </button>
                                    <button type="button" className="btn btn-secondary mx-1 d-flex flex-column justify-content-center align-items-center">
                                        <i className="bi bi-linkedin" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row text-center">
                        <span>@coderdost</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer