# Evolution chromatique LE MONDE AIME

Status: draft proposal. This document is not an opened GitHub Pull Request.

Suggested branch: `design/chromatic-evolution`.
Target repository: `mattmezstitchlab/lemondeaimedesignsystem`.
Source revision inspected: `6d55f768fef5515e9fb41d42a088269c09f28b1d`.

## Purpose

Evolve the existing independent HTML/CSS/JavaScript laboratory. Keep its
sections, editorial content, logo, Manrope, DM Sans, component geometry and
local demonstration behaviors. Use white surfaces, black reading text,
secondary greys and a restrained petrol/turquoise/seafoam signature.

## Proposed Files

- `design-system.css`: source-level token migration and known chromatic literals.
- `index.html`: one additional color section, navigation anchor, matching color
  labels, section stylesheet and a scoped script. Existing sections retained.
- `couleurs-univers.css`: styles scoped to the new color section only.
- `couleurs-univers.js`: local palette, surface, copy and contrast controls only.
- `DESIGN_SYSTEM.md`: append the new palette, mappings and review limitations.
- `chromatic-migration.json`: reproducible revision and replacement inventory.
- `PULL_REQUEST.md`: this review proposal.

`design-system.js` and `component-lab.js` are included unchanged in the optional
source export. `index 9.html` is neither rewritten nor included in that export.
The generated sculptural illustration belongs to the isolated preview only;
the original laboratory photographs remain unchanged in the proposed bundle.

## Palette Comparison

| Role | Existing | Proposed |
| --- | --- | --- |
| Reading / legacy `--deep` | #1F3F28 | #161616, alias of `--ink` |
| Primary action | #192E28 | #161616 |
| Accent | #A3D65C | #12B5B4 |
| Secondary text | #485563 | #62666B |
| Main reading `--ink` | #1D252C | #161616 |
| Secondary background | #F6F7F5 | #F7F8F8 |
| Borders | #E5E7EB | #E5E8E8 |
| Focus | #537D36 | #164C70 |
| Signature | No common gradient | #164C70 / #12B5B4 / #B0E4D0 |

## Compatibility

This remains an HTML/CSS/JavaScript laboratory, not a drop-in React library.
Do not import its global CSS into Matt Mez Admin or Base44. Proposed aliases
are design-system mappings only, not verified mappings of application tokens.
Universe palettes are exploratory and not assigned to real applications.
No API keys, Base44 access, customer data, AI connection or paid service.

## Review Checklist

- [ ] Re-read the diff against the pinned source revision.
- [ ] Validate the unchanged floral SVG, font metrics and media rights.
- [ ] Capture 375, 390, 768, 1024 and 1440 px renderings in a real browser.
- [ ] Check hover, keyboard focus, active, loading and disabled states.
- [ ] Check mobile menu, Escape and returned focus.
- [ ] Check form validation, corrections, reset and local confirmations.
- [ ] Check chat suggestions, error/retry, retained text and internal scrolling.
- [ ] Check carousel, modal, local video and editor demonstrations.
- [ ] Check WCAG contrast, forced colors and reduced motion.
- [ ] Preserve all existing sections and the archive.
- [ ] Confirm no global application stylesheet or backend mutation.
- [ ] Obtain visual approval for exploratory universes.

## Evidence And Limits

The React/Vite isolated preview can be built independently. This environment
does not provide Git mutation, GitHub write access or browser automation.
No branch, commit, remote Pull Request, screenshot or deployment is claimed.
Viewport selection and the contrast calculator are review tools, not proof
that browser, accessibility or regression testing has been performed.

## Manual Preparation

In an authorized clone, create the suggested dedicated branch. Export the
proposal from the preview, compare every generated file against the pinned
revision, and apply only approved differences. Complete the browser review,
commit the static laboratory changes and open a draft PR with this text.
Do not merge or publish automatically. If main has changed, regenerate and
review the proposal against the current revision before applying it.