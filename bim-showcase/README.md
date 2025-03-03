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

    const tl = useRef<gsap.core.Timeline>(null);

    useGSAP(() => {
        gsap.to(hRef1.current, {
            text: "Nessun limite di peso",
            duration: 2,
            scrollTrigger: {
                trigger:"#prova",
                start: "top 100px",
            }
        });
        gsap.fromTo(cRef1.current, {
            opacity: 0
        }, {
            opacity: 1,
            duration: 3,
            scrollTrigger: {
                trigger:"#prova",
                start: "top 100px",
            }
        });

        gsap.to(hRef2.current, {
            text: "I tuoi documenti a disposizione",
            duration: 2,
            scrollTrigger: {
                trigger: "#prova",
                start: "10% 100px",
            }
        });
        gsap.fromTo(cRef2.current, {
            opacity: 0
        }, {
            opacity: 1,
            duration: 3,
            scrollTrigger: {
                trigger: "#prova",
                start: "10% 100px",
            }
        });

    }, [ref])

    useGSAP(() => {
        tl.current = gsap.timeline()
        gsap.fromTo(tsp1.current, {
            opacity: 0,
            scale: 0.5
        }, {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                
                trigger: tsp1.current,
                scrub: 5,
                start: "top 300px",
                end: "150% 600px"
            }
        });
        tl.current.to(tsp1.current, {x: -200});
        tl.current.fromTo(tsp1.current, {
            x:-200,
            // scale: 0.5,
            // opacity: 0,
        }, {
            x:-500,
            ease: "none",
            // scale: 1,
            // opacity:1,
            scrollTrigger: {
                
                trigger: tsp1.current,
                scrub:5,
                start: "top 200px",
                end: "150% 500px"
            }
        });

        gsap.fromTo(tsp2.current, {
            opacity: 0,
            scale: 0.5
        }, {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                
                trigger: tsp2.current,
                scrub: 5,
                start: "20% 300px",
                end: "150% 600px"
            }
        })

        gsap.fromTo(tsp2.current, {
            x: 0,
            y: 200
        }, {
            x: 200,
            y: -10,
            ease: "none",

            scrollTrigger: {

                trigger: tsp2.current,
                scrub:5,
                start: "20% 200px",
                end: "150% 500px"
            }
        });

        tl.current.fromTo(tsp1.current, {x: -500}, {
            x: -10000,
            scrollTrigger: {
                markers: true,
                trigger: "#textShowerMiddle",
                start: "20% center",
                end: "center center",
                scrub: 1
            }
        })
    })

    return(
        <div className="text-shower" ref={ref}>
            <p id='tsp-1' ref={tsp1}>
                <span ref={hRef1} ></span>
                <span ref={cRef1} >IFC fino a 1GB in alta fedeltà, con prestazioni eccellenti anche da mobile e tablet</span>
            </p>
            <p id='tsp-2' ref={tsp2}>
                <span ref={hRef2} ></span>
                <span ref={cRef2} >Allega documenti ai singoli elementi all'interno del tuo file IFC</span>
            </p>
            {/* <p>
                <span ref={hRef3} >Workspace condiviso</span>
                <span ref={cRef3} >Condividi i tuoi modelli versionati con i tuoi clienti e collaboratori. Tieni al sicuro i tuoi file garantendo accesso solo a chi vuoi.</span>
            </p>
            <p>
                <span ref={hRef4} >Facilita il lavoro del tuo team</span>
                <span ref={cRef4} >Composizione di più modelli, calcolo delle distanze e clashing degli oggetti tutto integrato</span>
            </p> */}


        </div>
    );
} 

)
export default TextShower;