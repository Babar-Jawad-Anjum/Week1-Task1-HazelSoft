import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "../Assets/css/products.module.css";
import { Link } from "react-router-dom";
import ProductModal from "../Components/ProductModal";
import Backdrop from "../Components/Backdrop";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProducts,
  setCategories,
  setCategoryProducts,
} from "../redux/actions/productActions";
import { setIsLoading } from "../redux/actions/loadingAction";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const productCategories = useSelector((state) => state.allCategories);
  const isLoading = useSelector((state) => state.isLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [flag, setFlag] = useState(false);

  const getProducts = () => {
    console.log("Inside  2nd");
    axios
      .get("http://localhost:4000/api/products/getProducts")
      .then((response) => {
        setTimeout(() => {
          console.log("2nd done");
          dispatch(setAllProducts(response.data.products));
          dispatch(setIsLoading());
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsLoading());
      });
  };
  const getProductCategories = () => {
    console.log("Inside 1st");
    dispatch(setIsLoading());
    axios
      .get("http://localhost:4000/api/products/product-categories")
      .then((response) => {
        console.log("1st done");
        dispatch(setCategories(response.data.categories));

        console.log("calling 2nd");
        //NOW GET ALL THE PRODUCTS AND CALL FUNCTION HERE
        getProducts();
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsLoading());
      });
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  useEffect(() => {
    if (flag) {
      getProductCategories();
      setFlag(false);
    }
  }, [flag]);

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    dispatch(setIsLoading());
    //Make Api call for selected menu  category
    axios
      .get(
        `http://localhost:4000/api/products/product-categories/${selectedOption}`
      )
      .then((response) => {
        setTimeout(() => {
          dispatch(setCategoryProducts(response.data.categoryProducts));
          dispatch(setIsLoading());
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modalOpenCloseHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={classes.products__wrapper}>
      <h1 className={classes.products__top__title}>List of Products</h1>
      <div className={classes.products__top__bar}>
        <div>
          <label className={classes.category__label} htmlFor="cars">
            Top Categories:
          </label>
          <select
            name="cars"
            id="cars"
            className={classes.category__menu}
            value={selectedValue}
            onChange={handleDropdownChange}
          >
            <option disabled selected value="">
              Select Category
            </option>
            <option value="All-categories">All Categories</option>
            {productCategories?.map((item, index) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button
          onClick={modalOpenCloseHandler}
          className={classes.add__product__btn}
        >
          Add Product
        </button>
      </div>
      <section className={classes.product__section}>
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 my-4" key={product._id}>
                <div className="card h-100 border p-4">
                  <div className="h-100">
                    <img
                      className="card-img-top h-100"
                      src={product.image}
                      alt="Card image cap"
                    />
                  </div>
                  <div className="card-body mt-2">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text mt-3">{product.category}</p>
                    <div class="d-flex justify-content-between total font-weight-bold mt-4">
                      <span>Price</span>
                      <span>${product.price}</span>
                    </div>
                    <div class="d-flex justify-content-between total font-weight-bold mt-4">
                      <span>Reviews</span>
                      <span>{product.reviews}</span>
                    </div>
                    <Link to={`/products/${product._id}`}>
                      <a className="btn btn-sm btn-info mt-4">See Details</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isLoading && <Backdrop />}
      {isLoading && <Loader />}
      {isModalOpen && <Backdrop modalCloseHandler={modalOpenCloseHandler} />}
      {isModalOpen && (
        <ProductModal
          modalOpenCloseHandler={modalOpenCloseHandler}
          setFlag={setFlag}
        />
      )}
    </div>
  );
};

export default Products;
