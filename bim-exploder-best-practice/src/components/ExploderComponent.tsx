import * as OBC from '@thatopen/components';
import * as WEBIFC from 'web-ifc';
import useFile from '../hooks/useFile';
import useProperties from '../hooks/useProperties';
import useRelations from '../hooks/useRelations';
import { memo, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { backgroundColors } from '../assets/COLORS';
import * as THREE from 'three';
import { FragmentsGroup } from "@thatopen/fragments";

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
  const lastValidPosition = useRef(new THREE.Vector3(1, 1, -7));
  useEffect(() => {
    if (container.current && !loaded) {
      console.log(container);
      world.scene = new OBC.SimpleScene(components);
      world.renderer = new OBC.SimpleRenderer(components, container.current);
      world.camera = new OBC.SimpleCamera(components);
      if (world.camera.controls) {
        world.camera.controls.camera.position.set(0, 50, 0);
        world.camera.controls.camera.lookAt(0, 0, -1);
        world.camera.controls.enabled = false;
      }
      //   @ts-expect-error
      world.scene.setup();
      components.init();
      setLoaded(true);
      //   @ts-expect-error
      world.scene.three.background = backgroundColors[50];
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
      classifier.bySpatialStructure(model, {
        isolate: new Set([WEBIFC.IFCBUILDINGSTOREY]),
      });
      model.position.set(0, 0, 0);
      
    }
  }, [loaded, fileResult, relationsResult]);

  useEffect(() => {
    if (!tl.current && world.camera.controls !== undefined) {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: ".hover",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Animazione panoramica
      tl.current.to(world.camera.controls.camera.position, {
        ease: 'power3.out',
        x:8.7,
        y:14.2,
        z:9.12,
        duration: 3,
        onUpdate: function () {
          exploder.set(false);
          if (world.camera.controls) {
            world.camera.controls.camera.lookAt(0, 0, -1);
          }
        },
      })
        
        .to(world.camera.controls.camera.position, {
          ease: 'power2.inOut',
          x:-0.1,
          y:0.2,
          z:2.1,
        
          duration: 3,
          delay: 0.5,
          onUpdate: function () {
            exploder.set(false);
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -1);
              }
          },
        })
        
        
        // i problema è qui
        .to(world.camera.controls.camera.position, {
          x: 1,
          y: 1,
          z: -7, // Permettiamo di avanzare fino a -15
          ease: 'power2.inOut',
          duration: 3,
          delay: 0.5,
          onReverseComplete: function () {
            if (world.camera.controls) {
              world.camera.controls.camera.lookAt(0, 0, -1);
            }
        
          }
        })
        
        
        .to(world.camera.controls.camera.position, {
          ease: 'power2.inOut',
          x:13,
          y:9.7,
          z:14,
          duration: 3,
          delay: 0.5,
          onUpdate: function () {
            exploder.set(false);
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -1);
              }
          },
        })
        .to(world.camera.controls.camera.position, {
          ease: 'power2.inOut',
          x:0,
          y:50,
          z:0,

          duration: 3,
          delay: 0.5,
          onUpdate: function () {
            exploder.set(false);
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -1);
              }
          },
        })
        
        
        
        // .to(world.camera.controls.camera.position, {
        //   ease: 'power2.out',
        //   x:13,
        //   y:9.7,
        //   z:14,
        //   duration: 3,
        //   onStart: function () {
        //         exploder.set(true);

        //   },
        //   onUpdate: function () {
        //     if (world.camera.controls) {
        //         world.camera.controls.camera.lookAt(0, 0, -1);
        //     }
            
        //   },
        // })
        


        // .to(world.camera.controls.camera.position, {
        //   ease: 'expo.inOut',
        //   x: 0,
        //   y: 10,
        //   z: 8,
        //   duration: 3.5,
        //   delay: 0.2,
        //   onUpdate: function () {
        //     exploder.set(true);
        //     if (world.camera.controls) {
        //         world.camera.controls.camera.lookAt(0, 0, -1);
        //     }
        //   },
        // })
        // .to(world.camera.controls.camera.position, {
        //   ease: 'power3.out',
        //   x: 8,
        //   y: 15,
        //   z: 0,
        //   duration: 3,
        //   onUpdate: function () {
        //     if (world.camera.controls) {
        //         world.camera.controls.camera.lookAt(0, 0, -1);
        //     }
        //   },
        // })
        // .to(world.camera.controls.camera.position, {
        //   ease: 'expo.inOut',
        //   x: 0,
        //   y: 50,
        //   z: 0,
        //   duration: 3,
        //   onUpdate: function () {
        //     exploder.set(true);
        //     if (world.camera.controls) {
        //         world.camera.controls.camera.lookAt(0, 0, -1);
        //     }
        //   },
        // })
        // .to(world.camera.controls.camera.rotation, {
        //   ease: 'power2.out',
        //   y: Math.PI * 2,
        //   duration: 3,
        //   onUpdate: function () {
        //     if (world.camera.controls) {
        //         world.camera.controls.camera.lookAt(0, 0, -1);
        //     }
        //     exploder.set(false);
        //   },
        // });
    }
  }, [loaded, world]);

  return (
      <div id="container" ref={container}></div>
  );
});

export default ExploderComponent;
