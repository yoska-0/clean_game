import { BsX } from "react-icons/bs";

export default function ErrorMassege({ error, setError }) {
  return (
    <div
      className="
              flex items-center justify-between
              bg-red-500 text-white
              p-3 rounded-lg
              mt-4
            "
    >
      <span>{error}</span>

      <button
        type="button"
        onClick={() => setError("")}
        className="
                ml-3
                rounded-full
                p-1
                transition
                hover:bg-red-600
              "
      >
        <BsX className="text-2xl" />
      </button>
    </div>
  );
}
