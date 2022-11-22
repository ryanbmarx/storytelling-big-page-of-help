# Advertisements and Storytelling Studio apps.

Ads in s2 apps use the [standalone ad framework](https://github.com/GannettDigital/dfp-templates/tree/master/dependencies/framework). The vast majority of the code & logic for ads lives in the base svelte component, with several common ad types each getting their own wrapper component.

## Dependencies

These components are written in [Svelte.js](https://svelte.dev) and have no external dependencies to install. The ad framework script is added to the document `<head>` when the first ad component mounts. You could give your page a head start by adding the script to your UW response, with an `id` of "advertisement-library."

Example:

```javascript
const scripts = [
    { 
        src: "https://www.gannett-cdn.com/ads/scripts/framework/basic.min.js"
        id: "advertisement-library"
    }
]
```

## How it works

Simple include any of the desired ad types in your application: they work out of the box. The first mounting of the base component will add the proper javascript file to the page `<head>`, though you also could get a jumpstart by adding it to the UW response (be sure to give the script tag the proper `id` attribute).

Ads have positions, sizes, displays and targeting. It's easiest to think of these as buckets. Each possible advertisement lives in a giant database (mobile is a seperate DB for all ads and types). The possible  ads are divided into buckets. The `position` configuration is a bucket. That bucket gets subdivided into sizes, and further by `ssts` and `cst`. **If no ad exists for the unique combination of configuration options, then no ad will display**

## Supported ad types

Component Name | Height | Width | Mobile? | Desktop? | High impact?
---|---|---|---|---|---
Cube | 250 | 300 | - | Yes |  -
MobileCube | 250 | 300 | Yes | - | -
SponsorLogo | 60 | 200 | Yes | Yes| - 
Paramount | 250 (fluid height) | 900 | - | Yes | Yes
Poster | 600 | 300 | - | Yes| -
LeaderboardTall | 250 | 970 | - | Yes | Yes
LeaderboardShort | 90  | 728 | - | Yes | Yes
BannerMobile | 50 | 320 | Yes | - | -

_The SponsorLogo component creates two ad slots: a mobile (100x30) and a desktop (200x60)._

## Using ads

These are all svelte components. Just use them as you would any other. For basic ads, an `ssts` and a `cst` are required. Targeting via the ad `topic` property also is supported. AdOps will offer the proper value if/when this is needed.

- The wrapper element — `aside.ad-wrapper` — has a default background color of white. This can be modified with CSS by changing the `--s2-color-ad-wrapper`color value.
- By default, the ad units have zero margin and padding. Spacing should be governed by the parent application by grid gap, margins or whatever is needed.
- Display is toggled at the standard breakpoints of 768px and 1024px.

### HELP! I DON'T SEE MY AD(S)

- Only one **high impact** ad should be used per page/app view. 
- Cubes (300x250), posters (300xx600) and mobile banners are the most common ad units and should be used most often. If an ad slot is coming up blank it's probably  because there is no corresponding ad in the database of possibilities. 

## The base component

The base component — `Base.svelte` – doesn't do anything on its own. The aforementioned ad modules are simple wrapper around this component, providing needed configuration details for the different ad types.

*Properties without defaults are required.*

Component Property | Purpose | Default value
---|---|---
`ssts` | A standard ssts value, with slashes | "news"
`cst` | A new-fangled CST value. | Value of `ssts`
`network` | The account number with Google where the ad-money goes, so this should never be changed. | `7103` (On localhost it will be `7070` for dummy ads of all sizes.)
`build` | Analytic string to help target Storytelling pages/apps | `static-o-matic` *eventually will be `Storytelling`*
`pageType` | tk | `interactive` (In the future this might inherit the pageview pageType.)
`position` | tk | -
`sizes` | An array of arrays to capture all available ad sizes: `[[w,h], [w,h]]`| -
`display` | An array of keywords, defining which devices should this ad display. The breakpoints are set within `Base.svelte` and can be changed, if needed. `"mobile"` will _always_ be a seperate configuration because no one ad eists on all three platforms. `["tablet", "desktop"]`  is the other option | `["mobile"]`;
`targeting` | A value or or data object that can be set to enable more specific target. AdOps will have the values needed if this property is to be used. | - 
`breakpoints` | tk | `{ desktop: 1024, tblet: 768, mobile: 0 }`
`class` | A string of class(es) added to the ad-container div | -
`topic` | Another way of targeting ads. **MUST** be supplied as an array of strings/keywords (provided by ad folks), even if only one topic. | - 

*It seems `topic` doesn't really work for anything not born in presto, so most standalone apps like we build won't be able to use it.*

