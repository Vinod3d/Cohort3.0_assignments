import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import logo from "../assets/logo.svg"
import {useForm} from "react-hook-form"
import {useAuth} from "../context/AuthContext.jsx" 
import { toast } from "react-toastify"


const Register = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, reset, watch, formState: {errors}} = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const {user, setUser} = useAuth(); 
  const password = watch("password", "");
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordRules = () => {
    setShowPasswordRules(!showPasswordRules);
  };

  const onSubmit = (data) => {
    const checkUser = user.find((u) => u.email === data.email);
    if (checkUser) {
      toast.error("User already exists");
      return;
    }else{
      const {name, email, password} = data;
      const newUser = {name, email, password}
      setUser(prevUser => [...prevUser, newUser]);
      toast.success("User created successfully");
      navigate("/auth/login");
      reset();
    }
  }

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(user));
  }, [user])

  return (
     <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-scale-in">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <img src={logo} alt="logo" />
          </div>
          <span className="font-heading text-foreground font-bold text-xl">
            Sky<span className="text-primary">Mart</span>
          </span>
        </div>

        <div className="border border-border rounded-2xl p-8 hover:bg-white/4 transition-colors">
          <h2 className="font-heading font-bold text-foreground text-2xl mb-1">Create account</h2>
          <p className="text-white/40 text-sm font-body mb-8">
            Join SkyMart and start shopping
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <MdOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
              <input
                {...register("name", {
                  required: "Name is required", 
                  minLength: {value: 3, message: "Name must be at least 3 characters long"}, 
                  maxLength: {value: 20, message: "Name must be less than 12 characters long"}, 
                  pattern: {value: /^[A-Za-z ]+$/, message: "Name must contain only alphabets"}
                })}
                type="text"
                name="name"
                placeholder="Full name"
                className="w-full border border-border bg-secondary rounded-2xl pl-10 p-3 focus:border-primary text-foreground outline-none transition-colors"
                autoComplete="name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <div className="relative">
              <MdOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format"},
                })}
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full border border-border bg-secondary rounded-2xl pl-10 p-3 focus:border-primary text-foreground outline-none transition-colors"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <div className="relative">
              <IoLockClosedOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                onFocus={togglePasswordRules}
                onBlur={togglePasswordRules}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(onSubmit)();
                  }
                }}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 6 chars)"
                className="w-full border border-border bg-secondary rounded-2xl pl-10 p-3 pr-10 focus:border-primary text-foreground outline-none transition-colors"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <ul className={`${showPasswordRules ? "" : "hidden"} ${passwordRules.length ? "text-green-500" : ""} text-gray-400 text-xs space-y-1`}>
              <li className={`flex items-center gap-2 ${passwordRules.length ? "text-green-500" : ""}`}>
                <FaCheck className="w-3 h-3" />
                <span>At least 8 characters</span>
              </li>
              <li className={`flex items-center gap-2 ${passwordRules.uppercase ? "text-green-500" : ""}`}>
                <FaCheck className="w-3 h-3" />
                <span>One uppercase letter</span>
              </li>
              <li className={`flex items-center gap-2 ${passwordRules.lowercase ? "text-green-500" : ""}`}>
                <FaCheck className="w-3 h-3" />
                <span>One lowercase letter</span>
              </li>
              <li className={`flex items-center gap-2 ${passwordRules.number ? "text-green-500" : ""}`}>
                <FaCheck className="w-3 h-3" />
                <span>One number</span>
              </li>
              <li className={`flex items-center gap-2 ${passwordRules.special ? "text-green-500" : ""}`}>
                <FaCheck className="w-3 h-3" />
                <span>One special character (!@#$%^&*)</span>
              </li>
            </ul>
            
            <div className="relative">
              <IoLockClosedOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
              <input
                {...register("confirm", {
                  required: "Confirm password is required",
                })}
                type="password"
                name="confirm"
                placeholder="Confirm password"
                className="w-full border border-border bg-secondary rounded-2xl pl-10 p-3 focus:border-primary text-foreground outline-none transition-colors"
                autoComplete="new-password"
              />
            </div>
            {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}

            <button
              type="submit"
              className="bg-primary w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-bold"
            >
              Create Account
              <FaArrowRight />
            </button>
          </form>

          <p className="text-center text-white/30 text-sm font-body mt-6">
            Already have an account?{" "}
            <p
              className="text-primary cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Sign in
            </p>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register