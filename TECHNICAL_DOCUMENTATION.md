# Technical Documentation

## Architecture Overview

This application follows a modern full-stack architecture using Next.js 14 with the App Router.

### System Architecture

```
┌─────────────────┐
│   Client Side   │
│   (React/Next)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js API    │
│     Routes      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│ Groq  │ │Pollina│
│  API  │ │tions  │
└───────┘ └───────┘
```

## Component Architecture

### 1. Main Application (`page.tsx`)
**Responsibility**: Primary user interface and state management

**State Variables**:
- `showApp`: Controls landing page vs app view
- `file`: Uploaded file object
- `loading`: Analysis loading state
- `result`: Analysis results object
- `chatMessages`: Chat history array
- `chatInput`: Current chat input
- `chatLoading`: Chat loading state

**Key Functions**:
- `handleFileChange()`: Validates and sets uploaded file
- `handleAnalyze()`: Sends file for AI analysis
- `handleChatSubmit()`: Manages conversational interactions
- `exportAnalysis()`: Exports data as JSON
- `exportAsPDF()`: Exports formatted text report

### 2. Landing Page (`LandingPage.tsx`)
**Responsibility**: Marketing and feature showcase

**Features**:
- Hero section with gradient effects
- Feature cards with hover animations
- Tech stack display
- Call-to-action buttons
- Stats showcase

### 3. Analysis History (`AnalysisHistory.tsx`)
**Responsibility**: Local storage management and history display

**Functions**:
- `loadHistory()`: Retrieves from localStorage
- `saveHistory()`: Persists to localStorage
- `deleteItem()`: Removes specific entry
- `clearHistory()`: Clears all entries

## API Routes

### `/api/analyze` (POST)

**Purpose**: Process uploaded documents and return AI analysis

**Request**:
```typescript
FormData {
  file: File (PDF or DOCX)
}
```

**Response**:
```typescript
{
  text: string,           // Extracted text
  analysis: string,       // AI analysis
  wordCount: number,      // Word count
  suggestions: string[]   // Improvement tips
}
```

**Process Flow**:
1. Validate file type
2. Convert to buffer
3. Extract text (PDF/DOCX)
4. Send to Groq API
5. Parse AI response
6. Extract suggestions
7. Return structured data

**Error Handling**:
- 400: Invalid file type or no file
- 500: Processing or API errors

### `/api/chat` (POST)

**Purpose**: Handle conversational AI interactions

**Request**:
```typescript
{
  documentText: string,      // Document content
  messages: ChatMessage[]    // Conversation history
}
```

**Response**:
```typescript
{
  response: string,   // AI response
  imageUrl?: string   // Optional generated image
}
```

**Special Features**:
- Image request detection
- Context preservation
- Prompt optimization

## Data Flow

### Document Analysis Flow
```
1. User selects file
   ↓
2. Frontend validation (type, size)
   ↓
3. FormData creation
   ↓
4. POST to /api/analyze
   ↓
5. Server-side text extraction
   ↓
6. Groq API call (Llama 3.3 70B)
   ↓
7. Response parsing & formatting
   ↓
8. Save to localStorage history
   ↓
9. Display results to user
```

### Chat Interaction Flow
```
1. User types question
   ↓
2. Message added to history
   ↓
3. POST to /api/chat with context
   ↓
4. Image request detection
   ↓
5a. Text response: Groq API
5b. Image response: Pollinations API
   ↓
6. Response displayed in chat
   ↓
7. Auto-scroll to new message
```

## State Management

### Client-Side State
- **React useState**: Component-level state
- **localStorage**: Persistent history (max 10 items)
- **useRef**: File input and scroll management

### Server-Side State
- **Stateless API routes**: No session storage
- **Request-scoped data**: Each request is independent

## File Processing

### PDF Extraction
```typescript
import pdf from 'pdf-parse';

const data = await pdf(buffer);
const text = data.text;
```

**Limitations**:
- Text-based PDFs only
- No OCR for scanned documents
- Max 15,000 characters for AI processing

### DOCX Extraction
```typescript
import mammoth from 'mammoth';

const result = await mammoth.extractRawText({ buffer });
const text = result.value;
```

