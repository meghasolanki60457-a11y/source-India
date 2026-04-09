import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import Category from "./Pages/Category";

// Components (as pages)
import Hardware from "./Components/Hardware";
import Industries from "./Components/Industries";

function App() {
  return (
    <>
      {/* 🔝 HEADER (COMMON) */}
      <Header />

      {/* 🌐 ROUTES */}
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* PRODUCT CATEGORY PAGE */}
        <Route path="/category" element={<Category />} />

        {/* HARDWARE PAGE */}
        <Route path="/hardware" element={<Hardware />} />

        {/* INDUSTRIES PAGE */}
        <Route path="/industries" element={<Industries />} />

        {/* EVENT PAGE */}
        <Route path="/event" element={<h1>Event Page</h1>} />

        {/* ENQUIRY PAGE */}
        <Route path="/enquiry" element={<h1>Enquiry Page</h1>} />

        {/* COMPANY DYNAMIC PAGE */}
        <Route path="/companies/:id" element={<h1>Company Details Page</h1>} />

        {/* 404 PAGE */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>

      {/* 🔻 FOOTER (COMMON) */}
      <Footer />
    </>
  );
}

export default App;