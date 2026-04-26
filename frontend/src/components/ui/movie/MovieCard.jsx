import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { useMovie } from "../../../contexts/MovieContexts";

function MovieCard({ id, title, poster_url, rating, categories }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState(null);
  const navigate = useNavigate();
  const reactionRef = useRef(null);

  const { toggleWatchlist, isInWatchlist } = useMovie();
  const inWatchlist = isInWatchlist(id);

  const reactions = [
    { type: "love",    emoji: "👍", label: "Love" },
    { type: "neutral", emoji: "😐", label: "Neutral" },
    { type: "hate",    emoji: "👎", label: "Hate" },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (reactionRef.current && !reactionRef.current.contains(e.target)) {
        setShowReactions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleReaction = async (e, type) => {
    e.stopPropagation();
    try {
      await api.post(`/reactions/${id}`, { type });
      setReaction(type);
      setShowReactions(false);
    } catch (err) {
      console.log("Reaction error:", err);
    }
  };

  const handleWatchlist = async (e) => {
    e.stopPropagation();
    try {
      await api.post(`/watchlist/${id}`);
      toggleWatchlist(id); // ← update context global
    } catch (err) {
      console.log("Watchlist error:", err);
    }
  };

  const currentReaction = reactions.find((r) => r.type === reaction);

  return (
    <div
      onClick={() => setShowDetail((prev) => !prev)}
      className="w-full cursor-pointer rounded-2xl text-white
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        transition-all duration-300
        hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
    >
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={poster_url}
          alt={title}
          className="object-cover w-full h-64"
          onError={(e) => { e.target.src = "https://placehold.co/300x400/1a1a1a/ffffff?text=No+Image"; }}
        />
      </div>

      <div className="p-3">
        <h4 className="mb-1 font-semibold">{title}</h4>

        {showDetail && (
          <>
            <p className="mb-2 text-sm text-yellow-400">⭐ {rating}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {JSON.parse(categories || "[]").map((cat) => (
                <span
                  key={cat}
                  onClick={(e) => e.stopPropagation()}
                  className="px-2 py-1 text-[11px] rounded-full bg-white/10 border border-white/20"
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mb-2">

              {/* REACTION BUTTON */}
              <div
                ref={reactionRef}
                className="relative flex-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowReactions((prev) => !prev);
                  }}
                  className={`w-full py-1.5 text-sm rounded-lg border transition-all active:scale-95
                    ${reaction
                      ? "bg-white/15 border-white/30 text-white"
                      : "bg-white/10 text-white/60 border-white/20 hover:bg-white/20"
                    }`}
                >
                  {currentReaction ? `${currentReaction.emoji} ${currentReaction.label}` : "🤍 React"}
                </button>

                {showReactions && (
                  <div className="absolute bottom-[calc(100%+6px)] left-0 w-40
                    bg-[#1f1f1f] border border-white/15 rounded-xl
                    overflow-hidden z-[9999] shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                  >
                    {reactions.map((r) => (
                      <button
                        key={r.type}
                        onClick={(e) => handleReaction(e, r.type)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm
                          transition-all hover:bg-white/10 active:scale-95
                          ${reaction === r.type ? "bg-white/10 text-white" : "text-white/70"}`}
                      >
                        <span className="text-base">{r.emoji}</span>
                        <span>{r.label}</span>
                        {reaction === r.type && (
                          <span className="ml-auto text-xs text-white/40">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* WATCHLIST BUTTON */}
              <button
                onClick={handleWatchlist}
                className={`flex-1 py-1.5 text-sm rounded-lg border transition-all active:scale-95
                  ${inWatchlist
                    ? "bg-yellow-500/30 text-yellow-400 border-yellow-500/40"
                    : "bg-white/10 text-white/60 border-white/20 hover:bg-white/20"
                  }`}
              >
                {inWatchlist ? "★ Saved" : "☆ Watchlist"}
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movies/${id}`);
              }}
              className="w-full px-3 py-2 mt-1 font-semibold text-white transition rounded-lg bg-gradient-to-br from-red-600 to-red-500 hover:scale-105 active:scale-95"
            >
              ▶ Watch
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;