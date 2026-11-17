// Also imported by vite.config.mts (page title, meta tags, PWA manifest), so
// this module must stay free of browser-only code.

const productName = "Canvas";

export const BRAND = {
  productName,
  name: `Deloitte ${productName}`,
  description: `Deloitte ${productName} is a collaborative whiteboard for sketching diagrams that have a hand-drawn feel to them.`,
  issuesUrl: "https://github.com/meskatiyar/deloitte101/issues",
  themeColor: "#000000",
} as const;
