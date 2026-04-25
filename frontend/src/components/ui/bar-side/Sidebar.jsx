import { useState } from "react";
import SidebarItem from "./SidebarItem";
import UserSection from "./UserSection";
import { useAuth } from "../../../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

const menu = [
  { label: "Movies" },
  { label: "Popular" },
  { label: "Top Rated" },
  { label: "Upcoming" },
  { label: "Genres" },
  { label: "My List" },
  { label: "Watch List" },
];

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-64 bg-[#111] text-white h-full flex flex-col shrink-0">

      {/* LOGO */}
      <h2 className="p-5 m-0">🎬 Indoflix</h2>

      {/* MENU */}
      <div className="flex-1">
        {menu.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            active={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* USER SECTION */}
      <UserSection
        isLoggedIn={isLoggedIn}
        name={user?.name || "Guest"}
        email={user?.email || "-"}
        avatarUrl="https://i.pravatar.cc/100"
        onLogout={handleLogout}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default Sidebar;