# DeepSeek Document Analyzer

AI-powered document analysis using DeepSeek R1 via Groq API. Upload PDF or DOCX files and get comprehensive AI-driven insights, suggestions, and analysis.

## Features

-  PDF and DOCX file upload
-  Text extraction from documents
-  AI-powered analysis with DeepSeek R1
-  Document statistics (word count, character count)
-  Improvement suggestions
-  Dark-themed modern UI
-  Zero cost deployment on Vercel

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: DeepSeek R1 via Groq SDK
- **File Processing**: pdf-parse, mammoth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd deepseek-document-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your Groq API key to `.env`:
```
GROQ_API_KEY=your_groq_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: Your Groq API key

4. Deploy! 

## Getting a Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and use it in your `.env` file

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts       # API endpoint for document analysis
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Main page component
├── .env.example                   # Environment variables template
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## Usage

1. Click "Choose File" and select a PDF or DOCX document
2. Click "Analyze Document"
3. Wait for AI analysis (usually 5-15 seconds)
4. View results:
   - Document statistics
   - AI-powered analysis
   - Improvement suggestions
   - Text preview

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for DeepSeek R1 | Yes |

## Limitations

- Maximum file size: 10MB
- Supported formats: PDF, DOCX
- Text extraction limited to first 15,000 characters for analysis
- DeepSeek R1 model via Groq (fast and efficient)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

---

Built with using Next.js and DeepSeek R1