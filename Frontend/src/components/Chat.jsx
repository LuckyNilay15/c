import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Chat() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("Users")); 
    if (!user || !user._id) {
      alert("Please log in to save your summary.");
      return;
    }
  
    try {
      const res = await fetch("https://kitabadda-0m8b.onrender.com/save-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          userId: user._id,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Summary saved successfully!");
      } else {
        alert(data.error || "Error saving summary.");
      }
    } catch (err) {
      alert("Error saving summary.");
    }
  };
  
  
  const handleSummarise = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://kitabadda-0m8b.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Summarize the following with proper title:\n${input}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No response";
      setSummary(reply);
    } catch (err) {
      setSummary("Error occurred while summarising.");
    }
    setLoading(false);
  };
  

  return (
    <div className="p-4 max-w-[770px] mx-auto">
      <textarea
        className="w-full p-2 border rounded"
        rows="12"
        placeholder="Enter text to summarise"
        value={input}
        onChange={(e) => setInput(e.target.value)}
          />
    <div className="flex justify-between ">
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSummarise}
        disabled={loading}
      >
     {loading ? "Summarising..." : "Summarise"}
      </button>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSave}
        disabled={loading || !summary}
      >
        Save
      </button>

    </div>
    <Link
      to="/"
      className={`mt-5 inline-block px-4 py-2 bg-blue-600 text-white rounded ${loading ? "pointer-events-none opacity-50" : ""}`}
    >
      Back
    </Link>

      {summary && (
        <div className="mt-4 p-3 border  rounded bg-gray-100">
          <h3 className="font-bold">Summary:</h3>
          <p>{summary}</p>
        </div>
          )}
    </div>
  );
}

export default Chat;
