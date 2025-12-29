const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - reference CSS custom properties for centralized control
        primary: {
          DEFAULT: 'var(--color-primary-purple)',
          hover: 'var(--color-primary-hover)',
        },
        danger: 'var(--color-risk-high)',
        warning: 'var(--color-risk-medium)',
        success: 'var(--color-risk-low)',
        neutral: {
          light: 'var(--color-text-secondary)',
          dark: 'var(--color-text-primary)',
          border: 'var(--color-border)',
        },
        // Text colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          filled: 'var(--color-text-filled)',
          label: 'var(--color-text-label)',
          placeholder: 'var(--color-text-placeholder)',
        },
        // Border colors
        border: {
          DEFAULT: 'var(--color-border)',
          input: 'var(--color-border-input)',
          dark: 'var(--color-border-dark)',
          divider: 'var(--color-divider)',
          panel: '#EDEBE9',
        },
        // Background colors
        bg: {
          light: 'var(--color-bg-light)',
          header: 'var(--color-bg-header)',
          rowEven: 'var(--color-bg-row-even)',
          white: 'var(--color-white)',
        },
        // Status colors
        status: {
          new: 'var(--color-status-new)',
          inProgress: 'var(--color-status-in-progress)',
          escalated: 'var(--color-status-escalated)',
          closed: 'var(--color-status-closed)',
          badge: 'var(--color-status-badge)',
        },
        // Risk rating colors
        risk: {
          low: 'var(--color-risk-low)',
          medium: 'var(--color-risk-medium)',
          high: 'var(--color-risk-high)',
        },
        // Priority colors
        priority: {
          p1: 'var(--color-priority-p1)',
          p2: 'var(--color-priority-p2)',
          p3: 'var(--color-priority-p3)',
        },
        // Accent colors
        accent: {
          red: 'var(--color-red-accent)',
          blue: 'var(--color-accent-blue)',
          teal: 'var(--color-accent-teal)',
          purple: 'var(--color-accent-purple)',
        },
        // Button colors
        btn: {
          secondary: '#858D94',
        },
      },
      fontFamily: {
        opensans: ['var(--font-heading)', 'sans-serif'],
        roboto: ['var(--font-body)', 'sans-serif'],
      },
      spacing: {
        // Reference CSS custom properties for centralized control
        'sp-0': 'var(--spacing-0)',
        'sp-1': 'var(--spacing-1)',
        'sp-2': 'var(--spacing-2)',
        'sp-3': 'var(--spacing-3)',
        'sp-4': 'var(--spacing-4)',
        'sp-5': 'var(--spacing-5)',
        'sp-6': 'var(--spacing-6)',
        'sp-8': 'var(--spacing-8)',
        'sp-10': 'var(--spacing-10)',
        'sp-12': 'var(--spacing-12)',
        // Component-specific sizes
        'input-h': 'var(--size-input-height)',
        'btn-h': 'var(--size-button-height)',
        'icon-sm': 'var(--size-icon-sm)',
        'icon-md': 'var(--size-icon-md)',
        'icon-lg': 'var(--size-icon-lg)',
        'avatar': 'var(--size-avatar)',
        'topbar': 'var(--size-topbar-height)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'full': 'var(--radius-full)',
      },
    },
  },
  plugins: [],
};
