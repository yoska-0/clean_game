"use client";

import { useState } from "react";
import apiFutrues from "../../lib/api.js";

export default function confirmEmail() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handelSubmit = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const data = await apiFutrues.confirmEmail({ email, codeConfirm: code });
      setError("");
      localStorage.setItem("token", data.token);
      sessionStorage.removeItem("email");
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
        <h2 className="text-4xl mb-10 font-mono">Confirm Email</h2>
        <div className="flex flex-col" dir="ltr">
          <label htmlFor="code" className="mt-5">
            Code
          </label>
          <input
            type="text"
            id="code"
            className="focus:outline-none border-gray-300 border-2 px-2 "
            onChange={(e) => setCode(e.target.value)}
          ></input>
          <button
            className="mt-7 cursor-pointer rounded-md bg-[var(--bg-blue)] py-2 text-white"
            onClick={() => handelSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
      )}
    </div>
  );
}
