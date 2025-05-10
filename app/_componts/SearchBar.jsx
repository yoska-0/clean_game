"use client";

import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  function eventSearch(name) {
    router.push(`/gamesPages/${name}`);
  }

  return (
    <div className="flex items-center justify-between w-1/2 bg-[#efefef] mt-5  rounded-lg p-3">
      <input
        value={search}
        type="search"
        placeholder="بحث"
        className="seatchBar text-black w-full bg-[#efefef] focus:outline-none"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            eventSearch(e.target.value);
          }
        }}
      />
      <FaSearch
        className="text-2xl text-[var(--bg-blue)] cursor-pointer"
        onClick={() => eventSearch(search)}
      ></FaSearch>
    </div>
  );
}
