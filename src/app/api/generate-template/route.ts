import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt, shapeType } = await req.json();

    const shapeContextMap = {
      list: "numbered list format with sequential items",
      circle: "circular progress indicators with percentages",
      badge: "badge-style highlights with prominent icons",
      card: "card-based layout with feature descriptions",
      pill: "pill-shaped horizontal items",
      hexagon: "hexagonal geometric layout"
    };

    const shapeContext = shapeContextMap[shapeType as keyof typeof shapeContextMap] || "visual template";

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You generate design templates for a graphic editor using ${shapeContext}.

RULES:
- Generate MAX 16 items (but typically 4-8 items works best)
- Respond with ONLY valid JSON array
- No text before or after JSON
- Choose diverse, vibrant colors (hex format)
- Select relevant emojis/icons that match the content
- Keep titles concise (2-5 words)
- Make descriptions informative but brief (10-20 words)

Each item format:
{
  "title": "Short Title",
  "description": "Brief but informative description",
  "icon": "🚀" (use relevant emoji),
  "color": "#HEX" (use vibrant, diverse colors)
}

Color palette suggestions:
- Use varied colors: blues (#3B82F6, #0EA5E9), greens (#10B981, #059669), 
  purples (#8B5CF6, #7C3AED), reds (#EF4444, #DC2626), 
  oranges (#F59E0B, #EA580C), pinks (#EC4899, #DB2777)
- Avoid using similar colors for consecutive items
- Match colors to the content theme when appropriate
          `,
        },
        { 
          role: "user", 
          content: `Generate a template about: ${prompt}\n\nShape type: ${shapeType}` 
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const raw = completion.choices[0].message.content;

    if (!raw) {
      throw new Error("Empty response from AI");
    }

    // 🛡️ HARD JSON SAFETY
    const start = raw.indexOf("[");
    const end = raw.lastIndexOf("]");
    if (start === -1 || end === -1) {
      console.error("Invalid AI response:", raw);
      throw new Error("Invalid AI JSON response");
    }

    const jsonStr = raw.slice(start, end + 1);
    const items = JSON.parse(jsonStr);

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Invalid items array");
    }

    // Ensure each item has required fields
    const validatedItems = items.slice(0, 16).map((item, index) => ({
      title: item.title || `Item ${index + 1}`,
      description: item.description || "Description not available",
      icon: item.icon || "⭐",
      color: item.color || "#3B82F6",
    }));

    return NextResponse.json({ items: validatedItems });
  } catch (error) {
    console.error("Template AI error:", error);

    return NextResponse.json(
      {
        error:
          "AI template service is temporarily unavailable. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
} 