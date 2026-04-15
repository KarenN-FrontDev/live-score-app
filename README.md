# Live Score App

A real-time live sports score application built with **Next.js 16**, **React 19**, **TypeScript**, **Redux Toolkit**, **RTK Query**, and **Styled Components**.  
Fetches match data from a remote JSON feed, simulates live updates via WebSockets, and provides filtering, favorites, and responsive design.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Features

- **Live match data** – Fetches from the provided `sports.json` endpoint by RTK Qyery
- **Real‑time simulation** – WebSocket‑like updates for in‑progress matches
- **Match status indicators** – LIVE, HT (half‑time with half‑circle), FT, CANCELLED, Upcoming
- **Filtering** – All, Result (finished), Live (in‑progress), Upcoming (not started)
- **Match counters** – Shows number of matches per filter
- **Favorites** – Persist favorite matches in `localStorage`
- **Responsive design** – Works on mobile, tablet, and desktop
- **Accessibility** – ARIA labels, keyboard navigation
- **Unit & integration tests** – Jest + React Testing Library

---

## Tech Stack

| Category         | Technologies                                                 |
| ---------------- | ------------------------------------------------------------ |
| Framework        | Next.js 16 (App Router), React 19                            |
| Language         | TypeScript                                                   |
| State Management | Redux Toolkit, RTK Query                                     |
| Styling          | Styled Components, CSS-in-JS                                 |
| Real‑time        | Custom WebSocket simulation (RTK Query `onCacheEntryAdded`)  |
| Testing          | Jest, React Testing Library, `@testing-library/react`        |
| Linting          | ESLint (flat config) with TypeScript, import, security rules |
| Bundling         | Next.js built‑in (Turbopack in dev)                          |

---

## Getting Started

### Prerequisites

- **Node.js** v20 or later
- **npm** v10 or later

### Installation

````bash
git clone https://github.com/KarenN-FrontDev/live-score-app.git
cd live-score-app
npm install

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

````bash
npm test                 # Run tests once
npm run test:watch       # Watch mode
````

## Linting

```bash
npm run lint             # Check for errors (warnings fail CI)
npm run lint:fix         # Auto-fix fixable issues
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
````
