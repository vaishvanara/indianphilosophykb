# Indian philosophy KB

A structured digital garden and knowledge base on Indian philosophy built with Astro, Markdown, and TypeScript.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
![License](https://img.shields.io/badge/License-MIT-green)

[View the Live Site →](https://vaishvanara.github.io/indianphilosophykb/)

## Complete initial project structure

```md
indianphilosophykb/
├── public/                         <-- Static assets (site logo, favicon, images)
│   ├── favicon.svg
│   └── logo.svg                    <-- Site logo for Top Header
├── src/
│   ├── assets/                     <-- Optimized assets (site logo, graphics, fonts)
│   │   └── logo.svg
│   ├── components/
│   │   ├── Header.astro             <-- Top bar: Logo, Title, Search, Light/Dark toggle
│   │   ├── Search.astro             <-- Integrated search box (Devanagari, IAST, slugs)
│   │   ├── ThemeToggle.astro        <-- Light/Dark mode switcher button (defaults to Light)
│   │   ├── LeftSidebar.astro        <-- Persistent collapsible tree (Overview > 7 Parts > 27 Sub-categories > Terms)
│   │   ├── RightSidebar.astro       <-- "On this page" TOC with scroll position highlighting
│   │   ├── Breadcrumbs.astro        <-- Top location trail (Home > Part > Category > Term)
│   │   ├── PageNav.astro            <-- Sequential (← Previous and Next →) buttons
│   │   ├── BackToTop.astro          <-- Floating scroll-to-top button (bottom right)
│   │   └── Footer.astro             <-- Global bottom footer (Copyright, Astro link, GitHub icon)
│   ├── content/
│   │   ├── kb/
│   │   │   └── indianphilosophykb.md <-- Master file (renders Homepage & feeds Category Map)
│   │   └── terms/                  <-- 500+ individual term .md files 
│   │       ├── abheda-darsana.md
│   │       ├── brahman.md
│   │       └── ...
│   ├── data/
│   │   └── categoryMap.ts          <-- Central Category Map / Hierarchy Parser
│   ├── layouts/
│   │   ├── BaseLayout.astro        <-- Core HTML wrapper, Header, Theme script, imports global.css
│   │   ├── HomeLayout.astro        <-- 2-Column layout for Index/Overview (No right sidebar)
│   │   └── TermLayout.astro        <-- 3-Column layout for individual Term pages
│   ├── pages/
│   │   ├── index.astro             <-- Homepage (renders indianphilosophykb.md)
│   │   └── terms/
│   │        └── [slug].astro       <-- Dynamic Route for rendering individual terms
│   └── styles/                     
│         └── global.css            <-- Global styles & Tailwind directives
├── .env.example                    <-- Environment variables template
├── .gitignore                      <-- Git exclusion file
├── content.config.ts               <-- Collection Schema (Frontmatter validation)
├── astro.config.mjs                <-- Astro configuration file
├── package.json                    <-- Project dependencies & scripts
├── README.md                       <-- Repository documentation & local dev guide
├── tailwind.config.mjs             <-- Tailwind CSS configuration
└── tsconfig.json                   <-- TypeScript configuration
```

---

## Site structure and index mapping

The central source of truth is `indianphilosophykb.md`. It organizes the knowledge base into an Overview, 7 core Parts, and 27 Sub-categories:

```md
/ (Home / Index)
├── /overview/
├── /part-1-epistemology/
│   ├── /jnana/
│   ├── /pramana/
│   ├── /sastra/
│   ├── /vada/
│   └── /sabda/
├── /part-2-ontology/
│   ├── /brahma-svarupa/
│   ├── /moksa-and-vibhuti/
│   ├── /tattva/
│   └── /guna/
├── /part-3-cosmology/
│   ├── /brahmapada/
│   ├── /srshti/
│   ├── /pralaya-and-vinasa/
│   └── /sakti-kala-and-maya/
├── /part-4-psychology/
│   ├── /catur-avastha/
│   ├── /saksin/
│   ├── /antah-karana/
│   ├── /citta-vrtti/
│   ├── /samadhi-and-samapatti/
│   ├── /klesa/
│   └── /iccha-sakti/
├── /part-5-embodiment/
│   ├── /jiva/
│   ├── /sarira/
│   ├── /kosa/
│   ├── /bahya-karana/
│   ├── /prana/
│   └── /kundalini/
├── /part-6-practical-discipline/
│   ├── /sadhana/
│   ├── /vicara-and-viveka/
│   ├── /bhakti/
│   ├── /suddhi/
│   ├── /dharma-bhava/
│   ├── /astanga-yoga/
│   ├── /yama/
│   ├── /niyama/
│   └── /karma/
└── /part-7-traditions-and-texts/
    ├── /vedanta-and-advaita/
    ├── /mahavakya/
    ├── /devata/
    └── /buddhist-and-jain/
```

---

## Quick start (local development)

To run this knowledge base on your local machine:

### Prerequisites

- *Node.js v18.14.1 or higher** installed on your system.
- A terminal or command prompt.

### Installation

Astro requires Node.js and `npm` (Node Package Manager). Clone the repository and install the project dependencies:

#### macOS or Linux

```bash
# Clone the repository
git clone [https://github.com/vaishvanara/indianphilosophykb.git](https://github.com/vaishvanara/indianphilosophykb.git)
cd indianphilosophykb

# Install project dependencies
npm install
```

#### Windows

```cmd
# Clone the repository
git clone [https://github.com/vaishvanara/indianphilosophykb.git](https://github.com/vaishvanara/indianphilosophykb.git)
cd indian-philosophy

# Install project dependencies
npm install
```

### Serving the site

Once installed, start the Astro local development server to view your changes in real-time with Hot Module Replacement (HMR):

```bash
npm run dev

```

The site will be available at `http://localhost:4321`.

### Building for production

To validate TypeScript schemas, parse Markdown notes, and generate the static site build output:

```bash
npm run build

```

To preview the production build locally prior to deployment:

```bash
npm run preview

```

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to fork it and use it as a template for your own knowledge base projects.