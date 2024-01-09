import { FormInput, SubmitBtn } from "../components";
import { Form, Link, useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"; // Updated import
import { auth } from "../firebase/firebaseConfig"; // Importing auth from firebaseConfig
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // Use Firebase authentication to create a new user
    await createUserWithEmailAndPassword(auth, data.email, data.password);

    // Make an HTTP request to your backend route to send verification code using axios
    // const sendVerificationCodeResponse = await axios.post(
    //   "http://localhost:8080/api/sendVerificationCode",
    //   {
    //     phone: data.phoneNumber,
    //   }
    // );
    toast.success("Account created successfully");
    return redirect("/phone");

    // if (sendVerificationCodeResponse.status === 200) {
    //   const verificationCode =
    //     sendVerificationCodeResponse.data.verificationCode;
    // } else {
    //   toast.error("Failed to send verification code");
    // }
  } catch (error) {
    const errorMessage =
      error.message || "Please double-check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async () => {
    await action({ request: { formData: async () => await new FormData() } });
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="Username" name="username" />
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />
        {/* <FormInput
          type="tel"
          label="Phone Number"
          name="phoneNumber"
          placeholder="+2348030003300"
        /> */}
        <div className="mt-4">
          <SubmitBtn text="Register" onClick={handleRegister} />
        </div>
        <p className="text-center">
          Already a member?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
