import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProviders";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic=useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {createUser, updateUserProfile}=useContext(AuthContext);
  const navigate=useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated')
                      //create user entry in the database 
                      const userInfo={
                        name:data.name,
                        email:data.email
                      }
                      axiosPublic.post('/users', userInfo)
                      .then(res=>{
                        if(res.data.insertedId){
                          console.log('user added to the database')
                          reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                        }
                      })
                    })
                    .catch(error => console.log(error))
            })
  };

  return (
      <>
      <Helmet>
        <title>Bistro Boss || Sign Up </title>
      </Helmet>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name </span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="your name "
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url  </span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                
                placeholder="photo url "
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">photo url is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
              <label className="label">
               <p className="px-6">
                Already Have an account ? <Link to='/login' className="font-bold text-primary"> Login </Link>
               </p>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type="submit" value="Sign Up" className="btn btn-primary" />
            </div>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
      </>
  );
};

export default SignUp;
