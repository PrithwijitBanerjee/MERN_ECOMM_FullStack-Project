import React from 'react';
import { Link } from 'react-router-dom';

const Breadcumb = ({ breadcumbData }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb p-3">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="#">{breadcumbData?.category}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {breadcumbData?.name}
                </li>
            </ol>
        </nav>
    );
};

export default Breadcumb;
