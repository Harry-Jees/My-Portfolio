import { AnimationFoundation } from './foundation/AnimationFoundation.jsx'
import { Hero } from '../sections/Hero/Hero.jsx'
import { About } from '../sections/About/About.jsx'
import { Skills } from '../sections/Skills/Skills.jsx'
import { Projects } from '../sections/Projects/Projects.jsx'

function App() {
  return (
    <AnimationFoundation>
      <main className="app-shell" aria-label="Portfolio application">
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
    </AnimationFoundation>
  )
}

export default App
