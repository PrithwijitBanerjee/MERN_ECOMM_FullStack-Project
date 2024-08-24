import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { signInValidationRules } from '../../utils/signInValidationRules';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../utils/statusObj';
import { Vortex } from 'react-loader-spinner';
import { signInUsr } from '../../reducers/loginReducer';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, logoutToggle } = useSelector(state => state?.login);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signInValidationRules,
    onSubmit: (data, { resetForm }) => {
      dispatch(signInUsr(data));
      resetForm();
    }
  });
  // useEffect to handle navigation after login success
  useEffect(() => {
    if (status === STATUSES.IDLE && logoutToggle) {
      navigate('/');
    }
  }, [status, logoutToggle, navigate]);
  return (
    <div className="container my-5">
      <div>
        <a href="/" className="logo">
          <h1 className="text-center">e-Shopper</h1>
        </a>
      </div>
      <div className="d-flex justify-content-center">
        <div className="login-box m-auto mt-5 col-4">
          <h3 className="text-center">Login</h3>
          <form className="needs-validation" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id='email' className="form-control" placeholder="Email" value={formik?.values.email} onChange={formik?.handleChange} />
              <div className="text-danger">
                {
                  formik?.errors && formik?.touched?.email && formik?.errors?.email
                }
              </div>
            </div>
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id='password' className="form-control" placeholder="password" value={formik?.values.password} onChange={formik?.handleChange} />
              <div className="text-danger">
                {
                  formik?.errors && formik?.touched?.password && formik?.errors?.password
                }
              </div>
            </div>
            {
              status === STATUSES.LOADING ? (<div className="container d-flex justify-content-center align-items-center">
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
              </div>) : (<input type="submit" className="form-control btn-success my-2" value="Login" />)
            }
            <input type="reset" className="form-control btn-secondary my-2" value="Reset" onClick={formik.handleReset} />
          </form>
          <Link to="/signUp">Don't have an account? Create One</Link>
        </div>
      </div>
    </div>

  )
}

export default Login