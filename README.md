# Purrmpt

A sleek, minimal AI-powered prompt enhancer that helps you turn simple ideas into purrfectly crafted prompts for ChatGPT, DALL·E, Midjourney, and more.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/username/repo/build.yml)]()
[![Version](https://img.shields.io/github/v/release/username/repo)]()
[![Issues](https://img.shields.io/github/issues/username/repo)]()

---

## 📦 Features

- Enhance simple ideas into detailed prompts
- Supports text, image, and code generation
- Sleek and minimal UI with theme support

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Docker (optional, for containerized deployment)

### Installation

```bash
git clone https://github.com/yourusername/purrmpt.git
cd purrmpt
npm install
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

| Variable         | Description                   | Default     |
|------------------|-------------------------------|-------------|
| `PORT`           | Port the app runs on          | `3000`      |
| `OPENAI_API_KEY` | OpenAI API key for generation | -           |

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
purrmpt/
├── app/                     # App Router directory
│   ├── api/                 # API routes
│   │   └── generate/        # API endpoint for prompt generation
│   │       └── route.ts
│   ├── layout.tsx           # Root layout for the app
│   ├── page.tsx             # Main entry page
│   └── globals.css          # Global styles
├── components/              # Reusable UI components
│   ├── ui/                  # UI-specific components (e.g., buttons, sliders)
│   ├── purrmpt-app.tsx      # Main app component
│   └── sparkle.tsx          # Sparkle animation component
├── public/                  # Static assets (e.g., favicons, images)
│   └── favicon/             # Favicon files
├── styles/                  # Additional global styles
│   └── globals.css
├── .env.local               # Environment variables
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
├── package.json             # Project metadata and dependencies
├── pnpm-lock.yaml           # Dependency lock file
└── tsconfig.json            # TypeScript configuration
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
