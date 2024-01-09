import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
const url = "";

const allProductsQuery = (queryParams) => {
  const {
    search,
    category,
    company,
    sort,
    price,
    shipping,
    page,
  } = queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};

export const loader = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await queryClient.ensureQueryData(allProductsQuery(params));
  const products = response.data;
  return { products, params };
};

const Products = () => {
  const { isAuth } = useSelector((store) => store.userState);

  console.log(isAuth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
