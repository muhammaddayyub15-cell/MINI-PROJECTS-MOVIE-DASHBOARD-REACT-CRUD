import { useMovie } from "../contexts/MovieContexts";
import MovieList from "../components/ui/movie/MovieList";

function Popular() {
  const { movies } = useMovie();

  const popularMovies = movies.filter((m) => parseFloat(m.rating) >= 8);

  return (
    <div className="text-white">
      <h1 className="mb-4 text-2xl font-bold">Popular Movies</h1>
      <MovieList movies={popularMovies} />
    </div>
  );
}

export default Popular;