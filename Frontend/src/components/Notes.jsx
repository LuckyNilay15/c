import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
    
    const handleDelete = async (id) => {
        try {
          const res = await fetch(`https://kitabadda-0m8b.onrender.com/save-summary/${id}`, {
            method: "DELETE",
          });
      
          if (res.ok) {
            setNotes((prev) => prev.filter((note) => note._id !== id));
          } else {
            const data = await res.json();
            alert(data.error || "Failed to delete.");
          }
        } catch (err) {
          console.error("Error deleting note:", err);
        }
      };
      

  useEffect(() => {
    const fetchNotes = async () => {
      const user = JSON.parse(localStorage.getItem("Users"));
      if (!user || !user._id) {
        alert("Please log in to view your notes.");
        return;
      }

        try {
        console.log("Hii"+user._id);
        const res = await fetch(`https://kitabadda-0m8b.onrender.com/save-summary/?userId=${user._id}`);
        const data = await res.json();

        if (res.ok) {
          setNotes(data);
        } else {
          console.error(data.error || "Failed to fetch notes.");
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
      }

      setLoading(false);
    };

    fetchNotes();
  }, []);

  return (
      <div className="p-4 max-w-[770px] mx-auto">
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-gray-600 text-white rounded"
            >
                 Back
        </Link>

      <h1 className="text-2xl font-bold mb-4 ">My Notes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p className="text-black">No summaries saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note._id} className="p-4 bg-gray-100 border rounded shadow-sm">
              <p className="whitespace-pre-line">
              <span className="text-gray-800 font-semibold bg-blue-300 px-1 rounded">
                    {note.text.split('\n')[0]}
                </span>
                <br />
                <span className="text-gray-500 bg-green-100">
                    {note.text.split('\n').slice(1).join('\n')}
                </span>
                </p>

              <p className="text-sm text-black mt-2">
                Saved on {new Date(note.createdAt).toLocaleString()}
                  </p>
                <button
                    onClick={() => handleDelete(note._id)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                    Delete
                </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;
