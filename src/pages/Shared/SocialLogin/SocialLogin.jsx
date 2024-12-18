import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        const saveUser = { name: loggedUser.displayName, email: loggedUser.email };
        fetch('http://localhost:3000/users', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(saveUser)
        })
          .then(res => res.json())
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Google Sign-In Successful",
              showConfirmButton: false,
              timer: 1500
            });
            // Delay navigation to ensure Swal is visible
            setTimeout(() => {
              navigate(from, { replace: true });
            }, 1500); // Match Swal timer duration
          });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Sign-In Failed",
          text: error.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div>
      <div className='divider'></div>
      <div className='w-full text-center my-4'>
        <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
