import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../utils/statusObj';
import { getSingleUser, updateSingleUsrById } from '../../reducers/usersReducer';

const EditUserForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, error, status } = useSelector(state => state?.users);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNo: '',
            password: '',
            address: '',
            isAdmin: false,
            isBannedUsr: false
        },
        onSubmit: async (data, { resetForm }) => {
            await updateSingleUsrById(id, data);
            resetForm();
            navigate('/admin/users');
        }
    });

    useEffect(() => {
        dispatch(getSingleUser(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            formik.setValues({
                name: user?.name || '',
                email: user?.email || '',
                phoneNo: user?.phoneNo || '',
                password: user?.password || '',
                address: user?.address || '',
                isAdmin: user?.isAdmin || false,
                isBannedUsr: user?.isBannedUsr || false
            });
        }
    }, [user]);

    if (status === STATUSES.ERROR) {
        return (
            <div className="container vh-100 justify-content-center align-items-center">
                <h1 className="text-danger my-3">{error}</h1>
            </div>
        );
    }

    return (
        <div className='container d-flex justify-content-center align-items-center'>
            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ width: '30rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Edit User</h5>
                            <div className="card-text">
                                <form className="needs-validation" onSubmit={formik.handleSubmit}>
                                    <div>
                                        <label htmlFor="name" className="form-label mt-2">Name</label>
                                        <input type="text" value={formik.values.name} id='name' className="form-control" placeholder="Full Name" onChange={formik.handleChange} />
                                        <div className="text-danger">
                                            {formik?.errors && formik?.touched?.name && formik?.errors?.name}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="form-label mt-2">Email Id</label>
                                        <input type="text" id='email' className="form-control" placeholder="Email Id" value={formik.values.email} onChange={formik.handleChange} />
                                        <div className="text-danger">
                                            {formik?.errors && formik?.touched?.email && formik?.errors?.email}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNo" className="form-label mt-2">Phone No</label>
                                        <input type="tel" id='phoneNo' className="form-control" placeholder="Phone No" value={formik.values.phoneNo} onChange={formik.handleChange} />
                                        <div className="text-danger">
                                            {formik?.errors && formik?.touched?.phoneNo && formik?.errors?.phoneNo}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="form-label mt-2">Address</label>
                                        <input type="text" id="address" className="form-control" placeholder="Address" value={formik.values.address} onChange={formik.handleChange} />
                                        <div className="text-danger">
                                            {formik?.errors && formik?.touched?.address && formik?.errors?.address}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="isAdmin" className="form-label mt-2">Role</label>
                                        <select id='isAdmin' className="form-select" value={formik.values.isAdmin} onChange={(e) => formik.setFieldValue('isAdmin', e.target.value === 'true')}>
                                            <option value="">Select Role</option>
                                            <option value={false}>Regular User</option>
                                            <option value={true}>Admin User</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="isBannedUsr" className="form-label mt-2">Banned User</label>
                                        <select id='isBannedUsr' className="form-select" value={formik.values.isBannedUsr} onChange={(e) => formik.setFieldValue('isBannerUsr', e.target.value === 'true')}>
                                            <option value="">Select Status</option>
                                            <option value={true}>Banned User</option>
                                            <option value={false}>Unbanned User</option>
                                        </select>
                                    </div>
                                    <input type="submit" className="form-control btn-success my-2" value="Edit User" />
                                    <input type="reset" className="form-control btn-secondary my-2" value="Reset" onClick={formik.handleReset} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUserForm;
