// Helper to get the correct asset path for GitHub Pages
// In dev: /images/foo.png
// In prod (GitHub Pages): /fifa2026-landing/images/foo.png

export const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path if base already ends with /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// Shortcut for images
export const img = (filename) => getAssetPath(`images/${filename}`);
