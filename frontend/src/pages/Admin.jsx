import { useEffect, useState } from "react";
import api from "../api/axios";

function Admin() {
  // =========================
  // 📊 STATE
  // =========================
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🆕 pagination state
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // =========================
  // 🔁 FETCH USERS
  // =========================
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        const res = await api.get(`/users?page=${page}`);

        // 🔥 ambil data pagination Laravel
        setUsers(res.data.data);
        setPage(res.data.current_page);
        setLastPage(res.data.last_page);

      } catch (err) {
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  // =========================
  // 📊 DERIVED DATA
  // =========================
  const totalUsers = users.length;

  // =========================
  // 🎨 UI
  // =========================
  return (
    <div className="text-white">
      
      <h1 className="mb-6 text-2xl font-bold">
        Admin Dashboard
      </h1>

      {/* ================= TABLE ================= */}
      <div className="p-4 border shadow-lg bg-white/5 backdrop-blur-lg border-white/10 rounded-xl">
        
        <h3 className="mb-4 font-semibold">
          User List
        </h3>

        {loading ? (
          <p className="text-white/60">Loading...</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-white/60 border-white/10">
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-2">{u.name}</td>
                    <td>{u.email}</td>

                    <td>
                      <span
                        className={`
                          px-2 py-1 rounded text-xs
                          ${
                            u.role === "admin"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                          }
                        `}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= PAGINATION ================= */}
            <div className="flex items-center justify-between mt-4">
              
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-white/10 disabled:opacity-30"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {page} of {lastPage}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === lastPage}
                className="px-3 py-1 rounded bg-white/10 disabled:opacity-30"
              >
                Next
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;