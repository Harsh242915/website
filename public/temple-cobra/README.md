# Temple of the Cobra — reconstructed static kit, V2

## Start
Open preview.html directly in a browser. This is a self-contained static UI assembly and interaction demonstration, not a playable slot. The original reference toggle shows differences clearly. static_assembly.jpg and asset_contact_sheet.jpg are quick reviews.

Use assets/ for runtime PNGs. layout.json and asset_inventory.csv give native 1672 × 941 top-left coordinates, dimensions, z order and provenance. All PNGs use straight alpha; set the appropriate texture upload/blend settings for your engine. Put assets under one uniformly scaled parent. Reel windows are approximate and require final padding/mask checks against actual symbols.

## Reconstruction completed
- Complete charcoal stone reel backing without symbols.
- Two horizontal stone separators; four original vertical dividers retained.
- Uninterrupted top rail, including the section formerly hidden under the hero collar.
- Full bottom HUD stone ledge behind all controls.
- Empty opaque Balance, Bet, Total Bet and Win panels, no currency or heading text baked in.
- Logo with transparent gaps, reinterpreted closely from the cropped original.
- Separate emerald spin face, hollow bezel and gold arrow icon. Rotate the icon only.
- Live UI text, interaction states and mute overlay demonstrated in preview.
- Redistributable substitute UI and serif fonts, with license.

## Origin and style
Reconstructed areas are NEW artwork resembling the supplied mock, not recovered original layers. Their forms/texture details differ. origin in layout.json records which assets are reconstructed and which remain original pixel extracts. masters/ contains selected high-resolution generated outputs; runtime PNGs are trimmed/resized exports. No discarded logo variants are included. developer/generation_prompts.json records the generation prompts and selection. reference/original_extractions contains the entire prior extraction set as a comparison, not additional assets to stack.

## Developer integration
1. Add reel backing at z=0; add separators and vertical dividers around your symbol layer. Keep symbols above the backing and below frame art. Decide whether horizontal separators should overlay symbols or be behind them for your spin design.
2. Add HUD platform at z=2, frame art at its listed z values, panels at z=20.
3. Draw labels and live values at z=24 from text_fields; values in the preview are examples only. All four NEW panel images are blank. Original small button labels remain baked in.
4. Spin face z=30, bezel z=32, arrows z=34. Each is placed by top-left; rotate arrows about its own centre. Ring and face share the same nominal centre, approximately (1505.5,825.5). Leave the reconstructed centre rail behind the eventual hero character.
5. Use runtime_states for feedback: normal, hover, pressed, disabled and selected. These are styling recipes, not a separate PNG for each state. preview.html demonstrates the approach and normal-state interactions.
6. Sound-off uses the existing speaker plus a runtime gold slash. This preserves the existing button style without a second raster icon. The preview includes the implementation. Engine implementations should use an equivalent small primitive.
7. DejaVuSans.ttf is a supplied functional substitute for labels/amounts; DejaVuSerif-Bold.ttf is an optional display alternative. Neither is the unknown original typeface. Carry LICENSE.txt when redistributing.
8. Do not nonuniformly scale detailed art for future layouts. The supplied three small panel exports are already fitted to this mock; use masters for revised dimensions and consider engine nine-slice carefully because patterned corners must remain fixed.

## Remaining review items
Original side-frame extracts have baked lighting and may contain tiny edge backdrop fragments; complete source-layer fidelity is unavailable. Small button icons/labels remain combined with their bases. No portrait arrangement or separate bitmap state sheets are provided; runtime states are supplied. Generated alpha edges retain their natural antialiasing and should be reviewed on the final background in your engine. The kit is visually reviewed for this reference size, not tested in your game engine or on target devices. Final symbol bounds, font sizing, mobile hit areas and premultiplied-alpha settings remain integration work.

Background, animated hero and side characters, symbols, VFX, gameplay logic and game math remain excluded. This is a substantially more complete static screen kit, not a complete game or editable layered PSD.
