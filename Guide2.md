# Guide 2 — About, Skills & Projects

## 0. Purpose

Build the next three major sections of the Harry Jees portfolio after the cinematic Hero from `Guide1.md`.

These sections must feel like one continuous experience, not three separate website templates.

The visual language is:

* Minimal, cinematic, premium.
* Predominantly pure black and white.
* Use grayscale for depth.
* At most one sparse accent color.
* Clean modern sans-serif typography for body text.
* A distinctive display font for major headings.
* No excessive blobs, random decorative shapes, or generic template cards.
* Motion should feel intentional and cinematic rather than busy.

The Hero already establishes the visual and technical language. Do not redesign it or replace its particle system.

---

# 1. About Section

## 1.1 Transition from Hero

The Hero should naturally transition into the About section.

Do not create a hard page break or suddenly switch to a conventional portfolio layout.

The transition should feel like the camera is continuing through the same visual world.

Use the existing cinematic motion system:

* Three.js / React Three Fiber for the 3D scene.
* GSAP for sequencing, timing, easing and scroll-linked choreography.
* Theatre.js for cinematic camera positioning and movement.
* Lenis for smooth scrolling.

The transition can use particles or the existing 3D environment, but particles should not be forced to form a heading.

Use particles as an atmospheric transition or as a simple symbolic visual element.

---

## 1.2 About Content

Introduce Harry Jees as a person and builder rather than presenting a generic resume.

The core positioning:

* Software/product builder.
* Interested in AI and agentic development.
* Strong interest in front-end development and UI/UX.
* Interested in entrepreneurship, creativity and innovation.
* Someone who enjoys turning ideas into actual products and experiences.

The copy should be concise and confident.

Do not overload the section with a large biography.

The visitor should quickly understand:

**Who Harry is → what he builds → what he cares about → how he thinks.**

Avoid unnecessary personal information such as age, class, or other details that do not contribute to the professional identity.

---

## 1.3 About Layout

Do not use a conventional centered text block.

Create a cinematic composition with strong visual hierarchy.

Suggested structure:

* Small contextual label.
* Large distinctive heading.
* Short introduction.
* Supporting statement / philosophy.
* A subtle visual element or 3D object.
* Generous negative space.

The section should feel editorial and premium.

The typography should do much of the visual work.

---

## 1.4 About Animation

On entering the section:

1. The camera settles into a new cinematic composition.
2. The heading reveals progressively.
3. Supporting text follows with a smaller, softer motion.
4. The visual element reacts subtly to scroll.
5. Elements should have different motion timings rather than appearing simultaneously.

Use GSAP timelines for the sequence.

Use Theatre.js where a deliberate camera move is needed.

Keep the animation restrained.

The goal is:

**cinematic → smooth → intentional**

not:

**lots of effects → lots of movement → distracting.**

---

# 2. Skills Section

## 2.1 Concept

Do **not** create a normal portfolio skill grid containing dozens of boxes.

The Skills section should communicate capability through a visual, cinematic system.

The visitor should feel that these are tools and disciplines Harry works with, rather than reading a technical résumé.

---

## 2.2 Skill Categories

Represent the main areas of capability.

### Development

* Python
* HTML
* CSS
* JavaScript
* MySQL

### AI / Agentic Development

* Agentic development
* Agentic orchestration
* Prompt engineering
* AI-powered applications

### Product / Design

* UI/UX
* Front-end development
* Product development
* Creative problem solving

### Experience / Motion

* Web animation
* 3D presentation
* Cinematic interaction
* Interactive experiences

Keep the categories visually organized without turning them into a dense list.

---

## 2.3 Skills Visual Treatment

Use a dynamic editorial layout rather than a card grid.

Possible visual behavior:

* A large central skill/category.
* Smaller supporting skills positioned around it.
* Scroll changes the active focus.
* Typography scales or shifts subtly.
* A simple symbolic 3D object can reinforce the section.
* Skills can appear/disappear through controlled transitions.

Particles may be used as atmosphere or as a transition, but **do not make particles form every skill name or heading**.

Do not use image transformations for decorative skill visuals. Simple symbolic objects are preferred.

---

## 2.4 Skill Animation

The section should feel almost like moving through different layers of a creative/technical workspace.

Use:

* GSAP timelines.
* Scroll-linked choreography where appropriate.
* Three.js / React Three Fiber for 3D elements.
* Theatre.js for cinematic camera movement.
* Lenis for smooth scrolling.

Animations should have depth:

* foreground typography,
* midground information,
* subtle background/3D motion.

