import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../provider/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Login = () => {
  /* const captchaRef=useRef(null); also remove import useRef */
  const [disabled, setDisabled] = useState(true);
  const navigate=useNavigate();
  const location=useLocation();

  const from=location.state?.from?.pathname || "/"
  const { signIn } = useContext(AuthContext);

  useEffect(()=>{
    loadCaptchaEnginge(6); 
  },[])


  const handleLogin=event=>{
    event.preventDefault();
    const form=event.target;
    const email=form.email.value;
    const password=form.password.value;
    console.log(email, password)
    signIn(email, password)
    .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
            title: 'User Login Successful.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        navigate(from, { replace: true });
    })
  }
const handleValidateCaptcha=(e)=>{

 /*  const user_captcha_value=captchaRef.current.value; */

  const user_captcha_value=e.target.value;
  if(validateCaptcha(user_captcha_value)){
    setDisabled(false);
  }
  else{
    setDisabled(true)
  }
  console.log(value);
}

  return (
   <>
   <Helmet>
    <title>Bistro Boss || Login </title>
   </Helmet>
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left md:w-1/2">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleLogin}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
            <LoadCanvasTemplate />
            </span>
          </label>
          <input onBlur={handleValidateCaptcha} type="text" /* ref={captchaRef} */ name="captcha" placeholder="Type the captcha above "  className="input input-bordered" required />
          <button className="btn btn-outline btn-xs mt-2">Validate captcha</button>
        </div>
        <div className="form-control mt-6">
          <input disabled={disabled} type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
      <p className='text-center py-4'><small>New Here? <Link to="/signup" className='font-bold text-primary'>Create an account</Link> </small></p>
    </div>
  </div>
</div>
   </>
  );
};

export default Login;