# Luma — Andy's Room

This is a playable reconstruction of the earlier game after its uncommitted files were lost from the cloud workspace. It is not a byte-for-byte recovery of the previous release.

## Play

Download `releases/Luma-Playable.zip`, extract it, then open **Luma.html** in a current desktop browser with WebGL support. The HTML includes its entire game engine, geometry, UI, and audio synthesis; it needs no server or internet connection. Keep a copy on your computer. The pause menu's **Save game file** button also saves a standalone copy.

- WASD: move; mouse or left/right arrows: look, without clicking to turn.
- Space: jump; hold while descending to glide. Shift: dash.
- Click or F: Buzz's wrist laser. E: talk, interact, or park RC.
- R: play with a nearby toy. M: Toybox journal. P or Escape: pause.
- Touch devices provide movement/action buttons and drag-to-look.

The room includes 20 toy friends, 26 stars, three battery missions, a Zurg encounter, climbable furniture, RC driving, a train, day/night switching, and sound. Talk to Woody, climb to Jessie, press Rex's floor blocks in order 1–2–3, and use the aliens' claw activity. After collecting three batteries, shoot Zurg and return to Woody. There is no timer.

Etch supports drawing, undo, erase, and arrow-key drawing. Forky and Potato Head support pointer/touch dragging and keyboard movement and rotation. Potato Head's pieces can be detached and restored. The other toys provide timing, matching, music, coin, grooming, spring, patrol, driving, and lookout activities. Progress and creations save locally in the browser. File locations and browser profiles can have separate saves.

The models are stylized procedural fan artwork. This reconstruction retains the core activities and adventure, but some visual and audio details differ from the lost version.

## Develop

Node 24 and Python 3 are available in the cloud environment.

```
npm ci --cache /tmp/luma-npm-cache --no-audit --no-fund
npm run build
npm test
npm run dev
node tests/smoke.mjs
```

The server serves the built file at `/Luma.html` on port 5173. Use the server internally for validation. `tests/smoke.mjs` uses installed `/usr/bin/chromium`; it verifies the standalone document with networking disabled after loading. The cloud browser blocks direct file navigation, so local-file launch must not be claimed as tested in that environment.

- `src/state.js`: pure physics, room surfaces, save normalization, initial parts.
- `src/models.js`: batched toy geometry and Buzz's wrist.
- `src/world.js`: room rendering, details, LOD, scene and custom parts.
- `src/main.js`: input, missions, audio, toy activities, saves, menus.
- `src/shell.html`: responsive interface and styling.
- `scripts/build.mjs`: bundles Three.js and game source into a standalone HTML.

The built HTML and release ZIP are versioned deliberately so a future workspace can recover the playable game. Preserve changes with Git commits and a confirmed remote backup; a temporary sandbox download link alone is not a durable backup. Each cloud task is already isolated; use the existing checkout without creating an extra worktree.
