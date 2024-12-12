import axios from "axios";
import React from "react";

const Login = () => {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form  class="mt-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600" for="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-sm font-medium text-gray-600"
              for="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            class="w-full px-4 py-2 mt-4 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none">
            Login
          </button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <a href="/signup" class="text-purple-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
