// src/lib/theme.ts
export const woodTheme = {
  colors: {
    // Primary Wood Tones
    wood: {
      50: '#faf6f1',
      100: '#f5ede3',
      200: '#e8d5c4',
      300: '#d4b896',
      400: '#c19a6b', // Main wood color
      500: '#a67c52',
      600: '#8b5e34',
      700: '#6f4a2b',
      800: '#5a3d25',
      900: '#4a3222',
      950: '#2d1e14',
    },
    // Oak Tones
    oak: {
      light: '#d4a574',
      medium: '#b8860b',
      dark: '#8b6914',
    },
    // Walnut Tones
    walnut: {
      light: '#7a5c3e',
      medium: '#5c4033',
      dark: '#3e2723',
    },
    // Mahogany Tones
    mahogany: {
      light: '#c04000',
      medium: '#8b2500',
      dark: '#6b1c00',
    },
    // Teak Tones
    teak: {
      light: '#c19a6b',
      medium: '#9a7b4f',
      dark: '#6b5344',
    },
    // Background Shades
    background: {
      primary: '#1a1512',    // Dark wood bg
      secondary: '#241e19',   // Slightly lighter
      tertiary: '#2e2620',    // Card backgrounds
      elevated: '#3a3129',    // Elevated surfaces
    },
    // Text Colors
    text: {
      primary: '#f5ede3',     // Cream white
      secondary: '#c4b5a5',   // Muted cream
      muted: '#8b7d6b',       // Subtle text
      accent: '#d4a574',      // Golden accent
    },
    // Status Colors (wood-inspired)
    status: {
      success: '#4a7c59',     // Forest green
      warning: '#c19a6b',     // Amber wood
      error: '#8b3a3a',       // Rosewood red
      info: '#5a7d9a',        // Slate blue
    },
    // Border Colors
    border: {
      subtle: '#3a3129',
      default: '#4a4139',
      strong: '#5a5149',
    },
  },
  gradients: {
    woodGrain: 'linear-gradient(135deg, #2d1e14 0%, #4a3222 50%, #2d1e14 100%)',
    oakShine: 'linear-gradient(180deg, #d4a574 0%, #b8860b 100%)',
    walnutDepth: 'linear-gradient(180deg, #5c4033 0%, #3e2723 100%)',
    warmGlow: 'linear-gradient(135deg, #1a1512 0%, #2e2620 50%, #1a1512 100%)',
  },
};

// Wood Types for Door Materials
export const woodTypes = [
  { id: 'teak', name: 'Teak', color: '#c19a6b', price: 'Premium' },
  { id: 'oak', name: 'Oak', color: '#d4a574', price: 'Premium' },
  { id: 'walnut', name: 'Walnut', color: '#5c4033', price: 'Premium' },
  { id: 'mahogany', name: 'Mahogany', color: '#8b2500', price: 'Luxury' },
  { id: 'pine', name: 'Pine', color: '#deb887', price: 'Standard' },
  { id: 'cedar', name: 'Cedar', color: '#a0522d', price: 'Standard' },
  { id: 'maple', name: 'Maple', color: '#ffdeaa', price: 'Premium' },
  { id: 'cherry', name: 'Cherry', color: '#8b4513', price: 'Luxury' },
  { id: 'birch', name: 'Birch', color: '#f5deb3', price: 'Standard' },
  { id: 'ash', name: 'Ash', color: '#c9b896', price: 'Standard' },
];

// Door Types
export const doorTypes = [
  { id: 'flush', name: 'Flush Door', description: 'Plain flat surface' },
  { id: 'panel', name: 'Panel Door', description: 'Decorative panels' },
  { id: 'glass', name: 'Glass Panel', description: 'With glass inserts' },
  { id: 'french', name: 'French Door', description: 'Double door with glass' },
  { id: 'sliding', name: 'Sliding Door', description: 'Space-saving design' },
  { id: 'pocket', name: 'Pocket Door', description: 'Slides into wall' },
  { id: 'barn', name: 'Barn Door', description: 'Rustic sliding style' },
  { id: 'bifold', name: 'Bi-fold Door', description: 'Folding panels' },
];

// Frame Types
export const frameTypes = [
  { id: 'standard', name: 'Standard Frame', width: '4 inch' },
  { id: 'heavy', name: 'Heavy Duty Frame', width: '5 inch' },
  { id: 'decorative', name: 'Decorative Frame', width: '6 inch' },
  { id: 'minimal', name: 'Minimal Frame', width: '3 inch' },
];
