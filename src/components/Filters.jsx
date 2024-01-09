import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../features/books/bookSlice";

const Filters = () => {
  // const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");

  const { search } = useSelector((store) => store.bookSlice);

  const dispatch = useDispatch();

  const { products } = useLoaderData();

  useEffect(() => {
    // Filter books based on the search parameter
    const filteredBooks = products.filter(
      (book) =>
        book.name && book.name.toLowerCase().includes(search?.toLowerCase())
    );

    // Sort books based on the order parameter
    if (order === "a-z") {
      filteredBooks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "z-a") {
      filteredBooks.sort((a, b) => b.name.localeCompare(a.name));
    } else if (order === "all") {
      dispatch(setBooks(products));
    }

    dispatch(setBooks(filteredBooks));
  }, [search, order, products]);

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search book"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      <FormSelect
        label="View"
        name="order"
        list={["all", "a-z", "z-a"]}
        size="select-sm"
        defaultValue={order}
        handler={setOrder}
      />
      <Link to="/books" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};
export default Filters;
