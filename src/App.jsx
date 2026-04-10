import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Category from "./pages/Category";

// Components (as pages)
import Hardware from "./components/Hardware";
import Industries from "./components/Industries";

function App() {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/event" element={<h1>Event Page</h1>} />
        <Route path="/enquiry" element={<h1>Enquiry Page</h1>} />
        <Route path="/companies/:id" element={<h1>Company Details Page</h1>} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;