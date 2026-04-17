import React from "react";
import { useParams } from "react-router-dom";

import Seller from "../Components/Seller";
import Buyer from "../Components/Buyer";
import Distributers from "../Components/Distributers";

const Companies = () => {
  const { type } = useParams();

  // 🔥 normalize safely
  const normalizedType = type?.toLowerCase()?.trim();

  const renderComponent = () => {
    switch (normalizedType) {
      case "seller":
      case "sellers":
        return <Seller />;

      case "buyer":
      case "buyers":
        return <Buyer />;

      case "distributor":
      case "distributors":
        return <Distributers />;

      default:
        return <h3>No Data Found</h3>;
    }
  };

  const getTitle = () => {
    switch (normalizedType) {
      case "seller":
      case "sellers":
        return "Seller (Manufacturer)";

      case "buyer":
      case "buyers":
        return "Buyers";

      case "distributor":
      case "distributors":
        return "Distributors";

      default:
        return "Companies";
    }
  };

  return (
    <div className="container py-5">

      <h2 className="mb-4">{getTitle()}</h2>

      {renderComponent()}

    </div>
  );
};

export default Companies;