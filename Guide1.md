# Guide 1 — Hero Particle Portrait MVP

## Purpose

This is **MVP 01** of the Harry Jees portfolio.

Build only the **opening hero experience** for now.

Do not build the rest of the portfolio yet.

The purpose of this MVP is to prove that the core visual idea works:

**Particle typography → Harry Jees particle portrait → cinematic camera movement → particle dispersal**

The final experience should feel like a cinematic 3D scene controlled by scrolling, rather than a normal website.

---

# 1. Existing Asset

A transparent PNG portrait of **Harry Jees** has already been added to the repository.

Find the existing portrait automatically.

Use that PNG as the source for the particle portrait.

Do NOT simply display the PNG during the final effect.

The PNG should be processed into particle positions.

Conceptually:

```text
Harry Jees PNG
      ↓
Canvas / pixel extraction
      ↓
Pixel + alpha data
      ↓
Particle positions
      ↓
THREE.BufferGeometry
      ↓
THREE.Points
      ↓
3D particle portrait
```

---

# 2. Visual Direction

The entire scene should be:

* Pure black
* Minimal
* Premium
* Cinematic
* Programming-oriented
* 3D
* Interactive
* Scroll-driven

It should communicate:

**Programming + AI + software engineering + creativity**

Avoid generic sci-fi aesthetics.

Do NOT make it look like:

* Space
* Aerospace
* A spaceship
* A futuristic cockpit
* A gaming HUD
* A generic hacker movie
* A Matrix clone
* A normal portfolio template

The visual language should feel like **code has become a physical 3D environment**.

---

# 3. Initial Composition

Start on a completely black screen.

Minimal text appears:

### One side

**Hi, I'm**

### Opposite side

**Welcome to my portfolio**

### Center

**Harry Jees**

However, **Harry Jees must be made entirely from particles**.

It should NOT initially be normal HTML text.

The particle typography should be clean and readable.

---

# 4. Particle Typography

Create the words:

**Harry Jees**

using a large number of small particles.

The particles should:

* Form recognizable letters
* Have subtle depth
* Have very subtle movement
* Feel connected to programming
* Remain elegant
* Avoid excessive glow
* Avoid random chaotic motion

The underlying typography can use a modern, clean, programming-oriented font.

The final effect should feel like:

> A name constructed from thousands of tiny digital points.

---

# 5. Scroll = Camera Control

The page should not feel like a normal vertically scrolling website.

The visitor's scroll should control the progression of a cinematic camera sequence.

Think:

**scrolling = directing the camera**

The camera may move:

* Forward
* Backward
* Diagonally
* Vertically
* Sideways
* Around the subject
* Through depth

Do not use one simple horizontal or vertical movement.

The path should feel deliberately choreographed.

---

# 6. First Transformation

As scrolling begins:

The surrounding text starts moving away.

For example:

```text
Hi, I'm                Welcome to my portfolio
        \              /
         \            /
          Harry Jees
```

The side text can move in different directions using combinations of:

* Position
* Rotation
* Scale
* Opacity
* Depth

Do not simply fade everything away.

The movement should feel like part of the camera choreography.

---

# 7. Harry Jees → Portrait

This is the most important part of the MVP.

The particle typography:

**Harry Jees**

must transform into the portrait.

Do NOT:

```text
fade text out
fade image in
```

Instead:

```text
Harry Jees particles
        ↓
particles loosen
        ↓
particles travel
        ↓
particles reorganize
        ↓
particles form portrait
```

The transformation should feel physically continuous.

Ideally, reuse the same particle system rather than destroying one system and creating another.

---

# 8. Particle Portrait

The supplied PNG should be converted into a particle representation.

Use the image's:

* Alpha
* Pixel coordinates
* Color information where useful

to determine the target positions of particles.

Recommended implementation:

```text
HTML Canvas
      ↓
getImageData()
      ↓
sample pixels
      ↓
create typed arrays
      ↓
THREE.BufferGeometry
      ↓
THREE.Points
```

Use a performant implementation.

Do NOT create thousands of individual mesh objects.

---

# 9. Portrait Accuracy

The final particle portrait must clearly resemble **Harry Jees**.

Important facial features should remain recognizable.

Preserve:

* Head silhouette
* Hair
* Eyes
* Nose
* Mouth
* Face shape
* Clothing/silhouette where useful

The portrait should look like the actual person represented by the supplied PNG, not an abstract human-shaped particle cloud.

---

# 10. 3D Depth

The portrait should have genuine 3D characteristics.

It must not look like:

> A flat image with dots placed on top.

Give particles controlled Z-depth.

Possible approaches:

* Layered depth
* Controlled Z displacement
* Image-derived depth
* Subtle procedural depth
* Depth-based particle distribution

The exact implementation can be chosen by the agent.

The important result is that camera movement reveals actual depth.

---

# 11. Camera Orbit

After the portrait forms, the camera should begin moving around it.

The camera itself should move.

Do not simply rotate the particle portrait as one object.

The camera should:

1. Push toward the portrait.
2. Begin an orbit.
3. Move through depth.
4. Slightly change elevation.
5. Reveal the particle depth.
6. Continue along a cinematic path.

A roughly **120° orbit** is a possible starting point, but adjust it based on what looks best.

Do not make the camera continuously spin.

The movement should feel like a professionally directed camera shot.

---

# 12. Particle Motion

While the camera moves, the particles should remain alive.

Use subtle:

* Drift
* Turbulence
* Noise
* Swirling
* Depth movement
* Particle trails

But keep the portrait recognizable.

Avoid:

* Constant random movement
* Excessive explosions
* Particle spam
* Overly bright effects

The feeling should be:

**controlled + organic + technical + cinematic**

---

# 13. Particle Dispersal

Near the end of the MVP, the portrait begins to break apart.

