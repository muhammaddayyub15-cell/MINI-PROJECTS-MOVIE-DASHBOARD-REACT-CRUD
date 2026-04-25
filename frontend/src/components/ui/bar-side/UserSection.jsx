function UserSection({
  isLoggedIn,
  name,
  email,
  avatarUrl,
  onLogout,
  onLogin,
}) {
  return (
    <div className="flex flex-col gap-3 p-4 border-t border-gray-700">

      {/* ===================== */}
      {/* AUTH STATE CONDITIONAL */}
      {/* ===================== */}
      {isLoggedIn ? (
        <>
          {/* ===================== */}
          {/* USER INFO SECTION     */}
          {/* ===================== */}
          <div className="flex items-center gap-3">

            {/* USER AVATAR */}
            <img
              src={avatarUrl}
              alt="avatar"
              className="object-cover w-10 h-10 rounded-full"
            />

            {/* USER TEXT INFO */}
            <div className="overflow-hidden">
              <div className="text-sm font-semibold truncate">
                {name}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {email}
              </div>
            </div>
          </div>

          {/* ===================== */}
          {/* LOGOUT BUTTON         */}
          {/* ===================== */}
          <button
            onClick={onLogout}
            className="w-full py-2 mt-1 font-semibold text-white transition bg-red-600 rounded-md  hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {/* ===================== */}
          {/* LOGIN BUTTON          */}
          {/* ===================== */}
          <button
            onClick={onLogin}
            className="w-full py-2 font-semibold text-white transition bg-red-600 rounded-md  hover:bg-red-700"
          >
            Login
          </button>
        </>
      )}

    </div>
  );
}

export default UserSection;