function isLight(hex) {
  // Remove the '#' and split into R, G, B parts
  const parts = hex.slice(1).match(/.{2}/g);
  if (!parts) return false;
  // Convert hex parts to RGB decimal values
  const [r, g, b] = parts.map((x) => parseInt(x, 16));
  // Calculate perceived brightness using Luminance formula
  // Formula: (0.299*R + 0.587*G + 0.114*B)
  // If the luminance is greater than 180 threshold, the color is considered light
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

export { isLight };
