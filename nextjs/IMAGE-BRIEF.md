# Image brief — slots, specs and generation prompts

Ten image slots, ordered by impact. Generate what you want, drop the files into
`nextjs/public/img/`, and tell me which slots you filled — I'll wire them in with
correct `width`, `height` and `loading="lazy"` (the hero stays eager).

## Rules that apply to every prompt

Each prompt already ends with the guard clause below. **Keep it.** It matters for
more than looks:

> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

- **Never generate Verizon-branded hardware, stores, vans, or uniforms.** An
  AI-invented "Verizon" router is a fabricated product image on a page selling
  real Verizon service. For the actual equipment SKUs, use the official product
  photography in your Verizon retailer asset kit. The generated equipment shots
  below are deliberately unbranded, generic hardware.
- No AI-generated people wearing badges or headsets that imply a Verizon
  employee — the site's whole position is that you are not Verizon.
- Photoreal, commercial/editorial photography. Not illustration, not 3D render,
  not "digital art".
- Palette to repeat in prompts: Verizon red `#EE0000` as the only saturated
  accent, plus black, white and cool neutral grey.

---

## 1. Hero background — highest priority

- **File:** `public/img/hero.jpg` · **2560×1440** (16:9) · replaces `hero-bg.jpeg`
- **Where:** full-bleed behind the hero, at full strength with no scrim.
- **Critical:** the **left 40% must be dark and low-detail** — the headline, the
  subline and the price card sit there. The current photo is bright on the left,
  which is why that copy is marginal to read right now. Get this right and the
  legibility problem disappears.

> Photorealistic wide cinematic photograph of a modern city at blue hour, shot
> from a low elevated angle. The left 40% of the frame is deep shadow — dark sky
> and unlit foreground with almost no detail. The right 60% opens into a
> illuminated skyline of glass towers with warm window lights, and long red
> vehicle light-trails curving through the frame from bottom-right toward the
> centre. Thin luminous fibre-optic filaments in red and cool white thread
> between the buildings, suggesting a network without being literal. Deep blacks,
> rich contrast, colour graded so the only saturated hue is a pure red near
> #EE0000; everything else is neutral grey and cool blue. Shot on a full-frame
> camera, 24mm lens, long exposure, crisp detail, no haze in the shadows.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

## 2. Fiber section

- **File:** `public/img/fiber.jpg` · **1600×1200** (4:3)
- **Where:** beside the "100% fiber-optic internet" heading.

> Photorealistic macro photograph of a bundle of fibre-optic strands fanning out
> against a matte black background, each strand terminating in a bright pinpoint
> of light. Most points glow cool white; a few glow saturated red near #EE0000.
> Shallow depth of field, the nearest strands sharp and the rest falling into
> soft bokeh. Clean, technical, premium — like a telecoms annual-report cover.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

## 3. 5G Home Internet section

- **File:** `public/img/5g-home.jpg` · **1600×1200** (4:3)
- **Where:** beside the fixed-wireless heading.

> Photorealistic interior photograph of a minimal, sunlit living room. On a pale
> oak console sits a small matte-white cylindrical wireless gateway with a single
> thin red LED ring near its base, plugged in with one neat cable. Behind it, a
> large window with sheer curtains and a soft-focus city skyline. Warm morning
> light, clean modern Scandinavian styling, generous negative space in the upper
> third. Shot at 50mm, f/2.8, natural light only. The device is a plain unbranded
> product with no markings of any kind.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

## 4. Bundles section band

- **File:** `public/img/bundles.jpg` · **2400×1000** (12:5 wide band)
- **Where:** wide band behind or above the two bundle cards.

> Photorealistic wide lifestyle photograph of a family evening at home, shot from
> a respectful middle distance. Two adults and a teenager in an open-plan living
> space: one working on a laptop at a dining table, one on a sofa with a phone,
> one watching a large wall-mounted television whose screen is a soft neutral
> glow. Warm practical lighting from lamps, cool blue dusk through the windows
> behind. Candid and unposed, natural expressions, no eye contact with camera.
> Composed with clear empty space across the left third. 35mm lens, f/2.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

## 5. TV section

- **File:** `public/img/tv.jpg` · **1600×1200** (4:3)

> Photorealistic photograph of a dark, softly lit living room at night, focused
> on a large wall-mounted flat television. The screen shows only an abstract
> field of warm neutral light and shallow colour gradients — no discernible
> picture, no interface. Ambient glow spills onto a low media console and a
> textured plaster wall. A single red accent from a small light source at the
> edge of frame. Moody, premium, cinematic. 35mm lens, f/1.8, long exposure.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

