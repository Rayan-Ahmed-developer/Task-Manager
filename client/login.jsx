import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const loginFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7000/api/tasks/login",
        loginForm
      );
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4">
      <div className="w-full max-w-[420px] bg-[#151b27] border border-[#1e2535] rounded-2xl p-8">

        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest">
            Task Manager
          </span>
        </div>

        {/* HEADING */}
        <h2 className="text-[20px] font-semibold text-slate-100 text-center">
          Welcome back
        </h2>
        <p className="text-[13px] text-slate-600 text-center mt-1 mb-6">
          Login to continue to your tasks
        </p>

        <div className="h-px bg-[#1e2535] mb-6" />

        {/* FORM */}
        <form className="space-y-4" onSubmit={loginFunc}>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-slate-500 tracking-wide">
              Email address
            </label>
            <input
              onChange={handleInputChange}
              value={loginForm.email}
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0f1117] border border-[#1e2535] text-slate-200 text-[14px] placeholder-slate-700 outline-none focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-slate-500 tracking-wide">
              Password
            </label>
            <input
              onChange={handleInputChange}
              value={loginForm.password}
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0f1117] border border-[#1e2535] text-slate-200 text-[14px] placeholder-slate-700 outline-none focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-[10px] bg-[#1e40af] border border-[#1d4ed8] text-blue-200 text-[14px] font-medium hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            Login
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-[13px] text-slate-600 mt-5">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;