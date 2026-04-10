import React from "react";
import { useParams } from "react-router-dom";
import Automotivesection from "../components/Automotivesection";
import Mechanical from "../components/Mechanical";
import Magnet from "../components/Magnet";
import Divide from "../components/Divide";
import Capacitor from "../components/Capacitor";
import Circuit from "../components/Circuit";


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