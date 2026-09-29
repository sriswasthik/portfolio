// Clerk's sign-in card, themed with the site's tokens (see :root in index.css).
// Literal values because Clerk derives shades from these colors itself.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#ededed",
    colorPrimaryForeground: "#0a0a0a",
    colorBackground: "#111111",
    colorForeground: "#ededed",
    colorMuted: "#161616",
    colorMutedForeground: "#8a8a8a",
    colorNeutral: "#ededed",
    colorInput: "#111111",
    colorInputForeground: "#ededed",
    colorBorder: "#2e2e2e",
    colorRing: "#ededed",
    colorShadow: "transparent",
    colorDanger: "#f87171",
    colorModalBackdrop: "rgb(0 0 0 / 0.9)",
    fontFamily: '"Geist", ui-sans-serif, system-ui, sans-serif',
    fontSize: "0.875rem",
    borderRadius: "6px",
  },
  layout: {
    logoPlacement: "none",
    socialButtonsVariant: "blockButton",
  },
  elements: {
    rootBox: { width: "100%" },
    cardBox: {
      width: "100%",
      maxWidth: "24rem",
      boxShadow: "none",
      border: "1px solid #1f1f1f",
      borderRadius: "10px",
    },
    card: { boxShadow: "none" },
    // The page already has its own serif heading.
    header: { display: "none" },
    footer: { background: "#0a0a0a" },
    // No "Sign up" link: new accounts can't reach the admin anyway.
    footerAction: { display: "none" },
    formFieldInput: { fontSize: "max(1rem, 16px)" },
  },
};
