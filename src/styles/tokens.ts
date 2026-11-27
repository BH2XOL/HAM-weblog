/**
 * Material Design 3 (MD3) Design Tokens — Light & Dark Tonal Palettes
 * 色彩、阴影、圆角与动效曲线严格对齐 BH2XOL/HAM-webpage。
 */
export const tokenStyles = `
:root {
  color-scheme: light;
  /* MD3 Color Roles (Light) */
  --md-sys-color-background: #f8f9ff;
  --md-sys-color-on-background: #191c20;

  --md-sys-color-surface: #f8f9ff;
  --md-sys-color-surface-container-lowest: #ffffff;
  --md-sys-color-surface-container-low: #f2f4fa;
  --md-sys-color-surface-container: #eceef4;
  --md-sys-color-surface-container-high: #e6e8ee;
  --md-sys-color-surface-container-highest: #e0e2e8;

  --md-sys-color-on-surface: #191c20;
  --md-sys-color-on-surface-variant: #44474e;
  --md-sys-color-outline: #74777f;
  --md-sys-color-outline-variant: #c4c6d0;

  --md-sys-color-primary: #0b57d0;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #d3e3fd;
  --md-sys-color-on-primary-container: #041e49;

  --md-sys-color-secondary-container: #c2e7ff;
  --md-sys-color-on-secondary-container: #001d35;

  --md-sys-color-tertiary: #146c2e;
  --md-sys-color-on-tertiary: #ffffff;
  --md-sys-color-tertiary-container: #c4eed0;
  --md-sys-color-on-tertiary-container: #072711;

  --md-sys-color-error: #b3261e;
  --md-sys-color-on-error: #ffffff;
  --md-sys-color-error-container: #f9dedc;
  --md-sys-color-on-error-container: #410e0b;

  /* MD3 State Layers */
  --md-state-hover: rgba(25, 28, 32, 0.06);
  --md-state-pressed: rgba(25, 28, 32, 0.11);

  /* MD3 Elevation */
  --md-elevation-1: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px 1px rgba(0, 0, 0, 0.04);
  --md-elevation-2: 0 1px 2px rgba(0, 0, 0, 0.08), 0 2px 6px 2px rgba(0, 0, 0, 0.05);

  /* MD3 Shape */
  --md-shape-extra-large: 28px;
  --md-shape-large: 16px;
  --md-shape-medium: 12px;
  --md-shape-small: 8px;
  --md-shape-full: 9999px;

  /* MD3 Motion */
  --md-motion-emphasized: cubic-bezier(0.2, 0, 0, 1);

  /* Activity Heatmap Scale */
  --activity-0: #e6e8ee;
  --activity-1: #d3e3fd;
  --activity-2: #6ea6ee;
  --activity-3: #0b57d0;
}

html[data-theme="dark"] {
  color-scheme: dark;
  /* MD3 Color Roles (Dark) */
  --md-sys-color-background: #111318;
  --md-sys-color-on-background: #e2e2e9;

  --md-sys-color-surface: #111318;
  --md-sys-color-surface-container-lowest: #0c0e13;
  --md-sys-color-surface-container-low: #191c20;
  --md-sys-color-surface-container: #1d2024;
  --md-sys-color-surface-container-high: #282a2f;
  --md-sys-color-surface-container-highest: #33353a;

  --md-sys-color-on-surface: #e2e2e9;
  --md-sys-color-on-surface-variant: #c4c6d0;
  --md-sys-color-outline: #8e9099;
  --md-sys-color-outline-variant: #44474e;

  --md-sys-color-primary: #a8c7fa;
  --md-sys-color-on-primary: #062e6f;
  --md-sys-color-primary-container: #0842a0;
  --md-sys-color-on-primary-container: #d3e3fd;

  --md-sys-color-secondary-container: #004a77;
  --md-sys-color-on-secondary-container: #c2e7ff;

  --md-sys-color-tertiary: #6dd58c;
  --md-sys-color-on-tertiary: #0a3818;
  --md-sys-color-tertiary-container: #0f5223;
  --md-sys-color-on-tertiary-container: #c4eed0;

  --md-sys-color-error: #f2b8b5;
  --md-sys-color-on-error: #601410;
  --md-sys-color-error-container: #8c1d18;
  --md-sys-color-on-error-container: #f9dedc;

  /* MD3 State Layers */
  --md-state-hover: rgba(226, 226, 233, 0.08);
  --md-state-pressed: rgba(226, 226, 233, 0.14);

  /* MD3 Elevation */
  --md-elevation-1: 0 1px 3px 1px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.35);
  --md-elevation-2: 0 2px 6px 2px rgba(0, 0, 0, 0.28), 0 1px 2px rgba(0, 0, 0, 0.38);

  /* Activity Heatmap Scale (1 -> 3: 由浅到深) */
  --activity-0: #282a2f;
  --activity-1: #93c5fd;
  --activity-2: #3b82f6;
  --activity-3: #1d4ed8;
}
`;
