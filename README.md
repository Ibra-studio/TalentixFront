# Talentix Front

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.1.7-000000?logo=next.js&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white" />
</p>

Talentix Front is the recruitment and applicant tracking interface for Talentix, designed for teams managing job pipelines, candidate review, and hiring workflows in francophone African markets. The project combines a public careers experience with an internal recruiter dashboard and an ATS-inspired job and candidate management interface.

## What the project does

This frontend is built with Next.js App Router and includes:

- A landing page for the Talentix brand and recruitment offering
- An internal dashboard for monitoring jobs, candidates, and hiring activity
- A jobs workspace for creating, filtering, and following openings
- A candidate management area for tracking stages, scores, and applicant details
- A public-facing careers experience for organization-specific job pages

The app is primarily a product frontend and UI prototype, with mock recruitment data living in the repository for local development and demo flows.

## Why the project is useful

Talentix helps recruitment teams move faster by centralizing hiring workflows in one interface. The app is useful for:

- Managing open roles and recruitment pipelines
- Reviewing candidates by status, stage, and score
- Tracking hiring activity across multiple roles
- Presenting job offers to candidates through a public careers route
- Prototyping an ATS-style experience with reusable, polished UI components

### Key features

- Responsive dashboard with summary widgets and hiring metrics
- Job board with filters, favorites, and status tracking
- Candidate pipeline with stage updates and detailed review modals
- Recruiter-friendly table views and reusable UI patterns
- Tailwind CSS styling and shadcn/ui component system
- Mock data layer for realistic local development without a backend

## Project structure

```text
app/                 # App Router pages and route groups
components/          # Reusable UI, dashboard, landing, and recruitment widgets
context/             # React context for shared state
hooks/               # Custom hooks
lib/                 # Mock data and helper logic
public/              # Static assets, images, and mock files
types/               # Shared TypeScript domain models
```

Notable areas:

- [app](app) for route-based screens and page composition
- [components](components) for the dashboard, jobs, candidates, and landing page modules
- [lib](lib) for simulated data providers such as job and candidate data
- [types](types) for job, candidate, and pipeline contracts

## Getting started

### Prerequisites

- Node.js 18.18 or newer
- npm 9 or newer

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open:

- http://localhost:3000 for the landing page
- http://localhost:3000/dashboard for the internal recruiting dashboard
- http://localhost:3000/jobs for the jobs board
- http://localhost:3000/candidates for the candidate workspace

### Production build

```bash
npm run build
npm run start
```

### Useful scripts

```bash
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript checks
npm run format      # Format TypeScript and TSX files
```

## Common development workflows

### Working with data

The app currently uses mock data services under [lib](lib) rather than a live backend. This makes it easy to prototype screens and validate the UI without external services.

### Editing the UI

The interface is organized by feature area. Most layout and logic live in the following places:

- [components/dashboard](components/dashboard) for dashboard widgets and summaries
- [components/jobs](components/jobs) for board, toolbar, and job views
- [components/candidates](components/candidates) for candidate list and detail workflow
- [components/landing](components/landing) for marketing and public pages



## License

This project does not currently include a repository license file, so no license badge or license text is included in this README. If you are adopting this project for a production environment, add the appropriate license before distribution.

---

For a quick summary: this project is a Next.js-based recruitment frontend for Talentix, focused on a polished hiring experience with a landing page, dashboard, candidate pipeline, and job management flows.
