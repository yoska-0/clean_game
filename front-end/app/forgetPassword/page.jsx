"use client";

import { useState } from "react";
import apiFutrues from "../../lib/api.js";
import { TailSpin } from "react-loader-spinner";

export default function forgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handelSubmit = async () => {
    setLoading(true);
    try {
      await apiFutrues.forgetPassword(email);
      setError("");
      sessionStorage.setItem("email", email);
      window.location.href = "/verifyResetCode";
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
        <h2 className="text-4xl mb-10 font-mono">Forget Password</h2>
        <div className="flex flex-col" dir="ltr">
          <label htmlFor="email" className="mt-5">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="focus:outline-none border-gray-300 border-2 px-2 "
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button
            className={`mt-7 rounded-md bg-[var(--bg-blue)] py-2 text-white
              flex justify-center items-center
                    ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100 cursor-pointer"
                    }`}
            onClick={() => handelSubmit()}
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
              "Send code"
            )}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
      )}
    </div>
  );
}
