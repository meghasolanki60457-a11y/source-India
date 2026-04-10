import React from "react";
import { Routes, Route } from "react-router-dom";

// Components (IMPORTANT: folder name case must match exactly)
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import CategoryDetails from "./Pages/CategoryDetails";
import Subcategory from "./Pages/Subcategory";

// Components
import Hardware from "./Components/Hardware";
import Industries from "./Components/Industries";

function App() {
  console.log("App loaded successfully");

  return (
    <>
      <Header />

      <Routes>
        {console.log("Routes rendered")}

        <Route path="/" element={<Home />} />

        <Route path="/category" element={<Category />} />
        <Route path="/category/:name" element={<CategoryDetails />} />
        <Route path="/Subcategory/:name" element={<Subcategory />} />

        <Route path="/hardware" element={<Hardware />} />
        <Route path="/industries" element={<Industries />} />

        <Route path="/event" element={<h1>Event Page</h1>} />
        <Route path="/enquiry" element={<h1>Enquiry Page</h1>} />

        <Route path="/companies/:id" element={<h1>Company Details Page</h1>} />

        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;