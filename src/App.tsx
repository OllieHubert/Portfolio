import { About } from './components/About'
import { Clinic } from './components/Clinic'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { NextUp } from './components/NextUp'
import { PixelField } from './components/PixelField'
import { Projects } from './components/Projects'

function App() {
  return (
    <div className="site">
      <PixelField />
      <Nav />
      <main>
        <Hero />
        <About />
        <Clinic />
        <Projects />
        <NextUp />
      </main>
      <Footer />
    </div>
  )
}

export default App
