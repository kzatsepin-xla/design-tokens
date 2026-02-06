# Design Tokens

Repository for managing project design tokens. Automatic conversion of tokens from W3C DTCG format to CSS and SCSS variables.

**Languages:** [English](#) | [Русский](README.ru.md)

## Project Description

This project contains design tokens (colors, spacing, typography) in a unified format and automatically converts them to CSS and SCSS variables for use in web projects.

**What the project does:**

- Stores tokens in W3C DTCG format (standard format for design tokens)
- Automatically converts tokens to CSS variables (`--token-name`)
- Automatically converts tokens to SCSS variables (`$token-name`)
- Automatically updates files when tokens change via GitHub Actions

**Who this project is for:**

- Designers who export tokens from Figma
- Developers who use tokens in their projects
- Teams that need a unified design token system

## Repository Structure

```
design-tokens/
├── tokens/
│   └── tokens.json              # Source tokens from Figma (W3C DTCG format)
├── config/
│   └── style-dictionary.config.js  # Configuration for token conversion
├── build/
│   ├── css/
│   │   └── variables.css        # Generated CSS variables
│   └── scss/
│       └── variables.scss        # Generated SCSS variables
├── .github/
│   └── workflows/
│       └── build-tokens.yml      # GitHub Action for automatic conversion
├── package.json                  # Project dependencies
└── README.md                     # This file
```

**Important folders:**

- `tokens/` - source tokens are stored here. Only update this file.
- `build/` - generated files are located here. Do not edit them manually!
- `config/` - conversion settings (can be modified if needed)

## How to Use Tokens in CSS

### Step 1: Include the Variables File

Copy the `build/css/variables.css` file to your project or include it directly:

```html
<!-- In HTML file -->
<link rel="stylesheet" href="path/to/variables.css">
```

Or import it into your main CSS file:

```css
/* In your main.css */
@import './build/css/variables.css';
```

### Step 2: Use Variables in Styles

After including the file, you can use variables anywhere in your CSS:

```css
/* Example: using colors */
.button {
  background-color: var(--color-brand-primary-default);
  color: var(--color-neutral-gray-100);
}

.button:hover {
  background-color: var(--color-brand-primary-hover);
}

/* Example: using spacing */
.card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.container {
  padding: var(--spacing-xl);
}

/* Example: using typography */
.heading {
  font-size: var(--typography-xl);
}

.text-small {
  font-size: var(--typography-sm);
}
```

### Available Variables

**Colors:**

- `--color-brand-primary-default` - primary brand color
- `--color-brand-primary-hover` - hover color
- `--color-brand-secondary-default` - secondary color
- `--color-semantic-semantic-success-default` - success color
- `--color-semantic-semantic-error-default` - error color
- `--color-neutral-gray-100` - light gray
- `--color-neutral-gray-900` - dark gray

**Spacing:**

- `--spacing-xs` - 4px
- `--spacing-sm` - 8px
- `--spacing-md` - 16px
- `--spacing-lg` - 24px
- `--spacing-xl` - 32px
- `--spacing-2xl` - 48px
- `--spacing-3xl` - 64px

**Typography:**

- `--typography-xs` - 12px
- `--typography-sm` - 14px
- `--typography-base` - 16px
- `--typography-lg` - 18px
- `--typography-xl` - 20px
- `--typography-2xl` - 24px
- `--typography-3xl` - 30px

## How to Use Tokens in SCSS

### Step 1: Import the Variables File

Import the variables file at the beginning of your SCSS file:

```scss
// In your main.scss
@import './build/scss/variables.scss';
```

### Step 2: Use Variables in Styles

After importing, you can use variables anywhere in your SCSS:

```scss
// Example: using colors
.button {
  background-color: $color-brand-primary-default;
  color: $color-neutral-gray-100;
  
  &:hover {
    background-color: $color-brand-primary-hover;
  }
}

// Example: using spacing
.card {
  padding: $spacing-md;
  margin-bottom: $spacing-lg;
}

.container {
  padding: $spacing-xl;
}

// Example: using typography
.heading {
  font-size: $typography-xl;
}

.text-small {
  font-size: $typography-sm;
}
```

### Advantages of SCSS Variables

In SCSS, you can use variables more flexibly:

```scss
// Using in functions and mixins
@mixin button-variant($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
}

.primary-button {
  @include button-variant($color-brand-primary-default, $color-neutral-gray-100);
}

// Using in calculations
.card {
  padding: $spacing-md;
  // You can use mathematical operations
  margin: $spacing-md * 2;
}
```

### Available Variables

The list of variables is the same as in CSS, but with `$` prefix instead of `--`:

**Colors:**

- `$color-brand-primary-default`
- `$color-brand-primary-hover`
- `$color-brand-secondary-default`
- And others...

**Spacing:**

- `$spacing-xs`, `$spacing-sm`, `$spacing-md`, etc.

**Typography:**

- `$typography-xs`, `$typography-sm`, `$typography-base`, etc.

## How Automation Works

The project uses automation at two levels: local development and CI/CD via GitHub Actions.

### Local Development

If you want to generate files locally on your computer:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run conversion:**
   ```bash
   npm run build
   ```
   This command will create `build/css/variables.css` and `build/scss/variables.scss` files

3. **Watch mode (optional):**
   ```bash
   npm run build:watch
   ```
   This command will automatically regenerate files whenever `tokens/tokens.json` changes

### GitHub Actions (CI/CD)

The project is configured with automatic conversion via GitHub Actions. This means you don't need to run commands manually.

**How it works:**

1. **You update tokens:**
   - Export tokens from Figma to `tokens/tokens.json` file
   - Commit and push changes to the `main` branch

2. **GitHub Action automatically runs:**
   - Workflow triggers on push to `main` if files in `tokens/` folder are changed
   - Node.js and dependencies are installed
   - Token conversion is executed

3. **Results are automatically committed:**
   - Generated files `build/css/variables.css` and `build/scss/variables.scss` are automatically committed back to the repository
   - You receive a notification about process completion

**Advantages:**

- No need to run commands manually
- Always up-to-date files in the repository
- Single source of truth for the entire team
- Token change history is preserved in Git

**Configuration file:** `.github/workflows/build-tokens.yml`

### What to Do If Automation Doesn't Work?

1. Check that you're pushing changes to the `main` branch
2. Make sure files in the `tokens/` folder are changed
3. Check workflow status in the "Actions" section on GitHub
4. If needed, run conversion locally with `npm run build`

---

**Useful Links:**

- [Style Dictionary documentation](https://amzn.github.io/style-dictionary/)
- [W3C Design Tokens format](https://tr.designtokens.org/format/)
