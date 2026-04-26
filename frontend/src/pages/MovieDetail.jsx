import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useMovie } from "../contexts/MovieContexts";

function MovieDetail() {
  const { id } = useParams();
  const { toggleWatchlist, isInWatchlist } = useMovie();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const inWatchlist = isInWatchlist(Number(id));

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data.data);
      } catch (err) {
        console.log("Error fetch movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleWatchlist = async () => {
    try {
      await api.post(`/watchlist/${id}`);
      toggleWatchlist(Number(id));
    } catch (err) {
      console.log("Watchlist error:", err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (!movie) return <p className="text-white">Movie not found</p>;

  const categories = (() => {
    try { return JSON.parse(movie.categories || "[]").join(", "); }
    catch { return ""; }
  })();

  return (
    <div className="text-white">

      {/* HERO */}
      <div className="relative mb-6">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="object-cover w-full h-[350px] rounded-xl"
          onError={(e) => { e.target.src = "https://placehold.co/1200x350/1a1a1a/ffffff?text=No+Image"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl" />
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-yellow-400">⭐ {movie.rating}</p>
          <p className="text-sm text-gray-300">{categories}</p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleWatchlist}
          className={`px-5 py-2 font-semibold rounded-lg transition-all active:scale-95
            ${inWatchlist
              ? "bg-yellow-500/30 text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/40"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
        >
          {inWatchlist ? "★ Saved" : "☆ Watchlist"}
        </button>

        <button className="px-5 py-2 transition-all border rounded-lg bg-white/10 border-white/20 hover:bg-white/20">
          ▶ Watch (Coming Soon)
        </button>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Description</h2>
        <p className="text-gray-300">{movie.description || "No description available"}</p>
      </div>

      {/* TRAILER */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Trailer</h2>
        <div className="overflow-hidden rounded-lg aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/YoHD9XEInc0"
            title="Trailer"
            allowFullScreen
          />
        </div>
      </div>

    </div>
  );
}

export default MovieDetail;