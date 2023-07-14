import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Backdrop from "../Components/Backdrop";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../redux/actions/loadingAction";
import classes from "../Assets/css/products.module.css";
// import classes from "../Assets/css/products.module.css";
import {
  removeSelectedProduct,
  setSelectedProduct,
} from "../redux/actions/productActions";


const ProductDetail = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const product = useSelector((state) => state.selectedProduct);

  const { productId } = useParams();

  const getProductDetails = async () => {
    dispatch(setIsLoading());
    const response = await axios
      .get(`http://localhost:4000/api/products/productDetails/${productId}`)
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      dispatch(setSelectedProduct(response?.data?.productDetail));
      dispatch(setIsLoading());
    }, 1000);
  };

  useEffect(() => {
    getProductDetails();

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, []);

  return (
    <div>
      {!isLoading && <section className={classes.product__detail__section}>
        <div class="container py-5">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-4">
              <div class="card text-black p-4">
                <i class="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                <img
                  src={product.image}
                  class="card-img-top"
                  alt="Apple Computer"
                />
                <div class="card-body">
                  <div class="text-center">
                    <h5 class="card-title mt-4">{product.title}</h5>
                    <p class="text-muted my-4">{product.description}</p>
                  </div>

                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Price</span>
                    <span>${product.price}</span>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Reviews</span>
                    <span>{product.reviews}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {isLoading && <Backdrop />}
      {isLoading && <Loader />}
    </div>
  );
};

export default ProductDetail;
