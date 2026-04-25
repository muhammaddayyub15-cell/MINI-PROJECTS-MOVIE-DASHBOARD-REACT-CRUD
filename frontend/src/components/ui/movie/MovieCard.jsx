import { useState } from "react";

function MovieCard({ title, posterUrl, rating, categories = [] }) {
  // STATE untuk toggle detail (show/hide info tambahan)
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      // CLICK CARD → toggle detail movie
      onClick={() => setShowDetail((prev) => !prev)}
      className="
        w-full cursor-pointer rounded-2xl overflow-hidden text-white
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        transition-all duration-300
        hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)]
      "
    >
      {/* ===================== */}
      {/* MOVIE POSTER IMAGE    */}
      {/* ===================== */}
      <img
        src={posterUrl}
        alt={title}
        className="object-cover w-full h-64"
        // fallback jika image error
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x400";
        }}
      />

      {/* ===================== */}
      {/* MOVIE CONTENT         */}
      {/* ===================== */}
      <div className="p-3">
        {/* TITLE MOVIE */}
        <h4 className="mb-1 font-semibold">{title}</h4>

        {/* DETAIL SECTION (conditional render) */}
        {showDetail && (
          <>
            {/* RATING */}
            <p className="text-sm text-yellow-400">
              ⭐ {rating}
            </p>

            {/* CATEGORY LIST */}
            <div className="flex flex-wrap gap-1 mt-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  // stop event biar tidak toggle card
                  onClick={(e) => e.stopPropagation()}
                  className="
                    px-2 py-1 text-[11px] rounded-full
                    bg-white/10 border border-white/20
                    backdrop-blur-md
                  "
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* WATCH BUTTON */}
            <button
              onClick={(e) => e.stopPropagation()}
              className="
                mt-3 px-3 py-2 rounded-lg w-full
                bg-gradient-to-br from-red-600 to-red-500
                text-white font-semibold
                shadow-[0_5px_15px_rgba(229,9,20,0.5)]
                transition hover:scale-105
              "
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