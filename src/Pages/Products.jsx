import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "../Assets/css/products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  const getProducts = () => {
    axios
      .get("http://localhost:4000/api/products/getProducts")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductCategories = () => {
    axios
      .get("http://localhost:4000/api/products/product-categories")
      .then((response) => {
        setProductCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
    getProductCategories();
  }, []);

  return (
    <div className={classes.products__wrapper}>
      <h1 className={classes.products__top__title}>List of Products</h1>
      <div className={classes.products__top__bar}>
        <div>
          <label htmlFor="cars">Top Categories</label>
          <select name="cars" id="cars">
            <option disabled selected value="">
              Select Category
            </option>
            {productCategories?.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button
          //   onClick={addUserButtonHandler}
          className={classes.add__product__btn}
        >
          Add Product
        </button>
      </div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
                <div className="card">
                  <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0">Today's Combo Offer</p>
                    <div
                      className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "35px", height: "35px" }}
                    >
                      <p className="text-white mb-0 small">x4</p>
                    </div>
                  </div>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt="Laptop"
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="small">
                        <a href="#!" className="text-muted">
                          Laptops
                        </a>
                      </p>
                      <p className="small text-danger">
                        <s>$1099</s>
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">HP Notebook</h5>
                      <h5 className="text-dark mb-0">$999</h5>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <p className="text-muted mb-0">
                        Available: <span className="fw-bold">6</span>
                      </p>
                      <div className="ms-auto text-warning">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
