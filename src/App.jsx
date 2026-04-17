import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// ================= HEADER / FOOTER =================
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// ================= PAGES =================
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import CategoryDetails from "./Pages/CategoryDetails";
import Subcategory from "./Pages/Subcategory";

import Companies from "./Pages/Companies";
import CompanyDetail from "./Pages/CompanyDetail";

import BuyerDetail from "./Pages/BuyerDetail";
import Enquiry from "./Pages/Enquiry";
import Product from "./Pages/Product";
import Electro from "./Pages/Electro";

// ================= COMPONENTS =================
import Buyer from "./Components/Buyer";
import Hardware from "./Components/Hardware";
import Industries from "./Components/Industries";
import Productdetail from "./Components/Productdetail";
import Productdetail2 from "./Components/Productdetail2";
import Amphenol from "./Components/Amphenol";
import Applied from "./Components/Applied";
import Seller from "./Components/Seller";
import Distributers from "./Components/Distributers";

function App() {
  return (
    <HelmetProvider>
      <div className="app-wrapper">

        <Header />

        <main className="main-content">
          <Routes>

            {/* ================= HOME ================= */}
            <Route path="/" element={<Home />} />

            {/* ================= CATEGORY ================= */}
            <Route path="/categories" element={<Category />} />
            <Route path="/categories/components/:name" element={<CategoryDetails />} />
            <Route path="/subcategory/:name" element={<Subcategory />} />

            {/* ================= STATIC PAGES ================= */}
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/enquiry" element={<Enquiry />} />

            {/* ================= COMPANIES ================= */}
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:slug" element={<CompanyDetail />} />

            {/* ================= PRODUCTS ================= */}
            <Route path="/products" element={<Product />} />
            <Route path="/product/:slug" element={<Productdetail />} />
            <Route path="/product2/:id" element={<Productdetail2 />} />

            {/* ================= BUYER ================= */}
            <Route path="/buyer" element={<Buyer />} />
            <Route path="/buyer/:slug" element={<BuyerDetail />} />

            {/* ================= OTHER PAGES ================= */}
            <Route path="/amphenol" element={<Amphenol />} />
            <Route path="/applied" element={<Applied />} />
            <Route path="/company-list" element={<Seller />} />
            <Route path="/buyer-list" element={<Buyer />} />
            <Route path="/trading-list" element={<Distributers />} />

            {/* ================= CATEGORY SLUG PAGE (FIXED) ================= */}
            <Route path="/category/:slug" element={<Electro />} />

            {/* ================= 404 ================= */}
            <Route path="*" element={<h1>404 Page Not Found</h1>} />

          </Routes>
        </main>

        <Footer />

      </div>
    </HelmetProvider>
  );
}

export default App;