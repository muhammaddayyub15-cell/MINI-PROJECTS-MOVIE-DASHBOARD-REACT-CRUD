function SidebarItem({ item, active = false, onClick }) {
  return (
    <div
      // CLICK HANDLER
      onClick={onClick}
      className={`
        px-5 py-3 cursor-pointer transition-all duration-200
        border-l-4
        ${
          active
            ? "bg-[#222] text-white border-yellow-600"
            : "text-gray-400 border-transparent hover:bg-[#e8c110] hover:text-white"
        }
      `}
    >
      {/* LABEL MENU */}
      {item?.label}
    </div>
  );
}

export default SidebarItem;