import { useContext, useState } from "react";
import Layout from "../layouts/MainLayout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Http } from "../utils/Http";
import { Tokenizer } from "../utils/Tokenizer";
import { UserContext, type User } from "../providers/UserProvider";
import { useNotification } from "../providers/NotificationProvider";

const SignUpPage = () => {

  const userContext = useContext(UserContext);
  const { show, hide } = useNotification();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hashedForm = { ...form, password: await Tokenizer.hashPassword(form.password) }
    console.log("Form submitted", hashedForm);

    Http.postToServer("/sign_up", hashedForm)
      .then((res: any) => {
        userContext.logUserIn(res.data.user._doc as User)
        navigate("/")
      })
      .catch((err) => {
        show({
          title: "Error",
          description: err.response.data.error,
          color: "red",
          duration: 5000
        })

      })

  };


  if (userContext.isLoggedIn) {
    navigate("/");
  }

  return (
    <Layout hideNav>
      <div className="flex justify-center items-center min-h-full w-full">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </Layout >
  );
};

export default SignUpPage;

