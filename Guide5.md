Guide 5 — Cinematic Portfolio Architecture & Final UI/Animation Direction

1. Core Creative Direction

The portfolio must feel like a premium cinematic interactive experience, not a conventional vertically scrolling portfolio and not an AI-generated template.

The overall experience should use vertical scrolling as the primary physical input, but scrolling should control different kinds of movement:

vertical movement

horizontal journeys

pinned scenes

diagonal transitions

depth transitions

camera movement

lateral scene changes

scale transitions

cinematic reveals

Do not make every section use the same transition.

The visitor should feel like they are moving through an interactive film rather than scrolling through a list of website sections.

Do not make the experience confusing or difficult to navigate. Motion should remain intuitive.

2. Animation and UI Library Architecture

Use the following libraries with clearly separated responsibilities.

Three.js / React Three Fiber

Use for:

3D scenes

Hero portrait particles

section-specific particle/network visuals

3D depth

WebGL effects

GSAP + ScrollTrigger

Use as the primary cinematic animation engine for:

scroll choreography

pinning

scrubbed timelines

horizontal sections

diagonal transitions

section transitions

project progression

major text/scene sequencing

Theatre.js

Use for:

cinematic camera choreography

camera position

camera rotation

depth changes

controlled 3D camera movement

Use it selectively, especially in the Hero and other genuinely 3D scenes.

Lenis

Use for:

smooth scrolling

smooth vertical scrolling

smooth horizontal scrolling where required

synchronizing scrolling with GSAP and WebGL

There must be one global scroll system.

Anime.js

Use only for small DOM/SVG micro-interactions:

typography micro-animations

small text reveals

underline animations

subtle hover effects

active-state micro-interactions

small SVG path animations

tiny UI movements

Do NOT use Anime.js for the main scroll choreography, Three.js particle movement, or cinematic camera system.

React Bits

Use selectively for useful creative components/effects such as:

masked headings

depth text

scroll text/reveal effects

particle text only if it genuinely improves the existing implementation

creative text transitions

Do not blindly add components.

Magic UI

Use selectively for:

polished animated lists

kinetic text

subtle marquee/scroll elements

small interaction components

refined micro-interactions

Aceternity UI

Use selectively for:

magnetic interactions

spotlight effects

tracing/scroll effects

parallax

animated tabs

subtle focus effects

Do not make the site look like a generic Aceternity template.

Motion Primitives

Use selectively for:

polished text transitions

progressive blur

magnetic interactions

spotlight effects

transition panels

small motion patterns

Do not use multiple libraries to animate the same property.

3. Dependency Rules

Inspect package.json before installing anything.

Check whether these already exist:

three

@react-three/fiber

@react-three/drei

gsap

lenis

@theatre/core

@theatre/studio

animejs

motion

any existing React Bits components

any existing Magic UI components

any existing Aceternity components

any existing Motion Primitives components

Do not install duplicates.

Install only dependencies that are actually required.

If Anime.js is missing, install it.

If Lenis is missing, install it.

If a selected UI component requires Motion, install the required current Motion dependency.

Do not add unnecessary libraries.

4. Hero — Cinematic Opening

The Hero remains the strongest scene.

Current identity:

"Hi, I am Harry" on the appropriate side/area

"Harry Jees" as the central identity

"Welcome to my portfolio" in the other area

Keep the identity clear and minimal.

The Hero should initially feel calm.

Then the particle portrait forms.

The particle portrait should:

gather

form the portrait

hold long enough to recognize

subtly respond to the environment/cursor where appropriate

begin rotating in 3D

destabilize

explode outward

spread through 3D space

slow down

naturally dissipate

Do not make this too fast.

The explosion should feel cinematic, not like a generic particle burst.

Important particle architecture decision

The Hero particle system does NOT need to persist through the entire website.

The Hero particles may finish after the portrait explosion.

Do not force the Hero particle engine to remain active across later sections.

Later sections may use separate, lightweight particle/network systems.

This is intentional and avoids unnecessary technical coupling.

5. Hero Camera

Use Theatre.js where it genuinely improves the scene.

Suggested cinematic sequence:

Shot 1

Front-facing introduction.

Shot 2

Very subtle camera movement toward the portrait.

Shot 3

Small lateral/parallax movement.

Shot 4

During portrait formation, slowly rotate around the subject.

Shot 5

During the explosion, pull the camera backward and slightly rotate.

Shot 6

Allow particles to spread through depth.

Shot 7

Settle the camera before leaving the Hero.

