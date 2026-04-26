import { useLocation } from "react-router-dom";

function Navbar({ onSearch, onMenuClick }) {
  const location = useLocation();

  const pageLabel = location.pathname === "/" ? "Movies" : "Page";

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-black border-b sm:px-6 border-white/10">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* BURGER */}
        <button
          onClick={onMenuClick}
          className="text-2xl text-white lg:hidden"
        >
          ☰
        </button>

        <h1 className="text-base font-semibold text-white sm:text-lg whitespace-nowrap">
          🎬 INDOFLIX
        </h1>
      </div>

      {/* SEARCH (ONLY DESKTOP) */}
      <div className="justify-end hidden w-full lg:flex">

        <input
          type="text"
          placeholder={`Search ${pageLabel}...`}
          onChange={(e) => onSearch?.(e.target.value)}
          className="
            w-[420px]
            xl:w-[520px]

            px-4 py-2
            text-white
            bg-gray-800/80
            rounded-lg
            outline-none
            transition

            focus:ring-2 focus:ring-yellow-400
          "
        />

      </div>

    </div>
  );
}

export default Navbar;