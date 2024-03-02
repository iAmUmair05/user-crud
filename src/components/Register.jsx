import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { signUpSchema } from './Validation';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

    
  useEffect(() => {

    let token = localStorage.getItem("userToken"); 
    if (token) {
      navigate("/notes") 
    }

  }, []);
  

  const gotoLogin = () => {
    navigate('/');
  };

  const formHandle = (values, action) => {
    console.log("call API");


    setLoading(true);
  
    axios.post("http://192.168.1.55:3000/api/auth/register", {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      })
      .then((result) => {
        console.log(result.data);
        alert('Sign up success');

        localStorage.setItem('firstName', values.firstName);
        localStorage.setItem('lastName', values.lastName);

  
        navigate('/login');
      })
      .catch((error) => {
        alert("can't register right now. Try later");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        action.resetForm();
      });
  };
  

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: formHandle,
    });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="w-[500px] bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-left text-white my-4">Signup</h2>
        <form onSubmit={handleSubmit} className="">
          <div>

      {errors.firstName && touched.firstName ? ( <p className="text-red-500">{errors.firstName}</p>  ) : null}
            <input
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 rounded-md bg-gray-800 w-full text-gray-300 mb-4"
              placeholder="First Name"
            />
          </div>
          <div>
            {errors.lastName && touched.lastName ? ( <p className="text-red-500">{errors.lastName}</p>) : null}
            <input
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 rounded-md outline-none  text-gray-300 bg-gray-800 w-full"
              placeholder="Last Name"
            />
          </div>

          <div className="mt-6">
            {errors.email && touched.email ? ( <p className="text-red-500">{errors.email}</p> ) : null}
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="p-2 rounded-md outline-none  text-gray-300 bg-gray-800 w-full"
              placeholder="Email"
            />
          </div>
          <div className="my-4">
            {errors.password && touched.password ? (
              <p className="text-red-500">{errors.password}</p>
            ) : null}
            <div className="relative">
              <input
                className="p-2 rounded-md outline-none text-gray-300 bg-gray-800 w-full"
                name="password"
                value={values.password}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Password'
              />
              <div
                className="absolute top-3 right-2 cursor-pointer text-white"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 rounded bg-gradient-to-l from-indigo-700 to-purple-600 text-white py-2 flex items-center justify-center"
          >
            {loading ? (
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                
              </svg>
            ) : null}
            {loading ? 'Loading...' : 'Signup'}
          </button>
          <div className="flex justify-center my-4 space-x-3">
            <p className="text-white">Already have an account? </p>

            <button onClick={gotoLogin} className="text-purple-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
