export default function Navbar({ onSearch }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-black border-b ">
      
      {/* TITLE */}
      <h1 className="text-lg font-semibold text-white">
        🎬 INDOFLIX
      </h1>

      {/* SEARCH */}
      
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="px-4 py-2 text-white transition rounded-lg outline-none bg-gray-800/80 focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}