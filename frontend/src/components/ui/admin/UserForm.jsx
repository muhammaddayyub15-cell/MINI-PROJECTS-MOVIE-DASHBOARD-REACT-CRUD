import { useState } from "react";

function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(form);
    }} className="p-4 bg-white/5 rounded-xl">

      <h2 className="mb-4 font-bold">👤 User Form</h2>

      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} className="input" />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} className="input" />
      <input placeholder="Password" type="password" onChange={(e) => setForm({...form, password: e.target.value})} className="input" />

      <select onChange={(e) => setForm({...form, role: e.target.value})} className="input">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="px-4 py-2 mt-3 bg-blue-600 rounded">
        Save User
      </button>
    </form>
  );
}

export default UserForm;