import { useState } from "react";
import { useMovie } from "../contexts/MovieContexts";
import MovieList from "../components/ui/movie/MovieList";

function Genre() {
  const { movies } = useMovie();
  const [selected, setSelected] = useState("All");

  // ambil semua genre unik dari categories JSON
  const allGenres = ["All", ...new Set(
    movies.flatMap((m) => {
      try { return JSON.parse(m.categories || "[]"); }
      catch { return []; }
    })
  )];

  const filtered = selected === "All"
    ? movies
    : movies.filter((m) => {
        try {
          return JSON.parse(m.categories || "[]").includes(selected);
        } catch { return false; }
      });

  return (
    <div className="text-white">
      <h1 className="mb-4 text-2xl font-bold">🎭 Genre</h1>

      {/* FILTER */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allGenres.map((g) => (
          <button
            key={g}
            onClick={() => setSelected(g)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all active:scale-95
              ${selected === g
                ? "bg-yellow-500 text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
          >
            {g}
          </button>
        ))}
      </div>

      <MovieList movies={filtered} />
    </div>
  );
}

export default Genre;