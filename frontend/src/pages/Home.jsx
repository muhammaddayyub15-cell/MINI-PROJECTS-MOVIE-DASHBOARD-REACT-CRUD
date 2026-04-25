import { useEffect, useState } from "react";
import MovieList from "../components/ui/movie/MovieList";
import api from "../api/axios";

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  // pagination state
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchMovies = async (pageNumber = 1) => {
    try {
      const res = await api.get(`/movies?page=${pageNumber}`);

      const data = res.data?.data;

      setMovies(data.data);        // list movie
      setPage(data.current_page);  // current page
      setLastPage(data.last_page); // total page
    } catch (err) {
      console.log("Error fetch movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div className="text-white">

      <h1 className="mb-4 text-2xl font-bold">🎬 INDOFLIX</h1>

      {/* SEARCH (optional) */}
      <input
        className="p-2 mb-4 text-black rounded"
        placeholder="Search movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* MOVIE LIST */}
      <MovieList movies={movies} search={search} />

      {/* PAGINATION */}
<div className="flex items-center justify-center gap-6 mt-6 text-white">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="text-sm transition opacity-70 hover:opacity-100 disabled:opacity-30"
  >
    Prev
  </button>

  <span className="text-sm opacity-80">
    {page} / {lastPage}
  </span>

  <button
    disabled={page === lastPage}
    onClick={() => setPage(page + 1)}
    className="text-sm transition opacity-70 hover:opacity-100 disabled:opacity-30"
  >
    Next
  </button>

</div>

    </div>
  );
}

export default Home;