// LifeOS AI - Main Application Logic

let currentPage = 'dashboard';
let chatHistory = [];

const pages = {
  dashboard: renderDashboard,
  chat: renderChat,
  earn: renderEarn,
  video: renderVideo,
  book: renderBook,
  map: renderMap
};

function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  document.getElementById('mainContent').innerHTML = '';
  pages[page]();
}

function showUpgrade() {
  document.getElementById('upgradeModal').style.display = 'flex';
}

// ─── DASHBOARD ───────────────────────────────────────────────
function renderDashboard() {
  const el = document.getElementById('mainContent');
  el.innerHTML = `
    <div class="welcome-banner">
      <div>
        <div class="welcome-title">Welcome back to LifeOS AI 👋</div>
        <div class="welcome-sub">Your AI-powered productivity platform. Learn, earn, and save time.</div>
        <div style="margin-top:1rem;display:flex;gap:0.75rem;">
          <button class="btn-primary" onclick="navigate('chat')">Start Chatting →</button>
          <button class="btn-secondary" onclick="navigate('earn')">Earn Ideas 💰</button>
        </div>
      </div>
      <div class="banner-emoji">🧠</div>
    </div>

    <div class="card-grid grid-4" style="margin-bottom:2rem;">
      <div class="stat-card">
        <div class="stat-icon icon-purple">🤖</div>
        <div>
          <div class="stat-value">24</div>
          <div class="stat-label">AI Chats Today</div>
          <div class="stat-change">↑ 12% from yesterday</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-green">💰</div>
        <div>
          <div class="stat-value">$340</div>
          <div class="stat-label">Earning Potential</div>
          <div class="stat-change">↑ 8 new ideas</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-cyan">🎥</div>
        <div>
          <div class="stat-value">7</div>
          <div class="stat-label">Videos Summarized</div>
          <div class="stat-change">↑ 3hrs saved</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icon-pink">📚</div>
        <div>
          <div class="stat-value">3</div>
          <div class="stat-label">Books Generated</div>
          <div class="stat-change">↑ 2 this week</div>
        </div>
      </div>
    </div>

    <div style="margin-bottom:1rem;">
      <div class="section-title">⚡ Quick Actions</div>
      <div class="quick-actions">
        <div class="quick-action-btn" onclick="navigate('chat')">
          <div class="qa-icon">💬</div><div class="qa-label">Ask AI</div>
        </div>
        <div class="quick-action-btn" onclick="navigate('earn')">
          <div class="qa-icon">💡</div><div class="qa-label">Earn Ideas</div>
        </div>
        <div class="quick-action-btn" onclick="navigate('video')">
          <div class="qa-icon">⚡</div><div class="qa-label">Summarize Video</div>
        </div>
        <div class="quick-action-btn" onclick="navigate('book')">
          <div class="qa-icon">📖</div><div class="qa-label">Generate Book</div>
        </div>
        <div class="quick-action-btn" onclick="navigate('map')">
          <div class="qa-icon">🗺️</div><div class="qa-label">Navigate</div>
        </div>
        <div class="quick-action-btn" onclick="showUpgrade()">
          <div class="qa-icon">👑</div><div class="qa-label">Go Premium</div>
        </div>
      </div>
    </div>

    <div class="card-grid grid-2">
      <div class="card">
        <div class="section-title">📊 Weekly Progress</div>
        <div style="display:flex;flex-direction:column;gap:1rem;margin-top:0.5rem;">
          ${['AI Chat Usage','Earning Goals','Videos Summarized','Books Generated'].map((label, i) => {
            const widths = [75, 45, 60, 30];
            return `<div>
              <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
                <span style="font-size:0.85rem;color:var(--text-secondary)">${label}</span>
                <span style="font-size:0.85rem;font-weight:600">${widths[i]}%</span>
              </div>
              <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${widths[i]}%"></div></div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="card">
        <div class="section-title">🕐 Recent Activity</div>
        <div class="activity-list">
          ${[
            {icon:'🤖',bg:'icon-purple',title:'AI Chat — "How to start freelancing"',time:'2 min ago'},
            {icon:'💰',bg:'icon-green',title:'Earned Idea: Content Writing',time:'1 hr ago'},
            {icon:'🎥',bg:'icon-cyan',title:'Summarized: "Learn React in 1hr"',time:'3 hrs ago'},
            {icon:'📚',bg:'icon-pink',title:'Generated: "Python for Beginners"',time:'Yesterday'},
          ].map(a => `
            <div class="activity-item">
              <div class="activity-icon ${a.bg}">${a.icon}</div>
              <div class="activity-text">
                <div class="activity-title">${a.title}</div>
                <div class="activity-time">${a.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ─── AI CHAT ────────────────────────────────────────────────
const aiResponses = [
  "Great question! Here's what I think: AI is transforming every industry. To get started, focus on learning Python, understanding machine learning basics, and building small projects.",
  "For freelancing success, specialize in a niche, build a strong portfolio, and start on platforms like Upwork or Fiverr. Consistency is key!",
  "To create passive income with AI: 1) Build AI tools/apps, 2) Sell AI-generated content, 3) Create online courses, 4) Build chatbots for businesses.",
  "Here's a step-by-step plan: Start small, validate your idea, build an MVP, get feedback, iterate. Launch fast and improve continuously.",
  "The best AI tools right now are: ChatGPT for writing, Midjourney for images, GitHub Copilot for coding, and ElevenLabs for voice generation.",
  "To boost productivity: Use the Pomodoro technique, batch similar tasks, automate repetitive work with AI, and review your goals daily.",
];

function renderChat() {
  const el = document.getElementById('mainContent');
  el.innerHTML = `
    <div class="page-header">
      <div class="page-title">AI Chat Assistant</div>
      <div class="page-subtitle">Ask anything — get intelligent, personalized responses</div>
    </div>
    <div class="chat-container" id="chatContainer">
      <div class="chat-messages" id="chatMessages">
        <div class="msg ai">
          <div class="msg-avatar">🤖</div>
          <div class="msg-bubble">
            Hello! I'm your LifeOS AI assistant. I can help you with coding, business ideas, learning, earning strategies, and much more. What would you like to explore today?
          </div>
        </div>
        ${chatHistory.map(m => `
          <div class="msg ${m.role}">
            <div class="msg-avatar">${m.role === 'ai' ? '🤖' : 'U'}</div>
            <div class="msg-bubble">${m.text}</div>
          </div>
        `).join('')}
      </div>
      <div class="chat-input-area">
        <textarea class="chat-input" id="chatInput" placeholder="Ask me anything..." rows="1" onkeydown="handleChatKey(event)"></textarea>
        <button class="send-btn" onclick="sendMessage()">➤</button>
      </div>
    </div>
  `;
  autoResizeTextarea();
}

function autoResizeTextarea() {
  const ta = document.getElementById('chatInput');
  if (!ta) return;
  ta.addEventListener('input', () => {
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  });
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = 'auto';

  const msgs = document.getElementById('chatMessages');
  chatHistory.push({ role: 'user', text });

  msgs.innerHTML += `<div class="msg user"><div class="msg-avatar">U</div><div class="msg-bubble">${text}</div></div>`;
  msgs.innerHTML += `<div class="msg ai" id="typingMsg"><div class="msg-avatar">🤖</div><div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div></div>`;
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    const reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    chatHistory.push({ role: 'ai', text: reply });
    const t = document.getElementById('typingMsg');
    if (t) t.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble">${reply}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1500);
}

// ─── EARN ───────────────────────────────────────────────────
const earnIdeas = {
  '💻 Freelancing': [
    {icon:'✍️',title:'Content Writing',desc:'Write blogs, articles, and web copy for businesses. High demand, low entry barrier.',earn:'$300–$2000/month'},
    {icon:'🎨',title:'UI/UX Design',desc:'Design beautiful interfaces for apps and websites using Figma or Adobe XD.',earn:'$500–$5000/month'},
    {icon:'🤖',title:'AI Prompt Engineer',desc:'Create optimized prompts for businesses using ChatGPT and other AI tools.',earn:'$200–$1500/month'},
  ],
  '🎥 Content Creation': [
    {icon:'📹',title:'YouTube Automation',desc:'Create faceless YouTube channels using AI-generated scripts and voiceovers.',earn:'$500–$10,000/month'},
    {icon:'📱',title:'Short-form Content',desc:'Create viral Reels/Shorts for brands and earn through sponsorships.',earn:'$200–$3000/month'},
  ],
  '💡 AI Products': [
    {icon:'🛒',title:'Sell AI Art/Templates',desc:'Create and sell AI-generated designs, logos, and templates on Etsy or Gumroad.',earn:'$100–$2000/month'},
    {icon:'📘',title:'Sell AI-Written eBooks',desc:'Generate niche eBooks using AI and sell them on Amazon KDP.',earn:'$200–$5000/month'},
    {icon:'🤝',title:'Build AI Chatbots',desc:'Create custom chatbots for local businesses using no-code AI tools.',earn:'$300–$3000/month'},
  ],
};

function renderEarn() {
  const el = document.getElementById('mainContent');
  el.innerHTML = `
    <div class="page-header">
      <div class="page-title">💰 AI Revenue Generator</div>
      <div class="page-subtitle">Discover AI-powered earning opportunities tailored for you</div>
    </div>
    <div class="card" style="margin-bottom:1.5rem;display:flex;align-items:center;gap:1rem;background:linear-gradient(135deg,rgba(0,255,136,0.08),rgba(108,99,255,0.08));border-color:rgba(0,255,136,0.2);">
      <div style="font-size:2.5rem">🚀</div>
      <div>
        <div style="font-weight:600;font-size:1rem">Your Earning Potential</div>
        <div style="font-size:2rem;font-weight:700;font-family:'Space Grotesk',sans-serif;background:linear-gradient(135deg,#00FF88,#00D4FF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">$340 – $21,500</div>
        <div style="color:var(--text-secondary);font-size:0.85rem">Estimated monthly range based on selected skills</div>
      </div>
    </div>
    ${Object.entries(earnIdeas).map(([cat, ideas]) => `
      <div class="earn-category">
        <h3>${cat}</h3>
        ${ideas.map(idea => `
          <div class="idea-card" onclick="showIdeaDetail('${idea.title}')">
            <div class="idea-icon">${idea.icon}</div>
            <div style="flex:1">
              <div class="idea-title">${idea.title}</div>
              <div class="idea-desc">${idea.desc}</div>
              <div class="idea-earn">💵 ${idea.earn}</div>
            </div>
            <div style="color:var(--text-muted);font-size:1.2rem">→</div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
}

function showIdeaDetail(title) {
  alert(`📋 Full execution plan for "${title}" coming soon in Premium!`);
}

// ─── VIDEO SUMMARY ──────────────────────────────────────────
const videoSamples = {
  default: {
    title: 'Video Summary',
    points: [
      'Introduction to the core concepts covered in the video',
      'Key framework and methodology explained with examples',
      'Step-by-step implementation guide for beginners',
      'Common mistakes to avoid and best practices',
      'Advanced tips for experienced practitioners',
      'Resources and next steps for continued learning',
    ]
  }
};

function renderVideo() {
  const el = document.getElementById('mainContent');
  el.innerHTML = `
    <div class="page-header">
      <div class="page-title">🎥 Video Summary Tool</div>
      <div class="page-subtitle">Paste a YouTube URL and get instant AI-powered summaries</div>
    </div>
    <div class="url-input-area">
      <input class="input-field" id="videoUrl" placeholder="Paste YouTube URL here... (e.g. https://youtube.com/watch?v=...)" />
      <button class="btn-primary" onclick="summarizeVideo()">Summarize ⚡</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        {icon:'⏱️',label:'Saves Hours',val:'Up to 10x faster'},
        {icon:'🎯',label:'Key Points',val:'Auto extracted'},
        {icon:'📝',label:'Smart Notes',val:'AI generated'},
      ].map(s => `
        <div class="card" style="text-align:center;">
          <div style="font-size:1.75rem">${s.icon}</div>
          <div style="font-weight:600;margin-top:0.5rem">${s.val}</div>
          <div style="color:var(--text-secondary);font-size:0.8rem">${s.label}</div>
        </div>
      `).join('')}
    </div>
    <div id="videoResult"></div>
  `;
}

function summarizeVideo() {
  const url = document.getElementById('videoUrl').value.trim();
  if (!url) { alert('Please enter a YouTube URL'); return; }
  const result = document.getElementById('videoResult');
  result.innerHTML = '<div class="spinner"></div>';
  setTimeout(() => {
    const data = videoSamples.default;
    result.innerHTML = `
      <div class="summary-result">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h3>📋 ${data.title}</h3>
          <div style="display:flex;gap:0.5rem;">
            <span class="tag tag-cyan">AI Summary</span>
            <span class="tag tag-green">Saved</span>
          </div>
        </div>
        <h4 style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">Key Points</h4>
        <ul class="key-points">
          ${data.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
        <div style="margin-top:1.5rem;display:flex;gap:0.75rem;">
          <button class="btn-ghost">📋 Copy Notes</button>
          <button class="btn-ghost">💾 Save Summary</button>
          <button class="btn-ghost">📤 Share</button>
        </div>
      </div>
    `;
  }, 2000);
}

// ─── BOOK GENERATOR ─────────────────────────────────────────
function renderBook() {
  const el = document.getElementById('mainContent');
  el.innerHTML = `
    <div class="page-header">
      <div class="page-title">📚 AI Book Generator</div>
      <div class="page-subtitle">Generate full books or summaries on any topic instantly</div>
    </div>
    <div class="card" style="margin-bottom:1.5rem;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
        <div>
          <label style="font-size:0.85rem;color:var(--text-secondary);display:block;margin-bottom:0.5rem;">Book Topic</label>
          <input class="input-field" id="bookTopic" placeholder="e.g. Machine Learning for Beginners" />
        </div>
        <div>
          <label style="font-size:0.85rem;color:var(--text-secondary);display:block;margin-bottom:0.5rem;">Type</label>
          <select class="input-field" id="bookType">
            <option value="full">Full Book (10 Chapters)</option>
            <option value="summary">Quick Summary (5 min read)</option>
            <option value="guide">Step-by-Step Guide</option>
          </select>
        </div>
      </div>
      <div style="margin-bottom:1rem;">
        <label style="font-size:0.85rem;color:var(--text-secondary);display:block;margin-bottom:0.5rem;">Target Audience</label>
        <input class="input-field" id="bookAudience" placeholder="e.g. Beginners with no coding experience" />
      </div>
      <button class="btn-primary" onclick="generateBook()">Generate Book 📚</button>
    </div>
    <div id="bookResult"></div>
  `;
}

function generateBook() {
  const topic = document.getElementById('bookTopic').value.trim() || 'AI & Machine Learning';
  const type = document.getElementById('bookType').value;
  const result = document.getElementById('bookResult');
  result.innerHTML = '<div class="spinner"></div>';

  const chapters = [
    {num:'Chapter 1', title:'Introduction & Foundations', content:`This chapter introduces the core concepts of ${topic}. We explore the fundamental principles, history, and why this subject matters in today's world.`},
    {num:'Chapter 2', title:'Core Concepts Deep Dive', content:`Building on the foundations, we explore the key methodologies and frameworks used in ${topic}. Practical examples help solidify understanding.`},
    {num:'Chapter 3', title:'Practical Implementation', content:`Step-by-step guide to implementing your first ${topic} project. Includes code examples, common pitfalls, and debugging tips.`},
    {num:'Chapter 4', title:'Advanced Techniques', content:`For those ready to go deeper — advanced strategies, optimization techniques, and real-world case studies in ${topic}.`},
    {num:'Chapter 5', title:'Future & Next Steps', content:`Where is ${topic} headed? Emerging trends, career opportunities, and your personalized learning roadmap for continued growth.`},
  ];

  setTimeout(() => {
    result.innerHTML = `
      <div class="book-output">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;">
          <div>
            <h2 style="font-family:'Space Grotesk',sans-serif;font-size:1.25rem;">${topic}</h2>
            <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
              <span class="tag tag-purple">AI Generated</span>
              <span class="tag tag-cyan">${type === 'full' ? '10 Chapters' : type === 'summary' ? '5 min read' : 'Step-by-Step'}</span>
            </div>
          </div>
          <div style="display:flex;gap:0.5rem;">
            <button class="btn-ghost">📥 Download PDF</button>
            <button class="btn-ghost">💾 Save</button>
          </div>
        </div>
        ${chapters.map(c => `
          <div class="chapter">
            <h4>${c.num}: ${c.title}</h4>
            <p>${c.content}</p>
          </div>
        `).join('')}
      </div>
    `;
  }, 2500);
}

// ─── MAP ────────────────────────────────────────────────────
function renderMap() {
  const el = document.getElementById('mainContent');
  el.innerHTML = `
    <div class="page-header">
      <div class="page-title">🗺️ Smart Navigation</div>
      <div class="page-subtitle">AI-powered route suggestions with OpenStreetMap</div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-bottom:1rem;">
      <input class="input-field" id="mapFrom" placeholder="📍 From location..." style="flex:1" />
      <input class="input-field" id="mapTo" placeholder="🎯 To destination..." style="flex:1" />
      <button class="btn-primary" onclick="getRoute()">Get Route</button>
    </div>
    <div class="map-container">
      <iframe id="mapFrame"
        src="https://www.openstreetmap.org/export/embed.html?bbox=72.8,18.9,73.0,19.1&layer=mapnik"
        allowfullscreen loading="lazy">
      </iframe>
    </div>
    <div id="routeInfo" style="margin-top:1rem;"></div>
  `;
}

function getRoute() {
  const from = document.getElementById('mapFrom').value.trim();
  const to = document.getElementById('mapTo').value.trim();
  if (!from || !to) { alert('Please enter both locations'); return; }
  document.getElementById('routeInfo').innerHTML = `
    <div class="card" style="display:flex;gap:2rem;align-items:center;">
      <div style="text-align:center;"><div style="font-size:1.5rem">📍</div><div style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.25rem">${from}</div></div>
      <div style="flex:1;border-top:2px dashed var(--accent-purple);position:relative;">
        <span style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--bg-card);padding:0 0.5rem;color:var(--accent-cyan);font-size:0.8rem">~45 min</span>
      </div>
      <div style="text-align:center;"><div style="font-size:1.5rem">🎯</div><div style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.25rem">${to}</div></div>
    </div>
    <div class="card-grid grid-3" style="margin-top:1rem;">
      <div class="card" style="text-align:center;"><div style="font-size:1.5rem">🚗</div><div style="font-weight:600">12.4 km</div><div style="color:var(--text-secondary);font-size:0.8rem">Distance</div></div>
      <div class="card" style="text-align:center;"><div style="font-size:1.5rem">⏱️</div><div style="font-weight:600">45 min</div><div style="color:var(--text-secondary);font-size:0.8rem">Est. Time</div></div>
      <div class="card" style="text-align:center;"><div style="font-size:1.5rem">🟢</div><div style="font-weight:600">Light</div><div style="color:var(--text-secondary);font-size:0.8rem">Traffic</div></div>
    </div>
  `;
}

// ─── INIT ────────────────────────────────────────────────────
navigate('dashboard');
