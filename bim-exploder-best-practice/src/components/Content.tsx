import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import PopUp from "./PopUp";

gsap.registerPlugin(ScrollTrigger);

export const Content = () => {
  const tl = useRef(gsap.timeline());

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const popUpRefs = useRef<{ left?: HTMLDivElement | null; right?: HTMLDivElement | null; center?: HTMLDivElement | null }[]>([]);
  const firstSection = useRef<HTMLDivElement | null>(null);

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  const setPopUpRef = (el: HTMLDivElement | null, index: number, direction: "left" | "right" | "center") => {
    if (!popUpRefs.current[index]) {
      popUpRefs.current[index] = {};
    }
    popUpRefs.current[index][direction] = el;
  };

  useGSAP(() => {
    if (!popUpRefs.current.length || !sectionRefs.current.length) return;

    popUpRefs.current.forEach((popUpPair, index) => {
      const section = sectionRefs.current[index];
      if (!section) return;

      ["left", "right", "center"].forEach((dir) => {
        const popUp = popUpPair[dir as "left" | "right" | "center"];
        if (!popUp) return;

        tl.current.to(popUp, {
          opacity: 0,
          scrollTrigger: {
            trigger: firstSection.current,
            start: "top top",
            end: "bottom bottom",
          },
        })
        .fromTo(popUp, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "30% center",
            toggleActions: "play complete none none",
            
            scrub: true,
          },
        }, 0.1)
        .to(popUp, {
          scrollTrigger: {
            markers: true,
            start: "top center",
            end: "bottom center",
            pin: popUp,
            endTrigger: section,
          },
        }, 0.5)
        .fromTo(popUp, { opacity: 1 }, {
          opacity: 0,
          duration: 2,
          scrollTrigger: {
            trigger: section,
            start: "80% center",
            end: "bottom center",
            toggleActions: "play complete none none",
            scrub: true,
          },
        }, 1);
      });
    });
  }, []);

  return (
    <div id="smooth-content" className="hover">
      <div className="section section-1" ref={firstSection}>1</div>

      <div className="section multiple-pop-up" ref={(el) => setSectionRef(el, 0)}>
        <PopUp direction="center" ref={(el) => setPopUpRef(el, 0, "center")} />
        <PopUp direction="right" ref={(el) => setPopUpRef(el, 0, "right")} />
        <PopUp direction="left" ref={(el) => setPopUpRef(el, 0, "left")} />

      </div>

      <div className="section " ref={(el) => setSectionRef(el, 1)}>
        <PopUp direction="center" ref={(el) => setPopUpRef(el, 1, "center")} />

      </div>

      <div className="section " ref={(el) => setSectionRef(el, 2)}>
        <PopUp direction="right" ref={(el) => setPopUpRef(el, 2, "right")} />
      </div>

      <div className="section " ref={(el) => setSectionRef(el, 3)}>
        <PopUp direction="left" ref={(el) => setPopUpRef(el, 3, "left")} />
      </div>

      <div className="section section-4">4</div>
    </div>
  );
};
