import React, { useState } from "react";
import { login } from "../services/api.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login({ username, password });
      console.log("✅ Login thành công:", res);

      // Lưu token và username vào localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);

      // Chuyển hướng về trang chủ
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen w-full h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-full max-w-md px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in
          </h1>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Email / Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
            <div className="m-auto mt-6 w-fit md:mt-8">
              <span className="m-auto dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  className="font-semibold text-indigo-600 dark:text-indigo-100"
                  href="/register"
                >
                  Create Account
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
