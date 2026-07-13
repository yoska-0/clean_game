"use client";

import { useState } from "react";
import Link from "next/link";
import apiFutrues from "../../lib/api.js";
import ErrorMassege from "../_componts/ErrorMassege.jsx";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFutrues.logIn(formData);
      setError("");
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      setError(
        error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen absolute bg-white">
      <div className="border-zinc-300 border-2 p-10 mb-20">
        <h2 className="text-4xl mb-10 font-mono">Clean Game</h2>
        <form className="flex flex-col" dir="ltr" onSubmit={handelSubmit}>
          <label htmlFor="email" className="mt-5">
            Email:
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="focus:outline-none border-gray-300 border-2 px-2 "
          />
          <label htmlFor="password" className="mt-5">
            Password:
          </label>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="focus:outline-none border-gray-300 border-2 px-2"
          />
          {/* forgatPassword */}
          <Link
            href="/forgetPassword"
            passHref
            className="mt-3 mx-auto underline text-blue-600"
          >
            forget password
          </Link>
          {/* forgatPassword */}
          <button
            type="submit"
            className="mt-7 cursor-pointer rounded-md bg-[var(--bg-blue)] py-2 text-white"
          >
            log in
          </button>
        </form>
      </div>
      {error && <ErrorMassege error={error} setError={setError} />}
    </div>
  );
}
