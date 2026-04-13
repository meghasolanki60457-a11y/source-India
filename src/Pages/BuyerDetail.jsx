import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Source from "../Components/Source";
import Amphenol from "../Components/Amphenol";
import Applied from "../Components/Applied";

const BuyerDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  return (
    <div className="container py-4">

      {/* SWITCH COMPONENT BASED ON TYPE */}
      {type === "source" && <Source />}
      {type === "amphenol" && <Amphenol />}
      {type === "applied" && <Applied />}

    </div>
  );
};

export default BuyerDetail;