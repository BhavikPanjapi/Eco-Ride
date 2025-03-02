"use client"

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

const Login = ({ onLogin, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) navigate(from, { replace: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Must be at least 6 characters";
    if (!isLoginMode && !formData.name.trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
        navigate(from, { replace: true });
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary p-6 text-white text-center">
          <h1 className="text-2xl font-bold">{isLoginMode ? "Welcome Back" : "Create Account"}</h1>
          <p className="mt-2">{isLoginMode ? "Sign in to access your account" : "Join our community"}</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!isLoginMode && (
            <InputField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              icon={User}
              placeholder="Enter your full name"
              error={errors.name}
              onChange={handleChange}
            />
          )}
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            icon={Mail}
            placeholder="Enter your email"
            error={errors.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            icon={Lock}
            placeholder={isLoginMode ? "Enter your password" : "Create a password"}
            error={errors.password}
            onChange={handleChange}
          />
          {isLoginMode && (
            <div className="flex justify-end">
              <Link to="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>
          )}
          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md transition">
            {isLoading ? "Processing..." : isLoginMode ? "Sign In" : "Create Account"}
          </button>
          <p className="text-sm text-gray-600 text-center">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="ml-1 text-primary hover:underline">{isLoginMode ? "Sign up" : "Sign in"}</button>
          </p>
        </form>
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Why Join RideShare?</h2>
        <ul className="space-y-2 text-gray-700">
          {["Save money", "Reduce carbon footprint", "Meet new people", "Travel conveniently"].map((text, i) => (
            <li key={i} className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-500 mr-2">✓</span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const InputField = ({ label, type, name, value, icon: Icon, placeholder, error, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pl-10 w-full rounded-md border ${error ? "border-red-500" : "border-gray-300"} py-2 px-3 focus:ring-primary focus:border-transparent`}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default Login;