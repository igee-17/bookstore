import { Navigate, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bookBg from "../assets/book.jpg";
import moment from "moment";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/${id}`),
  };
};

export const loader = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(
    singleProductQuery(params.id)
  );

  return { product: response.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const {
    url,
    name,
    authors,
    country,
    numberofPages,
    publisher,
    mediaType,
    released,
    isbn,
  } = product;

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const date = moment(released).format("MMMM Do YYYY");

  const cartProduct = {
    url,
    name,
    authors,
    numberofPages,
    publisher,
    mediaType,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  const { isAuth } = useSelector((store) => store.userState);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={bookBg}
          alt={name}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* PRODUCT */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {country}
          </h4>
          <p className="mt-3 text-xl">{numberofPages}</p>
          <p className="mt-6 leading-8">
            <span className="text-neutral-content w-[100px] inline-flex">
              Published by
            </span>{" "}
            - {publisher}
          </p>
          <p className=" leading-8">
            <span className="text-neutral-content w-[100px] inline-flex">
              Released
            </span>{" "}
            - {date}
          </p>
          <p className=" leading-8">
            <span className="text-neutral-content w-[100px] inline-flex">
              Book Type
            </span>{" "}
            - {mediaType}
          </p>
          <p className=" leading-8">
            <span className="text-neutral-content w-[100px] inline-flex">
              isbn
            </span>{" "}
            - {isbn}
          </p>
          <div
            key="1"
            className={`badge w-6 h-6 mr-2 mt-3 ${"border-2 border-secondary"}`}
            style={{ backgroundColor: "blue" }}
          ></div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
