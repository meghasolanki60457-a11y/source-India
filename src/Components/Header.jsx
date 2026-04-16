import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const BASE_URL = "https://react-live.sourceindia-electronics.com";

  const [settings, setSettings] = useState({
    mobile: "8448293955",
    email: "info@example.com",
    logo: "",
    website: "",
    website_name: "Visit Website",
  });

  // ✅ API CALL
  useEffect(() => {
    fetch(`${BASE_URL}/v1/api/settings/front-site`)
      .then((res) => res.json())
      .then((data) => {
        setSettings(data?.data || {});
      })
      .catch((err) => {
        console.log("HEADER API ERROR:", err);
      });
  }, []);

  // ✅ LOGO SAFE FUNCTION
  const getLogo = () => {
    if (!settings?.logo) return "/first.png";
    const fixed = settings.logo.replace("upload/", "uploads/");
    return `${BASE_URL}/${fixed}`;
  };

  return (
    <>
      {/* 🔝 TOP BAR */}
      <div className="top-bar bg-light py-2">
        <div className="container d-flex justify-content-between align-items-center">

          <p className="mb-0">
            📞 {settings?.mobile} &nbsp;&nbsp;
            ✉️ {settings?.email}
          </p>

          <div>
            <a href="#" className="me-3">Support</a>
            <button className="btn btn-outline-primary btn-sm me-2">
              Sign In
            </button>
            <button className="btn btn-primary btn-sm">
              Join Free
            </button>
          </div>

        </div>
      </div>

      {/* 🔹 NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">

          {/* LOGO */}
          <Link className="navbar-brand" to="/">
            <img
              src={getLogo()}
              alt="logo"
              style={{ height: "50px", objectFit: "contain" }}
              onError={(e) => {
                e.target.src = "/first.png";
              }}
            />
          </Link>

          {/* TOGGLE */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */}
          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav mx-auto">

              {/* HOME */}
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* CATEGORIES */}
              <li className="nav-item">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Product Categories
                </NavLink>
              </li>

              {/* COMPANIES */}
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  Companies
                </span>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/company-list">
                      Seller(Manufacturer)
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/buyer-list">
                      Buyers
                    </Link>
                  </li>
                   <li>
                    <Link className="dropdown-item" to="/trading-list">
                      Distributer
                    </Link>
                  </li>
                </ul>
              </li>

              {/* EVENT */}
             <li className="nav-item">
  <a
    href="https://event.sourceindia-electronics.com/"
    className="nav-link"
    rel="noopener noreferrer"
  >
    Event
  </a>
</li>
              

              {/* ENQUIRY */}
              <li className="nav-item">
                <NavLink
                  to="/enquiry"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Enquiry
                </NavLink>
              </li>

            </ul>

            {/* WEBSITE BUTTON */}
            <a
              href={settings?.website || "#"}
              target="_blank"
              rel="noreferrer"
              className="btn btn-warning rounded-pill px-3"
            >
              {settings?.website_name || "Visit Website"}
            </a>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;