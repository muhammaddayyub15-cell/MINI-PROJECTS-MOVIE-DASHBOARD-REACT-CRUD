import { useEffect, useState } from "react";
import api from "../api/axios";
import Modal from "../components/ui/admin/Modal";
import UserForm from "../components/ui/admin/UserForm";
import MovieForm from "../components/ui/admin/MovieForm";

function Admin() {
  // User State
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Movie State
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  const [showMovieModal, setShowMovieModal] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  // Fetch Users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await api.get(`/users?page=${page}`);
      const result = res.data.data;

      setUsers(result.data);
      setLastPage(result.last_page);
      setTotal(result.total);

    } catch (err) {
      console.log("Fetch users error:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch Movies
  const fetchMovies = async () => {
    setLoadingMovies(true);
    try {
      const res = await api.get(`/movies`);
      setMovies(res.data.data.data); // Laravel paginate

    } catch (err) {
      console.log("Fetch movies error:", err);
    } finally {
      setLoadingMovies(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchMovies();
  }, [page]);

  // User Actions
  const handleDeleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserSubmit = async (data) => {
    try {
      if (editUser) {
        await api.put(`/users/${editUser.id}`, data);
      } else {
        await api.post(`/users`, data);
      }

      setShowUserModal(false);
      fetchUsers();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= MOVIE ACTION =================
  const handleDeleteMovie = async (id) => {
    if (!confirm("Delete movie?")) return;

    try {
      await api.delete(`/movies/${id}`);
      fetchMovies();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieSubmit = async (data) => {
    try {
      if (editMovie) {
        await api.put(`/movies/${editMovie.id}`, data);
      } else {
        await api.post(`/movies`, data);
      }

      setShowMovieModal(false);
      fetchMovies();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-white">

      <h1 className="mb-6 text-2xl font-bold">
        👑 Admin Dashboard
      </h1>

      {/* ================= USERS ================= */}
      <div className="mb-10">

        <div className="flex justify-between mb-3">
          <h2 className="text-lg font-semibold">
            Users ({total})
          </h2>

          <button
            onClick={() => {
              setEditUser(null);
              setShowUserModal(true);
            }}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            + Add User
          </button>
        </div>

        <div className="p-4 bg-white/5 rounded-xl">

          {loadingUsers ? (
            <p>Loading...</p>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>

                      <td>{u.name}</td>
                      <td>{u.email}</td>

                      <td>{u.role}</td>

                      <td className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditUser(u);
                            setShowUserModal(true);
                          }}
                          className="px-2 py-1 bg-yellow-500 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="px-2 py-1 bg-red-600 rounded"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div className="flex justify-between mt-4">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Prev
                </button>

                <span>Page {page} / {lastPage}</span>

                <button onClick={() => setPage(page + 1)} disabled={page === lastPage}>
                  Next
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      {/* ================= MOVIES ================= */}
      <div>

        <div className="flex justify-between mb-3">
          <h2 className="text-lg font-semibold">
            Movies ({movies.length})
          </h2>

          <button
            onClick={() => {
              setEditMovie(null);
              setShowMovieModal(true);
            }}
            className="px-4 py-2 bg-green-600 rounded"
          >
            + Add Movie
          </button>
        </div>

        <div className="p-4 bg-white/5 rounded-xl">

          {loadingMovies ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th>Title</th>
                  <th>Rating</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {movies.map((m) => (
                  <tr key={m.id}>

                    <td>{m.title}</td>
                    <td>⭐ {m.rating}</td>
                    <td>{m.category}</td>

                    <td className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditMovie(m);
                          setShowMovieModal(true);
                        }}
                        className="px-2 py-1 bg-yellow-500 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteMovie(m.id)}
                        className="px-2 py-1 bg-red-600 rounded"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>

      {/* ================= USER MODAL ================= */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title={editUser ? "Edit User" : "Add User"}
      >
        <UserForm initialData={editUser} onSubmit={handleUserSubmit} />
      </Modal>

      {/* ================= MOVIE MODAL ================= */}
      <Modal
        isOpen={showMovieModal}
        onClose={() => setShowMovieModal(false)}
        title={editMovie ? "Edit Movie" : "Add Movie"}
      >
        <MovieForm initialData={editMovie} onSubmit={handleMovieSubmit} />
      </Modal>

    </div>
  );
}

export default Admin;