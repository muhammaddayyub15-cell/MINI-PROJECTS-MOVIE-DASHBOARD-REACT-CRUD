import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import MovieList from "../components/ui/movie/MovieList";

function Popular() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [mobileSearch, setMobileSearch] = useState(search);
  const mobileDebounce = useRef(null);

  const handleMobileSearch = (val) => {
    setMobileSearch(val);
    clearTimeout(mobileDebounce.current);
    mobileDebounce.current = setTimeout(() => {
      if (val) setSearchParams({ search: val });
      else setSearchParams({});
    }, 500);
  };

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const perPage = 24;

  // reset page saat search berubah
  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await api.get(
          `/movies?type=popular&page=${page}&per_page=${perPage}&search=${search}`
        );

        const result = res.data?.data;

        if (!ignore) {
          setMovies(result.data);
          setLastPage(result.last_page);
        }
      } catch (err) {
        console.log("Popular fetch error:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [page, search]);

  return (
    <div className="text-white">
      <h1 className="mb-4 text-2xl font-bold">Popular Movies</h1>

      {/* SEARCH mobile & tablet */}
      <input
        type="text"
        placeholder="Search popular..."
        value={mobileSearch}
        onChange={(e) => handleMobileSearch(e.target.value)}
        className="w-full px-4 py-2 mb-4 text-sm text-white placeholder-gray-400 rounded-xl bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 lg:hidden"
      />

      {loading ? (
        <div className="text-white/40">Loading...</div>
      ) : (
        <MovieList movies={movies} />
      )}

      {!loading && lastPage > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm transition-all border rounded-lg bg-white/10 border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            ← Prev
          </button>
          <span className="px-3 py-1 text-sm rounded-lg bg-white/10">{page} / {lastPage}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
            disabled={page === lastPage}
            className="px-4 py-2 text-sm transition-all border rounded-lg bg-white/10 border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Popular;