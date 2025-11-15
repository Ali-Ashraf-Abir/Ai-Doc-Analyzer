"use client";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            AI Document Analyzer
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your documents with cutting-edge AI. Get instant insights, chat with your content, and generate visuals—all powered by advanced language models.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 flex items-center gap-3"
            >
              <span>Get Started Free</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <a
              href="#features"
              className="border-2 border-gray-600 text-gray-300 font-semibold py-4 px-8 rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
              10MB
            </div>
            <p className="text-gray-400">Max File Size</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
              2 Formats
            </div>
            <p className="text-gray-400">PDF & DOCX Support</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-2">
              100% Free
            </div>
            <p className="text-gray-400">No Hidden Costs</p>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Powerful Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-400">Get comprehensive insights using Llama 3.3 70B model via Groq API for lightning-fast processing.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Conversational AI</h3>
              <p className="text-gray-400">Chat naturally with your documents. Ask questions, get clarifications, and dive deeper into content.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-pink-500/50 transition-all">
              <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Image Generation</h3>
              <p className="text-gray-400">Visualize concepts from your documents with AI-generated images using Pollinations.ai.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Suggestions</h3>
              <p className="text-gray-400">Receive actionable improvement recommendations to enhance your document quality.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-yellow-500/50 transition-all">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Process documents in seconds with optimized APIs and efficient text extraction.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
              <p className="text-gray-400">Your documents are processed securely and not stored permanently on our servers.</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Built With Modern Tech</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">⚛️</div>
              <p className="text-gray-300 font-semibold">Next.js 14</p>
              <p className="text-gray-500 text-sm">React Framework</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p className="text-gray-300 font-semibold">Tailwind CSS</p>
              <p className="text-gray-500 text-sm">Utility-First CSS</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">🤖</div>
              <p className="text-gray-300 font-semibold">Llama 3.3 70B</p>
              <p className="text-gray-500 text-sm">Via Groq API</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">📘</div>
              <p className="text-gray-300 font-semibold">TypeScript</p>
              <p className="text-gray-500 text-sm">Type Safety</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Analyze Your Documents?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are leveraging AI to understand their documents better. Get started in seconds—no signup required.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-purple-600 font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Start Analyzing Now
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>© 2024 AI Document Analyzer • Built with Next.js & Groq</p>
          <p className="mt-2">Open Source • MIT License</p>
        </div>
      </div>
    </div>
  );
}