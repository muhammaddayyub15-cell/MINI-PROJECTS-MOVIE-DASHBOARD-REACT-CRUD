import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useMovie } from "../contexts/MovieContexts";

// Definisi reactions dipindah ke luar komponen (konstanta statis)
const REACTIONS = [
  { type: "love", emoji: "👍", label: "Love" },
  { type: "neutral", emoji: "😐", label: "Neutral" },
  { type: "hate", emoji: "👎", label: "Hate" },
];

function MovieDetail() {
  const { id } = useParams();
  const { toggleWatchlist, isInWatchlist } = useMovie();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // State yang hilang ditambahkan
  const [counts, setCounts] = useState({ love: 0, hate: 0, neutral: 0, watchlist: 0 });
  const [reaction, setReaction] = useState(null); // "love" | "hate" | null
  const [showReactions, setShowReactions] = useState(false);
  const reactionRef = useRef(null);

  const inWatchlist = isInWatchlist(Number(id));

  // Derived value untuk tampilan tombol React
  const currentReaction = REACTIONS.find((r) => r.type === reaction) || null;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data.data);

        // Inisialisasi counts dari data API jika tersedia
        const data = res.data.data;
        setCounts({
          love: data.love_count ?? 0,
          neutral: data.neutral_count ?? 0,
          hate: data.hate_count ?? 0,
          watchlist: data.watchlist_count ?? 0,
        });
        setReaction(data.user_reaction || null);
      } catch (err) {
        console.log("Error fetch movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Close reaction dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (reactionRef.current && !reactionRef.current.contains(e.target)) {
        setShowReactions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handleWatchlist — satu definisi saja, tidak duplikat
  const handleWatchlist = async (e) => {
    e?.stopPropagation();
    try {
      await api.post(`/watchlist/${id}`);
      toggleWatchlist(Number(id));
      setCounts((prev) => ({
        ...prev,
        watchlist: inWatchlist
          ? Math.max(0, prev.watchlist - 1)
          : prev.watchlist + 1,
      }));
    } catch (err) {
      console.log("Watchlist error:", err);
    }
  };

  // handleReaction — menggunakan state yang benar
  const handleReaction = async (e, type) => {
    e.stopPropagation();
    try {
      await api.post(`/reactions/${id}`, { type });
      setCounts((prev) => {
        const next = { ...prev };
        // Kurangi reaksi lama jika ada
        if (reaction === "love") next.love = Math.max(0, next.love - 1);
        if (reaction === "neutral") next.neutral = Math.max(0, next.neutral - 1);
        if (reaction === "hate") next.hate = Math.max(0, next.hate - 1);
        // Tambah reaksi baru
        if (type === "love") next.love += 1;
        if (type === "neutral") next.neutral += 1;
        if (type === "hate") next.hate += 1;
        return next;
      });
      setReaction(type);
      setShowReactions(false);
    } catch (err) {
      console.log("Reaction error:", err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (!movie) return <p className="text-white">Movie not found</p>;

  const categories = (() => {
    try {
      return JSON.parse(movie.categories || "[]").join(", ");
    } catch {
      return "";
    }
  })();

  return (
    <div className="text-white">
      {/* HERO */}
      <div className="relative mb-6">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="object-cover w-full h-[350px] rounded-xl"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/1200x350/1a1a1a/ffffff?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl" />
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-yellow-400">⭐ {movie.rating}</p>
          <p className="text-sm text-gray-300">{categories}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Description</h2>
        <p className="text-gray-300">
          {movie.description || "No description available"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-1 mb-2.5">
        {[
          { emoji: "👍", count: counts.love, label: "Love" },
          { emoji: "😐", count: counts.neutral, label: "Neutral" },
          { emoji: "👎", count: counts.hate, label: "Hate" },
          { emoji: "★", count: counts.watchlist, label: "Saved" },
        ].map(({ emoji, count, label }) => (
          <div
            key={label}
            className="flex flex-col items-center py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <span className="text-xs">{emoji}</span>
            <span className="text-white font-semibold text-[11px]">
              {count}
            </span>
            <span className="text-white/40 text-[9px]">{label}</span>
          </div>
        ))}
      </div>

      {/* Views */}
      {movie?.views !== undefined && (
        <div className="flex justify-between text-[10px] mb-2.5 border-t border-white/10 pt-2">
          <span className="text-white/40">Views</span>
          <span className="text-white/70">
            {Number(movie.views).toLocaleString()}
          </span>
        </div>
      )}

      {/* React + Watchlist */}
      <div className="flex gap-1.5 mb-6">
        <div ref={reactionRef} className="relative flex-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowReactions((p) => !p);
            }}
            className={`w-full py-1.5 text-[10px] rounded-lg border transition-all active:scale-95
              ${reaction
                ? "bg-white/20 border-white/30 text-white"
                : "bg-white/10 text-white/60 border-white/15 hover:bg-white/20"
              }`}
          >
            {currentReaction
              ? `${currentReaction.emoji} ${currentReaction.label}`
              : "🤍 React"}
          </button>

          {showReactions && (
            <div
              className="absolute bottom-[calc(100%+4px)] left-0 w-32
              bg-black/80 backdrop-blur-xl border border-white/20
              rounded-xl overflow-hidden z-50 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            >
              {REACTIONS.map((r) => (
                <button
                  key={r.type}
                  onClick={(e) => handleReaction(e, r.type)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-[10px] transition-all
                    ${reaction === r.type
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/15"
                    }`}
                >
                  <span>{r.emoji}</span>
                  <span>{r.label}</span>
                  {reaction === r.type && (
                    <span className="ml-auto text-white/40">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleWatchlist}
          className={`flex-1 py-1.5 text-[10px] rounded-lg border transition-all active:scale-95
            ${inWatchlist
              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30"
              : "bg-white/10 text-white/60 border-white/15 hover:bg-white/20"
            }`}
        >
          {inWatchlist ? "★ Saved" : "☆ Watchlist"}
        </button>
      </div>

      {/* TRAILER */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Trailer</h2>
        <div className="overflow-hidden rounded-lg aspect-video">
          <iframe
            className="w-full h-full"
            src={movie.trailers && movie.trailers.length > 0 ? movie.trailers[0].url : "https://www.youtube.com/embed/YoHD9XEInc0"}
            title="Trailer"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;