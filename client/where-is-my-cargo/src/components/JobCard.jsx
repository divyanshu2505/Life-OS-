import { useState } from 'react'

export default function JobCard({ job }) {
  const [saved, setSaved] = useState(false)

  const modeColor = {
    Remote: 'var(--accent-2)',
    Hybrid: 'var(--accent)',
    Onsite: 'var(--text-muted)',
  }

  const typeColor = {
    'Full-time':  'var(--accent-2)',
    'Internship': 'var(--accent)',
  }

  return (
    <div className={`job-card ${job.featured ? 'job-card--featured' : ''}`}>
      {job.featured && <div className="job-featured-tag">⚡ FEATURED</div>}

      <div className="job-card-top">
        <div className="job-logo">{job.logo}</div>
        <div className="job-meta">
          <div className="job-role">{job.role}</div>
          <div className="job-company">{job.company}</div>
        </div>
        <button
          className={`job-save-btn ${saved ? 'job-save-btn--saved' : ''}`}
          onClick={() => setSaved(s => !s)}
          title={saved ? 'Unsave' : 'Save Job'}
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      <div className="job-badges">
        <span className="job-badge" style={{ color: typeColor[job.type] || 'var(--text-muted)' }}>
          {job.type}
        </span>
        <span className="job-badge" style={{ color: modeColor[job.mode] }}>
          {job.mode}
        </span>
        <span className="job-salary">{job.salary}</span>
      </div>

      <div className="job-tags">
        {job.tags.map(tag => (
          <span key={tag} className="job-tag">{tag}</span>
        ))}
      </div>

      <button className="job-apply-btn">
        Apply Now →
      </button>
    </div>
  )
}
