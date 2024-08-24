import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
    const [isAdminDashboard, setIsAdminDashboard] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // If the current path is '/admin', show the dashboard content
        if (location.pathname === "/admin") {
            setIsAdminDashboard(true);
        } else {
            setIsAdminDashboard(false);
        }
    }, [location.pathname]);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Sidebar */}
                <div className="col-md-2 bg-dark text-white min-vh-100">
                    <h3 className="my-4 text-center">Admin Panel</h3>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-3">
                            <Link to="/admin/users" className="nav-link text-white"><i className="bi bi-people-fill"></i> Users</Link>
                        </li>
                        <li className="nav-item mb-3">
                            <Link to="/admin/products" className="nav-link text-white"><i className="bi bi-box-seam"></i> Products</Link>
                        </li>
                        <li className="nav-item mb-3">
                            <Link to="/admin/orders" className="nav-link text-white"><i className="bi bi-receipt"></i> Orders</Link>
                        </li>
                    </ul>
                </div>

                {/* Right Content */}
                <div className="col-md-10 d-flex justify-content-center align-items-center">
                    <div className="container my-4">
                        <div className="row">
                            {isAdminDashboard ? (
                                <>
                                    {/* Users Card */}
                                    <div className="col-md-4">
                                        <div className="card text-center">
                                            <div className="card-body">
                                                <h5 className="card-title">Users</h5>
                                                <p className="card-text">Manage all users</p>
                                                <Link to="/admin/users" className="btn btn-primary">Go to Users</Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products Card */}
                                    <div className="col-md-4">
                                        <div className="card text-center">
                                            <div className="card-body">
                                                <h5 className="card-title">Products</h5>
                                                <p className="card-text">Manage all products</p>
                                                <Link to="/admin/products" className="btn btn-primary">Go to Products</Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Orders Card */}
                                    <div className="col-md-4">
                                        <div className="card text-center">
                                            <div className="card-body">
                                                <h5 className="card-title">Orders</h5>
                                                <p className="card-text">Manage all orders</p>
                                                <Link to="/admin/orders" className="btn btn-primary">Go to Orders</Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Outlet />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
