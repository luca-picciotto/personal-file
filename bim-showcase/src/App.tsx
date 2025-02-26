import ReactLenis, { useLenis } from 'lenis/react'
import './App.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';

function App() {

  useLenis( () => ScrollTrigger.update() );

  return (
   <ReactLenis
        options={{ smoothWheel: true, duration: 1.2 } } root
    >
        <Layout />
    </ReactLenis>

  )
}

export default App