## 6. Mobile section

- **File:** `public/img/mobile.jpg` · **1600×1200** (4:3)

> Photorealistic overhead product photograph of three modern smartphones arranged
> in a loose fan on a smooth charcoal concrete surface. Each screen is off,
> showing only clean dark glass with a subtle reflection. Handsets are plain,
> unbranded, with neutral metal frames in graphite, silver and a deep red. Hard
> directional light from the upper left casting crisp soft-edged shadows.
> Generous negative space in the lower right. Studio lighting, 85mm lens.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

## 7. Equipment & protection — four square product shots

- **Files:** `public/img/eq-router.jpg`, `eq-extender.jpg`, `eq-protect.jpg`,
  `eq-cloud.jpg` · **1200×1200** each (1:1)
- **Where:** top of each of the four cards in the Equipment section.
- Shared styling so the four read as a set: *seamless light grey studio
  background (#EDEEEE), soft top-light with a gentle shadow beneath, centred
  subject, generous margin, shot at 85mm.*

**Router / gateway**
> Photorealistic studio product photograph of a tall matte-white cylindrical
> Wi-Fi router with softly rounded edges and one thin red status LED, centred on
> a seamless light grey background (#EDEEEE). Soft top-light, gentle contact
> shadow beneath, generous margin around the subject, 85mm lens. Plain unbranded
> hardware with no markings.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

**Mesh extender**
> Photorealistic studio product photograph of two small matte-white mesh Wi-Fi
> extender nodes, one standing and one lying at a slight angle, on a seamless
> light grey background (#EDEEEE). Soft top-light, gentle contact shadows,
> generous margin, 85mm lens. Plain unbranded hardware with no markings.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

**Home device protection**
> Photorealistic studio still life of everyday home technology arranged in a neat
> cluster — a tablet face-down, a smart speaker, a pair of earbuds in their case
> and a smart thermostat dial — on a seamless light grey background (#EDEEEE).
> Soft top-light, gentle contact shadows, generous margin, 85mm lens. All objects
> plain and unbranded.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

**Cloud backup**
> Photorealistic studio photograph of a stack of small frosted-acrylic blocks
> arranged like drifting layers, lit from within by a soft cool white glow with a
> single red-lit block near the top, on a seamless light grey background
> (#EDEEEE). A quiet physical metaphor for layered storage. Soft top-light,
> gentle contact shadow, generous margin, 85mm lens.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

---

## Optional — nice to have, not needed

## 8. Home phone section

- **File:** `public/img/phone.jpg` · **1600×1200** (4:3)

> Photorealistic photograph of a clean home-office corner: a slim modern cordless
> desk phone in matte white resting on its base on a pale oak desk, beside a
> closed notebook and a small green plant. Soft daylight from a window at the
> left, shallow depth of field, calm and uncluttered, generous empty space to the
> right. 50mm lens, f/2.2. Plain unbranded hardware.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

## 9. How it works

- **File:** `public/img/how-it-works.jpg` · **1600×1200** (4:3)
- Note the framing: a **customer on the phone**, not an agent. Depicting a
  headset agent risks reading as a Verizon call centre.

> Photorealistic candid photograph of a person in their thirties standing at a
> kitchen counter at home, holding a smartphone to their ear mid-conversation,
> looking out of frame with a relaxed, satisfied expression. Warm natural window
> light, softly blurred domestic background, unposed and natural. Generous empty
> space on the right. 50mm lens, f/2.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

## 10. Why order through us — background band

- **File:** `public/img/why-us.jpg` · **2400×900** (8:3 wide band)
- Will be used very dark and low-contrast behind text, so keep it abstract.

> Photorealistic abstract macro photograph of brushed dark metal with fine
> parallel grain running horizontally, raked by a single low light source so the
> texture catches highlights across the centre. A faint red gradient bleeds in
> from the right edge. Almost monochrome, deep blacks, very low visual noise —
> designed to sit behind white text. 100mm macro lens.
> No text, no lettering, no watermarks, no logos, no brand marks, no signage, no
> screens showing user interfaces.

---

## Format and delivery

- **JPEG** for photographs, quality ~80. **WebP** if your tool can export it —
  roughly 30% smaller at the same quality.
- Export at the pixel dimensions listed, not larger. The current 2.7 MB hero is
  the single biggest thing slowing this page down; keep the new hero under
  400 KB and every other image under 150 KB.
- Drop files into `nextjs/public/img/` and tell me the slot numbers you filled.
