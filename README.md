# Med‑Device Rep Surgery Simulation — Mini Prototype

This folder contains a minimal **offline** prototype to simulate tray selection and step‑by‑step instrument coverage for a THA (posterior) demo.

## Files
- `sim_schema.json` — JSON schema for procedures and trays.
- `procedure_tha_actis_demo.json` — Sample data for a THA (ACTIS‑like) demo (generic instrument names).
- `index.html`, `app.js`, `styles.css` — Static web app to load a procedure, pick trays, and track instrument coverage.
- `visuals/` — Placeholder images (empty for now).

## How to Use
1. Download the ZIP, extract locally.
2. Open `index.html` in a browser.
3. Select trays on the left; step through the procedure on the right.
4. The app shows which **required instruments** are covered by your selected trays for each step.

> Educational prototype only. Do **not** use for clinical decision‑making.
