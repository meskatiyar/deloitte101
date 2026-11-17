/**
 * Regenerates Deloitte-branded raster assets under public/ from SVG sources
 * in excalidraw-app/branding/. Requires @resvg/resvg-js (install via npm).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const brandingDir = path.join(root, "excalidraw-app/branding");
const publicDir = path.join(root, "public");

const GREEN = "#86bc25";

function renderSvg(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: width ? { mode: "width", value: width } : undefined,
  });
  return resvg.render().asPng();
}

function svgForRaster(svgPath, textColor = "#ffffff") {
  return readFileSync(svgPath, "utf8").replaceAll("currentColor", textColor);
}

function writePngFromSvg(svgPath, outPath, width, textColor) {
  writeFileSync(outPath, renderSvg(svgForRaster(svgPath, textColor), width));
}

const appIconSvg = path.join(brandingDir, "deloitte-app-icon.svg");
const wordmarkSvg = path.join(brandingDir, "deloitte-wordmark.svg");

// Favicon (64px) from a compact icon variant.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14.08" fill="#000"/>
  <g transform="translate(12.160 14.893) scale(1.01224)">
    <path fill="#fff" d="M27.6,16.1c0,5.6-1.4,9.8-4.4,12.8s-7.2,4.5-12.6,4.5H0V0.1h11.2c5.3,0,9.3,1.3,12.1,4.1C26.2,6.9,27.6,10.9,27.6,16.1 M18.4,16.4c0-3.1-0.6-5.3-1.8-6.8c-1.1-1.4-3-2.2-5.4-2.2H8.8v18.6h2c2.7,0,4.6-0.8,5.9-2.4C17.8,22,18.4,19.6,18.4,16.4"/>
    <circle fill="${GREEN}" cx="34.4" cy="29" r="4.8"/>
  </g>
</svg>`;
writeFileSync(path.join(publicDir, "favicon.svg"), faviconSvg);

const iconSizes = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
  ["maskable_icon_x192.png", 192],
  ["maskable_icon_x512.png", 512],
];

for (const [filename, size] of iconSizes) {
  writeFileSync(
    path.join(publicDir, filename),
    renderSvg(readFileSync(appIconSvg, "utf8"), size),
  );
}

// Open Graph preview (1200×630).
const ogWidth = 1200;
const ogHeight = 630;
const wordmarkPng = renderSvg(svgForRaster(wordmarkSvg, "#ffffff"), 520);

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}">
  <rect width="${ogWidth}" height="${ogHeight}" fill="#000"/>
  <image href="data:image/png;base64,${Buffer.from(wordmarkPng).toString("base64")}" x="${(ogWidth - 520) / 2}" y="200" width="520"/>
  <text x="${ogWidth / 2}" y="320" text-anchor="middle" font-family="system-ui, Helvetica, Arial, sans-serif" font-size="64" font-weight="600" fill="${GREEN}">Canvas</text>
  <text x="${ogWidth / 2}" y="390" text-anchor="middle" font-family="system-ui, Helvetica, Arial, sans-serif" font-size="28" fill="#d0d0ce">Diagrams. Made. Simple.</text>
</svg>`;

writeFileSync(
  path.join(publicDir, "og-image.png"),
  renderSvg(ogSvg, ogWidth),
);

console.log("Wrote Deloitte brand assets to public/");