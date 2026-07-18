"use client";

import { useState } from "react";
import apiFutrues from "../../lib/api.js";
import { TailSpin } from "react-loader-spinner";

export default function verifyResetCode() {
  const [formDate, setFormDate] = useState({
    email: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormDate({ ...formDate, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formDate,
        email: sessionStorage.getItem("email") || "",
      };
      await apiFutrues.resetPassword(data);
      setError("");
      sessionStorage.removeItem("email");
      window.location.href = "/login";
    } catch (error) {
      setError(
        error.response?.data?.errors?.[0]?.msg ||
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
        <h2 className="text-4xl mb-10 font-mono">Reset Password</h2>
        <form className="flex flex-col" dir="ltr" onSubmit={handelSubmit}>
          <label htmlFor="newPassword" className="mt-5">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formDate.newPassword}
            className="focus:outline-none border-gray-300 border-2 px-2 "
            onChange={handleChange}
          ></input>
          <button
            type="submit"
            className={`mt-7 rounded-md bg-[var(--bg-blue)] py-2 text-white
              flex  justify-center items-center
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
              "Submit"
            )}
          </button>
        </form>
      </div>
      {error && (
        <div className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
      )}
    </div>
  );
}
