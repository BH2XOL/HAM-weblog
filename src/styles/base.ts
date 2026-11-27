/** Global Reset, MD3 Typography, Ambient Glow & View Transition */
export const baseStyles = `
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  overflow-x: clip;
}

body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans SC', sans-serif;
  background-color: var(--md-sys-color-background);
  color: var(--md-sys-color-on-background);
  min-height: 100vh;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.3s var(--md-motion-emphasized), color 0.3s var(--md-motion-emphasized);
  position: relative;
}

/* Subtle MD3 ambient tonal glow */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% 0%,
    color-mix(in srgb, var(--md-sys-color-primary-container) 28%, transparent) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

/* View Transition radial theme reveal */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  animation: vt-reveal 0.75s var(--md-motion-emphasized) forwards;
  z-index: 2;
}

::view-transition-old(root) {
  z-index: 1;
}

@keyframes vt-reveal {
  from { clip-path: circle(0 at var(--vt-x, 50%) var(--vt-y, 50%)); }
  to   { clip-path: circle(200% at var(--vt-x, 50%) var(--vt-y, 50%)); }
}

a {
  color: var(--md-sys-color-primary);
  text-decoration: none;
  transition: color 0.2s var(--md-motion-emphasized);
}

a:hover {
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`;
