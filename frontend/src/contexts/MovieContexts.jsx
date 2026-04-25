import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Oppenheimer", posterUrl: "...", rating: 8.9, category: "Drama" },
    { id: 2, title: "Interstellar", posterUrl: "...", rating: 9.1, category: "Sci-Fi" },
    { id: 3, title: "The Batman", posterUrl: "...", rating: 8.3, category: "Action" },
  ]);

  // WATCHLIST
  const [watchlist, setWatchlist] = useState([]);

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exist = prev.find((m) => m.id === movie.id);
      if (exist) {
        return prev.filter((m) => m.id !== movie.id); // remove
      }
      return [...prev, movie]; // add
    });
  };

  const isInWatchlist = (id) => {
    return watchlist.some((m) => m.id === id);
  };

  // REACTIONS
  const [reactions, setReactions] = useState({});
  /*
    structure:
    {
      movieId: {
        love: number,
        neutral: number,
        hate: number,
        user: "love" | "neutral" | "hate"
      }
    }
  */

  const reactToMovie = (movieId, type) => {
    setReactions((prev) => {
      const current = prev[movieId] || {
        love: 0,
        neutral: 0,
        hate: 0,
        user: null,
      };

      let updated = { ...current };

      // remove previous reaction
      if (current.user) {
        updated[current.user]--;
      }

      // set new
      updated[type]++;
      updated.user = type;

      return {
        ...prev,
        [movieId]: updated,
      };
    });
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,

        watchlist,
        toggleWatchlist,
        isInWatchlist,

        reactions,
        reactToMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);