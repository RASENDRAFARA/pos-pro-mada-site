import './App.css'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Comparison from './components/Comparison.jsx'
import Audience from './components/Audience.jsx'
import Platforms from './components/Platforms.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Comparison />
        <Audience />
        <Platforms />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
