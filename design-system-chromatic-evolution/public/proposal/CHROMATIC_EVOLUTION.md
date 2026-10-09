# LE MONDE AIME - Chromatic Evolution

## Scope

This is an isolated visual proposal. The local folder initially contained a
React/Vite starter, not a clone of the existing static repository. The five
public files were inspected read-only at revision
`6d55f768fef5515e9fb41d42a088269c09f28b1d`. No GitHub writes were performed.

The preview is not Matt Mez Admin, does not call Base44, does not collect user
input, does not persist demonstration data and does not connect an AI engine.
The optional source bundle retains the original static DOM and both original
scripts. No original section is removed. The archive is left untouched.

## Token Source

`chromatic-tokens.css` is the single source of chromatic values for the preview
and source migration. Existing aliases remain available:

| Legacy Token | Proposed Mapping | Purpose |
| --- | --- | --- |
| `--ink` | #161616 | Reading and titles |
| `--deep` | `var(--ink)` | Legacy reading/action compatibility |
| `--text` | #62666B | Secondary text |
| `--accent` | `var(--signature-middle)` | Selection and meaningful accents |
| `--sand` | #F7F8F8 | Secondary surfaces |
| `--line` | #E5E8E8 | Fine borders |
| `--focus` | `var(--signature-start)` | Keyboard-visible petrol focus |

Additional tokens: `--muted: #858A90`, `--white: #FFFFFF`,
`--surface: #F1F3F3`. Discreet grey is not intended for small essential text.

Signature: `linear-gradient(115deg, #164C70 0%, #12B5B4 52%, #B0E4D0 100%)`.
Use it for accents and illustrations, not paragraphs or permanent navigation
backgrounds. Main buttons are black, secondary buttons white with grey borders,
disabled buttons neutral. The accent sample uses a gradient border and a solid
label surface because a single text color cannot safely cover the full gradient.

## Exploratory Universes

| Universe | Start | Middle | End |
| --- | --- | --- | --- |
| General | #164C70 | #12B5B4 | #B0E4D0 |
| Wedding | #2468B5 | #49BDCE | #C5E7CB |
| Studio / Creation | #7253A5 | #B78DC9 | #D56FA5 |
| Music / Artist | #D58478 | #DC9AB8 | #BCB0E4 |

The `data-universe` contract only switches semantic `--universe-start`,
`--universe-middle` and `--universe-end` aliases. Components read
`--universe-gradient`, never a project name or hard-coded color. Add another
palette through the tokens and its selector; component CSS need not change.
Use `data-surface="light"` or `"dark"` for demonstration surfaces only.
None of these associations is final or assigned to a real project.

## Preservation

The preview's floral SVG reproduces the existing four ellipses exactly: viewBox
0 0 48 48, cx/cy 24, rx 5.5, ry 22, rotations 0/45/90/135. It is not replaced
by the separate AI-generated chromatic sculpture. The sculpture illustrates
the visual proposal only and is not exported into the original laboratory.

Manrope, DM Sans, spacing, component radii and original photograph URLs remain
unchanged in the optional static proposal. Original component-lab and chat
scripts are passed through byte-for-byte. The new palette script is scoped to
`#couleurs-univers`; it does not attach handlers to existing components.

## Application Correspondences

Mappings are proposals, not audited compatibility guarantees. A future public
Landing namespace may map reading to `--ink`, secondary reading to `--text`,
surface to `--white`/`--sand`, boundary to `--line`, action to `--ink` and focus
to `--focus`. Public preview and editor must share their real renderer without
changing props, media data, permissions, persistence or publish behavior.

Never import this laboratory's global `:root`, body, nav, input, dialog or
generic classes into Base44. Extract approved semantic values under a dedicated
namespace only after inspecting the real application's tokens and contracts.
Matt Mez Admin and mattmezsax.base44.app are outside this mutation scope.

## Verification Status

The source includes keyboard tab navigation, native modal focus containment,
mobile Escape handling, local form errors, chat text retention, bounded message
history, internal chat scrolling, reduced-motion rules and forced-color focus.
The built-in contrast calculator uses WCAG relative luminance, not a subjective
estimate. It distinguishes AA >= 4.5 and AAA >= 7 for normal text.

Source review also confirms that placeholder opacity is not reduced, dark
demonstration surfaces use a seafoam focus outline, the assistant has a fixed
440 px preview height with a flexible internal message log, and mobile text
inputs use 16 px to avoid automatic iOS zoom. Native dialogs restore a visible
trigger, and the original laboratory uses an explicit `about:srcdoc` base URL
so fragment links and SVG references remain within its isolated document.

Source review does not prove visual or functional browser validation. Screenshots
and regression review at 375, 390, 768, 1024 and 1440 px, Safari/iOS/Android,
external fonts and media are still required. No browser test runner is available
in this environment. Original historical test reports remain historical, not
evidence of validation of this proposal. No remote PR has been opened.

## Local Files

- `src/App.tsx`: isolated interactive visual preview.
- `src/index.css`: preview composition and accessible responsive states.
- `src/tokens.ts`: values read from the CSS source, contrast and local utilities.
- `src/laboratory.ts`: immutable source loading and reviewable static export.
- `src/components/`: color gallery, documentation, native dialogs and original lab.
- `public/proposal/`: token source, scoped static section and PR documentation.
- `public/images/chromatic-flower.jpg`: preview-only chromatic illustration.
- `index.html`: French metadata and unchanged typography choices.