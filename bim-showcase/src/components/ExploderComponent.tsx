import "../assets/styles/exploder.css";
import * as OBC from "@thatopen/components";
import * as WEBIFC from "web-ifc";
import useFile from "../hooks/useFile";
import useProperties from "../hooks/useProperties";
import useRelations from "../hooks/useRelations";
import { memo, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { backgroundColors } from "../assets/COLORS";
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const components = new OBC.Components();
const worlds = components.get(OBC.Worlds);
const world = worlds.create();
const indexer = components.get(OBC.IfcRelationsIndexer);
const exploder = components.get(OBC.Exploder);
const classifier = components.get(OBC.Classifier);
const fragments = components.get(OBC.FragmentsManager);

export const ExploderComponent = memo(() => {
  const { result: fileResult } = useFile();
  const { result: propertiesResult } = useProperties();
  const { result: relationsResult } = useRelations();
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (container.current && !loaded) {
      console.log(container);
      world.scene = new OBC.SimpleScene(components);
      world.renderer = new OBC.SimpleRenderer(components, container.current);
      world.camera = new OBC.SimpleCamera(components);
      if (world.camera.controls) {
        world.camera.controls.camera.position.set(0, 50, 0);
        world.camera.controls.camera.lookAt(0, 0, -7);
        world.camera.controls.enabled = false;
      }
      //   @ts-expect-error
      world.scene.setup();
      components.init();
      setLoaded(true);
      //   @ts-expect-error
      world.scene.three.background = backgroundColors[9];
    }
  }, [container.current, loaded]);

  useEffect(() => {
    if (loaded && fileResult) {

      const buffer = new Uint8Array(fileResult);
      const model = fragments.load(buffer);
      world.scene.three.add(model);
      model.setLocalProperties(propertiesResult);
      const relations = indexer.getRelationsMapFromJSON(relationsResult);
      indexer.setRelationMap(model, relations);
      indexer.process(model);
      classifier.bySpatialStructure(model, {
        isolate: new Set([WEBIFC.IFCBUILDINGSTOREY]),
      });

      classifier.byEntity(model);
      model.position.set(0, 0, 0);
      // console.log(classifier);
      const slab = classifier.find({
        entities: ["IFCSLAB"],
      });
      classifier.setColor(slab, backgroundColors[58]);
      //   console.log(classifier);
      //   console.log(model.getObjectByName("Pset_QuantityTakeOff"));
      //   console.log(model.getItemVertices(22620));
    }
  }, [loaded, fileResult, relationsResult]);

  useEffect(() => {
    if (!tl.current && world.camera.controls !== undefined) {
        const spherical = new THREE.Spherical(15, 0.9553166181245093, 0); // Iniziale: raggio, phi, theta
        const yStart = 10; 
        const yEnd = 40;


      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: ".hover",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      
      tl.current
        .to(
          world.camera.controls.camera.position,
          {
            x: 0,
            y: 30,
            z: 0,
            duration: 3,

            onUpdate: function () {
              if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 1, -7);
              }
            },
          },
          "startExploration"
        )
        .to(world.camera.controls.camera.position, {
          ease: "power3.out",
          x: 8.7,
          y: 14.2,
          z: 9.12,
          duration: 5,
          onUpdate: function () {
            exploder.set(false);

            if (world.camera.controls) {
              world.camera.controls.camera.lookAt(0, 1, -7);
            }
          },
        })

        .to(world.camera.controls.camera.position, {
          ease: "none",
          x: -1,
          y: 0.2,
          z: 2.5,

          duration: 2,
          onUpdate: function () {
            exploder.set(true);
            if (world.camera.controls) {
              world.camera.controls.camera.lookAt(-1, 1, -7);
            }
          },
        })
        .to(world.camera.controls.camera.position, {
          x: -1,
          y: 1,
          z: 0.1,
          ease: "none",
          duration: 15,
          onUpdate: function () {
            if (world.camera.controls) {
              world.camera.controls.camera.lookAt(-1, 1, -9);
            }
          },
        })

        .to(world.camera.controls.camera.position, {
          x: -1,
          y: 1,
          z: -2.5,
          ease: "none",
          duration: 15,
          onUpdate: function () {
            if (world.camera.controls) {
              world.camera.controls.camera.lookAt(-1, 1, -9);
            }
          },
        })

        .to(world.camera.controls.camera.position, {
          x: -1,
          y: 1,
          z: -8,
          ease: "none",
          duration: 15,
          onUpdate: function () {
            if (world.camera.controls) {
              world.camera.controls.camera.lookAt(-1, 1, -12);
            }
          },
        })
        .to(world.camera.controls.camera.position, {
          x: -1,
          y: 10,
          z: 10,
          ease: "none",
          duration: 10,
          
          onUpdate: function () {
            if (world.camera.controls) {
              world.camera.controls.camera.lookAt(-1, 1, -9);
            }
          },
          
        })
        .to(spherical, {
            theta: "+=" + Math.PI * 2, 
            duration: 20,
            ease: "none",
           
            onUpdate: function () {
              if (world.camera.controls) {
                const progress = this.progress(); 
                const pos = new THREE.Vector3().setFromSpherical(spherical);
                pos.y = yStart + progress * (yEnd - yStart); 
      
                world.camera.controls.camera.position.copy(pos);
                world.camera.controls.camera.lookAt(-1, 1, -7);
              }
            },
            onComplete: function () {
              exploder.set(false);
            },
          })

        // .to(world.camera.controls.camera.position, {
        //   duration: 50, // Aumentiamo la durata per un'orbita più lenta
        //   ease: "none",
        //   onStart: function () {
        //     if (world.camera.controls) {
        //       // console.log(JSON.parse(JSON.stringify(world.camera.controls)));
        //       console.log(world.camera.controls);
        //       debugger;
        //     }
        //   },

        //   onUpdate: function () {
        //     const progress = this.progress(); // Valore da 0 a 1
        //     const angle = progress * Math.PI * 2 ; // Rotazione completa di 360°
        //     const radius = 15;
        //     const offsetX = -21; 
        //     const offsetZ = 10; 
        //     const y = 10 + progress * 30; // Sale gradualmente da 15 a 40
        //     // console.log(world.camera.controls);

           
        //     const x = -(-5 - Math.cos(angle) * radius) + offsetX;
        //     const z = -(-10 - Math.sin(angle) * radius) ; 
        //     if(progress == 0) console.log("X: ", x, "Y: ", y, "Z: ", z);
        //     if(progress > 0.5 && progress< 0.51) console.log("X: ", x, "Y: ", y, "Z: ", z);
        //     if(progress == 1) console.log("X: ", x, "Y: ", y, "Z: ", z);
        //     // const y = 40; // Manteniamo l'altezza a 40
        //     if (world.camera.controls) {
        //       world.camera.controls.camera.position.setX(x);
        //       world.camera.controls.camera.position.setY(y); // Aggiorna Y dinamicamente

        //       world.camera.controls.camera.position.setZ(z);
        //       world.camera.controls.camera.lookAt(-1, 1, -10); // La camera guarda sempre il centro
        //     }
        //   },
        //   onComplete: function () {
        //     exploder.set(false);
        //   },
        // })
        
        // ! ultimo pezzo di animazione
        .to(world.camera.controls.camera.position, {
          ease: "none",
          x: 0,
          y: 50,
          z: 0,

          duration: 10,
          onUpdate: function () {
            if (world.camera.controls) {
              world.camera.controls.camera.lookAt(0, 1, -7);
            }
          },
          onComplete: function () {
            exploder.set(false);
          },
        });
    }
  }, [loaded, world]);

  return <div id="container" ref={container}></div>;
});

export default ExploderComponent;
