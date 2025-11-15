import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Check if user is requesting image generation
function isImageRequest(message: string): boolean {
  const imageKeywords = [
    "generate image",
    "create image",
    "draw",
    "visualize",
    "make a picture",
    "create a diagram",
    "generate a photo",
    "show me an image",
    "create an illustration",
  ];
  const lowerMessage = message.toLowerCase();
  return imageKeywords.some((keyword) => lowerMessage.includes(keyword));
}

// Extract image prompt from user message
function extractImagePrompt(message: string, documentContext: string): string {
  // Remove image generation trigger words
  let prompt = message
    .toLowerCase()
    .replace(/generate|create|draw|make|show me|visualize/gi, "")
    .replace(/image|picture|photo|illustration|diagram/gi, "")
    .trim();
  
  // If prompt is too short, use document context
  if (prompt.length < 10) {
    prompt = `A visual representation of: ${documentContext.substring(0, 200)}`;
  }
  
  return prompt;
}

export async function POST(req: NextRequest) {
  try {
    const { documentText, messages } = await req.json();

    if (!documentText || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1];
    
    // Check if user wants an image
    if (lastUserMessage.role === "user" && isImageRequest(lastUserMessage.content)) {
      const imagePrompt = extractImagePrompt(lastUserMessage.content, documentText);
      
      // Generate image URL using Pollinations.ai (free, no API key)
      const encodedPrompt = encodeURIComponent(imagePrompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
      
      const response = `I've generated an image based on your request! Here it is:

![Generated Image](${imageUrl})

**Prompt used:** ${imagePrompt}

Would you like me to generate another image with different details, or do you have questions about the document?`;
      
      return NextResponse.json({ response, imageUrl });
    }

    // Build conversation context with document
    const systemMessage = {
      role: "system" as const,
      content: `You are a helpful AI assistant analyzing a document. The user can ask you questions about the document and you should provide accurate, insightful answers based on the document content.

Document content (first 10000 characters):
${documentText.substring(0, 10000)}

Instructions:
- Answer questions specifically about this document
- Be conversational and helpful
- If asked about something not in the document, politely say so
- Provide specific examples from the document when relevant
- Keep responses concise but informative`,
    };

    // Convert chat messages to Groq format
    const groqMessages = [
      systemMessage,
      ...messages.map((msg: ChatMessage) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Get AI response
    const completion = await groq.chat.completions.create({
      messages: groqMessages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Chat failed" },
      { status: 500 }
    );
  }
}
