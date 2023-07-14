import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import classes from "../Assets/css/Modal.module.css";

import { RxCross2 } from "react-icons/rx";

const ProductModal = ({ modalOpenCloseHandler, setFlag }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const addProductSubmitHandler = (data, e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/products/addProduct", data)
      .then(function (response) {
        if (response.data.success) {
          toast.success(response.data.success);
          setTimeout(() => {
            setFlag(true);
            modalOpenCloseHandler();
            navigate("/products");
          }, 1500);
        } else {
          toast.error(response.data.error);
          setTimeout(() => {
            modalOpenCloseHandler();
          }, 1500);
        }
      })
      .catch(function (error) {
        console.log(error);
        modalOpenCloseHandler();
      });
  };

  return (
    <div className={classes.modal}>
      <Toaster />
      <div
        className={classes.modal__cancel__icon}
        onClick={modalOpenCloseHandler}
      >
        <RxCross2 />
      </div>
      <div className={classes.modal__title}>Add Product</div>
      <form onSubmit={handleSubmit(addProductSubmitHandler)}>
        <div className={classes.form__group}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", {
              required: true,
            })}
          />
        </div>
        {errors?.title?.type === "required" && (
          <p className={classes.modal__error}>Title is required</p>
        )}
        <div className={classes.form__group}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            {...register("description", {
              required: true,
            })}
          />
        </div>
        {errors?.description?.type === "required" && (
          <p className={classes.modal__error}>Description is required</p>
        )}
        <div className={classes.form__group}>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            {...register("image", {
              required: true,
            })}
          />
        </div>
        {errors?.image?.type === "required" && (
          <p className={classes.modal__error}>Image URL is required</p>
        )}

        <div className={classes.form__group}>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            {...register("category", {
              required: true,
            })}
          />
        </div>
        {errors?.category?.type === "required" && (
          <p className={classes.modal__error}>Category is required</p>
        )}
        <div className={classes.form__group}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            step="any"
            {...register("price", {
              required: true,
            })}
          />
        </div>
        {errors?.price?.type === "required" && (
          <p className={classes.modal__error}>Price is required</p>
        )}
        <div className={classes.form__group}>
          <label htmlFor="reviews">Reviews:</label>
          <input
            type="number"
            id="reviews"
            name="reviews"
            {...register("reviews")}
          />
        </div>

        <input
          className={classes.form__submit}
          type="submit"
          value="Add Product"
        />
      </form>
    </div>
  );
};

export default ProductModal;
