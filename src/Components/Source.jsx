import React, { useEffect, useState } from "react";

const LoginForm = () => {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    fetch("https://react-live.sourceindia-electronics.com/v1/api/seo_pages/slug/login")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Data:", data);
        setSeoData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center">
      <div className="card login-card p-4">

        {/* Dynamic Title from API */}
        <h3 className="text-center mb-4 text-primary">
          {seoData?.data?.page_title || "LOGIN"}
        </h3>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Enter Your Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Enter Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <span className="input-group-text">
              <i className="bi bi-eye-slash"></i>
            </span>
          </div>
        </div>

        {/* Login Button */}
        <button className="btn btn-primary w-100 mb-3">LOGIN</button>

        <div className="text-center mb-2">OR</div>

        {/* OTP Button */}
        <button className="btn btn-outline-secondary w-100 mb-3">
          Get an OTP on Your Email
        </button>

        {/* Remember + Forgot */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <input type="checkbox" /> <small>Remember Me</small>
          </div>
          <a href="#">Forgot Password?</a>
        </div>

        {/* Signup */}
        <div className="text-center mt-3">
          Don't have an account? <a href="#">Sign Up</a>
        </div>

        {/* SEO Description (optional show below form) */}
        {seoData?.data?.meta_description && (
          <p className="mt-3 text-muted small text-center">
            {seoData.data.meta_description}
          </p>
        )}

      </div>
    </div>
  );
};

export default LoginForm;