Possible progression:

```text
Portrait holds
      ↓
subtle vibration
      ↓
particles loosen
      ↓
particles stretch
      ↓
particles form streams
      ↓
particles drift / spiral away
```

The particles can eventually resemble:

* Data streams
* Code fragments
* Digital trails
* Flowing characters

This is the bridge toward the future next scene.

Do NOT build that next scene yet.

---

# 14. Programming Aesthetic

Programming should be present visually, but subtly.

Possible elements:

* Monospace typography
* Tiny code characters
* Binary fragments
* Character streams
* Data-like particle movement
* Code symbols
* Subtle terminal-inspired details

Do NOT overdo it.

Avoid making the site look like a fake hacker terminal.

No huge blocks of random code.

No excessive Matrix rain.

No unnecessary green neon.

The desired feeling is:

**creative programmer / software engineer / AI builder**

not:

**movie hacker.**

---

# 15. Technology

Use the project's existing stack where possible.

Preferred technologies:

### 3D

**Three.js + React Three Fiber**

For:

* Particle system
* 3D scene
* Particle geometry
* Materials
* Camera
* Rendering

### Animation

**GSAP**

For:

* Scroll progress
* Timelines
* Particle morph timing
* Text movement
* Easing
* Opacities
* Transformations

### Camera choreography

**Theatre.js**

Use it for carefully choreographed camera movement where appropriate.

GSAP and Theatre.js should work together rather than replacing each other.

### Smooth scrolling

**Lenis**

Use it if appropriate for the project.

---

# 16. Tool Responsibilities

Keep responsibilities separated.

### React Three Fiber / Three.js

Handle:

* 3D scene
* Particles
* BufferGeometry
* Particle positions
* Particle rendering
* 3D depth

### GSAP

Handle:

* Scroll-driven timeline
* Text transitions
* Particle morph progress
* Timing
* Easing
* Opacity
* Scale

### Theatre.js

Handle:

* Camera choreography
* Camera position
* Camera rotation
* Cinematic keyframes

### Lenis

Handle:

* Smooth scrolling

---

# 17. Performance

Performance is extremely important.

Prefer:

* One efficient particle system
* BufferGeometry
* Typed arrays
* GPU-friendly rendering
* Minimal React re-renders
* Reusable materials

Avoid:

* One React component per particle
* One Three.js mesh per particle
* Unnecessary state updates every frame
* Heavy DOM animation for WebGL elements

Particle count must be adjustable.

Use adaptive particle density where useful.

---

# 18. Scroll Behaviour

The animation must respond naturally to:

* Slow scrolling
* Fast scrolling
* Stopping
* Reverse scrolling

The animation should not break when the user scrolls quickly.

Use smoothing/interpolation where necessary.

Reverse scrolling should reverse or naturally move back through the animation rather than causing glitches.

---

# 19. Responsive Behaviour

Desktop is the primary target.

Also support:

* Laptop
* Tablet
* Mobile

Mobile may use:

* Lower particle count
* Simplified camera movement
* Reduced effects

Do not sacrifice performance just to preserve desktop-level particle density.

---

# 20. Reduced Motion

Respect:

`prefers-reduced-motion`

When enabled:

* Reduce camera movement
* Reduce particle turbulence
* Reduce aggressive transitions
* Keep the portrait visible and understandable

---

# 21. MVP Timeline

Use this as a starting point, not a rigid requirement.

### 0–10%

Pure black.

Very subtle particles.

### 10–25%

Side text appears.

Particle typography begins forming.

### 25–40%

**Harry Jees** is fully readable.

### 40–60%

Side text moves away.

Particle typography begins breaking apart.

### 60–75%

Particles reorganize into Harry Jees's portrait.

### 75–90%

Camera begins cinematic orbit.

Portrait has visible 3D depth.

### 90–100%

Particles begin dispersing into flowing digital streams.

End the MVP.

---

# 22. Important Design Rule

Do not add anything simply because it is technically possible.

Every animation must have a visual purpose.

Heavy animation is encouraged, but it should appear at **suitable moments**.

The experience should alternate between:

**quiet → buildup → transformation → reveal → cinematic movement → dispersal**

rather than being constantly overloaded.

---

# 23. What NOT To Build

For this MVP, do NOT create:

* Navbar
* About section
* Skills section
* Projects section
* Experience section
* Contact section
* Footer
* Project cards
* Skill cards
* Blog
* Resume section
* Other portfolio scenes

Only build the hero.

---

# 24. Implementation Quality

After implementing the MVP:

1. Run the application.
2. Inspect the actual result.
3. Check whether the particle text is readable.
4. Check whether the portrait is recognizable.
5. Check whether the morph feels continuous.
6. Check whether the camera movement feels cinematic.
7. Check whether the portrait has convincing depth.
8. Check performance.
9. Check scrolling in both directions.
10. Refine animation timing and easing.
11. Remove anything that feels unnecessary.
12. Polish until the hero feels like a finished visual experience.

Do not stop at a basic technical demo.

---

# 25. Success Criteria

The MVP is successful if a visitor can immediately experience this:

```text
BLACK
   ↓
Hi, I'm          Welcome to my portfolio
   ↓
      Harry Jees
      (particles)
   ↓
      particle morph
   ↓
      Harry Jees
      (portrait made from particles)
   ↓
      cinematic camera orbit
   ↓
      particle movement
   ↓
      digital particle dispersal
```

The visitor should feel:

> “This isn't a normal portfolio.”

The scene should communicate:

> **Harry Jees — programmer, AI/agentic developer, and creative technologist.**

---

# Final Rule

This is **Guide 1 / MVP 01**.

Build and polish this scene first.

Do not assume what the later portfolio sections should look like.

The next scene will be designed separately after this MVP is visually approved.
