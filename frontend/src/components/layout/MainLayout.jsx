import { useState } from "react";
import Navbar from "../ui/bar-side/Navbar";
import Sidebar from "../ui/bar-side/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-[#1a0000] via-[#3b0000] to-[#7a0000]">
      
      {/* SIDEBAR */}
      <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1">
        
        {/* NAVBAR */}
        <Navbar onSearch={setSearch} />

        {/* CONTENT */}
        <div className="p-5">
          {/* 🔥 kirim search ke semua page */}
          <Outlet context={{ search }} />
        </div>

      </div>
    </div>
  );
}

export default MainLayout;