Do not make the camera spin excessively.

The movement should feel like a cinematic camera, not a game camera.

6. Hero Side Graphic

Remove the weak "Idea → Real" visual.

Replace it with a meaningful technical visual.

Preferred direction:

A particle-based coding symbol such as:

< / >

or a sophisticated network/technical structure.

Another acceptable direction is a field of 0 and 1 particles temporarily forming a meaningful technical shape.

Keep it minimal.

Do not add:

random SVGs

random illustrations

stock imagery

decorative objects without meaning

It should belong visually to the Hero particle world.

7. Hero → About Transition

Do not simply allow the next section to cover the Hero.

After the particle explosion:

particles slowly fade/dissipate

camera settles

Hero typography exits naturally

About begins entering from a different spatial direction

Use a diagonal or lateral transition rather than another basic vertical reveal.

Example:

Hero exits upward/right.

About enters from left/depth.

The transition should feel spatial.

8. About — Cinematic Horizontal Journey

Do not make About a conventional centered text block.

Create an editorial/cinematic composition.

Use vertical scrolling to control horizontal content/camera movement.

Recommended architecture:

vertical scroll input

pinned About scene

horizontal translation

GSAP ScrollTrigger

Lenis smooth scrolling

The visitor scrolls vertically, but the About content travels horizontally.

Do not expose a manual horizontal scrollbar.

The horizontal movement should be controlled by the normal vertical scroll.

9. Capabilities

Capabilities should become a structured technical environment.

Use exactly:

Agentic Development

Loop Engineering

Product Development Principles

UI/UX

Do not use:

AI / Agentic Development

Product / Design

Motion / Experience

unnecessary slashes

The active capability should become visually dominant.

Active state:

larger

brighter

slightly heavier

spatially prominent

Inactive state:

smaller

quieter

still clearly readable

Use GSAP ScrollTrigger for major focus progression.

Use Anime.js for small typography/underline/detail micro-interactions only.

Do not animate the same property with both GSAP and Anime.js simultaneously.

10. Capability Network

Create a lightweight Three.js/R3F network visual for this section.

It can contain:

nodes

connecting lines

subtle movement

relationships

rearrangement

active-topic response

It must feel technical and organic.

Do not make it look like a generic AI neural-network background.

The visual should be restrained enough that the text remains dominant.

11. Capability State Transitions

Do not simply switch text and colors.

Treat each capability as a state of one environment.

The technical environment can:

rotate slightly

shift perspective

change spatial arrangement

transition between vertical and horizontal movement

reorganize the network

The four topics should feel like four states of the same scene.

12. Projects — Horizontal Cinematic Journey

The four projects should remain as tabs.

Projects:

Pillow Bud

Bro App

Project 3

Project 4

Do not invent project details.

The Projects section must NOT remain a conventional vertical project stack.

Use:

pinned section

vertical scroll input

horizontal movement

cinematic project transitions

Sequence:

Pillow Bud
→ HOLD
→ transition
→ Bro App
→ HOLD
→ transition
→ Project 3
→ HOLD
→ transition
→ Project 4

Pillow Bud must stay focused long enough to be understood before Bro App appears.

Do not immediately switch projects when the section reaches its focus position.

Each project should feel like a shot in a film.

13. Project Tab Behavior

Keep the tab layout minimal.

Active project:

slightly larger

brighter

clearly readable description

stronger visual focus

Inactive projects:

remain visible

become quieter

do not disappear completely

Use Anime.js or Motion Primitives for small tab micro-interactions if appropriate.

Use GSAP for scroll-driven project progression.

14. Project Transitions

Do not make projects simply "pop up".

Use cinematic movement.

Possible structure:

Pillow Bud:
camera moves slightly forward.

Transition:
project environment moves laterally.

Bro App:
camera settles.

Transition:
camera rotates slightly.

Project 3:
enters from depth.

Transition:
horizontal movement.

Project 4:
final project focus.

Use the exact movement that best fits the existing architecture.

15. Youth Korp

Keep:

Founder of Youth Korp

Description:

A project incubation and innovation scaling community built by students for students.

Do not invent additional claims, statistics, dates, or achievements.

Use a separate lightweight Three.js/R3F network scene.

Do not reuse the Hero particle engine.

The network represents:

students

ideas

connections

collaboration

incubation

scaling

Use:

nodes

lines

depth

subtle camera movement

slowly evolving connections

It should feel alive and organic without becoming generic AI decoration.

16. Projects → Youth Korp Transition

