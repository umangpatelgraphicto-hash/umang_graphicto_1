"use client";
import { useState, useRef, useEffect } from "react";

export default function IdeaChatBot() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const replyRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when reply updates
  useEffect(() => {
    if (replyRef.current) {
      replyRef.current.scrollTop = replyRef.current.scrollHeight;
    }
  }, [reply]);

  const send = async () => {
    setLoading(true);
    setReply("");
    setError("");

    try {
      const res = await fetch("/api/idea-chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "AI service unavailable");
      } else {
        setReply(data.reply);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-[500px] bg-white rounded-xl shadow border border-gray-200">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-black text-sm">
          💡 Idea Assistant
        </h2>
        <p className="text-xs text-gray-500">
          Ask for creative ideas & suggestions
        </p>
      </div>

      {/* RESPONSE */}
      <div
        ref={replyRef}
        className="flex-1 overflow-y-auto px-4 py-3 text-sm text-black space-y-2"
      >
        {!reply && !error && !loading && (
          <p className="text-gray-400 text-sm">
            Your ideas will appear here…
          </p>
        )}

        {loading && (
          <p className="text-gray-500 italic">Thinking...</p>
        )}

        {reply && (
          <div className="bg-gray-100 p-3 rounded-lg whitespace-pre-line leading-relaxed">
            {reply}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="border-t border-gray-200 p-3">
        <textarea
          className="w-full resize-none border border-gray-300 rounded-lg p-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Ask for ideas..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm py-2 rounded-lg transition"
        >
          {loading ? "Thinking..." : "Get Ideas"}
        </button>
      </div>
    </div>
  );
}
