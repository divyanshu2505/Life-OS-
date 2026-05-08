import { useState } from 'react'

const MOCK_OUTPUTS = {
  'resume-builder': `PROFESSIONAL RESUME

Arjun Sharma | arjun@email.com | +91-98765-43210
GitHub: github.com/arjun | LinkedIn: linkedin.com/in/arjun

SUMMARY
Full-Stack Developer with 2+ years of experience building scalable web applications using React, Node.js and cloud technologies. Passionate about clean code and performance optimization.

SKILLS
Languages: JavaScript, TypeScript, Python
Frontend: React, Next.js, GSAP, Framer Motion
Backend: Node.js, Express, FastAPI
Database: PostgreSQL, MongoDB, Redis
Cloud: AWS, GCP, Docker, Kubernetes

EXPERIENCE
Junior Developer — Startup XYZ (2023–Present)
• Built real-time dashboard reducing load time by 60%
• Led migration from REST to GraphQL for 15+ endpoints
• Implemented CI/CD pipeline using GitHub Actions

EDUCATION
B.Tech Computer Science — IIT Dhanbad (2019–2023) | CGPA: 8.4`,

  'cover-letter': `Dear Hiring Manager,

I am writing to express my strong interest in the Frontend Developer position at your company. With a solid foundation in React and modern JavaScript, I bring both technical depth and creative problem-solving to every project.

In my previous role, I delivered a complete UI overhaul that increased user retention by 35% and reduced bundle size by 40%. I am particularly excited about your focus on performance and clean user experiences—values that align deeply with my own work philosophy.

I would love the opportunity to discuss how I can contribute to your team's success.

Warm regards,
Arjun Sharma`,

  'code-debugger': `🐛 BUG FOUND & FIXED

Original Issue:
  TypeError: Cannot read property 'map' of undefined

Root Cause:
  The component renders before async data is fetched, causing 'items' to be undefined.

Fix Applied:
  const { data: items = [] } = useQuery(...)
  // Added default value [] to prevent undefined

Additional Recommendations:
  ✅ Add loading skeleton state
  ✅ Add error boundary component  
  ✅ Use optional chaining: items?.map(...)`,

  'content-gen': `🔥 TOP 5 AI TRENDS IN 2025

1. Multimodal AI becomes mainstream
   GPT-5 and Gemini Ultra handle text, image, audio & video simultaneously...

2. AI Agents replace repetitive workflows
   Companies deploy autonomous agents for customer support, data analysis...

3. Local LLMs on consumer hardware
   With Ollama and LM Studio, run powerful models on your laptop...

4. AI-powered code review
   GitHub Copilot Enterprise now reviews PRs, suggests tests, and flags security...

5. Personalized AI education
   Platforms like Khan Academy use AI tutors that adapt to each student's pace...`,

  'portfolio-gen': `🎨 PORTFOLIO GENERATED

Name: Arjun Sharma
Title: Full-Stack Developer & Open Source Contributor

Featured Projects:
1. Where Is My Cargo — Real-time freight tracker (Three.js + GSAP)
2. KisanAI — AI-powered farming assistant (React Native)
3. LifeOS Dashboard — Personal productivity platform

GitHub Stats:
  ⭐ 248 stars across repositories
  🔀 89 forks
  📦 12 published packages

Tech Stack Badges: React · Node.js · Python · AWS · Docker`,

  'prompt-crafter': `⚡ OPTIMIZED PROMPTS GENERATED

For ChatGPT:
"Act as a senior software architect with 10 years of experience. Review the following code and provide: 1) Security vulnerabilities 2) Performance bottlenecks 3) Refactoring suggestions with examples. Be specific and technical."

For Midjourney:
"Cinematic dark locomotive freight yard, volumetric fog, golden hour lighting, hyperrealistic, 8K, dramatic shadows, industrial aesthetic, shot on Hasselblad --ar 16:9 --q 2 --v 6"

For Stable Diffusion:
"Dark UI dashboard, glassmorphism, gold accent colors, premium design, high contrast, professional, clean typography, 4K render"`,
}

export default function AIToolCard({ tool, onLaunch }) {
  const [launched, setLaunched] = useState(false)
  const [output, setOutput]     = useState('')
  const [loading, setLoading]   = useState(false)
  const [saved, setSaved]       = useState(false)

  const handleLaunch = () => {
    if (tool.pro) { onLaunch && onLaunch(tool); return }
    setLaunched(true)
    setLoading(true)
    setOutput('')
    setTimeout(() => {
      setOutput(MOCK_OUTPUTS[tool.id] || 'AI output generated successfully.')
      setLoading(false)
    }, 1400)
  }

  return (
    <div className={`ai-tool-card ${tool.pro ? 'ai-tool-card--pro' : ''}`}>
      {tool.pro && <div className="pro-lock-badge">🔒 PRO</div>}

      <div className="atc-top">
        <span className="atc-icon">{tool.icon}</span>
        <span className="atc-category" style={{ color: tool.color }}>{tool.category}</span>
      </div>

      <div className="atc-title">{tool.title}</div>
      <div className="atc-desc">{tool.description}</div>

      <div className="atc-actions">
        <button
          className={`atc-launch-btn ${tool.pro ? 'atc-launch-btn--locked' : ''}`}
          onClick={handleLaunch}
        >
          {tool.pro ? '🔒 Unlock Pro' : launched ? '↺ Run Again' : 'Launch Tool →'}
        </button>
        <button
          className={`atc-save-btn ${saved ? 'atc-save-btn--saved' : ''}`}
          onClick={() => setSaved(s => !s)}
          title="Save tool"
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      {launched && (
        <div className="atc-output">
          {loading ? (
            <div className="atc-loading">
              <span className="atc-loader" />
              Generating with AI…
            </div>
          ) : (
            <pre className="atc-result">{output}</pre>
          )}
        </div>
      )}
    </div>
  )
}
