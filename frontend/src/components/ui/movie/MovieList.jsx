import MovieCard from "./MovieCard";

function MovieList({ movies = [], search = "" }) {
  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="
        grid gap-5
        grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
      "
    >
      {filtered.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default MovieList;