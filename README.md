# NEXUS — Premium Web Development Agency Website

A highly modern, visually impressive full-stack agency website built with React 19, Vite, Tailwind CSS, Framer Motion, GSAP, Three.js, Node.js, Express, and MongoDB.

---

## 🚀 Tech Stack

### Frontend
- **React 18** + **Vite** — lightning-fast dev & build
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — smooth UI animations
- **GSAP + ScrollTrigger** — scroll-driven animations
- **Three.js / React Three Fiber** — 3D hero scene with particles
- **Lenis** — buttery-smooth scrolling
- **React Router DOM** — client-side routing
- **Axios** — HTTP requests

### Backend
- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — database & ODM
- **Nodemailer** — contact form emails
- **Joi** — input validation
- **CORS + rate limiting** — security

---

## 📁 Project Structure

```
nexus-agency/
├── client/                  # Frontend (React + Vite)
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── layout/      # Navbar, Footer
│       │   ├── sections/    # Hero, Services, Projects, About, WhyUs, Testimonials, Process, Contact
│       │   └── ui/          # CustomCursor, ScrollProgress, LoadingScreen, NoiseOverlay
│       ├── pages/           # Home page
│       ├── hooks/
│       ├── animations/
│       ├── utils/
│       ├── types/
│       ├── styles/          # Global CSS
│       └── context/
├── server/                  # Backend (Express)
│   ├── config/              # DB connection
│   ├── controllers/         # contact, projects
│   ├── middleware/          # validate, errorHandler, rateLimiter
│   ├── models/              # Contact, Project
│   ├── routes/              # /api/contact, /api/projects
│   └── utils/               # mailer
└── tests/
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
# Install root deps
npm install

# Install client deps
cd client && npm install

# Install server deps
cd ../server && npm install
```

### 2. Environment Variables

**Server** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexus-agency
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=hello@nexus.agency
```

**Client** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development

```bash
# From project root — runs both client & server
npm run dev

# Or separately:
npm run dev:client   # → http://localhost:5173
npm run dev:server   # → http://localhost:5000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/contact` | List all submissions |
| `GET` | `/api/projects` | Get all projects |
| `GET` | `/api/projects/:id` | Get single project |

### POST `/api/contact`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "service": "Web Development",
  "budget": "$15k–$50k",
  "message": "We need a new website..."
}
```

---

## 🎨 Design System

### Colors
- **Background**: `#020408` → `#081522`
- **Accent Primary**: `#00d4ff` (cyan)
- **Accent Secondary**: `#0066ff` (blue)
- **Text Primary**: `#f0f6ff`
- **Text Secondary**: `#8ba3c0`

### Fonts
- **Display**: Syne (headings)
- **Body**: DM Sans (copy)
- **Mono**: JetBrains Mono (code/labels)

---

## 🏗️ Sections

1. **Hero** — Cinematic landing with Three.js particle field, GSAP text reveals, stats
2. **Services** — 6 service cards with hover animations
3. **Projects** — Filterable project showcase with interactive cards
4. **About** — Brand story, values, tech stack marquee
5. **Why Us** — 6 differentiators with scroll animations
6. **Testimonials** — Auto-rotating client reviews
7. **Process** — 5-step workflow breakdown
8. **Contact** — Form with validation, email notification, DB storage

---

## 📦 Build for Production

```bash
cd client && npm run build
```

Output in `client/dist/` — deploy to Vercel, Netlify, or serve via Express.

---

## 🔒 Security

- All form inputs validated with Joi
- Rate limiting on contact endpoint (3 req/min)
- CORS configured for allowed origins
- Security headers (X-Content-Type-Options, X-Frame-Options)
- No secrets hardcoded — all via `.env`

---

## 📄 License

MIT — customize and use freely for your agency.
