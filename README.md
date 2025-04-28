# Purrmpt

A sleek, minimal AI-powered prompt enhancer that helps you turn simple ideas into purrfectly crafted prompts for ChatGPT, DALL·E, Midjourney, and more.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/kevin-olanday/purrmpt/build.yml)](https://github.com/kevin-olanday/purrmpt/actions)
[![Version](https://img.shields.io/github/v/release/kevin-olanday/purrmpt)](https://github.com/kevin-olanday/purrmpt/releases)
[![Issues](https://img.shields.io/github/issues/kevin-olanday/purrmpt)](https://github.com/kevin-olanday/purrmpt/issues)

---

## 📦 Features

- Enhance simple ideas into detailed prompts
- Supports text, image, and code generation
- **Role selection:** Choose from roles like Copywriter, Novelist, Academic Researcher, Concept Artist, Software Engineer, and more
- **Style selection:** Pick styles such as Formal, Conversational, Dreamy, Cinematic, Concise, Secure, and others
- Sleek and minimal UI with theme support
- Animated sparkles and playful cat-themed placeholders
- Copy, share, and send prompts directly to ChatGPT
- Real-time global usage counter

---

## 🌐 Live Demo

Try it now: [https://purrmpt.kevinolanday.com](https://purrmpt.kevinolanday.com)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Docker (optional, for containerized deployment)
- An [OpenAI API key](https://platform.openai.com/account/api-keys)
- (Optional) A database connection string (see `.env.test`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kevinolanday/purrmpt.git
   cd purrmpt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your `OPENAI_API_KEY` and `DATABASE_URL` as needed.

   ```bash
   cp .env.example .env.local
   # Then edit .env.local in your editor
   ```

4. **(Optional) Set up the database:**
   If you want to use a persistent database, run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   ```

---

### Running Locally

```bash
npm run dev
```

---

## 🧲 Running Tests

```bash
npm test
```

---

## ⚙️ Configuration

| Variable           | Description                   | Default     |
|--------------------|-------------------------------|-------------|
| `OPENAI_API_KEY`   | OpenAI API key for generation | -           |
| `DATABASE_URL`     | Database connection string    | -           |

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: Next.js (App Router), API Routes
- **State Management**: React Hooks, Context API
- **Styling**: Tailwind CSS, Custom Animations
- **Icons**: Lucide Icons
- **UI Components**: Radix UI
- **Deployment**: DigitalOcean, Docker
- **CI/CD**: GitHub Actions
- **Other Tools**: ESLint, Prettier, PM2 (for process management)

---

## 📂 Project Structure

```
app/                       # Next.js app directory (App Router)
│
├── api/                   # API routes
│   ├── generate/          # API endpoint for prompt generation
│   │   └── route.ts
│   └── purrmpt-count/     # API endpoints for counters
│       └── total/
│           └── route.ts
│
├── layout.tsx             # Root layout for the app
├── page.tsx               # Main entry page
├── globals.css            # Global styles
│
components/                # Reusable UI components
│   ├── ui/                # UI-specific components (e.g., buttons, sliders)
│   ├── purrmpt-app.tsx    # Main app component
│   ├── animated-sparkle-group.tsx
│   ├── purrmpt-counter.tsx
│   └── sparkle.tsx
│
public/                    # Static assets (e.g., favicons, images)
│   └── favicon/
│
prisma/                    # Prisma schema and migrations
│   └── schema.prisma
│
styles/                    # Additional global styles (if any)
│   └── globals.css
│
.env.local                 # Environment variables
.gitignore                 # Git ignore rules
README.md                  # Project documentation
package.json               # Project metadata and dependencies
pnpm-lock.yaml             # Dependency lock file
tsconfig.json              # TypeScript configuration
```

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed and maintained by [Kevin Olanday](https://kevinolanday.com)


## 📬 Contact

For support or feedback, open an issue or email [kevin@olanday.com](mailto:kevin@olanday.com)