Do not simply fade between the sections.

The project environment should:

gradually converge toward a central point

compress

then expand into a network

Concept:

Projects
→ convergence
→ connection
→ Youth Korp

This should feel like a conceptual cinematic transition.

17. Journey

Journey must not be another standard vertical text section.

Use a path-based visual.

Vertical scroll controls:

horizontal movement

diagonal movement

path progression

Particles or small points may travel along the path.

Do not invent milestones.

The visual communicates:

growth

learning

progress

evolution

Use GSAP + ScrollTrigger.

Use Theatre.js only when the 3D camera benefits from it.

18. Youth Korp → Journey Transition

The Youth Korp network can gradually:

loosen

disconnect

reorganize

form curved paths

become a flowing trajectory

This gives a visual progression from:

connection → direction → journey.

19. Speaking / Teaching

Remove the heading:

Speaking / Teaching

Keep:

Ideas are better when they are shared.

The section must clearly communicate that Harry has experience taking classes/teaching sessions in colleges.

Integrate the college information naturally into the paragraph.

Do not present college names as separate boxes/cards.

Confirmed topics:

Agentic Programming

Loop Engineering

Product Development Principles

UI/UX

Do not invent:

event names

dates

audience sizes

certifications

achievements

20. Speaking Topic Animation

Display the topics as a vertical or diagonal selector.

Active topic:

grows

becomes brighter

becomes slightly heavier

becomes more spatially prominent

Inactive topic:

shrinks

becomes quieter

remains visible

The focus should move like:

Agentic Programming
→ Loop Engineering
→ Product Development Principles
→ UI/UX

The effect should feel like a spotlight moving between ideas.

Use GSAP for scroll-controlled progression.

Use Anime.js for small typography micro-interactions.

Motion Primitives may be used for a specific text transition if it fits better.

Do not use every animation library for the same interaction.

21. Speaking Visual

Use a separate lightweight network/cluster visual if useful.

The Journey path can transition into:

split paths

connected clusters

convergence around the active topic

The visual represents knowledge spreading across ideas.

Keep it subtle.

Do not overpower readable content.

22. Contact

Contact should feel like the final quiet scene.

Keep:

Let's build something meaningful together.

Use the exact contact details:

Email:
harryjees@gmail.com

Phone:
+91 9400765473

GitHub:
https://github.com/Harry-Jees

LinkedIn:
https://www.linkedin.com/in/harry-jees

Instagram:
https://www.instagram.com/harry_jees/

All must be genuinely clickable.

Do not create five oversized cards.

Use an editorial arrangement with strong typography.

23. Contact Micro-Interactions

Anime.js can be used for:

subtle underline drawing

tiny hover shifts

text reveals

Aceternity/Motion Primitives can be selectively used for:

subtle magnetic interaction

focus effects

Magnetic effects must remain subtle.

Do not make links fly toward the cursor.

24. Final Outro

Do not finish with:

Contact
→ generic footer
→ black screen.

Instead:

Contact settles.

The environment becomes quieter.

A separate lightweight particle system begins.

Particles gather.

They form:

Harry Jees

The identity holds long enough to appreciate.

Then particles slowly disperse.

The scene fades toward black.

This is a separate final particle scene.

Do not reuse the Hero particle engine if doing so creates unnecessary architectural complexity.

The portfolio should visually complete a loop:

identity
→ exploration
→ creation
→ connection
→ knowledge
→ contact
→ identity.

25. Global Visual Direction

The website must feel:

cinematic

minimal

natural

technical

human

sophisticated

high-contrast

memorable

It must NOT feel like an AI-generated template.

Avoid:

random SVGs

random images

unnecessary cards

blobs

generic glassmorphism

excessive gradients

excessive glow

gray low-contrast text

meaningless floating objects

decorative elements with no purpose

excessive animation

Every visual element must have a reason to exist.

26. Typography and Contrast

Do not use gray-heavy low-contrast text.

Primary headings:

strongest

large

highly visible

Secondary text:

smaller

slightly less dominant

still clearly readable

Labels:

small

readable

sufficiently contrasted

Use hierarchy through:

size

weight

spacing

position

controlled opacity

Do not use low opacity as a substitute for good hierarchy.

27. Scrolling and Pacing

The website must feel slower and more cinematic than the current implementation.

Every major state should remain on screen long enough for the visitor to:

see it

understand it

read it

appreciate it

continue naturally

Avoid:

rapid section changes

abrupt animation completion

aggressive snapping

