// Animazione panoramica
import * as THREE from 'three';
import * as OBC from '@thatopen/components';
import * as WEBIFC from 'web-ifc';
import useFile from '../hooks/useFile';
import useProperties from '../hooks/useProperties';
import useRelations from '../hooks/useRelations';
import { memo, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animazione panoramica
const components = new OBC.Components();
const worlds = components.get(OBC.Worlds);
const world = worlds.create();
const indexer = components.get(OBC.IfcRelationsIndexer);
const exploder = components.get(OBC.Exploder);
const classifier = components.get(OBC.Classifier);
const fragments = components.get(OBC.FragmentsManager);

const backgroundColors = [
  // Animazione panoramica
    new THREE.Color().setHex(0xf0f4f8), // 0 - Light Gray
    new THREE.Color().setHex(0xd9e2ec), // 1 - Lighter Blue Gray
    new THREE.Color().setHex(0xbcccdc), // 2 - Light Blue Gray
    new THREE.Color().setHex(0x9fb3c8), // 3 - Blue Gray
    new THREE.Color().setHex(0x829ab1), // 4 - Darker Blue Gray
    new THREE.Color().setHex(0x627d98), // 5 - Dark Blue Gray
    new THREE.Color().setHex(0x486581), // 6 - Darker Blue
    new THREE.Color().setHex(0x334e68), // 7 - Dark Blue
    new THREE.Color().setHex(0x243b53), // 8 - Darker Blue Black
    new THREE.Color().setHex(0x102a43), // 9 - Dark Blue Black
    new THREE.Color().setHex(0xffe0e0), // 10 - Light Pink
    new THREE.Color().setHex(0xffc1c1), // 11 - Pink
    new THREE.Color().setHex(0xffa3a3), // 12 - Dark Pink
    new THREE.Color().setHex(0xff8585), // 13 - Light Red
    new THREE.Color().setHex(0xff6666), // 14 - Red
    new THREE.Color().setHex(0xff4747), // 15 - Dark Red
    new THREE.Color().setHex(0xff2929), // 16 - Darker Red
    new THREE.Color().setHex(0xff0a0a), // 17 - Darkest Red
    new THREE.Color().setHex(0xe0ffe0), // 18 - Light Green
    new THREE.Color().setHex(0xc1ffc1), // 19 - Green
    new THREE.Color().setHex(0xa3ffa3), // 20 - Dark Green
    new THREE.Color().setHex(0x85ff85), // 21 - Light Lime
    new THREE.Color().setHex(0x66ff66), // 22 - Lime
    new THREE.Color().setHex(0x47ff47), // 23 - Dark Lime
    new THREE.Color().setHex(0x29ff29), // 24 - Darker Lime
    new THREE.Color().setHex(0x0aff0a), // 25 - Darkest Lime
    new THREE.Color().setHex(0xe0e0ff), // 26 - Light Blue
    new THREE.Color().setHex(0xc1c1ff), // 27 - Blue
    new THREE.Color().setHex(0xa3a3ff), // 28 - Dark Blue
    new THREE.Color().setHex(0x8585ff), // 29 - Light Indigo
    new THREE.Color().setHex(0x6666ff), // 30 - Indigo
    new THREE.Color().setHex(0x4747ff), // 31 - Dark Indigo
    new THREE.Color().setHex(0x2929ff), // 32 - Darker Indigo
    new THREE.Color().setHex(0x0a0aff), // 33 - Darkest Indigo
    new THREE.Color().setHex(0xffffe0), // 34 - Light Yellow
    new THREE.Color().setHex(0xffffc1), // 35 - Yellow
    new THREE.Color().setHex(0xffffa3), // 36 - Dark Yellow
    new THREE.Color().setHex(0xffff85), // 37 - Light Gold
    new THREE.Color().setHex(0xffff66), // 38 - Gold
    new THREE.Color().setHex(0xffff47), // 39 - Dark Gold
    new THREE.Color().setHex(0xffff29), // 40 - Darker Gold
    new THREE.Color().setHex(0xffff0a), // 41 - Darkest Gold

    // Neon Colors
    new THREE.Color().setHex(0xff00ff), // 42 - Neon Magenta
    new THREE.Color().setHex(0x00ffff), // 43 - Neon Cyan
    new THREE.Color().setHex(0x39ff14), // 44 - Neon Green
    new THREE.Color().setHex(0xff1493), // 45 - Neon Pink
    new THREE.Color().setHex(0xff4500), // 46 - Neon Orange
    new THREE.Color().setHex(0xffff00), // 47 - Neon Yellow
    new THREE.Color().setHex(0x8a2be2), // 48 - Neon Purple
    new THREE.Color().setHex(0x00ff00), // 49 - Neon Lime
    new THREE.Color().setHex(0x1e90ff), // 50 - Neon Blue
    new THREE.Color().setHex(0xffd700), // 51 - Neon Gold
];



export const ExploderComponent = memo(() => {
  // Animazione panoramica
  const { result: fileResult } = useFile();
  const { result: propertiesResult } = useProperties();
  const { result: relationsResult } = useRelations();
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

// Animazione panoramica
  useEffect(() => {
    if (container.current && !loaded) {
      console.log(container);
      world.scene = new OBC.SimpleScene(components);
      world.renderer = new OBC.SimpleRenderer(components, container.current);
      world.camera = new OBC.SimpleCamera(components);
      if (world.camera.controls) {
        world.camera.controls.camera.position.set(0, 50, 0);
        world.camera.controls.camera.lookAt(0, 0, 0);
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

// Animazione panoramica
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
    }
  }, [loaded, fileResult, relationsResult]);

// Animazione panoramica
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

      
      tl.current.to(world.camera.controls.camera.position, {
        ease: 'power3.out',
        x: 30,
        y: 25,
        z: 40,
        duration: 3,
        onUpdate: function () {
          exploder.set(false);
          if (world.camera.controls) {
            world.camera.controls.camera.lookAt(0, 0, -4);
          }
        },
      })
        .to(world.camera.controls.camera.position, {
          ease: 'power2.inOut',
          x: 10,
          y: 18,
          z: 20,
          duration: 3,
          delay: 0.5,
          onUpdate: function () {
            exploder.set(false);
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -4);
              }
          },
        })
        .to(world.camera.controls.camera.position, {
          ease: 'power2.out',
          x: -10,
          z: 18,
          y: 12,
          duration: 3,
          onStart: function () {
                exploder.set(true);

          },
          onUpdate: function () {
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -4);
            }
          },
        })
        .to(world.camera.controls.camera.position, {
          ease: 'expo.inOut',
          x: 0,
          y: 10,
          z: 8,
          duration: 3.5,
          delay: 0.2,
          onUpdate: function () {
            exploder.set(true);
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -4);
            }
          },
        })
        .to(world.camera.controls.camera.position, {
          ease: 'power3.out',
          x: 8,
          y: 15,
          z: 0,
          duration: 3,
          onUpdate: function () {
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -4);
            }
          },
        })
        .to(world.camera.controls.camera.position, {
          ease: 'expo.inOut',
          x: 0,
          y: 50,
          z: 0,
          duration: 3,
          onUpdate: function () {
            exploder.set(true);
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -4);
            }
          },
        })
        .to(world.camera.controls.camera.rotation, {
          ease: 'power2.out',
          y: Math.PI * 2,
          duration: 3,
          onUpdate: function () {
            if (world.camera.controls) {
                world.camera.controls.camera.lookAt(0, 0, -4);
            }
            exploder.set(false);
          },
        });
    }
  }, [loaded, world]);

  return (
      <div id="container" ref={container}></div>
  );
});

export default ExploderComponent;
