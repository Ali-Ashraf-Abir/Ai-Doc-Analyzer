import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import pdf from "pdf-parse";
import mammoth from "mammoth";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});



async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    throw new Error("Failed to extract text from PDF");
  }
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    throw new Error("Failed to extract text from DOCX");
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text based on file type
    let extractedText: string;
    const fileType = file.type;

    if (fileType === "application/pdf") {
      extractedText = await extractTextFromPDF(buffer);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await extractTextFromDOCX(buffer);
    } else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from document" },
        { status: 400 }
      );
    }

    // Analyze with Groq (using Llama 3.3 70B - fast and powerful)
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert document analyzer. Provide a comprehensive analysis of the document including: summary, key themes, writing quality, structure assessment, and actionable improvement suggestions. Be specific and insightful.",
        },
        {
          role: "user",
          content: `Analyze this document and provide detailed insights:\n\n${extractedText.substring(0, 15000)}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2000,
    });

    const analysis = completion.choices[0]?.message?.content || "No analysis available";

    // Extract suggestions from analysis
    const suggestions: string[] = [];
    const suggestionPatterns = [
      /suggestion[s]?:?\s*(.+?)(?=\n\n|\n[A-Z]|$)/gi,
      /recommend[s]?:?\s*(.+?)(?=\n\n|\n[A-Z]|$)/gi,
      /improve[s]?:?\s*(.+?)(?=\n\n|\n[A-Z]|$)/gi,
    ];

    suggestionPatterns.forEach((pattern) => {
      const matches = analysis.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          const cleaned = match
            .replace(/^(suggestion[s]?|recommend[s]?|improve[s]?):?\s*/i, "")
            .trim();
          if (cleaned.length > 10 && cleaned.length < 500) {
            suggestions.push(cleaned);
          }
        });
      }
    });

    // Calculate word count
    const wordCount = extractedText.split(/\s+/).filter((word) => word.length > 0).length;

    return NextResponse.json({
      text: extractedText,
      analysis,
      wordCount,
      suggestions: suggestions.slice(0, 5),
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      { status: 500 }
    );
  }
}