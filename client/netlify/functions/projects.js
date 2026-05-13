// netlify/functions/projects.js
// Returns hardcoded projects. No database needed.
// Edit the PROJECTS array below to update your portfolio.

const PROJECTS = [
  {
    id: '1',
    title: 'FinFlow Dashboard',
    category: 'Web Application',
    description: 'A real-time financial analytics platform with live data feeds, custom chart components, and role-based access control for a fintech startup.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
    color: 'from-cyan-500/20 to-blue-600/20',
    accent: '#00d4ff',
    year: '2024',
    featured: true,
    githubUrl: 'https://github.com/yourusername/finflow',
    liveUrl: 'https://finflow-demo.com',
    order: 1,
  },
  {
    id: '2',
    title: 'Luxe Commerce',
    category: 'E-Commerce Platform',
    description: 'Premium e-commerce experience for a luxury fashion brand. Built with Next.js for SSR, Razorpay integration, and a CMS-driven content layer.',
    tags: ['Next.js', 'Razorpay', 'Tailwind'],
    color: 'from-violet-500/20 to-purple-600/20',
    accent: '#8b5cf6',
    year: '2024',
    featured: true,
    githubUrl: 'https://github.com/yourusername/luxe-commerce',
    liveUrl: 'https://luxe-commerce-shop.com',
    order: 2,
  },
  {
    id: '3',
    title: 'Elite Chrono',
    category: 'E-Commerce Platform',
    description: 'A luxury watch store built for a smooth and modern shopping experience with smart filtering, secure checkout, and fast performance.',
    tags: ['React', 'Express', 'PostgreSQL'],
    color: 'from-emerald-500/20 to-teal-600/20',
    accent: '#10b981',
    year: '2023',
    featured: false,
    githubUrl: 'https://github.com/yourusername/elite-chrono',
    liveUrl: 'https://elite-chrono.com',
    order: 3,
  },
  {
    id: '4',
    title: 'AURUM BAR & RESTRO',
    category: 'Web Application',
    description: 'A modern restaurant website with online reservations, menu browsing, event showcases, and an elegant user experience.',
    tags: ['Vue.js', 'Node.js', 'MongoDB'],
    color: 'from-orange-500/20 to-amber-600/20',
    accent: '#f59e0b',
    year: '2023',
    featured: false,
    githubUrl: 'https://github.com/yourusername/aurum-restro',
    liveUrl: 'https://aurum-restro.com',
    order: 4,
  },
]

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ success: false, message: 'Method not allowed' }) }
  }

  const params = event.queryStringParameters || {}
  let results = [...PROJECTS]

  // Support ?featured=true and ?category=xxx  (same API shape as before)
  if (params.featured === 'true') {
    results = results.filter((p) => p.featured)
  }
  if (params.category) {
    const cat = params.category.toLowerCase()
    results = results.filter((p) => p.category.toLowerCase().includes(cat))
  }

  // Support /projects/:id  →  Netlify passes path as event.path
  const idMatch = event.path.match(/\/projects\/([^/]+)$/)
  if (idMatch) {
    const project = PROJECTS.find((p) => p.id === idMatch[1])
    if (!project) {
      return { statusCode: 404, body: JSON.stringify({ success: false, message: 'Project not found' }) }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, data: project }),
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, count: results.length, data: results }),
  }
}