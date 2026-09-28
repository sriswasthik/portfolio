// Ordered to lead with frontend work. `links` only lists URLs that resolve publicly.
// Descriptions stick to what each project's own description or README states.
export const projects = [
  {
    title: "Sandoval Roofing",
    category: "Client website",
    description:
      "Website for a roofing contractor in Valley Center, California. It lists their residential and commercial services, from repairs and re-roofing to inspections and storm damage, and works on phones and desktops.",
    // TODO: tech list and links. The GitHub repo (sriswasthik/Sandoval-Roofing) is not public.
    tech: [],
    links: [],
  },
  {
    title: "Invoice Generator",
    category: "Web app",
    description:
      "Manage clients, create invoices and export them as PDFs. The React frontend has dashboard, client and invoice screens, backed by an Express API that stores data with Prisma and SQLite.",
    tech: ["React", "Vite", "Recharts", "Axios", "Express", "Prisma", "SQLite", "PDFKit"],
    // The repo's homepage (invoice-generator-ten-red.vercel.app) currently returns 404.
    links: [
      { label: "GitHub", href: "https://github.com/sriswasthik/invoice-generator" },
    ],
  },
  {
    title: "Portfolio",
    category: "Personal site · Live",
    description:
      "The site you're reading. A single-page React app styled with a small hand-written CSS design system, no UI library, and a layout tuned for phones first.",
    tech: ["React", "Vite", "CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/sriswasthik/portfolio" },
    ],
  },
];
