"use client";

import { useState } from "react";
import apiFutrues from "../../lib/api.js";
import ErrorMassege from "../_componts/ErrorMassege.jsx";
import { TailSpin } from "react-loader-spinner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await apiFutrues.signUp(formData);
      setError("");
      sessionStorage.setItem("email", data.email);
      window.location.href = "/confirmEmail";
    } catch (error) {
      setError(
        error.response?.data?.errors?.[0].msg ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen absolute bg-white">
      <div className="border-zinc-300 border-2 p-10 mb-20">
        <h2 className="text-4xl mb-10">Clean Game</h2>
        <form className="flex flex-col" dir="ltr" onSubmit={handelSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="focus:outline-none border-gray-300 border-2 px-2 "
          />
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
          <label htmlFor="passwordConfirm" className="mt-5">
            Confirm Password:
          </label>
          <input
            name="passwordConfirm"
            type="password"
            required
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="focus:outline-none border-gray-300 border-2 px-2"
          />
          <button
            type="submit"
            disabled={loading}
            className={`mt-7
               rounded-md bg-[var(--bg-blue)] py-2 text-white 
              flex justify-center items-center
              ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
          >
            {loading ? (
              <TailSpin
                height="20"
                width="20"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
      {error && <ErrorMassege error={error} setError={setError} />}
    </div>
  );
}
