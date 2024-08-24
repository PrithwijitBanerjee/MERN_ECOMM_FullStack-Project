import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { validation } from '../../utils/signUpValidationRules';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../utils/statusObj';
import { Vortex } from 'react-loader-spinner';
import { signUpUser } from '../../reducers/signUpReducer';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state?.signUp);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNo: '',
      password: '',
      address: '',
      isAdmin: false,
    },
    validationSchema: validation,
    onSubmit: (data, { resetForm }) => {
      // Convert phoneNo to a number before submitting
      const formattedData = {
        ...data,
        phoneNo: parseInt(data.phoneNo, 10)
      };
      // Submit the formatted data
      // You can submit the data to an API or handle it as needed here
      dispatch(signUpUser(formattedData));
      resetForm();
      navigate('/login');
    }
  });
  if (status === STATUSES.ERROR) {
    return (<div className='text-center'>
      <h2 className='text-danger'>{!!(error) && 'Something Went Wrong !!!'}</h2>
    </div>);
  }
  return (
    <div className="container my-5">
      <div>
        <a href="/" className="logo">
          <h1 className="text-center">e-Shopper</h1>
        </a>
      </div>
      <div className="d-flex justify-content-center">
        <div className="login-box m-auto mt-5 col-4">
          <h3 className="text-center">Sign Up</h3>
          <form className="needs-validation" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id='name' className="form-control" placeholder="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <div className="text-danger">
                {formik?.errors && formik?.touched?.name && formik?.errors?.name}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id='email' className="form-control" placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <div className="text-danger">
                {formik?.errors && formik?.touched?.email && formik?.errors?.email}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id='password' className="form-control" placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="text-danger">
                {formik?.errors && formik?.touched?.password && formik?.errors?.password}
              </div>
            </div>
            <div>
              <label htmlFor="phoneNo" className="form-label">Phone No</label>
              <input type="tel" id="phoneNo" className="form-control" placeholder="Phone No"
                value={formik.values.phoneNo}
                onChange={formik.handleChange}
              />
              <div className="text-danger">
                {formik?.errors && formik?.touched?.phoneNo && formik?.errors?.phoneNo}
              </div>
            </div>
            <div>
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" id="address" className="form-control" placeholder="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              <div className="text-danger">
                {formik?.errors && formik?.touched?.address && formik?.errors?.address}
              </div>
            </div>
            <div>
              <label htmlFor="role" className="form-label">Role</label>
              <select id='role' className="form-select"
                value={formik.values.isAdmin}
                onChange={(e) => formik.setFieldValue('isAdmin', e.target.value === 'true')}
              >
                <option value="">Select Role</option>
                <option value={false}>Regular User</option>
                <option value={true}>Admin User</option>
              </select>
            </div>
            {
              status === STATUSES.LOADING ? (
                <div className="container d-flex justify-content-center align-items-center">
                  <div className='row'>
                    <div className='col-12'>
                      <Vortex
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                      />
                    </div>
                  </div>
                </div>) : (
                <input type="submit" className="form-control btn-success my-2" value="Sign Up" />
              )
            }
            <input type="reset" className="form-control btn-secondary my-2" value="Reset" onClick={formik.handleReset} />
          </form>
          <Link to="/login"> Have an account? Login Here</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
