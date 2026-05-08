export default function GymPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-lime-400/20 text-lime-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4 9.6 9.6"/><path d="M18.65 21.35a.7.7 0 0 1-.99 0L2.65 6.34a.7.7 0 0 1 0-.99l2.02-2.01a.7.7 0 0 1 .99 0l15.01 15.01a.7.7 0 0 1 0 .99l-2.02 2.01z"/><path d="m11.5 8.5 4 4"/><path d="m6 10 4 4"/><path d="m8.5 15.5 4-4"/></svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">AI Gym & Fitness Portal</h1>
      <p className="text-gray-400 max-w-xl mb-8">
        The Gym module contains a Python Django backend. We need to deploy the backend to a platform like Render or Heroku first before the Next.js frontend can connect to it!
      </p>
      <a href="/" className="px-6 py-3 rounded-xl bg-lime-400 text-black font-semibold hover:bg-lime-300 transition-colors">
        Go Back Home
      </a>
    </div>
  );
}
