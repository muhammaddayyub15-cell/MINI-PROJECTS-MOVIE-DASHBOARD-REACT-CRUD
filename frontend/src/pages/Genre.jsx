import { useState } from "react";
import { useMovie } from "../contexts/MovieContexts";
import MovieList from "../components/ui/movie/MovieList";

function Genre() {
  const { movies } = useMovie();
  const [selected, setSelected] = useState("All");

  const genres = ["All", "Action", "Drama", "Sci-Fi"];

  const filtered =
    selected === "All"
      ? movies
      : movies.filter((m) => m.category === selected);

  return (
    <div className="text-white">
      <h1 className="mb-4 text-2xl font-bold">🎭 Genre</h1>

      {/* FILTER */}
      <div className="flex gap-2 mb-4">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelected(g)}
            className={`px-3 py-1 rounded ${
              selected === g ? "bg-red-600" : "bg-gray-700"
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