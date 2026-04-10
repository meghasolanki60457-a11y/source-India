import React from "react";

import Compound from "../components/Compound";
import Electronic from "../components/Electronic";
import Finishedproduct from "../components/Finishedproduct";
import Manufacturing from "../components/Manufacturing";
import Hardware from "../components/Hardware";

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