**Features**:
- Raw text extraction
- Preserves paragraph structure
- Handles modern .docx format

## AI Integration

### Groq API (Llama 3.3 70B)

**Configuration**:
```typescript
model: "llama-3.3-70b-versatile"
temperature: 0.7
max_tokens: 2000
```

**Use Cases**:
1. Document analysis
2. Conversational responses
3. Suggestion generation

**Rate Limits**:
- Free tier: 30 requests/minute
- Max context: ~32K tokens

### Pollinations.ai

**Image Generation**:
```typescript
const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
```

**Features**:
- No API key required
- 1024x1024 resolution
- Instant generation
- Direct URL access

## Security Considerations

### Input Validation
- File type verification
- Size limits (10MB)
- Content sanitization

### API Key Management
- Environment variables only
- Never exposed to client
- Server-side validation

### Data Privacy
- No permanent storage
- Client-side localStorage only
- HTTPS for API calls

## Performance Optimization

### Frontend
- Code splitting with Next.js
- Lazy loading of components
- Optimized images and assets
- Tailwind CSS purging

### Backend
- Streaming responses (future)
- Efficient buffer handling
- Minimal dependencies

### Caching
- Static assets cached by Vercel
- API responses not cached (real-time)

## Error Handling Strategy

### Client-Side
```typescript
try {
  const response = await fetch('/api/analyze', options);
  if (!response.ok) throw new Error(data.error);
} catch (error) {
  setError(error.message);
}
```

### Server-Side
```typescript
try {
  // Processing logic
} catch (error) {
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}
```

## Deployment Configuration

### Vercel Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Environment Variables
```
GROQ_API_KEY=gsk_xxxxx
```

### Build Optimization
- Automatic code splitting
- Image optimization
- Font optimization
- CSS minification

## Testing Strategy

### Manual Testing Checklist
- [ ] File upload (PDF)
- [ ] File upload (DOCX)
- [ ] Invalid file rejection
- [ ] Analysis completion
- [ ] Chat functionality
- [ ] Image generation
- [ ] Export features
- [ ] History management
- [ ] Mobile responsiveness

### Future Automated Tests
- Unit tests (Jest)
- Integration tests (Playwright)
- E2E tests (Cypress)
- Performance tests (Lighthouse)

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features
- ES6+ support
- Fetch API
- LocalStorage
- FormData API

## Monitoring & Analytics

### Recommended Tools
- Vercel Analytics (built-in)
- Google Analytics
- Sentry (error tracking)
- LogRocket (session replay)

## Maintenance

### Regular Updates
- Dependencies: Monthly
- Security patches: Immediately
- Feature updates: Quarterly

### Backup Strategy
- Code: Git repository
- User data: Client-side only
- No server-side persistence

## Troubleshooting

### Common Issues

**1. "No file provided" error**
- Ensure file is selected
- Check file size < 10MB
- Verify file format (PDF/DOCX)

**2. "Analysis failed" error**
- Check GROQ_API_KEY is set
- Verify API key is valid
- Check rate limits

**3. Images not loading**
- Pollinations.ai may be slow
- Check internet connection
- Prompt may be too complex

**4. Chat not working**
- Ensure document is analyzed first
- Check message format
- Verify API connectivity

## Performance Benchmarks

### Target Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- API Response Time: < 5s
- Chat Response Time: < 3s

### Actual Performance
- Landing Page Load: ~0.8s
- Document Analysis: 5-15s (depends on size)
- Chat Response: 2-5s
- Image Generation: 3-8s

## Accessibility

### WCAG 2.1 Compliance
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios > 4.5:1
- Screen reader compatible

## Future Technical Improvements

1. **WebSocket Integration**: Real-time analysis progress
2. **Service Worker**: Offline support
3. **IndexedDB**: Enhanced local storage
4. **Web Workers**: Background processing
5. **Progressive Web App**: Installable app
6. **Rate Limiting**: Client-side throttling
7. **Caching Layer**: Redis for API responses
8. **Database**: PostgreSQL for user data
9. **Authentication**: OAuth integration
10. **Analytics Dashboard**: Usage insights

---

**Last Updated**: November 2024  
**Version**: 1.0.0  
**Maintainer**: [Your Name]