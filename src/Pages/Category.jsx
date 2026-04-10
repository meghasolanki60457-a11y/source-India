import React from "react";

import Compound from "../Components/Compound";
import Electronic from "../Components/Electronic";
import Finishedproduct from "../Components/Finishedproduct";
import Manufacturing from "../Components/Manufacturing";
import Hardware from "../Components/Hardware";

function Category() {
  return (
    <>
      <section className="mt-4">
        <Compound />
      </section>

      <section className="mt-4">
        <Electronic />
      </section>

      <section className="mt-4">
        <Finishedproduct />
      </section>

      <section className="mt-4">
        <Hardware />
      </section>

      <section className="mt-4">
        <Manufacturing />
      </section>
    </>
  );
}

export default Category;