import { useState } from "react";

function MovieForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    poster_url: initialData.poster_url || "",
    rating: initialData.rating || "",
    category: initialData.category || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white/5 rounded-xl">
      <h2 className="mb-4 font-bold">🎬 Movie Form</h2>

      <input name="title" placeholder="Title" onChange={handleChange} className="input" />
      <input name="poster_url" placeholder="Poster URL" onChange={handleChange} className="input" />
      <input name="rating" placeholder="Rating" onChange={handleChange} className="input" />
      <input name="category" placeholder="Category" onChange={handleChange} className="input" />

      <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />

      <button className="px-4 py-2 mt-3 bg-red-600 rounded">
        Save Movie
      </button>
    </form>
  );
}

export default MovieForm;