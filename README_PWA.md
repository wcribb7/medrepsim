
# Med-Device Rep Surgery Simulation — PWA Build

This build is installable as a Progressive Web App (PWA). Once deployed (e.g., on GitHub Pages), you can "Add to Home Screen" on iOS/Android and use it **offline**.

Files added:
- `manifest.json` — PWA manifest
- `service-worker.js` — offline caching
- `icons/` — app icons

How to deploy (GitHub Pages):
1. Create a new **public** repo (e.g., `medrep-sim`) on your phone (GitHub app works).
2. Upload all files/folders in this build to the repo root.
3. In your phone browser, open the repo → **Settings** → **Pages** → **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** / root (/) → **Save**
4. Wait for the site to build. Your Pages URL appears on that screen (e.g., https://<username>.github.io/medrep-sim).
5. Open the URL on your phone → **Share** → **Add to Home Screen**.

After first load, it works offline.