Avoid excessive parallax.

---

# 3. Projects Section

## 3.1 Concept

Projects are the proof of the capabilities described above.

This should be one of the strongest sections in the portfolio.

Do **not** display projects as a generic 3-column card grid.

Each project should feel like a featured case-study moment.

The visitor should immediately see:

**project → purpose → technology → result / experience**

---

## 3.2 Featured Projects

The current project lineup includes:

### Pillow Bud

Primary featured project.

Give it the strongest visual treatment.

Focus on:

* AI-powered companion / mentor concept.
* Personalization.
* Interactive experience.
* Product thinking.
* Modern interface.
* AI integration.

Do not invent claims or features that were not actually established.

---

### Bro App

A Windows desktop application built around the Buddy / Bro / Dude concept.

Technology/context includes:

* Python
* CustomTkinter
* MySQL

Core concept:

* Buddies request tasks.
* Bros help complete tasks.
* Dudes manage/administer the system.

There are no in-app payments.

Present this as a real software/product project rather than simply listing its technologies.

---

### St. Thomas Public School Website

Show this as a web-development project.

Focus on:

* Website design.
* Front-end development.
* User experience.
* Information presentation.
* Real-world website building.

Use the project's actual visuals/assets rather than invented screenshots.

---

### Youth Korp Website

Present Youth Korp as a community/startup-oriented project.

Focus on:

* Product thinking.
* Community building.
* Branding.
* Web experience.
* Entrepreneurship and innovation.

The brand name must always be written exactly:

**Youth Korp**

Do not change the spelling to Youth Corp.

---

## 3.3 Project Presentation

Projects should appear one at a time or in a cinematic sequence.

Each project can contain:

* Project number / small label.
* Project name.
* Short description.
* Technology / discipline.
* Large project visual.
* Small supporting metadata.
* View project / GitHub action where applicable.

Do not fill the screen with unnecessary technical text.

The visual should be the primary element.

---

## 3.4 Project Motion

Make the Project section feel like a sequence of scenes.

Example progression:

**Project 01 → transition → Project 02 → transition → Project 03 → transition → Project 04**

Transitions should be smooth and cinematic.

Possible motion language:

* Large project visual moves through the viewport.
* Typography enters from controlled directions.
* Camera subtly shifts in 3D space.
* Background depth changes.
* The next project gradually replaces the previous one.

Use GSAP for choreography and Theatre.js for deliberate cinematic camera movement.

Use Three.js / React Three Fiber only where it improves the experience.

Do not turn every project into a complicated 3D experiment.

---

# 4. Section-to-Section Continuity

The most important requirement is continuity.

The page should feel like one long cinematic journey:

**Hero**
↓
**About**
↓
**Skills**
↓
**Projects**

There should not be:

* abrupt color changes,
* unrelated animation styles,
* generic card components,
* excessive blobs,
* random floating objects,
* unnecessary gradients,
* huge walls of text.

Every transition should have a reason.

---

# 5. Responsive Behavior

The entire implementation must work on:

* Desktop.
* Tablet.
* Mobile.

Do not simply shrink the desktop layout.

For mobile:

* simplify camera movement,
* reduce particle count where necessary,
* reduce heavy 3D effects,
* preserve the cinematic feeling,
* keep text readable,
* maintain the visual hierarchy.

Performance is important.

Prefer progressive enhancement rather than sacrificing usability for effects.

---

# 6. Technical Rules

Before implementing:

1. Inspect the existing project.
2. Identify the framework and current component structure.
3. Reuse the existing architecture.
4. Do not rebuild the project with a different framework without a real reason.
5. Reuse existing assets.
6. Never invent personal photos, project screenshots, facts, or text.
7. Do not invent Malayalam content.
8. Keep the existing Hero implementation intact.
9. Build Guide 2 on top of Guide 1 rather than replacing it.

### Animation Stack

Use the following stack where appropriate:

* **Three.js / React Three Fiber** — 3D scenes and particle systems.
* **GSAP** — animation timelines, transitions and scroll choreography.
* **Theatre.js** — cinematic camera choreography.
* **Lenis** — smooth scrolling.

Each library should have a clear purpose.

Do not add effects merely because a library is available.

---

# 7. Overall Quality Target

The final result should feel like a carefully directed interactive portfolio film.

The visitor should experience:

**curiosity → introduction → capability → proof**

The website should communicate that Harry Jees is not simply someone who knows programming languages.

It should communicate:

# “I build things.”

Every animation, transition, visual and piece of text should support that idea.
