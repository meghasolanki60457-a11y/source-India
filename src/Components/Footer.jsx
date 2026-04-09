import React from "react";


const Footer = () => {
  return (
    <footer className="footer-section text-white">
      <div className="container py-5">
        <div className="row">

          {/* Left Logo */}
          <div className="col-md-3 mb-4">
            <p className="fw-bold">Developed and Managed by</p>
            <img src="/public/fourteen.png" alt="elcina" className="img-fluid" />
          </div>

          {/* About */}
          <div className="col-md-5 mb-4">
            <h5 className="fw-bold">
              ELECTRONIC INDUSTRIES ASSOCIATION OF INDIA (ELCINA)
            </h5>
            <p>
              Our focus is to support the value chain for Consumer Electronics,
              Telecom and Computers/ IT correlating their common interest with
              that of equipment, material and machinery producers for expansion
              of manufacturing.
            </p>
          </div>

          {/* Supporting Logos */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Supporting Associations</h6>
            <div className="d-flex gap-3">
              <img src="/public/fifteen.png" alt="mait" height="50" />
              <img src="/public/sixteen.png" alt="cimei" height="50" />
            </div>
          </div>
        </div>

        <hr className="border-light" />

        {/* Bottom Links */}
        <div className="row">

          {/* Need Help */}
          <div className="col-md-3">
            <h6 className="fw-bold">Need Help?</h6>
            <ul className="list-unstyled">
              <li>Terms & Conditions</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Support</li>
              <li>Knowledge Center</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Policy */}
          <div className="col-md-3">
            <h6 className="fw-bold">Policy</h6>
            <ul className="list-unstyled">
              <li>Schemes for Electronics Manufacturing</li>
              <li>State ESDM Policies</li>
              <li>Union Budget for ESDM sector</li>
              <li>Foreign Trade Policy 2015-20</li>
              <li>Duty Draw Back</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>For Exporters</li>
              <li>Work With Us</li>
              <li>Subscription Plans</li>
              <li>Test Labs in India</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-bold">Contact Us</h6>
            <ul className="list-unstyled">
              <li>📞 +91-11-41615985 / +91-11-41011291</li>
              <li>📧 support@sourceindia-electronics.com</li>
              <li>
                📍 Elcina House, 422, Okhla Industrial Estate,
                Phase-III, New Delhi, Delhi 110020
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center py-3 footer-bottom">
        © Copyright 2026 <strong>ELCINA</strong>. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;