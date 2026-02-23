/**
 * Tema PescaSmart - Versione FUOCHI D'ARTIFICIO 2026
 * Dark mode principale, colori da app premium di pesca
 */

import { Platform } from 'react-native';

const tintColorLight = '#22d3ee';     // Cyan elettrico (acqua)
const tintColorDark = '#67e8f9';

export const Colors = {
  light: {
    text: '#0f172a',
    background: '#f8fafc',
    tint: tintColorLight,
    icon: '#64748b',
    tabIconDefault: '#64748b',
    tabIconSelected: '#0ea5e9',
    card: '#ffffff',
    border: '#e2e8f0',
  },
  dark: {
    text: '#f1f5f9',
    background: '#0f172a',           // Blu notte profondo (il più bello)
    tint: tintColorDark,
    icon: '#94a3b8',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#67e8f9',
    
    // Nuovi colori per le card premium
    card: 'rgba(30, 58, 95, 0.85)',   // Blu vetro
    cardBorder: 'rgba(103, 232, 249, 0.3)',
    success: '#22c55e',               // Verde top pesca
    warning: '#eab308',               // Giallo oro luna
    danger: '#ef4444',
    accent: '#3b82f6',                // Blu elettrico
    glow: '#67e8f9',                  // Cyan glow per fuochi
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'System',
    serif: 'serif',
    rounded: 'System',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', system-ui, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, monospace",
  },
});