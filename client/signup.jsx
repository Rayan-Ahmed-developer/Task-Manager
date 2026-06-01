import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupForm);
    try {
      const res = await axios.post(
        "https://task-manager-production-d785.up.railway.app/api/tasks/signup",
        signupForm
      );
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] p-4">
      <div className="w-full max-w-[420px] bg-[#151b27] border border-[#1e2535] rounded-2xl p-8">

        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-widest">
            Task Manager
          </span>
        </div>

        <h2 className="text-[20px] font-semibold text-slate-100 text-center">
          Create an account
        </h2>
        <p className="text-[13px] text-slate-600 text-center mt-1 mb-6">
          Start managing your tasks today
        </p>

        <div className="h-px bg-[#1e2535] mb-6" />

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-[12px] font-medium text-slate-500 tracking-wide">
              Username
            </label>
            <input
              onChange={handleInputChange}
              value={signupForm.username}
              name="username"
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0f1117] border border-[#1e2535] text-slate-200 text-[14px] placeholder-slate-700 outline-none focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[12px] font-medium text-slate-500 tracking-wide">
              Email address
            </label>
            <input
              onChange={handleInputChange}
              value={signupForm.email}
              name="email"
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0f1117] border border-[#1e2535] text-slate-200 text-[14px] placeholder-slate-700 outline-none focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[12px] font-medium text-slate-500 tracking-wide">
              Password
            </label>
            <input
              onChange={handleInputChange}
              value={signupForm.password}
              name="password"
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0f1117] border border-[#1e2535] text-slate-200 text-[14px] placeholder-slate-700 outline-none focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-[10px] bg-[#1e40af] border border-[#1d4ed8] text-blue-200 text-[14px] font-medium hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            Sign Up
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-[13px] text-slate-600 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;