instant project changes

sudden camera movements

The website should breathe.

28. Horizontal and Non-Vertical Sections

The whole website should NOT become horizontal.

Use vertical scrolling as the main input.

Specific sections can become cinematic horizontal journeys:

About

Projects

Journey

Other sections can use:

diagonal movement

depth movement

camera transitions

pinned scenes

lateral transitions

This variation is intentional.

The visitor should never feel like they are simply scrolling down a long page.

29. Lenis + GSAP

Use one global Lenis instance.

Synchronize it correctly with GSAP/ScrollTrigger.

Do not create:

one Lenis instance per section

competing smooth-scroll libraries

custom wheel systems that fight Lenis

unnecessary RAF loops

Ensure ScrollTrigger refreshes correctly after layout changes.

30. Performance

Use performant WebGL architecture.

Prefer:

BufferGeometry

Points/point clouds

GPU-friendly rendering

instancing where appropriate

limited particle counts

lazy mounting of complex section-specific scenes

disposal of unused geometries/materials/textures

Clean up:

GSAP timelines

ScrollTriggers

Anime.js scopes

event listeners

WebGL resources

Do not keep every Three.js scene rendering simultaneously.

Section-specific particle scenes should activate only when needed.

31. Responsive Design

Desktop:

Full cinematic experience.

Tablet:

Reduce scene complexity where necessary.

Mobile:

Do not simply shrink the desktop version.

Adapt:

horizontal scenes

camera movement

particle density

typography

spacing

project focus

network complexity

If a desktop horizontal scene becomes awkward on mobile, redesign the interaction for mobile rather than forcing it.

Avoid horizontal overflow.

32. Reduced Motion

Respect:

prefers-reduced-motion

When enabled:

simplify camera movement

reduce particle movement

reduce large scroll transitions

reduce parallax

reduce micro-interactions

All content must remain fully usable.

33. Accessibility

Ensure:

all links are keyboard accessible

focus states are visible

animations do not communicate essential information by themselves

project tabs remain understandable without animation

capability states remain understandable without animation

scrolling is not trapped

native accessibility behavior is not disabled unnecessarily

34. Implementation Process

Before changing code:

inspect the complete project

inspect package.json

inspect the current animation architecture

inspect the current particle implementation

inspect the current section structure

inspect the current CSS/design system

inspect current assets

identify duplicated animation systems

identify components that can be reused

identify what should be removed

Then implement section by section.

Do not modify hundreds of files blindly.

After each major section:

run the application

inspect the rendered result

fix errors

continue

35. Final Validation

Test the complete sequence:

Hero
→ portrait
→ camera movement
→ particle explosion
→ intentional Hero particle shutdown

About
→ cinematic horizontal movement

Capabilities
→ active topic focus
→ network movement

Projects
→ horizontal cinematic sequence
→ Pillow Bud hold
→ Bro App hold
→ Project 3
→ Project 4

Youth Korp
→ network environment

Journey
→ path progression

Speaking
→ active topic scaling

Contact
→ clickable links

Final
→ Harry Jees particle identity
→ fade to black

Test:

desktop

tablet

mobile

touch

keyboard

reduced motion

console

WebGL

performance

scroll synchronization

Fix:

console errors

scroll jumps

animation glitches

overlapping sections

low contrast

excessive effects

rushed timing

responsive problems

36. Final Creative Standard

The final website should NOT feel like:

"Here is my portfolio with some animations."

It should feel like:

"You are moving through Harry Jees' digital world."

The visitor should experience:

INTRODUCTION
→ IDENTITY
→ EXPLORATION
→ CAPABILITY
→ CREATION
→ COMMUNITY
→ GROWTH
→ KNOWLEDGE
→ CONNECTION
→ IDENTITY AGAIN

Every major movement should support this story.

Every library should have a clear purpose.

Every effect should support the experience.

Do not add effects simply because a library provides them.

The final experience should be:

CINEMATIC
MINIMAL
NATURAL
RESPONSIVE
HIGH-CONTRAST
TECHNICAL
HUMAN
MEMORABLE

Most importantly:

DO NOT MAKE THE ENTIRE WEBSITE A VERTICAL SCROLL WITH ANIMATION ON TOP.

Use vertical scrolling as the primary input, but let it control:

horizontal journeys

diagonal transitions

camera movement

depth

pinning

scene changes

cinematic compositions

The visitor should never feel like they are simply scrolling down a long webpage.

The guiding principle:

The animation is not decoration. It is part of the storytelling.