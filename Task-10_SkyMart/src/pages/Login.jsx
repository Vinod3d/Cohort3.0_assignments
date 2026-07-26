import React, { useMemo, useState } from "react";
import logo from "../assets/logo.svg"
import { MdOutlineMail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const [showPassword, setShowPassword] = useState(false);
    const {user, setLoggedInUser} = useAuth(); 
    const password = watch("password", "");
    const email = watch("email", "");
    const matchedUser = useMemo(() => {
        return user.find((u) => u.email === email && u.password === password);
    }, [user, email, password]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    const onSubmit = (data) => {
      if (matchedUser) {
        setLoggedInUser(matchedUser);
        toast.success(`Welcome back, ${matchedUser.name}`);
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        
        navigate("/");
        reset();
      } else {
        toast.error("Invalid email or password");
      }
        
    }
  return (
    <div className="min-h-screen bg-background flex">
        <div className="hidden lg:flex flex-col w-1/2 border-r-2 border-border border4 p-12 relative overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-volt/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-volt/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
              <img  src={logo} alt="logo" />
            </div>
            <span className="font-heading text-foreground font-bold text-2xl">
              Sky<span className="text-primary">Mart</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center relative z-10">
            <p className="text-primary font-bold text-sm font-body mb-4 tracking-widest uppercase">
              Welcome back
            </p>
            <h1 className="font-heading text-foreground font-bold text-5xl leading-tight mb-6">
              Shop the future.
              <br />
              <span className="text-primary">Today.</span>
            </h1>
            <p className="text-foreground/40 text-base font-body max-w-sm leading-relaxed">
              Thousands of products, lightning-fast delivery, and prices that
              make your wallet happy.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="bg-white/4 border border-white/50 rounded-2xl p-4 text-center">
                <p className="font-heading font-bold text-xl text-primary">20K+</p>
                <p className="text-white/40 text-xs font-body mt-1">Products</p>
              </div>
              <div className="bg-white/4 border border-white/45 rounded-2xl p-4 text-center">
                <p className="font-heading font-bold text-xl text-primary">50K+</p>
                <p className="text-white/40 text-xs font-body mt-1">Users</p>
              </div>
              <div className="bg-white/4 border border-white/50 rounded-2xl p-4 text-center">
                <p className="font-heading font-bold text-xl text-primary">4.9★</p>
                <p className="text-white/40 text-xs font-body mt-1">Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md animate-scale-in">
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <img src={logo} alt="logo" />
              </div>
              <span className="font-heading text-foreground font-bold text-xl">
                Sky<span className="text-primary">Mart</span>
              </span>
            </div>

            <div className="border border-border rounded-2xl p-8 hover:bg-white/4 transition-colors">
              <h2 className="font-heading font-bold text-foreground text-2xl mb-1">Sign in</h2>
              <p className="text-white/40 text-sm font-body mb-8">
                Enter your credentials to continue
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div className="relative ">
                  <MdOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="w-full border border-border bg-secondary rounded-2xl pl-10 p-3 focus:border-primary text-foreground outline-none transition-colors"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-sm font-body">
                      {errors.email.message}
                    </p>
                  )}

                {/* Password Field */}
                <div className="relative">
                  <IoLockClosedOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"/>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full border border-border bg-secondary rounded-2xl pl-10 p-3 focus:border-primary text-foreground outline-none transition-colors"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm font-body">
                      {errors.password.message}
                    </p>
                  )}

                <button
                  type="submit"
                  className="bg-primary w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-bold"
                >
                  Sign in
                  <FaArrowRight />
                </button>
              </form>

              <p className="text-center text-white/30 text-sm font-body mt-6">
                Don't have an account?{" "}
                <p
                  className="text-primary cursor-pointer"
                  onClick={() => navigate("/auth/register")}
                >
                  Create one
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
