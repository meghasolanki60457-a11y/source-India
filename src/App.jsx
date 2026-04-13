import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import CategoryDetails from "./Pages/CategoryDetails";
import Subcategory from "./Pages/Subcategory";
import Companies from "./Pages/Companies";
import CompanyDetail from "./Pages/CompanyDetail";
import BuyerDetail from "./Pages/BuyerDetail";
import Enquiry from "./Pages/Enquiry";



// Components
import Hardware from "./Components/Hardware";
import Industries from "./Components/Industries";
import Productdetail from "./Components/Productdetail";
import Productdetail2 from "./Components/Productdetail2";
import Amphenol from "./Components/Amphenol"; 
import Applied from "./Components/Applied";



// ✅ NEW IMPORT

function App() {
  return (
    <div className="app-wrapper">   {/* ✅ ADD THIS */}

      <Header />

      <main className="main-content">  {/* ✅ ADD THIS */}
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/category" element={<Category />} />
          <Route path="/category/:name" element={<CategoryDetails />} />
          <Route path="/Subcategory/:name" element={<Subcategory />} />

          <Route path="/hardware" element={<Hardware />} />
          <Route path="/industries" element={<Industries />} />

          <Route path="/event" element={<h1>Event Page</h1>} />
       

          <Route path="/companies/:type" element={<Companies />} />

          <Route path="/amphenol" element={<Amphenol />} />

          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/product2/:id" element={<Productdetail2 />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/applied" element={<Applied />} />

<Route path="/buyer-connect/:id" element={<BuyerDetail />} />    
<Route path="/enquiry" element={<Enquiry />} />     

          <Route path="*" element={<h1>404 Page Not Found</h1>} />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;