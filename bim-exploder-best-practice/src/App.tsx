import gsap from 'gsap'
import './App.css'
import Layout from './components/Layout'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ReactLenis, { useLenis } from 'lenis/react';


gsap.registerPlugin(ScrollTrigger);

function App() {

    useLenis(() => {
        ScrollTrigger.update()
      })
  return (
    <ReactLenis
        options={{ smoothWheel: true, duration: 1.2 } } root
    >
        <Layout />
    </ReactLenis>
  )
}

export default App
