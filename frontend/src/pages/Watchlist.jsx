import { useMovie } from "../contexts/MovieContexts";

function Watchlist() {
  const { myList, removeFromList } = useMovie();

  return (
    <div className="text-white">
      <h1 className="mb-4 text-2xl font-bold">
        Watchlist ({myList.length})
      </h1>

      {myList.length === 0 ? (
        <p className="text-gray-400">Belum ada movie</p>
      ) : (
        <div className="grid gap-4">
          {myList.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center justify-between p-3 rounded bg-white/5"
            >
              <span>{movie.title}</span>

              <button
                onClick={() => removeFromList(movie.id)}
                className="px-2 py-1 bg-yellow-400 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;