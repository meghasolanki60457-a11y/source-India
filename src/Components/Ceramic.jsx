import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE_URL = "https://react-live.sourceindia-electronics.com/";

const Ceramic = ({ category_id, subcategory_id, item_category_id }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category_id || !subcategory_id || !item_category_id) return;

    fetchProducts();
  }, [category_id, subcategory_id, item_category_id]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `https://react-live.sourceindia-electronics.com/v1/api/products?is_delete=0&status=1&is_approve=1&limit=15&page=1&category=${category_id}&sub_category=${subcategory_id}&item_category_id=${item_category_id}`
      );

      console.log("CERAMIC API:", res.data);

      const data = res.data?.products || res.data?.data || [];

      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Ceramic Products</h3>

      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4 mb-3" key={p.id}>
              <div className="card">

                <img
                  src={`${IMAGE_BASE_URL}v1/${p.file_name}`}
                  className="img-fluid"
                />

                <div className="card-body">
                  <h6>{p.title}</h6>
                  <p>{p.company_name}</p>
                  <p>{p.state_name}</p>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-danger">No Ceramic Data Found</p>
        )}
      </div>
    </div>
  );
};

export default Ceramic;