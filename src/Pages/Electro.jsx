import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Electro = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!slug) return;

    fetch(
      `https://react-live.sourceindia-electronics.com/v1/api/categories/item-category?slug=${slug}&page=1&limit=20`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result?.subcategory?.item_categories || []);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  return (
    <div className="container my-4">

      <h3 className="mb-4 text-primary">
        {slug}
      </h3>

      <div className="row">
        {data.map((item) => (
          <div className="col-md-3 mb-3" key={item.id}>
            <div className="card p-2 text-center">

              <img
                src={`https://react-live.sourceindia-electronics.com/${item.file_name}`}
                className="img-fluid"
                alt={item.name}
              />

              <h6 className="mt-2">
                {item.name}
              </h6>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Electro;