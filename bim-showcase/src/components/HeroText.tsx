import '../assets/styles/heroText.css'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import {  useRef } from "react";

gsap.registerPlugin(TextPlugin);
export const HeroText = () => {

    const tl = useRef<gsap.core.Timeline>(null)
    gsap.defaults({ ease: "none"});

    useGSAP(() => {
        tl.current = gsap.timeline();
        tl.current
        .to(".spanAll", {
            duration: 2,
            text: " ", 
            direction: "left",
            scrollTrigger: {
                trigger: "#start",
                start: "top 80%",
                end: "20% 80%",
                scrub: 1
            }
        },0.5)

    });
    

    return (
        <div className="wrapper">
                <h2 className="sub-title"><span className='spanAll'>La piattaforma bim online</span></h2>
                <h3><span className="spanAll">tra potenza e facilità di utilizzo</span></h3>
        </div>
    );
}

export default HeroText;