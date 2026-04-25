import { useState } from "react";
import MovieList from "../components/ui/movie/MovieList";
import { MOVIE_DUMMY } from "../data/movies";

function Home() {
  // =========================
  // 🔍 STATE SEARCH
  // =========================
  const [search, setSearch] = useState("");

  // =========================
  // 🎬 DATA (sementara dummy)
  // =========================
  const movies = MOVIE_DUMMY;

  return (
    <div className="text-white">
      
      {/* ================= HEADER ================= */}
      <h1 className="mb-4 text-2xl font-bold">
        🎬 Movie Dashboard
      </h1>

      {/* ================= SEARCH ================= */}
      <input
        placeholder="Search movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 mb-4 text-white rounded outline-none bg-white/10 focus:ring-2 ring-red-500"
      />

      {/* ================= LIST ================= */}
      <MovieList movies={movies} search={search} />
    </div>
  );
}

export default Home;