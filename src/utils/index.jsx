import axios from "axios";

// const productionUrl = " http://localhost:8080/api/books/getbooks";
const productionUrl = " https://bookstore-dk2f.onrender.com/api/books/getbooks";

export const customFetch = axios.create({
  baseURL: productionUrl,
});
