import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getAllCarts } from "../../reducers/cartReducer";
import { logoutStatus, logoutUsr } from "../../reducers/loginReducer";
import { getAllCategories, getSingleCategory } from "../../reducers/categoryReducer";
import { searchProductsByKeywords } from "../../reducers/productsReducer";


const NavBar = () => {
    const { carts } = useSelector(state => state?.cartInfo);
    const { logoutToggle } = useSelector(state => state?.login);
    const { categories } = useSelector(state => state?.categories);
    const [keywords, setKeywords] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCarts());
    }, [dispatch]);
    const handleLogout = e => {
        e.preventDefault();
        dispatch(logoutUsr());
    }
    useEffect(() => {
        dispatch(logoutStatus());
        dispatch(getAllCategories());
    }, [dispatch]);
    const fetchSingleCategory = categorySlug => {
        dispatch(getSingleCategory(categorySlug));
    }
    const handleSearchedKeywords = e => {
        if (e.target.name === "search") {
            setKeywords(e.target.value);
        }
    }
    const searchedByKeywords = e => {
        e.preventDefault();
        if (keywords?.length) {
            dispatch(searchProductsByKeywords(keywords.toLocaleLowerCase()));
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">E-shopper</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                                    {
                                        categories?.length !== 0 ? categories?.map((category, index) => (
                                            <li className="text-white dropdown-item" key={index}><Link className="dropdown-item" to="" onClick={() => fetchSingleCategory(category?.slug)}>{category?.name}</Link></li>
                                        )) : (<li><p className="text-white d-flex justify-content-center align-items-center" style={{ fontSize: '11px' }}>No items in category</p></li>)
                                    }
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart" tabIndex={-1}>
                                    Cart<i className="bi bi-cart-plus-fill" />
                                    <span className="cart-badge badge bg-success">{carts?.length}</span></Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0 mx-lg-2 order-sm-last">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" id="myaccount" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    My Account
                                </Link>
                                <ul className="dropdown-menu bg-dark text-light" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/#">My Orders</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    {
                                        logoutToggle ? (<>
                                            <li><Link className="dropdown-item" to="/">Hi! User</Link></li>
                                            <li><Link className="dropdown-item" to="" onClick={handleLogout}>Logout</Link></li>
                                        </>) : (<>
                                            <li><Link className="dropdown-item" to="/signUp">SignUp</Link></li>
                                            <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                        </>)
                                    }
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex search-form">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" name="search" value={keywords} onChange={handleSearchedKeywords} />
                            <button className="btn btn-success" type="submit" data-bs-toggle="tooltip" data-bs-placement="left" title="Search for all products" onClick={searchedByKeywords}>
                                <i className="bi bi-search" />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            {/* End of Navigation */}
        </>
    )
}

export default NavBar