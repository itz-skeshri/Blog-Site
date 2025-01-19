// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import authService from "../appwrite/auth";
// import { Button, Input, Logo } from "./index";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import { login } from "../features/authSlice";

// function SignUp() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [error, setError] = useState("");
//   const { register, handleSubmit } = useForm();

//   const create = async (data) => {
//     setError("");
//     try {
//       const userData = await authService.createAccount(data);
//       if (userData) {
//         userData = await authService.getCurrentUser();
//         if (userData) await dispatch(login(userData));
//         navigate("/");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div
//         className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
//       >
//         <div className="mb-2 flex justify-center">
//           <span className="inline-block w-full max-w-[100px]">
//             <Logo width="100%" />
//           </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight">
//           Sign up to create account
//         </h2>
//         <p className="mt-2 text-center text-base text-black/60">
//           Already have an account?&nbsp;
//           <Link
//             to="/login"
//             className="font-medium text-primary transition-all duration-200 hover:underline"
//           >
//             Sign In
//           </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//         <form onSubmit={handleSubmit(create)}>
//           <div className="space-y-5">
//             <Input
//               label="Full Name: "
//               placeholder="Enter your full name"
//               {...register("name", {
//                 required: true,
//               })}
//             />
//             <Input
//               label="Email: "
//               placeholder="Enter your email"
//               type="email"
//               {...register("email", {
//                 required: true,
//                 validate: {
//                   matchPattern: (value) =>
//                     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value) ||
//                     "Email address must be a valid address",
//                 },
//               })}
//             />
//             <Input
//               label="Password: "
//               type="password"
//               placeholder="Enter your password"
//               {...register("password", {
//                 required: true,
//               })}
//             />
//             <Button type="submit" className="w-full">
//               Create Account
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../features/authSlice";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("hi");
    console.log(error);
    try {
      const createdUser = await authService.createAccount(data);
      console.log(error)
      if (createdUser) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          await dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(
        error?.message || "Failed to create an account. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form
          onSubmit={handleSubmit((data) => {
            create(data);
          })}
        >
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}

            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
