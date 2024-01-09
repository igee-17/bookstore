import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  Error,
  HomeLayout,
  Landing,
  Login,
  Products,
  Register,
  SingleProduct,
} from "./pages";

import { ErrorElement } from "./components";

// loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { store } from "./store";
import PhoneVerification from "./pages/PhoneVerification";
import { useSelector } from "react-redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: "books",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
      {
        path: "books/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
  {
    path: "/phone",
    element: <PhoneVerification />,
    errorElement: <Error />,
    // action: registerAction,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
