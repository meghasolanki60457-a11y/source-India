import React from "react";
import { useParams } from "react-router-dom";

import Automotivesection from "../Components/Automotivesection";
import Ceramic from "../Components/Ceramic";
import Mechanical from "../Components/Mechanical";
import Magnet from "../Components/Magnet";
import Divide from "../Components/Divide";
import Capacitor from "../Components/Capacitor";
import Circuit from "../Components/Circuit";
import Quality from "../Components/Quality";
import Cable from "../Components/Cable";
import Wire from "../Components/Wire";
import Terminal from "../Components/Terminal";
import Cooling from "../Components/Cooling";
import Motors from "../Components/Motors";
import Socket from "../Components/Socket";
import Switch from "../Components/Switch";
import Ferrite from "../Components/Ferrite";
import Cores from "../Components/Cores";
import Display from "../Components/Display";
import Led from "../Components/Led";
import Potential from "../Components/Potential";
import Resistor from "../Components/Resistor";
import Printed from "../Components/Printed";
import Evconnector from "../Components/Evconnector";
import Charging from "../Components/Charging";


function CategoryDetails() {
  const { name } = useParams();

  console.log("NAME:", name);

  if (name === "automotive-components") return <Automotivesection />;
  if (name === "electromechanical") return <Mechanical />;
  if (name === "ferritesmagnets") return <Magnet />;
  if (name === "optoelectronics-component") return <Divide />;
  if (name === "passive-component") return <Capacitor />;
  if (name === "pcb") return <Circuit />;
  if (name === "automotive-electronics") return <Quality />;
  if (name === "audio-components") return <Cable />;
  if (name === "cables-and-wire-accessories") return <Wire />;
  if (name === "connectors-and-terminals") return <Terminal />;
  if (name === "cooling-and-thermal-management") return <Cooling />;
  if (name === "motors-and-drives") return <Motors />;
  if (name === "sockets-and-holders") return <Socket />;
if (name === "switches-and-relays") return <Switch />;
if (name === "ferrite-cores") return <Ferrite />;
if (name === "magnetic-cores") return <Cores />;
if (name === "58") return <Display />;
if (name === "126") return <Display />;
if (name === "capacitors") return <Led />;
if (name === "potentiometer") return <Potential />;
if (name === "resistors") return <Resistor />;
if (name === "printed-circuit-boards-(pcbs)") return <Printed />;
if (name === "ceramic-components") return <Ceramic />;
if (name === "ev-connectors") return <Evconnector />;
if (name === "ev-charging-cable-assemblies") return <Evconnector />;
if (name === "automotive-rubber-components") return <Charging />;

  return (
    <div style={{ padding: "40px" }}>
      <h2>Category Not Found</h2>
      <h3>{name}</h3>
    </div>
  );
}

export default CategoryDetails;