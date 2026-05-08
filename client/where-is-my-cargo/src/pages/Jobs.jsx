import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JobCard from '../components/JobCard'
import { JOBS } from '../data/jobs.js'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Full-time', 'Internship', 'Remote', 'Onsite', 'Hybrid']

export default function Jobs() {
  const [activeFilter, setActiveFilter] = useState('All')
  const headerRef = useRef()
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      gsap.utils.toArray('.job-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [activeFilter])

  const filtered = JOBS.filter(j => {
    if (activeFilter === 'All') return true
    return j.type === activeFilter || j.mode === activeFilter
  })

  return (
    <div className="page-jobs" ref={sectionRef}>
      <div className="page-hero-banner" ref={headerRef}>
        <div className="phb-eyebrow">Jobs Board · {JOBS.length} Openings</div>
        <h1 className="phb-title">Find Your <em>Next Role</em></h1>
        <p className="phb-sub">
          Curated tech jobs from top Indian startups and global companies.
          Filter by type, mode, and apply directly.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="jobs-filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`jobs-filter-btn ${activeFilter === f ? 'jobs-filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
        <span className="jobs-count">{filtered.length} results</span>
      </div>

      {/* Jobs Grid */}
      <div className="jobs-grid">
        {filtered.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
