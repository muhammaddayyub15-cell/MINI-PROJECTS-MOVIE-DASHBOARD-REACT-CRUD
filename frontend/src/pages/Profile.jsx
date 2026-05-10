import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  // Profile Edit State
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");

  // Data State
  const [reactions, setReactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resReactions, resWatchlist] = await Promise.all([
          api.get("/my-reactions"),
          api.get("/watchlist")
        ]);
        setReactions(resReactions.data.data || []);
        setWatchlist(resWatchlist.data.data || []);
      } catch (err) {
        console.log("Error fetch profile data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateMsg("");
    try {
      const payload = { name, email };
      if (password) payload.password = password;

      const res = await api.put("/me", payload);
      if (res.data.success) {
        setUpdateMsg("Profile updated successfully!");
        const updatedUser = res.data.data;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        setPassword("");

        // Hide message after 10 seconds
        setTimeout(() => setUpdateMsg(""), 10000);
      }
    } catch (err) {
      setUpdateMsg(err.response?.data?.message || "Failed to update profile.");
      setTimeout(() => setUpdateMsg(""), 10000);
    }
  };

  const handleSuspend = async () => {
    if (window.confirm("Are you sure you want to suspend your account? You will be logged out and your account will be deactivated.")) {
      try {
        await api.put("/me/suspend");
        logout();
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to suspend account");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      try {
        await api.delete("/me");
        logout();
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete account");
      }
    }
  };

  const getEmoji = (type) => {
    if (type === "love") return "👍 Love";
    if (type === "neutral") return "😐 Neutral";
    if (type === "hate") return "👎 Hate";
    return "";
  };

  return (
    <div className="max-w-5xl mx-auto text-white">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* PROFILE SECTION */}
        <div className="p-6 border rounded-2xl bg-white/5 border-white/10 h-fit">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://i.pravatar.cc/150"
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>

          {updateMsg && (
            <div className={`mb-4 p-3 text-sm rounded-lg border transition-all duration-500 animate-[pulse_2s_ease-in-out_infinite] ${updateMsg.includes('success') ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
              {updateMsg}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-3">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 text-sm font-semibold text-white transition-all border rounded-xl bg-white/10 border-white/20 hover:bg-white/20 active:scale-95"
              >
                Edit Profile
              </button>
              <button
                onClick={handleSuspend}
                className="w-full py-2.5 text-sm font-semibold text-orange-400 transition-all border rounded-xl bg-orange-500/10 border-orange-500/30 hover:bg-orange-500 hover:text-white active:scale-95"
              >
                Suspend Account
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-2.5 text-sm font-semibold text-red-400 transition-all border rounded-xl bg-red-500/10 border-red-500/30 hover:bg-red-500 hover:text-white active:scale-95"
              >
                Delete Account
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border rounded-xl border-white/10 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border rounded-xl border-white/10 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-400">New Password <span className="text-xs text-gray-500">(Optional)</span></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full px-4 py-2.5 text-sm text-white bg-white/5 border rounded-xl border-white/10 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all placeholder-white/20"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setName(user?.name);
                    setEmail(user?.email);
                    setPassword("");
                  }}
                  className="flex-1 py-2.5 text-sm font-semibold text-white transition-all border rounded-xl bg-white/10 border-white/20 hover:bg-white/20 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-sm font-semibold text-yellow-400 transition-all border rounded-xl bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500 hover:text-white active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>

        {/* DATA SECTION */}
        <div className="space-y-6 md:col-span-2">
          {loading ? (
            <div className="flex items-center justify-center p-10 border rounded-2xl bg-white/5 border-white/10">
              <div className="w-8 h-8 border-2 border-t-2 rounded-full border-white/20 border-t-white animate-spin"></div>
            </div>
          ) : (
            <>
              {/* WATCHLIST SUMMARY */}
              <div className="p-6 border rounded-2xl bg-white/5 border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Watchlist ({watchlist.length})</h3>
                  <button onClick={() => navigate("/watchlist")} className="text-sm text-yellow-400 hover:underline">View All</button>
                </div>
                {watchlist.length === 0 ? (
                  <p className="text-sm text-gray-400">No movies in watchlist yet.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                    {watchlist.slice(0, 10).map((item) => (
                      <div key={item.id} onClick={() => navigate(`/movies/${item.movie_id}`)} className="cursor-pointer group">
                        <div className="overflow-hidden rounded-lg">
                          <img src={item.movie?.poster_url} alt={item.movie?.title} className="object-cover w-full transition duration-300 aspect-[2/3] group-hover:scale-105" />
                        </div>
                        <p className="mt-2 text-xs font-semibold truncate group-hover:text-yellow-400">{item.movie?.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* REACTIONS SUMMARY */}
              <div className="p-6 border rounded-2xl bg-white/5 border-white/10">
                <h3 className="mb-4 text-xl font-bold">My Reactions ({reactions.length})</h3>
                {reactions.length === 0 ? (
                  <p className="text-sm text-gray-400">You haven't reacted to any movies yet.</p>
                ) : (
                  <div>
                    <div className="flex items-center justify-between px-3 pb-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase border-b border-white/10">
                      <span>Movie</span>
                      <span>Date</span>
                    </div>
                    <div className="space-y-3">
                      {reactions.map((reaction) => (
                        <div key={reaction.id} onClick={() => navigate(`/movies/${reaction.movie_id}`)} className="flex items-center justify-between p-3 transition border cursor-pointer rounded-xl bg-white/5 border-white/10 hover:bg-white/10">
                          <div className="flex items-center gap-3">
                            <img src={reaction.movie?.poster_url} alt={reaction.movie?.title} className="object-cover w-10 h-14 rounded-md" />
                            <div>
                              <p className="font-semibold text-sm">{reaction.movie?.title}</p>
                              <span className="text-xs text-gray-400 border border-white/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                                {getEmoji(reaction.type)}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{new Date(reaction.updated_at).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
