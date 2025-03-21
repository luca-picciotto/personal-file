import "../assets/styles/content.css";

import { useRef } from "react";

import { Header } from "./Header";
import HeroText from "./HeroText";
import Popup from "./Popup";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import TextShower from "./TextShower";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const Content = () => {
  const tlBim = useRef<gsap.core.Timeline>(null);
  const popLeft = useRef<HTMLDivElement>(null);
  const popRight = useRef<HTMLDivElement>(null);
  const textShower = useRef<HTMLDivElement>(null);
  const textShowerRef = useRef<HTMLDivElement>(null);
  const textShowerMiddleRef = useRef<HTMLDivElement>(null);
  const rotationSecRef = useRef<HTMLDivElement>(null);
  const endTextShowerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    tlBim.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: "#start",
          start: "top 80%",
          end: "20% 80%",
          scrub: 0.2,
        },
      })
      .fromTo(
        "#hero .b",
        {
          x: -110,
        },
        {
          x: -200,
          y: -150,
          opacity: 0,
          duration: 3,
        },
        0
      )
      .fromTo(
        "#hero .m",
        {
          x: 110,
        },
        {
          x: 200,
          y: -150,
          opacity: 0,
          duration: 3,
        },
        0
      );
  });

  useGSAP(() => {
    gsap.to(popLeft.current, {
      opacity: 0,
    });
    gsap.to(popRight.current, {
      opacity: 0,
    });
    // PINNED
    gsap.to(popLeft.current, {
      scrollTrigger: {
        trigger: "#start",
        endTrigger: "#endPopup",
        start: "15% top",
        end: "bottom center",
        scrub: 0.2,
        pin: popLeft.current,
      },
    });

    gsap.to(popRight.current, {
      scrollTrigger: {
        start: "top 30%",
        endTrigger: "#endPopup",
        end: "bottom center",
        scrub: 0.2,
        pin: popRight.current,
      },
    });

    // OPACITY -> 1
    gsap.fromTo(
      popLeft.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 3,
        scrollTrigger: {
          trigger: popLeft.current,
          start: "-50% center",
          end: "top center",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      popRight.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 3,
        scrollTrigger: {
          trigger: popRight.current,
          start: "-50% center",
          end: "top center",
          scrub: 2,
        },
      }
    );

    // OPACITY -> 0
    gsap.fromTo(
      popLeft.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#endPopup",
          start: "top center",
          end: "bottom center",
          endTrigger: "#endPopup",
          scrub: 2,
        },
      }
    );
    gsap.fromTo(
      popRight.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#endPopup",
          start: "top center",
          end: "bottom center",
          endTrigger: "#endPopup",
          scrub: 2,
        },
      }
    );
  }, [popLeft, popRight]);

  useGSAP(() => {
    gsap.to(textShower.current, {
      scrollTrigger: {
        trigger: textShower.current,
        endTrigger: "#endTextShower",
        start: "top 100px",
        end: "top top",
        pin: textShower.current,
      },
    });
  });

  return (
    <div className="hover">
      <Header />
      <section id="hero">
        <p className="b">B</p>
        <p className="m">M</p>
        <HeroText />
      </section>

      <section id="start" className="left">
        <Popup ref={popLeft} />
      </section>
      <section className="right">
        <Popup ref={popRight} />
      </section>
      <section id="endPopup"></section>

      <section id="prova" ref={textShowerRef}>
        <TextShower ref={textShower} />
      </section>
      <section id="textShowerMiddle" ref={textShowerMiddleRef}></section>
      <section id="rotationSec" ref={rotationSecRef}></section>
      <section id="endTextShower" ref={endTextShowerRef}></section>
      <section></section>
      <section></section>
      <section id="footer">
        <p className="b">B</p>
        <p className="m">M</p>
      </section>
    </div>
  );
};
