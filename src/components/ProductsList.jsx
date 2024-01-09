import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import bookBg from "../assets/book.jpg";
import { setBooks } from "../features/books/bookSlice";

const ProductsList = () => {
  const { products } = useLoaderData();

  const { books } = useSelector((store) => store.bookSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBooks(products));
  }, []);

  return (
    <div className="mt-12 grid gap-y-8">
      {books.map((product, index) => {
        const { url, name, authors, numberofPages, publisher } = product;

        return (
          <Link
            key={product.id}
            to={`/books/${index + 1}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={bookBg}
              alt={name}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{name}</h3>
              <h4 className="capitalize text-md text-neutral-content">
                {publisher}
              </h4>
            </div>
            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {numberofPages}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsList;
