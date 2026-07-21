"use client";

import { useState } from "react";
import apiFutrues from "../../lib/api";
import { BsX } from "react-icons/bs";
import ErrorMassege from "./ErrorMassege";
export default function CommentsForm(props) {
  const [formData, setFormData] = useState({
    comment: props.review?.comment || "",
    beliefs: props.review?.beliefs || null,
    nudity: props.review?.nudity || null,
    homosexuality: props.review?.homosexuality || null,
    user: props.review?.user._id || "",
    game: props.review?.game || "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalReview;

    if (!props.review) {
      finalReview = {
        ...formData,
        user: props.userId,
        game: props.curentGame._id,
      };
    }

    try {
      if (props.review) {
        await apiFutrues.updateReview(props.review._id, formData);
      } else {
        await apiFutrues.createRivew(finalReview);
      }
      props.setShowCommentForm(false);
      setError("");
      location.reload();
    } catch (error) {
      setError(
        error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    }

    setFormData({
      comment: "",
      beliefs: null,
      nudity: null,
      homosexuality: null,
      user: "",
      game: "",
    });
  };

  return (
    <div className="bg-[var(--bg-blue)] rounded-2xl p-10 text-right relative">
      <button
        type="button"
        onClick={() => props.setShowCommentForm(false)}
        className="
        cursor-pointer
    absolute
    left-5
    top-5
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    text-zinc-400
    transition-all
    duration-200
    hover:bg-zinc-800
    hover:text-white
    active:scale-90
  "
      >
        <BsX className="text-3xl" />
      </button>
      <form className="w-full max-w-xl space-y-6" onSubmit={handleSubmit}>
        {/* Comment */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">
            التعليق
          </label>

          <textarea
            rows={5}
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            required
            placeholder="اكتب رأيك عن اللعبة..."
            maxLength={700}
            className="
        w-full
        resize-none
        rounded-xl
        border border-zinc-700
        bg-zinc-900
        px-4
        py-3
        text-white
        placeholder:text-zinc-500
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
      "
          />
        </div>

        {/* Ratings */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              الشركيات
            </label>

            <input
              type="number"
              required
              value={formData.beliefs}
              onChange={(e) =>
                setFormData({ ...formData, beliefs: Number(e.target.value) })
              }
              min={0}
              max={10}
              step="any"
              className="
          w-full
          rounded-xl
          border border-zinc-700
          bg-zinc-900
          px-4
          py-3
          text-center
          text-white
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              الشذوذ
            </label>

            <input
              type="number"
              value={formData.homosexuality}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  homosexuality: Number(e.target.value),
                })
              }
              required
              min={0}
              max={10}
              step="any"
              className="
          w-full
          rounded-xl
          border border-zinc-700
          bg-zinc-900
          px-4
          py-3
          text-center
          text-white
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
              المحتوي الجنسي
            </label>

            <input
              type="number"
              value={formData.nudity}
              onChange={(e) =>
                setFormData({ ...formData, nudity: Number(e.target.value) })
              }
              required
              min={0}
              max={10}
              step="any"
              className="
          w-full
          rounded-xl
          border border-zinc-700
          bg-zinc-900
          px-4
          py-3
          text-center
          text-white
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
            />
          </div>
        </div>

        <button
          type="submit"
          className="
      w-full
      rounded-xl
      bg-blue-600
      py-3
      font-semibold
      text-white
      transition
      hover:bg-blue-700
      active:scale-95
    "
        >
          {props.review ? "تعديل التعليق" : " إرسال التعليق"}
        </button>
        {error && <ErrorMassege error={error} setError={setError} />}
      </form>
    </div>
  );
}
