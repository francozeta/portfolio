---
name: "Franco Zeta Portfolio"
description: "A quiet working index for product craft, client trust, and Kocteau."
colors:
  midnight-canvas: "#0A0A0A"
  quiet-surface: "#171717"
  raised-surface: "#262626"
  soft-hairline: "#FAFAFA14"
  muted-voice: "#A3A3A3CC"
  body-copy: "#D4D4D4"
  paper-highlight: "#FAFAFA"
typography:
  headline:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 2
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  control: "10px"
  compact: "14px"
  surface: "18px"
  frame: "22px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
components:
  navigation-item:
    backgroundColor: "{colors.midnight-canvas}"
    textColor: "{colors.body-copy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  navigation-item-active:
    backgroundColor: "{colors.quiet-surface}"
    textColor: "{colors.paper-highlight}"
    rounded: "{rounded.pill}"
  project-frame:
    backgroundColor: "{colors.midnight-canvas}"
    textColor: "{colors.paper-highlight}"
    rounded: "{rounded.frame}"
    padding: "4px"
  writing-row:
    backgroundColor: "{colors.midnight-canvas}"
    textColor: "{colors.body-copy}"
    rounded: "{rounded.surface}"
    padding: "12px"
  social-control:
    backgroundColor: "{colors.midnight-canvas}"
    textColor: "{colors.muted-voice}"
    rounded: "{rounded.pill}"
    height: "44px"
    width: "44px"
---

# Design System: Franco Zeta Portfolio

## Overview

**Creative North Star: "The Quiet Workshop"**

This portfolio is a compact working index, not a campaign site. It should feel like opening a careful builder's notebook: direct enough for an international client to understand quickly, personal enough to remember, and precise enough that the interface itself demonstrates the work.

The visual scene is a prospective client reading late on a laptop, moving from Franco's introduction to Kocteau, case studies, and writing without losing the thread. The dark appearance keeps the surface calm; restrained tonal shifts, clear type, and real project content carry the hierarchy. The system explicitly rejects a generic SaaS landing page, an agency template, and an AI-generated portfolio.

**Key Characteristics:**

- One narrow reading column with deliberate section rhythm.
- Mostly monochrome surfaces, with project imagery providing natural color.
- Quiet controls with stable geometry and clear focus states.
- Personal first-person writing with client-facing precision.
- Motion limited to fast, interruptible feedback.

## Colors

The palette is a restrained neutral ramp. Lightness carries hierarchy; color never substitutes for meaning.

### Neutral

- **Midnight Canvas:** The page background and outer project frames. It keeps the reading surface quiet.
- **Quiet Surface:** The first tonal lift for cards, active navigation, and image wells.
- **Raised Surface:** A reserved hover or secondary-surface step, never a decorative panel color.
- **Soft Hairline:** Low-contrast rings and dividers that define geometry without leading the composition.
- **Muted Voice:** Dates, labels, and supporting metadata. It must retain WCAG AA contrast on Midnight Canvas.
- **Body Copy:** Long-form text and project descriptions.
- **Paper Highlight:** Headings, active states, and the strongest inline emphasis.

**The Lightness Rule.** Fix dark-mode contrast through lightness. Do not introduce hue to rescue weak hierarchy.

**The Natural Color Rule.** Kocteau artwork, screenshots, and project imagery may carry color. Interface chrome remains neutral.

## Typography

**Display Font:** Geist (with Arial and sans-serif fallbacks)

**Body Font:** Geist (with Arial and sans-serif fallbacks)

**Character:** One compact sans family keeps the site closer to a working index than a styled magazine. Hierarchy comes from weight, line-height, grouping, and content density.

### Hierarchy

- **Headline** (600, `clamp(1.5rem, 3vw, 2.25rem)`, 1.25): Page-level statements and article titles.
- **Title** (600, `1rem`, 1.25): The compact identity heading and project names.
- **Body** (400, `1rem`, 2): Client-facing introductions, case-study prose, and writing, capped near 70 characters per line.
- **Label** (500, `0.875rem`, 1.5): Navigation, metadata, and short actions.

**The Working Index Rule.** Do not enlarge headings for spectacle. Scale must clarify the reading order, not imitate a marketing hero.

## Elevation

The system is flat by default. Depth comes from a small tonal lift, a translucent hairline, and occasional inset light. Shadows are structural, never atmospheric or glow-like.

### Shadow Vocabulary

- **Hairline frame** (`0 0 0 1px rgba(250,250,250,0.08)`): Project frames, social controls, and compact surfaces.
- **Inset edge** (`inset 0 1px 0 rgba(250,250,250,0.04)`): Small image or writing wells that need separation from the canvas.

**The Flat-by-Default Rule.** If a shadow is visible before the content, it is too strong.

## Components

### Inline links

- **Shape:** No container and no pill.
- **Default:** Paper Highlight text with a muted underline and a four-pixel offset.
- **Hover / Focus:** Increase underline contrast; use a visible two-pixel focus ring without shifting layout.

### Navigation

- **Shape:** Compact pill container with smaller pill items.
- **Default:** Muted foreground on a translucent Midnight Canvas.
- **Active:** Quiet Surface plus Paper Highlight text and a subtle hairline.
- **Mobile:** Fixed to the lower safe area with 44-pixel targets. Desktop moves to the top and remains visually compact.

### Project frames

- **Corner Style:** Concentric geometry, 22-pixel outer frame around an 18-pixel inner surface.
- **Background:** Midnight Canvas frame, Quiet Surface image well.
- **Border:** Soft Hairline only.
- **Internal Padding:** Four-pixel outer frame and 12 to 16 pixels around project copy.
- **State:** Fast transform and opacity feedback; no large lift or glow.

### Writing rows

- **Style:** One reading row with a compact visual marker, title, date, and optional description.
- **State:** The complete row is a link. Focus surrounds the row and does not depend on hover.

### Social controls

- **Style:** Neutral icon-only circles with explicit accessible names.
- **Size:** 44 pixels on touch surfaces and 40 pixels on desktop.
- **State:** Muted at rest, Paper Highlight on hover or focus.

## Do's and Don'ts

### Do:

- **Do** keep the primary reading column close to 672 pixels and body measure near 70 characters.
- **Do** let Kocteau, case studies, screenshots, and writing prove capability.
- **Do** use complete sentences, descriptive links, and plain international English.
- **Do** keep one visible primary `main` landmark and keyboard-visible focus states.
- **Do** respect reduced-motion preferences and keep interaction feedback near 150 to 220 milliseconds.

### Don't:

- **Don't** resemble a generic SaaS landing page, an agency template, or an AI-generated portfolio.
- **Don't** use gradients, neon accents, decorative glassmorphism, or glow-heavy shadows.
- **Don't** use corporate marketing language, aggressive sales sections, or oversized claims.
- **Don't** build repetitive icon-card grids or cards inside cards.
- **Don't** mix English and Spanish on the same page or publish a partially translated locale.
- **Don't** animate layout properties, autoplay decorative motion, or make feedback depend on movement.
