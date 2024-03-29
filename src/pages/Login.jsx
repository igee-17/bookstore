import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Updated import
import { auth } from "../firebase/firebaseConfig";

export const action = (store) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // Use Firebase authentication instead of customFetch
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.identifier,
      data.password
    );

    console.log(userCredential.user);

    // Dispatch user data to Redux store
    store.dispatch(loginUser(userCredential.user));
    toast.success("Logged in successfully");
    localStorage.setItem("isAuth", "true");
    return redirect("/books");
  } catch (error) {
    const errorMessage =
      error.message || "Please double-check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      // Use Firebase authentication for guest user login
      const guestUserCredential = await signInWithEmailAndPassword(
        auth,
        "test@test.com",
        "secret"
      );

      dispatch(loginUser(guestUserCredential.user));
      toast.success("Welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Guest user login error. Please try again");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="Email" name="identifier" />
        <FormInput type="password" label="Password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        {/* <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          Guest user
        </button> */}
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
