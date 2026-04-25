import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./route/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Genre from "./pages/Genre";
import Watchlist from "./pages/Watchlist";
import MovieDetail from "./pages/MovieDetail";
import AdminDashboard from "./pages/AdminDashboard";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<MainLayout />}>

        {/* semua user yang sudah login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Route>

        {/* admin only */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

      </Route>

    </Routes>
  );
}

export default App;