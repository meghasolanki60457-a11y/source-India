import React from "react";
import { useParams } from "react-router-dom";

// ✅ IMPORT COMPONENTS
import Seller from "../Components/Seller";
import Buyer from "../Components/Buyer";
import Distributers from "../Components/Distributers";

const Companies = () => {
  const { type } = useParams();

  const getTitle = () => {
    if (type === "sellers") return "Seller (Manufacturer)";
    if (type === "Buyers") return "Buyers";
    if (type === "Distributers") return "Distributers";
    return "Companies";
  };

  // ✅ COMPONENT SWITCH
  const renderComponent = () => {
    if (type === "sellers") return <Seller />;
    if (type === "Buyers") return <Buyer />;
    if (type === "Distributers") return <Distributers />;
    return <h3>No Data Found</h3>;
  };

  return (
    <div className="container py-5">

      {/* TITLE */}
      <h2 className="mb-4">{getTitle()}</h2>

      {/* 🔥 COMPONENT SHOW */}
      {renderComponent()}

    </div>
  );
};

export default Companies;