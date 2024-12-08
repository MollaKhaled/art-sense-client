import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
const SignUp = () => {
  const {createUser, updateUserProfile } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    reset,
    
    formState: { errors }
  } = useForm();
  const navigate = useNavigate()
  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
      .then(() =>{
         const saveUser ={ name:data.name, email:data.email }
        fetch('https://art-sense-server.vercel.app/users',{
          method:"POST",
          headers: {
            'Content-type' : 'application/json'
          },
          body:JSON.stringify(saveUser)
        }) 
        .then(res => res.json())
        .then(data => {
          if(data.insertedId){
            reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
          }
        })

        
      })
      .catch(error => console.log(error))
    })

  };
  return (
    <>
      <Helmet>
        <title>Bd Restaurant | Sign Up</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} placeholder="Name" name="name" className="input input-bordered" />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" {...register("photoURL", { required: true })} placeholder="photo URL" name="photoURL" className="input input-bordered" />
                {errors.name && <span className="text-red-600">Photo URL is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} placeholder="email" name="email" className="input input-bordered" />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 8,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=..*[a-z])/
                })} placeholder="password" name="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less than 8 characters</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one upper case one lower case, one number and one special character</span>}

              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type='submit' value="Sign Up">
                </input>
              </div>
            </form>
            <p className="text-center"><small>Already have an account ? <Link to='/login'>Please Login</Link></small></p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;