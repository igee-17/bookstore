import { Link, useLoaderData } from "react-router-dom";
import bookBg from "../assets/book.jpg";
import { useEffect } from "react";
import { setBooks } from "../features/books/bookSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductsGrid = ({ filtered }) => {
  const { products } = useLoaderData();

  const { books } = useSelector((store) => store.bookSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    if (filtered) {
      const filteredProducts = products.slice(0, 5);
      dispatch(setBooks(filteredProducts));
    } else dispatch(setBooks(products));
  }, [products]);

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books?.map((product, index) => {
        const { url, name, authors, numberofPages, publisher } = product;
        return (
          <Link
            key={index + 1}
            to={`/books/${index + 1}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={bookBg}
                alt={name}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{name}</h2>
              <span className="text-secondary">{numberofPages}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
