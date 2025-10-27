import { useContext, useState } from "react";
import Layout from "../layouts/MainLayout";
import { UserContext, type User } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { Tokenizer } from "../utils/Tokenizer";
import { postToServer } from "../utils/Http";
import { useNotification } from "../providers/NotificationProvider";


const LoginPage = () => {

  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const { show } = useNotification();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedForm = { ...form, password: await Tokenizer.hashPassword(form.password) }

    postToServer("/sign_in", hashedForm)
      .then((res: any) => {
        userContext.logUserIn(res.data.user as User)
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Brand Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fache-book
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Welcome back! Please sign in to your account.</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a 
                  href="/signup" 
                  className="text-blue-600 hover:text-purple-600 font-semibold hover:underline transition-colors duration-200"
                >
                  Create one now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;

