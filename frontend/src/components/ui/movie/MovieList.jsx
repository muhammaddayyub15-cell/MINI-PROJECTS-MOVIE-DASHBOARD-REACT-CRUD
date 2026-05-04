import { useState, useCallback } from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies = [] }) {
  // Track IDs whose poster returned 404 at runtime
  const [brokenIds, setBrokenIds] = useState(new Set());

  const handleBrokenPoster = useCallback((id) => {
    setBrokenIds((prev) => {
      if (prev.has(id)) return prev; // already known, skip re-render
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white/30">
        <span className="mb-3 text-4xl">🎬</span>
        <p className="text-sm">No movies found</p>
      </div>
    );
  }

  // Sort: static no-poster first, then runtime 404s last
  const sorted = [...movies].sort((a, b) => {
    const brokenA = brokenIds.has(a.id) || !a.poster_url || a.poster_url.trim() === "" ? 1 : 0;
    const brokenB = brokenIds.has(b.id) || !b.poster_url || b.poster_url.trim() === "" ? 1 : 0;
    return brokenA - brokenB;
  });

  return (
    <div className="grid items-start grid-cols-2 gap-3 overflow-visible sm:gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {sorted.map((movie) => (
        <MovieCard key={movie.id} {...movie} onBrokenPoster={handleBrokenPoster} />
      ))}
    </div>
  );
}

export default MovieList;