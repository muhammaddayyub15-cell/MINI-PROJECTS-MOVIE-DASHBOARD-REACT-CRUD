export default function Navbar({ onSearch }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4 border-b border-red-900 bg-black/40 backdrop-blur-md"
    >
      {/* ================= TITLE ================= */}
      <h1 className="text-lg font-semibold text-white">
        🎬 Indoflix
      </h1>

      {/* ================= SEARCH ================= */}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="px-4 py-2 text-white transition rounded-lg outline-none bg-gray-800/80 focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}