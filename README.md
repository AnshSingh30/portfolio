# Ansh Singh — Portfolio

A cinematic, scroll-driven portfolio site for **Ansh Singh** — Agentic AI Engineer & Full-Stack Developer.

**Live site:** [ansh-singh-portfolio.vercel.app](https://ansh-singh-portfolio.vercel.app)

## Stack

- **[Next.js 14](https://nextjs.org)** (App Router) + TypeScript + Tailwind CSS
- **[Three.js](https://threejs.org) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** for the 3D scenes (Hero's orbital rings, the Chapter II camera dolly)
- **[GSAP](https://gsap.com) + ScrollTrigger** for scroll-pinned cinematic sections
- **[Lenis](https://lenis.darkroom.engineering)** for smooth scroll
- **[Framer Motion](https://www.framer.com/motion)** for UI transitions

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

Other scripts:

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # run eslint
```

## Structure

- `src/components/sections/` — the seven chapters of the page (Hero, Dolly, Skills, Projects, Experience, Education, Contact), each a self-contained scroll section
- `src/components/ui/` — shared chrome (nav, cursor, preloader, scroll progress)
- `src/components/canvas/` — reusable Three.js pieces
- `src/lib/constants.ts` — all site copy/data (skills, projects, experience, education)
- `src/lib/skillIcons.tsx` — brand-logo + color mapping for the Skills toolkit

## Deployment

Deployed on [Vercel](https://vercel.com), auto-deploying on every push to `main`.
