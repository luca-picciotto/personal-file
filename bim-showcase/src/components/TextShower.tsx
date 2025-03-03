import { forwardRef, useRef } from 'react';
import '../assets/styles/textShower.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const TextShower = forwardRef<HTMLDivElement>(( _ , ref) => {

    const hRef1 = useRef<HTMLSpanElement>(null);
    const cRef1 = useRef<HTMLSpanElement> (null);
    const hRef2 = useRef<HTMLSpanElement>(null);
    const cRef2 = useRef<HTMLSpanElement> (null);
    const hRef3 = useRef<HTMLSpanElement>(null);
    const cRef3 = useRef<HTMLSpanElement> (null);
    const hRef4 = useRef<HTMLSpanElement>(null);
    const cRef4 = useRef<HTMLSpanElement> (null);
    const tsp1 = useRef<HTMLParagraphElement>(null);
    const tsp2 = useRef<HTMLParagraphElement>(null);
    const tsp3 = useRef<HTMLParagraphElement>(null);

    const tl = useRef<gsap.core.Timeline>(null);

    // useGSAP(() => {

    //     tl.current = gsap.timeline();

    //     tl.current.to(tsp1.current, {
    //         opacity:1,
    //         scrollTrigger: {
    //             trigger: ".text-shower",
    //             start: "-20% top",
    //             end: "20%",
    //             scrub: 1
    //         }
    //     })
    //     .to(tsp1.current, {
    //         duration: 5,
    //         x: 60,
    //         rotateY: -20,
    //         scale: 0.1,
    //         // y: -50,
    //         // x: 30,
    //         z: 450,
    //         scrollTrigger: {
    //             trigger: ".text-shower",
    //             start: "20% top",
    //             end: "500%",
    //             scrub: true
    //         }
    //     })
    //     .to(tsp2.current, {
    //         opacity: 1,
    //         scrollTrigger: {
    //             trigger: ".text-shower",
    //             start: "900% top",
    //             end: "1200%",
    //             scrub: 1,

    //         }
    //     },1)
    //     .to(tsp3.current, {
    //         opacity: 1,
    //         scrollTrigger: {
    //             trigger: ".text-shower",
    //             start: "900% top",
    //             end: "1200%",
    //             scrub: 1,
    //         }
    //     },1)
    //     .to(tsp2.current, {
    //         duration: 5,
    //         rotateY: 16,
    //         scale: 0.1,
    //         x: -32,
    //         z: 400,
    //         y: -10,
    //         scrollTrigger: {
    //             trigger: ".text-shower",
    //             start: "1550% top",
    //             end: "1750%",
    //             scrub: true,
    //         }
    //     })
    //     .to(tsp3.current, {
    //         duration: 5,
    //         rotateY: -16,
    //         scale: 0.1,
    //         x: 32,
    //         z: 400,
    //         y: -5,
    //         scrollTrigger: {
    //             trigger: ".text-shower",
    //             start: "1550% top",
    //             end: "1750%",
    //             scrub: true,
    //         }
    //     })
    // })

    return(
        <div className="text-shower" ref={ref}>
            <p id='tsp-1' ref={tsp1}>
                <span ref={hRef1} >Nessun limite di peso</span>
                <span ref={cRef1} >IFC fino a 1GB in alta fedeltà, con prestazioni eccellenti anche da mobile e tablet</span>
            </p>
            <p id='tsp-2' ref={tsp2}>
                <span ref={hRef2} >I tuoi documenti a disposizione</span>
                <span ref={cRef2} >Allega documenti ai singoli elementi all'interno del tuo file IFC</span>
            </p>
            <p id='tsp-3' ref={tsp3}>
                <span ref={hRef3} >Workspace condiviso</span>
                <span ref={cRef3} >Condividi i tuoi modelli versionati con i tuoi clienti e collaboratori. Tieni al sicuro i tuoi file garantendo accesso solo a chi vuoi.</span>
            </p> 
            {/* <p>
                <span ref={hRef4} >Facilita il lavoro del tuo team</span>
                <span ref={cRef4} >Composizione di più modelli, calcolo delle distanze e clashing degli oggetti tutto integrato</span>
            </p> */}


        </div>
    );
} 

)
export default TextShower;