import React from "react";
import { useLocation } from "react-router-dom";
import Signin from "../../Components/Register/Signin";
import Signup from "../../Components/Register/Singup";
import "./Auth.css";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-blue-100 to-white lg:bg-none">
      {/* Left side - Auth form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="form-container p-5 sm:p-8 bg-white rounded-xl shadow-lg">
            {/* Mobile only header */}
            <div className="flex flex-col items-center mb-6 lg:hidden">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">SkillConnect</h2>
              <p className="text-sm sm:text-base text-center text-gray-500 mt-2">
                {isLogin 
                  ? "Welcome back! Sign in to your account." 
                  : "Create your account and start connecting."}
              </p>
            </div>
            
            {isLogin ? <Signin /> : <Signup />}
          </div>
        </div>
      </div>
      
      {/* Right side - Image background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-500 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h2 className="text-4xl font-bold mb-4">SkillConnect</h2>
          <p className="text-xl text-center mb-8">
            {isLogin 
              ? "Welcome back! Login to connect with skilled professionals." 
              : "Join the community to share and develop your skills."}
          </p>
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float">
            <span className="text-5xl md:text-6xl">🌟</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

// https://res.cloudinary.com/dnbw04gbs/image/upload/v1679490221/screenshot4_hb7xtr.png
//
// 
// 