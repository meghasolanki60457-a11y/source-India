import React from "react";
import { useLocation } from "react-router-dom";
import Quality from "../Components/Quality";
import Ceramic from "../Components/ceramic";

const ProductsPage = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const type = params.get("type");

  const category_id = params.get("category_id");
  const subcategory_id = params.get("subcategory_id");
  const item_category_id = params.get("item_category_id");

  const componentMap = {
    quality: Quality,
    ceramic: Ceramic,
  };

  const ActiveComponent = componentMap[type] || Quality;

  return (
    <div className="container py-4">

      <ActiveComponent
        category_id={category_id}
        subcategory_id={subcategory_id}
        item_category_id={item_category_id}
      />

    </div>
  );
};

export default ProductsPage;