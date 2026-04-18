"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

type Item = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

type ShapeType = "list" | "circle" | "badge" | "card" | "pill" | "hexagon";

const SHAPE_OPTIONS = [
  { value: "list" as ShapeType, label: "📋 List", icon: "☰" },
  { value: "circle" as ShapeType, label: "⭕ Circle", icon: "◉" },
  { value: "badge" as ShapeType, label: "🏷️ Badge", icon: "◆" },
  { value: "card" as ShapeType, label: "🎴 Card", icon: "▭" },
  { value: "pill" as ShapeType, label: "💊 Pill", icon: "▬" },
  { value: "hexagon" as ShapeType, label: "⬡ Hexagon", icon: "⬢" },
];

export default function TemplateAIGenerator() {
  const [prompt, setPrompt] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shapeType, setShapeType] = useState<ShapeType>("list");
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const generate = async () => {
    setLoading(true);
    setItems([]);
    setError("");   

    try {
      const res = await fetch("/api/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, shapeType }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "AI generation failed");
      } else {
        setItems(data.items);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `template-${shapeType}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        background: "#ffffff",
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `template-${shapeType}-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
        setDownloading(false);
      });
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to download image. Please try again.");
      setDownloading(false);
    }
  };

  const renderItems = () => {
    switch (shapeType) {
      case "list":
        return (
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 rounded-3xl shadow-lg transform transition-all hover:scale-[1.02]"
                style={{ backgroundColor: item.color }}
              >
                <div className="text-6xl font-black text-white opacity-90 min-w-[80px]">
                  {i + 1}
                </div>
                <div className="flex-1 text-white">
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case "circle":
        return (
          <div className="grid grid-cols-2  text-black gap-8">
            {items.map((item, i) => (
              <div key={i} className="flex text-black flex-col items-center">
                <div className="relative w-64 h-64">
                  {/* Outer ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="110"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="20"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="110"
                      fill="none"
                      stroke={item.color}
                      strokeWidth="20"
                      strokeDasharray={`${(75 * 691) / 100} 691`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  {/* Center content */}
                  <div className="absolute text-black inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="text-5xl mb-3">{item.icon}</div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-snug">
                      {item.description}
                    </p>
                  </div>
                  {/* Percentage label */}
                  <div
                    className="absolute bottom-4 left-4 text-2xl font-bold"
                    style={{ color: item.color }}
                  >
                    75%
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "badge":
        return (
          <div className="grid grid-cols-2 text-black md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl text-white text-center shadow-xl transform transition-all hover:scale-105 hover:rotate-2"
                style={{ backgroundColor: item.color }}
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
                     style={{ color: item.color }}>
                  {i + 1}
                </div>
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-sm text-white/90 leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        );

      case "card":
        return (
          <div className="grid grid-cols-1 text-black  md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.03] hover:shadow-3xl"
              >
                <div
                  className="h-32 flex items-center justify-center text-7xl"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <div className="p-6">
                  <div
                    className="text-sm font-bold uppercase tracking-wider mb-2"
                    style={{ color: item.color }}
                  >
                    Feature {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case "pill":
        return (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-8 py-5 rounded-full shadow-lg transform transition-all hover:scale-[1.02]"
                style={{ backgroundColor: item.color }}
              >
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1 text-white">
                  <h3 className="text-xl font-bold inline mr-3">{item.title}</h3>
                  <span className="text-white/90 text-base">{item.description}</span>
                </div>
                <div className="text-3xl font-black text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        );

      case "hexagon":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-48 h-52">
                  {/* Hexagon shape */}
                  <svg viewBox="0 0 100 115" className="absolute inset-0 w-full h-full">
                    <polygon
                      points="50 1 95 25 95 75 50 99 5 75 5 25"
                      fill={item.color}
                      className="drop-shadow-2xl"
                    />
                  </svg>
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h3 className="text-base font-bold mb-1 uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/90 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen  text-black bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Template Generator
          </h1>
          <p className="text-xl text-gray-600">
            Create stunning visual templates with AI-powered design
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {/* Shape Selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
              Select Shape Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {SHAPE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setShapeType(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    shapeType === option.value
                      ? "border-indigo-600 bg-indigo-50 shadow-lg scale-105"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="text-sm font-semibold text-gray-700">
                    {option.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
              Describe Your Template
            </label>
            <textarea
              className="w-full border-2 text-black border-gray-300 rounded-xl p-4 text-base focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all"
              placeholder="e.g., Features for a fitness mobile app, Steps to start a business, Benefits of cloud computing, Key principles of design..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generate}
            disabled={loading || !prompt}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating Magic...
              </span>
            ) : (
              "✨ Generate Template (Max 16 items)"
            )}
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 p-4 rounded-xl border-2 border-red-200">
              <span className="font-bold">⚠️ Error:</span> {error}
            </div>
          )}
        </div>

        {/* Preview Section */}
        {items.length > 0 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-gray-800">
                Preview - {SHAPE_OPTIONS.find(s => s.value === shapeType)?.label}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={downloadJSON}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all transform hover:scale-105 shadow-lg"
                >
                  📄 Download JSON
                </button>
                <button
                  onClick={downloadImage}
                  disabled={downloading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  {downloading ? "📸 Processing..." : "🖼️ Download Image"}
                </button>
              </div>
            </div>

            {/* Template Preview */}
            <div ref={previewRef} className="p-8 bg-white">
              {renderItems()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}