"use client";

import { useState, useEffect, useRef } from "react";
import EditHeader from "@/components/utils/editheader/page";
import SidePanel from "@/components/utils/sidepaneledit/page";
import { useItems } from "@/context/ItemContext";

/* ---------------- RAZORPAY TYPES ---------------- */
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: () => void;
  theme?: {
    color?: string;
  };
}

/* ---------------- ITEM TYPE ---------------- */
interface Item {
  id: string | number;
  title?: string;
  description?: string;
  icon?: string;
  fontFamily?: string;
}

/* ---------------- SHAPE TYPES ---------------- */
type ShapeType = "circle" | "grid" | "list" | "zigzag" | "linear";

const defaultColorPalette = {
  fill: ["#FB7B6B", "#36558F", "#21D8DE", "#8843F2", "#177E89"],
};

export default function EditItemPage() {
  const { items, selectedColorPalette } = useItems();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [shape, setShape] = useState<ShapeType>("linear");

  /* 💳 Payment states */
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");

  const MONTHLY_PRICE = 599;
  const ANNUAL_PRICE = MONTHLY_PRICE * 12 - 100;

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  /* ---------------- IMPROVED ZOOM TO FIT LOGIC ---------------- */
  const zoomToFit = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const { width: contentWidth, height: contentHeight } = getSvgDimensions();

    const padding = 0.9;
    const widthRatio = (containerWidth * padding) / contentWidth;
    const heightRatio = (containerHeight * padding) / contentHeight;
    const newZoom = Math.min(widthRatio, heightRatio, 1.5);

    setZoomLevel(newZoom);
    setPanOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    zoomToFit();
  }, [items.length, shape]);

  useEffect(() => {
    const handleResize = () => {
      zoomToFit();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length, shape]);

  /* ---------------- ZOOM CONTROLS ---------------- */
  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(z * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(z / 1.2, 0.1));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(zoomLevel * (1 + delta), 0.1), 5);
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const zoomFactor = newZoom / zoomLevel;
      const newPanX = mouseX - (mouseX - panOffset.x) * zoomFactor;
      const newPanY = mouseY - (mouseY - panOffset.y) * zoomFactor;
      
      setPanOffset({ x: newPanX, y: newPanY });
    }
    
    setZoomLevel(newZoom);
  };

  /* ---------------- PAN CONTROLS ---------------- */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  /* ---------------- MAXIMUM TEXT WRAPPING UTILITIES ---------------- */
  const wrapTextIntoLines = (
    text: string, 
    maxCharsPerLine: number, 
    maxLines: number = 100
  ): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      
      if (testLine.length <= maxCharsPerLine) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          if (lines.length >= maxLines) break;
        }
        if (word.length > maxCharsPerLine) {
          currentLine = word.substring(0, maxCharsPerLine - 3) + "...";
          lines.push(currentLine);
          if (lines.length >= maxLines) break;
          currentLine = "";
        } else {
          currentLine = word;
        }
      }
    }

    if (currentLine && lines.length < maxLines) {
      lines.push(currentLine);
    }

    if (lines.length === maxLines && currentLine && currentLine !== lines[lines.length - 1]) {
      const lastLine = lines[lines.length - 1];
      if (lastLine.length > maxCharsPerLine - 3) {
        lines[lines.length - 1] = lastLine.substring(0, maxCharsPerLine - 3) + "...";
      } else {
        lines[lines.length - 1] = lastLine + "...";
      }
    }

    return lines;
  };

  const getItemColor = (index: number) => {
    const palette =
      selectedColorPalette?.fill?.length
        ? selectedColorPalette.fill
        : defaultColorPalette.fill;
    return palette[index % palette.length];
  };

  /* ---------------- RENDER FUNCTIONS - MAXIMUM TEXT DISPLAY ---------------- */

  // Linear Layout - MAXIMIZED for text
  const renderLinearItem = (item: Item, index: number) => {
    const xOffset = index * 200; // Increased spacing
    const title = item.title || "Text Here";
    const titleLines = wrapTextIntoLines(title, 16, 3); // Allow 3 lines for title
    
    // MASSIVE space for description
    const descStartY = 140 + (titleLines.length * 18);
    const maxDescY = 880; // HUGE increase from 680
    const lineHeight = 14;
    const maxLines = Math.floor((maxDescY - descStartY) / lineHeight);
    
    const descLines = wrapTextIntoLines(item.description || "Description Here", 16, maxLines);

    return (
      <g key={item.id} transform={`translate(${xOffset},0)`}>
        <rect
          x="90"
          y="0"
          width="160"
          height="900"
          rx="60"
          fill={getItemColor(index)}
        />

        <text x="170" y="65" fontSize="32" textAnchor="middle">
          {item.icon || "⭐"}
        </text>

        {titleLines.map((line, i) => (
          <text
            key={i}
            x="170"
            y={110 + i * 18}
            fontSize="15"
            fill="#FFFFFF"
            textAnchor="middle"
            fontWeight="bold"
          >
            {line}
          </text>
        ))}

        {descLines.map((line, i) => (
          <text
            key={i}
            x="170"
            y={descStartY + i * lineHeight}
            fontSize="11.5"
            fill="#FFFFFF"
            textAnchor="middle"
            opacity="0.95"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  // Circle Layout - MAXIMIZED with NO OVERLAP
  const renderCircleItem = (item: Item, index: number) => {
    const total = items.length;
    const circleRadius = 120; // Increased from 100
    
    // Calculate radius to prevent overlap - each circle needs space
    // Minimum distance between circle centers should be at least 2 * circleRadius + some padding
    const minCircleSpacing = circleRadius * 2.4; // Increased spacing
    const circumference = total * minCircleSpacing;
    const calculatedRadius = circumference / (2 * Math.PI);
    
    // Use larger of calculated or minimum radius
    const radius = Math.max(calculatedRadius, 300);
    
    const centerX = radius + 180;
    const centerY = radius + 180;
    const angle = (index / total) * Math.PI * 2;
    const x = centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);

    const title = item.title || "Title";
    const titleLines = wrapTextIntoLines(title, 16, 3);
    
    const textStartY = 0 + (titleLines.length * 13);
    const maxTextY = circleRadius - 20;
    const lineHeight = 11;
    const maxLines = Math.floor((maxTextY - textStartY) / lineHeight);
    
    const descLines = wrapTextIntoLines(item.description || "Description", 17, maxLines);

    return (
      <g key={item.id} transform={`translate(${x},${y})`}>
        <circle cx="0" cy="0" r={circleRadius} fill={getItemColor(index)} />

        <text x="0" y="-50" fontSize="32" textAnchor="middle" fill="white">
          {item.icon || "⭐"}
        </text>

        {titleLines.map((line, i) => (
          <text
            key={i}
            x="0"
            y={-20 + i * 13}
            fontSize="12"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            {line}
          </text>
        ))}

        {descLines.map((line, i) => (
          <text
            key={i}
            x="0"
            y={textStartY + i * lineHeight}
            fontSize="9.5"
            fill="white"
            textAnchor="middle"
            opacity="0.9"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  // Grid Layout - MAXIMIZED
  const renderGridItem = (item: Item, index: number) => {
    const cols = Math.max(3, Math.ceil(Math.sqrt(items.length)));
    const row = Math.floor(index / cols);
    const col = index % cols;
    const x = col * 280; // Increased spacing from 240
    const y = row * 240; // Increased spacing from 200

    const title = item.title || "Title";
    const titleLines = wrapTextIntoLines(title, 26, 3);
    
    const rectHeight = 220; // Increased from 180
    const textStartY = 68 + (titleLines.length * 15);
    const maxTextY = rectHeight - 10;
    const lineHeight = 11;
    const maxLines = Math.floor((maxTextY - textStartY) / lineHeight);
    
    const descLines = wrapTextIntoLines(item.description || "Description", 27, maxLines);

    return (
      <g key={item.id} transform={`translate(${x},${y})`}>
        <rect
          x="10"
          y="10"
          width="260"
          height={rectHeight}
          rx="15"
          fill={getItemColor(index)}
        />

        <text x="140" y="42" fontSize="30" textAnchor="middle" fill="white">
          {item.icon || "⭐"}
        </text>

        {titleLines.map((line, i) => (
          <text
            key={i}
            x="140"
            y={62 + i * 15}
            fontSize="13"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            {line}
          </text>
        ))}

        {descLines.map((line, i) => (
          <text
            key={i}
            x="140"
            y={textStartY + i * lineHeight}
            fontSize="9.5"
            fill="white"
            textAnchor="middle"
            opacity="0.9"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  // List Layout - MAXIMIZED
  const renderListItem = (item: Item, index: number) => {
    const y = index * 180; // Increased spacing from 150

    const title = item.title || "Title";
    const titleLines = wrapTextIntoLines(title, 60, 3);
    
    const rectHeight = 165; // Increased from 135
    const textStartY = 45 + (titleLines.length * 17);
    const maxTextY = rectHeight - 10;
    const lineHeight = 13;
    const maxLines = Math.floor((maxTextY - textStartY) / lineHeight);
    
    const descLines = wrapTextIntoLines(item.description || "Description", 80, maxLines);

    return (
      <g key={item.id} transform={`translate(0,${y})`}>
        <rect
          x="10"
          y="10"
          width="800"
          height={rectHeight}
          rx="15"
          fill={getItemColor(index)}
        />

        <circle cx="75" cy="92" r="38" fill="white" />
        <text x="75" y="100" fontSize="28" textAnchor="middle">
          {item.icon || "⭐"}
        </text>

        {titleLines.map((line, i) => (
          <text
            key={i}
            x="145"
            y={40 + i * 17}
            fontSize="16"
            fill="white"
            fontWeight="bold"
          >
            {line}
          </text>
        ))}

        {descLines.map((line, i) => (
          <text
            key={i}
            x="145"
            y={textStartY + i * lineHeight}
            fontSize="11"
            fill="white"
            opacity="0.95"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  // ZigZag Layout - MAXIMIZED
  const renderZigZagItem = (item: Item, index: number) => {
    const x = index * 230; // Increased spacing from 200
    const y = index % 2 === 0 ? 50 : 350;
    
    const title = item.title || "Title";
    const titleLines = wrapTextIntoLines(title, 20, 3);
    
    const rectHeight = 280; // Increased from 240
    const textStartY = 85 + (titleLines.length * 16);
    const maxTextY = rectHeight - 15;
    const lineHeight = 13;
    const maxLines = Math.floor((maxTextY - textStartY) / lineHeight);
    
    const descLines = wrapTextIntoLines(item.description || "Description", 20, maxLines);

    return (
      <g key={item.id} transform={`translate(${x},${y})`}>
        <rect
          x="10"
          y="0"
          width="210"
          height={rectHeight}
          rx="20"
          fill={getItemColor(index)}
        />

        <text x="115" y="42" fontSize="30" textAnchor="middle" fill="white">
          {item.icon || "⭐"}
        </text>

        {titleLines.map((line, i) => (
          <text
            key={i}
            x="115"
            y={68 + i * 16}
            fontSize="13"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            {line}
          </text>
        ))}

        {descLines.map((line, i) => (
          <text
            key={i}
            x="115"
            y={textStartY + i * lineHeight}
            fontSize="10.5"
            fill="white"
            textAnchor="middle"
            opacity="0.95"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  /* ---------------- SVG DIMENSIONS - ADJUSTED FOR LARGER SHAPES ---------------- */
  const getSvgDimensions = () => {
    const itemCount = Math.max(items.length, 1);
    
    switch (shape) {
      case "circle":
        const total = items.length;
        const circleRadius = 120;
        const minCircleSpacing = circleRadius * 2.4;
        const circumference = total * minCircleSpacing;
        const calculatedRadius = circumference / (2 * Math.PI);
        const radius = Math.max(calculatedRadius, 300);
        const circleSize = (radius + 180) * 2 + 120;
        return { width: circleSize, height: circleSize };
        
      case "grid":
        const cols = Math.max(3, Math.ceil(Math.sqrt(itemCount)));
        const rows = Math.ceil(itemCount / cols);
        return { 
          width: cols * 280 + 60, 
          height: rows * 240 + 60 
        };
        
      case "list":
        return { 
          width: 840, 
          height: Math.max(itemCount * 180 + 30, 500) 
        };
        
      case "zigzag":
        return { 
          width: Math.max(itemCount * 230 + 100, 900), 
          height: 680 
        };
        
      case "linear":
      default:
        return { 
          width: Math.max(itemCount * 200 + 200, 800), 
          height: 950 
        };
    }
  };

  /* ---------------- RENDER SVG CONTENT ---------------- */
  const renderSvgContent = () => {
    if (items.length === 0) {
      return (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="24"
          fill="#999"
        >
          Add items to get started
        </text>
      );
    }

    switch (shape) {
      case "circle":
        return items.map(renderCircleItem);
      case "grid":
        return items.map(renderGridItem);
      case "list":
        return items.map(renderListItem);
      case "zigzag":
        return items.map(renderZigZagItem);
      case "linear":
      default:
        return items.map(renderLinearItem);
    }
  };

  /* ---------------- DOWNLOAD LOGIC ---------------- */
  const handleDownload = (format: "png" | "svg") => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    if (format === "svg") {
      downloadFile(url, `design-${shape}.svg`);
      return;
    }

    const { width, height } = getSvgDimensions();
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(2, 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      downloadFile(canvas.toDataURL("image/png"), `design-${shape}.png`);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const downloadFile = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  /* ---------------- RAZORPAY ---------------- */
  const loadRazorpay = (): Promise<void> =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Razorpay SDK failed"));
      document.body.appendChild(script);
    });

  const handlePaymentAndDownload = async () => {
    try {
      await loadRazorpay();

      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const order: { id: string; amount: number } = await res.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Graphicto",
        description: plan === "annual" ? "Annual Access" : "Monthly Access",
        handler: () => {
          setShowPaymentModal(false);
          handleDownload("png");
        },
        theme: { color: "#00a8e8" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  /* ---------------- SHAPE SELECTOR ---------------- */
  const ShapeSelector = () => (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 flex gap-2 z-10">
      {[
        { type: "linear" as ShapeType, label: "Linear", icon: "📏" },
        { type: "circle" as ShapeType, label: "Circle", icon: "⭕" },
        { type: "grid" as ShapeType, label: "Grid", icon: "🔳" },
        { type: "list" as ShapeType, label: "List", icon: "📋" },
        { type: "zigzag" as ShapeType, label: "ZigZag", icon: "〰️" },
      ].map(({ type, label, icon }) => (
        <button
          key={type}
          onClick={() => setShape(type)}
          className={`flex flex-col items-center p-2 rounded transition ${
            shape === type
              ? "bg-blue-100 border-2 border-blue-500"
              : "hover:bg-gray-100"
          }`}
          title={label}
        >
          <span className="text-lg">{icon}</span>
          <span className="text-xs mt-1">{label}</span>
        </button>
      ))}
    </div>
  );

  const { width, height } = getSvgDimensions();

  /* ---------------- JSX ---------------- */
  return (
    <div className="bg-gray-200 min-h-screen" suppressHydrationWarning>
      <EditHeader onDownload={() => setShowPaymentModal(true)} />

      <ShapeSelector />

      <div className="flex h-[calc(100vh-100px)]">
        <SidePanel />

        <div
          ref={containerRef}
          className="flex-grow relative overflow-hidden bg-white rounded-lg m-4"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: isPanning ? "grabbing" : "grab",
          }}
        >
          <div
            ref={canvasRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${panOffset.x}px), calc(-50% + ${panOffset.y}px)) scale(${zoomLevel})`,
              transformOrigin: "center",
              transition: isPanning ? "none" : "transform 0.1s ease-out",
            }}
          >
            <svg
              ref={svgRef}
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              style={{
                display: "block",
                overflow: "visible",
              }}
            >
              {renderSvgContent()}
            </svg>
          </div>

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm text-sm text-gray-600">
            <div>Zoom: {Math.round(zoomLevel * 100)}%</div>
            <div className="text-xs text-gray-500 mt-1">
              Scroll to zoom • Drag to pan
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-20">
        <div className="bg-white rounded-lg shadow-lg flex flex-col">
          <button
            onClick={handleZoomIn}
            className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition rounded-t-lg border-b"
            title="Zoom In"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          
          <button
            onClick={zoomToFit}
            className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition border-b"
            title="Fit to Screen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          <button
            onClick={handleZoomOut}
            className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition rounded-b-lg"
            title="Zoom Out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => setPanOffset({ x: 0, y: 0 })}
          className="bg-white rounded-lg shadow-lg px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
          title="Reset Pan"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Choose Plan
            </h2>

            <button
              onClick={() => setPlan("monthly")}
              className={`w-full p-3 mb-2 border rounded transition ${
                plan === "monthly"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "hover:bg-gray-50"
              }`}
            >
              Monthly ₹599
            </button>

            <button
              onClick={() => setPlan("annual")}
              className={`w-full p-3 border rounded transition ${
                plan === "annual"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "hover:bg-gray-50"
              }`}
            >
              Annual ₹{ANNUAL_PRICE}{" "}
              <span className="text-green-600">(Save ₹100)</span>
            </button>

            <button
              onClick={handlePaymentAndDownload}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold transition"
            >
              Pay ₹{plan === "annual" ? ANNUAL_PRICE : MONTHLY_PRICE} & Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}