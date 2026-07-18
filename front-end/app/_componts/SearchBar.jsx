"use client";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import apiFutrues from "../../lib/api";
export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [gamesSearch, setGamesSearch] = useState([]);
  const [debouncedValue] = useDebounce(search, 300);

  function eventSearch(name) {
    router.push(`/gamesPages/${name}`);
  }

  useEffect(() => {
    const fetchSearchGames = async () => {
      if (!debouncedValue) {
        setGamesSearch([]);
        return;
      }

      const games = await apiFutrues.getSearchGames(debouncedValue, 5);
      setGamesSearch(games.data);
    };

    fetchSearchGames();
  }, [debouncedValue]);

  return (
    <div className="relative mt-5">
      <div className="flex items-center  justify-between w-full bg-[#efefef] mt-5  rounded-lg p-3">
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
        {/* search games dropdown */}
        {search && (
          <div className="absolute left-0 top-full mt-2 w-full rounded-lg bg-[#efefef] shadow-xl overflow-hidden z-50">
            {gamesSearch.length > 0 ? (
              gamesSearch.map((game) => (
                <div
                  key={game._id}
                  onClick={() => eventSearch(game.name)}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-200 transition"
                >
                  <span className="text-black font-medium">{game.name}</span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">لا توجد نتائج</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
