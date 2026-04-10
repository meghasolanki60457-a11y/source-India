import React from "react";
import { useParams } from "react-router-dom";
import Automotivesection from "../Components/Automotivesection";
import Mechanical from "../Components/Mechanical";
import Magnet from "../Components/Magnet";
import Divide from "../Components/Divide";
import Capacitor from "../Components/Capacitor";
import Circuit from "../Components/Circuit";


function CategoryDetails() {
  const { name } = useParams();

  console.log("NAME:", name);

  if (name === "automotive-components") {
    return (
      < Automotivesection />
    );
  }

  if (name === "electromechanical") {
    return (
      < Mechanical />
    );
  }
   if (name === "ferritesmagnets") {
    return (
      < Magnet />
    );
  }
   if (name === "optoelectronics-component") {
    return (
      < Divide />
    );
  }

    if (name === "passive-component") {
    return (
      < Capacitor />
    );
  }
  if (name === "pcb") {
    return (
      < Circuit />
    );
  }
  

  return (
    <div style={{ padding: "40px" }}>
      <h2>Category Not Found</h2>
      <h3>{name}</h3>
    </div>
  );
}

export default CategoryDetails;