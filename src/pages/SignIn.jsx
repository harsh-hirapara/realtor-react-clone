import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  function handleOnChange(e) {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.id]: e.target.value,
    }));
  }
  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      if (user) {
        toast.success("Sign in success");
        navigate("/");
      }
    } catch (err) {
      toast.error("Bad user credentials");
    }
  }
  return (
    <section>
      <h1 className="text-5xl text-center font-bold">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 my-auto md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="sample key image"
            className="w-full rounded-2xl "
          ></img>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 ">
          <form onSubmit={handleOnSubmit}>
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Email address"
              onChange={handleOnChange}
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out "
            ></input>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleOnChange}
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 border-gray-300 rounded transition ease-in-out"
              ></input>
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Don't have a account?{" "}
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot password?
                </Link>
              </p>
            </div>

            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign In
            </button>
            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
          </form>
          <OAuth></OAuth>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
