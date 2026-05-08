import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AIToolCard from '../components/AIToolCard'
import { AI_TOOLS, FREELANCE_TASKS } from '../data/aiTools.js'

gsap.registerPlugin(ScrollTrigger)

export default function AIWorkspace() {
  const headerRef = useRef()
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      gsap.utils.toArray('.ai-tool-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.09, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' } }
        )
      })
      gsap.utils.toArray('.freelance-task-row').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-ai" ref={sectionRef}>
      {/* Page header */}
      <div className="page-hero-banner" ref={headerRef}>
        <div className="phb-eyebrow">AI Workspace · 6 Tools Available</div>
        <h1 className="phb-title">Your AI <em>Toolkit</em></h1>
        <p className="phb-sub">
          Resume builder, code debugger, content engine — all powered by AI.
          Launch any tool and get results in seconds.
        </p>
      </div>

      {/* AI Tools Grid */}
      <section className="ai-tools-section">
        <div className="section-header">
          <div>
            <div className="section-num">01 / AI Tools</div>
            <h2 className="section-title">Launch a <em>Tool</em></h2>
          </div>
          <div className="section-count">{AI_TOOLS.length} Tools</div>
        </div>
        <div className="ai-tools-grid">
          {AI_TOOLS.map(tool => (
            <AIToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Freelance / Earn Section */}
      <section className="freelance-section">
        <div className="section-header">
          <div>
            <div className="section-num">02 / Earn</div>
            <h2 className="section-title">Earn with <em>AI</em></h2>
          </div>
        </div>
        <div className="freelance-intro">
          Complete micro-tasks using AI tools and earn money. Pick a task, use AI to complete it faster, submit and get paid.
        </div>
        <div className="freelance-tasks">
          {FREELANCE_TASKS.map(task => (
            <div key={task.id} className="freelance-task-row">
              <div className="ftr-left">
                <span className="ftr-tag">{task.tag}</span>
                <span className="ftr-title">{task.title}</span>
              </div>
              <div className="ftr-right">
                <span className="ftr-time">{task.time}</span>
                <span className="ftr-earn">{task.earn}</span>
                <button className="ftr-start-btn">Start →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
