import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";

function NotFound() {
  const { isLoggedIn } = useAuth();
  const targetPath = isLoggedIn ? "/home" : "/";

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0369f8] via-[#0d0c0c] to-[#f4c50d] text-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "#0369f8" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "#f4c50d" }} />
      </div>

      <div className="relative z-10 text-center">
        {/* Large 404 Text */}
        <h1 className="text-[150px] font-black leading-none tracking-tighter opacity-20 select-none">
          404
        </h1>

        <div className="mt-[-60px]">
          <h2 className="text-4xl font-bold mb-4">Lost in Space?</h2>
          <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for has moved to another galaxy or never existed in this universe.
          </p>

          <Link
            to={targetPath}
            className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white transition-all border rounded-2xl bg-white/10 border-white/20 hover:bg-white/20 active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <span>🚀</span>
            Back to Home
          </Link>
        </div>

        {/* Floating elements for visual flair */}
        <div className="absolute -top-10 -right-20 text-6xl opacity-20 animate-bounce">🎬</div>
        <div className="absolute -bottom-10 -left-20 text-5xl opacity-20 animate-pulse delay-700">🍿</div>
      </div>
    </div>
  );
}

export default NotFound;
