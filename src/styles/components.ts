/** Material Design 3 UI Components */
export const componentStyles = `
/* ---- Top App Bar ---- */
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: color-mix(in srgb, var(--md-sys-color-surface-container-low) 88%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  transition: background-color 0.3s var(--md-motion-emphasized), border-color 0.3s var(--md-motion-emphasized);
}

.header-inner {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.25rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--md-sys-color-on-surface);
  text-decoration: none;
}

.logo:hover {
  color: var(--md-sys-color-primary);
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav a {
  padding: 0.4rem 0.85rem;
  border-radius: var(--md-shape-full);
  color: var(--md-sys-color-on-surface-variant);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s var(--md-motion-emphasized), color 0.2s var(--md-motion-emphasized);
}

.nav a:hover {
  background-color: var(--md-state-hover);
  color: var(--md-sys-color-on-surface);
  text-decoration: none;
}

.nav a.active {
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
  font-weight: 600;
}

.theme-btn {
  width: 40px;
  height: 40px;
  margin-left: 0.25rem;
  border-radius: var(--md-shape-full);
  border: 1px solid var(--md-sys-color-outline-variant);
  background-color: var(--md-sys-color-surface-container-lowest);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--md-sys-color-on-surface-variant);
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.2s var(--md-motion-emphasized), border-color 0.2s var(--md-motion-emphasized), transform 0.2s var(--md-motion-emphasized), color 0.2s;
}

.theme-btn:hover {
  background-color: var(--md-state-hover);
  color: var(--md-sys-color-primary);
  border-color: var(--md-sys-color-primary);
}

.theme-btn:active {
  transform: scale(0.95);
}

.theme-btn svg {
  width: 18px;
  height: 18px;
  pointer-events: none;
}

html:not([data-theme="dark"]) .icon-sun,
html[data-theme="dark"] .icon-moon {
  display: none;
}

/* ---- Main Layout ---- */
.main {
  max-width: 1024px;
  margin: 0 auto;
  padding: 1.75rem 1.25rem 3.5rem;
  position: relative;
  z-index: 1;
}

.page-header {
  margin-bottom: 1.25rem;
}

.page-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-badge {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface);
  letter-spacing: -0.015em;
}

.page-subtitle {
  color: var(--md-sys-color-on-surface-variant);
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

/* ---- MD3 Stat Cards (3-column compact) ---- */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.stat-card {
  background-color: var(--md-sys-color-surface-container-low);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-shape-large);
  padding: 0.9rem 1.1rem;
  box-shadow: var(--md-elevation-1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.2rem;
  transition: background-color 0.25s var(--md-motion-emphasized), border-color 0.25s var(--md-motion-emphasized), box-shadow 0.25s var(--md-motion-emphasized);
}

.stat-card:hover {
  box-shadow: var(--md-elevation-2);
}

.stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface-variant);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-value {
  font-size: 1.45rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--md-sys-color-primary);
  line-height: 1.25;
  word-break: break-word;
}

.stat-value-sm {
  font-size: 1.2rem;
}

.stat-sub {
  font-size: 0.75rem;
  color: var(--md-sys-color-on-surface-variant);
}

.op-state {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--md-sys-color-on-surface-variant);
}

.op-state.is-onair {
  color: var(--md-sys-color-tertiary);
}

/* ---- Wide 30-Day Activity Heatmap Card ---- */
.activity-card {
  background-color: var(--md-sys-color-surface-container-low);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-shape-large);
  padding: 0.85rem 1.1rem 1rem;
  box-shadow: var(--md-elevation-1);
  margin-bottom: 1rem;
}

.activity-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(30, minmax(0, 1fr));
  gap: 4px;
  width: 100%;
}

.activity-day {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  background-color: var(--activity-0);
  cursor: pointer;
  transition: transform 0.15s var(--md-motion-emphasized);
}

.activity-day:hover {
  transform: scale(1.18);
  z-index: 20;
}

.activity-day::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translate(-50%, 4px);
  padding: 0.3rem 0.6rem;
  border-radius: var(--md-shape-small);
  background-color: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline-variant);
  font-size: 0.72rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  line-height: 1.3;
  white-space: nowrap;
  box-shadow: var(--md-elevation-2);
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s var(--md-motion-emphasized), transform 0.15s var(--md-motion-emphasized), visibility 0.15s;
  z-index: 50;
}

.activity-day:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

.activity-day.l1 { background-color: var(--activity-1); }
.activity-day.l2 { background-color: var(--activity-2); }
.activity-day.l3 { background-color: var(--activity-3); }

.activity-legend {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.65rem;
  color: var(--md-sys-color-on-surface-variant);
}

.legend-swatch {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}

.sw0 { background-color: var(--activity-0); }
.sw1 { background-color: var(--activity-1); }
.sw2 { background-color: var(--activity-2); }
.sw3 { background-color: var(--activity-3); }

/* ---- MD3 Search Bar & Outlined Inputs ---- */
.search-bar {
  background-color: var(--md-sys-color-surface-container-low);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-shape-large);
  padding: 1rem 1.1rem;
  box-shadow: var(--md-elevation-1);
  margin-bottom: 1.25rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.search-field,
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.search-field label,
.form-field label {
  font-size: 0.75rem;
  color: var(--md-sys-color-on-surface-variant);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.search-field input,
.search-field select,
.form-field input,
.form-field select {
  height: 2.5rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
  background-color: var(--md-sys-color-surface-container-lowest);
  border: 1px solid var(--md-sys-color-outline);
  border-radius: var(--md-shape-small);
  color: var(--md-sys-color-on-surface);
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s var(--md-motion-emphasized), box-shadow 0.2s var(--md-motion-emphasized);
}

.search-field select,
.form-field select {
  padding: 0 2rem 0 0.75rem;
  line-height: 2.4rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2344474e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.65rem center;
  background-size: 0.9rem;
  cursor: pointer;
}

.search-field select option,
.form-field select option {
  background-color: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

.search-field select::picker-icon,
.form-field select::picker-icon {
  display: none;
}

/* ---- MD3 Custom Select Menu ---- */
.md-select {
  position: relative;
  width: 100%;
}

.md-select select.md-select-native {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

.md-select-trigger {
  width: 100%;
  height: 2.5rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
  font-family: inherit;
  background-color: var(--md-sys-color-surface-container-lowest);
  border: 1px solid var(--md-sys-color-outline);
  border-radius: var(--md-shape-small);
  color: var(--md-sys-color-on-surface);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;
  outline: none;
  text-align: left;
  transition: border-color 0.2s var(--md-motion-emphasized), box-shadow 0.2s var(--md-motion-emphasized), background-color 0.2s;
}

.md-select-trigger:hover {
  background-color: color-mix(in srgb, var(--md-sys-color-surface-container-lowest) 92%, var(--md-sys-color-on-surface));
}

.md-select-trigger:focus-visible,
.md-select.is-open .md-select-trigger {
  border-color: var(--md-sys-color-primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--md-sys-color-primary) 22%, transparent);
}

.md-select-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.md-select-chevron {
  flex: none;
  color: var(--md-sys-color-on-surface-variant);
  transition: transform 0.2s var(--md-motion-emphasized), color 0.2s;
}

.md-select.is-open .md-select-chevron {
  transform: rotate(180deg);
  color: var(--md-sys-color-primary);
}

.md-select-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 100%;
  max-height: 320px;
  overflow-y: auto;
  padding: 0.35rem;
  background-color: var(--md-sys-color-surface-container);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-shape-medium);
  box-shadow: var(--md-elevation-2);
  z-index: 60;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px) scale(0.98);
  transform-origin: top center;
  transition: opacity 0.18s var(--md-motion-emphasized), transform 0.18s var(--md-motion-emphasized), visibility 0.18s;
}

.md-select.is-open .md-select-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.md-select-option {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--md-sys-color-on-surface);
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.5rem 0.7rem;
  border-radius: var(--md-shape-small);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  transition: background-color 0.15s var(--md-motion-emphasized), color 0.15s;
}

.md-select-option:hover,
.md-select-option:focus-visible {
  background-color: var(--md-state-hover);
  outline: none;
}

.md-select-option.is-selected {
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
  font-weight: 600;
}

.md-select-check {
  flex: none;
  opacity: 0;
}

.md-select-option.is-selected .md-select-check {
  opacity: 1;
}

html[data-theme="dark"] .search-field select,
html[data-theme="dark"] .form-field select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23c4c6d0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
}

.search-field input:focus,
.search-field select:focus,
.form-field input:focus,
.form-field select:focus {
  border-color: var(--md-sys-color-primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--md-sys-color-primary) 22%, transparent);
}

.search-field input::placeholder,
.form-field input::placeholder {
  color: var(--md-sys-color-outline);
}

/* ---- MD3 Buttons ---- */
.btn {
  height: 2.5rem;
  padding: 0 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  border: none;
  border-radius: var(--md-shape-full);
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  text-decoration: none;
  transition: background-color 0.2s var(--md-motion-emphasized), box-shadow 0.2s var(--md-motion-emphasized), opacity 0.2s;
}

.btn:hover { text-decoration: none; }

.btn-primary {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
.btn-primary:hover { box-shadow: var(--md-elevation-1); opacity: 0.92; }

.btn-tonal {
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}
.btn-tonal:hover { opacity: 0.9; }

.btn-success {
  background-color: var(--md-sys-color-tertiary);
  color: var(--md-sys-color-on-tertiary);
}
.btn-success:hover { box-shadow: var(--md-elevation-1); opacity: 0.92; }

.btn-danger {
  background-color: var(--md-sys-color-error);
  color: var(--md-sys-color-on-error);
}
.btn-danger:hover { box-shadow: var(--md-elevation-1); opacity: 0.92; }

.btn-outlined {
  background-color: transparent;
  color: var(--md-sys-color-primary);
  border: 1px solid var(--md-sys-color-outline);
}
.btn-outlined:hover { background-color: var(--md-state-hover); }

.btn-sm {
  height: 2rem;
  padding: 0 0.85rem;
  font-size: 0.78rem;
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 0.85rem;
}

/* ---- MD3 Data Table ---- */
.table-wrap {
  background-color: var(--md-sys-color-surface-container-low);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-shape-large);
  box-shadow: var(--md-elevation-1);
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  padding: 0.9rem 1.15rem;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  flex-wrap: wrap;
}

.table-title-group {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.table-toolbar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.table-toolbar .search-field {
  flex-direction: row;
  align-items: center;
}

.table-toolbar .search-field input,
.table-toolbar .md-select-trigger {
  height: 2.2rem;
  font-size: 0.84rem;
}

.table-toolbar .btn {
  height: 2.2rem;
  padding: 0 1rem;
  font-size: 0.84rem;
}

.table-header h2 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface);
}

.table-title-group span {
  font-size: 0.78rem;
  color: var(--md-sys-color-on-surface-variant);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th {
  text-align: left;
  padding: 0.75rem 1.15rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface-variant);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: var(--md-sys-color-surface-container);
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
}

td {
  padding: 0.75rem 1.15rem;
  color: var(--md-sys-color-on-surface);
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  font-variant-numeric: tabular-nums;
}

tr:last-child td {
  border-bottom: none;
}

tbody tr:hover td {
  background-color: var(--md-state-hover);
}

.callsign {
  font-weight: 600;
  color: var(--md-sys-color-on-surface);
}

.callsign a {
  color: var(--md-sys-color-on-surface);
}

.callsign a:hover {
  color: var(--md-sys-color-primary);
}

/* ---- Mode Chips ---- */
.mode-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.55rem;
  border-radius: var(--md-shape-small);
  background-color: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface-variant);
}

.mode-ft8 { background-color: rgba(179, 38, 30, 0.12); color: #b3261e; }
.mode-ft4 { background-color: rgba(217, 119, 6, 0.14); color: #b45309; }
.mode-ssb { background-color: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); }
.mode-cw  { background-color: rgba(124, 58, 237, 0.12); color: #6d28d9; }

html[data-theme="dark"] .mode-ft8 { background-color: rgba(242, 184, 181, 0.18); color: #f2b8b5; }
html[data-theme="dark"] .mode-ft4 { background-color: rgba(251, 191, 36, 0.18); color: #fcd34d; }
html[data-theme="dark"] .mode-cw  { background-color: rgba(196, 181, 253, 0.18); color: #c4b5fd; }

/* ---- Pagination ---- */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.15rem;
  border-top: 1px solid var(--md-sys-color-outline-variant);
}

.page-btn {
  height: 2.25rem;
  padding: 0 1rem;
  font-size: 0.82rem;
  font-weight: 500;
  background-color: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-shape-full);
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: background-color 0.2s var(--md-motion-emphasized), border-color 0.2s;
}

.page-btn:hover {
  background-color: var(--md-state-hover);
  border-color: var(--md-sys-color-primary);
  text-decoration: none;
}

.page-btn:disabled {
  opacity: 0.38;
  cursor: default;
}

.page-btn:disabled:hover {
  background-color: var(--md-sys-color-surface-container);
  border-color: var(--md-sys-color-outline-variant);
}

.page-info {
  font-size: 0.8rem;
  color: var(--md-sys-color-on-surface-variant);
}

/* ---- Admin Cards, Switch, Upload & Snackbar ---- */
.card {
  background-color: var(--md-sys-color-surface-container-low);
  border: 1px solid var(--md-sys-color-outline-variant);
  border-radius: var(--md-shape-large);
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: var(--md-elevation-1);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface);
  margin-bottom: 1rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 0.85rem;
}

/* MD3 Switch (52x32) */
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 32px;
  flex: none;
}

.switch input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
  z-index: 1;
}

.switch-slider {
  position: absolute;
  inset: 0;
  border-radius: var(--md-shape-full);
  cursor: pointer;
  background-color: var(--md-sys-color-surface-container-highest);
  border: 2px solid var(--md-sys-color-outline);
  transition: background-color 0.25s var(--md-motion-emphasized), border-color 0.25s var(--md-motion-emphasized);
}

.switch-slider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 6px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: var(--md-sys-color-outline);
  transition: transform 0.25s var(--md-motion-emphasized), width 0.2s, height 0.2s, background-color 0.2s;
}

.switch input:checked ~ .switch-slider {
  background-color: var(--md-sys-color-tertiary);
  border-color: var(--md-sys-color-tertiary);
}

.switch input:checked ~ .switch-slider::before {
  width: 24px;
  height: 24px;
  transform: translate(16px, -50%);
  background-color: var(--md-sys-color-on-tertiary);
}

.switch input:focus-visible ~ .switch-slider {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

.upload-zone {
  border: 2px dashed var(--md-sys-color-outline-variant);
  border-radius: var(--md-shape-medium);
  background-color: var(--md-sys-color-surface-container);
  padding: 2rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s var(--md-motion-emphasized), background-color 0.2s var(--md-motion-emphasized);
}

.upload-zone:hover {
  border-color: var(--md-sys-color-primary);
  background-color: color-mix(in srgb, var(--md-sys-color-primary-container) 35%, transparent);
}

.upload-zone p {
  color: var(--md-sys-color-on-surface-variant);
  font-size: 0.875rem;
}

.upload-zone p strong {
  color: var(--md-sys-color-primary);
}

.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 999;
  padding: 0.8rem 1.25rem;
  border-radius: var(--md-shape-medium);
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: var(--md-elevation-2);
  animation: toast-in 0.25s var(--md-motion-emphasized);
}

.toast-ok {
  background-color: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
  border: 1px solid var(--md-sys-color-tertiary);
}

.toast-err {
  background-color: var(--md-sys-color-error-container);
  color: var(--md-sys-color-on-error-container);
  border: 1px solid var(--md-sys-color-error);
}

@keyframes toast-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.callsign-cell {
  font-weight: 600;
  color: var(--md-sys-color-on-surface);
}

.checkbox {
  width: 1rem;
  height: 1rem;
  accent-color: var(--md-sys-color-primary);
  cursor: pointer;
}

/* ---- Footer ---- */
footer {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--md-sys-color-on-surface-variant);
  font-size: 0.75rem;
  opacity: 0.75;
  letter-spacing: 0.03em;
  position: relative;
  z-index: 1;
}

footer a {
  color: var(--md-sys-color-on-surface-variant);
}

footer a:hover {
  color: var(--md-sys-color-primary);
}

/* ---- Responsive ---- */
@media (max-width: 640px) {
  .stat-grid { grid-template-columns: 1fr; }
  .activity-grid { gap: 2px; }
  .activity-day { border-radius: 2px; }
  .table-header { flex-direction: column; align-items: stretch; }
  .table-toolbar { width: 100%; }
  .table-toolbar .search-field { flex: 1 1 120px; }
  .table-toolbar .search-field input { width: 100%; }
  .form-grid { grid-template-columns: repeat(2, 1fr); }
  th:nth-child(4), td:nth-child(4),
  th:nth-child(6), td:nth-child(6) { display: none; }
}
`;
