# Portfolio engineering audit

Date: 2026-10-19
Repository: https://github.com/Harry-Jees/My-Portfolio

## Scope and limitations

This review inspected the tracked Vite/React source, animation foundation, section components, package manifest, and deployment entry point through GitHub. It did not execute the site in a browser, run Lighthouse, test assistive technologies, or verify the live Vercel response headers. Treat browser-specific observations below as code-review findings until those checks run.

## Findings

### High — animation workload can run continuously
The hero uses 26,000 desktop / 11,000 mobile particles and updates every particle on each animation frame. Before this change, its render loop only stopped after the scroll progress reached the very end, so it could keep using CPU/GPU while the user was idle elsewhere in the pinned hero scene. This should be addressed with an idle-stop timer that resumes on ScrollTrigger updates, then profile on low-end mobile hardware.

### Medium — missing discoverability metadata
The original HTML lacked a meta description, canonical URL, Open Graph/Twitter metadata, robots directives, and sitemap/robots files. Added in this branch; confirm the canonical domain is the final preferred production domain before merging.

### Medium — keyboard skip navigation
The original document had no skip link to bypass the long cinematic sections. Added a visible-on-focus skip link and main-content target. Validate it with keyboard-only navigation and screen readers.

### Medium — security response headers not configured in repository
Added Vercel response headers for MIME sniffing protection, referrer policy, framing protection, a restrictive permissions policy, and HSTS. Verify the live deployed response after merge. HSTS preload should only be retained if every subdomain is HTTPS-ready and the domain is intended to opt into preload.

### Medium — no repository CI build gate
The repository did not contain a build-validation workflow. Added a Node 22 install/build check and checks for generated SEO files. This verifies buildability, not visual quality or accessibility conformance.

### Medium — animation and content accessibility need manual validation
The code includes reduced-motion handling in several sections, but the WebGL hero still performs a substantial particle morph while scrolling. Test prefers-reduced-motion, keyboard reachability, focus visibility, contrast, 200% zoom, and touch targets on real devices. Avoid making essential content available only through canvas or animation.

### Low — external font dependency
Fontshare styles are fetched at runtime. Added preconnect hints and consolidated the font stylesheet request. Keep fallback fonts legible and verify the font provider is available in target regions.

### Low — project case studies are mostly descriptions
Project entries do not yet provide live demos, repository links, measurable outcomes, role/contribution, stack details, screenshots, or case-study pages. Add only verified claims and links; this is a major improvement for recruiter/client conversion.

## Changes in this branch

- Improved title, description, canonical, robots, Open Graph, and Twitter metadata.
- Added sitemap and robots.txt.
- Added keyboard skip navigation.
- Added Vercel security response headers.
- Added a CI production-build gate.

## Recommended next checks before calling this global-standard

1. Run CI and confirm the production build succeeds.
2. Test mobile performance with Chrome DevTools/Lighthouse and a low-end Android device.
3. Validate keyboard-only use, screen-reader headings/landmarks, contrast, focus, zoom, and reduced-motion behavior.
4. Verify the live response headers and canonical URL on the production domain.
5. Add project case studies, verified outcomes, social preview image, and a privacy-friendly contact workflow.
6. Add automated accessibility and link checks once the current UI is stable.
