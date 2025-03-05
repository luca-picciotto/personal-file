// my import
import "../assets/styles/exploder.css";
import useFinder from "../hooks/useFinder";
import { backgroundColors } from "../assets/COLORS";
// react
import { memo, useEffect, useRef, useState } from "react";
// model's controls
import * as THREE from "three";
import * as WEBIFC from "web-ifc";
import * as OBC from "@thatopen/components";
import { FragmentsGroup } from "@thatopen/fragments";
// animations
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useRelations from "../hooks/useRelations";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const components = new OBC.Components();
const worlds = components.get(OBC.Worlds);
const world = worlds.create();
const indexer = components.get(OBC.IfcRelationsIndexer);
const exploder = components.get(OBC.Exploder);
const classifier = components.get(OBC.Classifier);
const hider = components.get(OBC.Hider);
const ifcLoader = components.get(OBC.IfcLoader);
const ifcIsolator = components.get(OBC.IfcIsolator);

export const ExploderComponent = memo(() => {
  // custom hooks
  const { result: finderResult } = useFinder();
  const { result: relationsResult } = useRelations();
  //   ref
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const modelRef = useRef<FragmentsGroup>(new FragmentsGroup());
  //   state
  const [loaded, setLoaded] = useState<boolean>(false);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [roofRef, setRoofRef] = useState<FragmentsGroup>();

  useEffect(() => {
    if (!container.current || loaded) {
      return;
    } else {
      console.log(container);
      world.scene = new OBC.SimpleScene(components);
      world.renderer = new OBC.SimpleRenderer(components, container.current);
      world.camera = new OBC.SimpleCamera(components);
      if (world.camera.controls) {
        world.camera.controls.camera.position.set(0, 50, 0);
        world.camera.controls.camera.lookAt(0, 0, -7);
        world.camera.controls.enabled = false;
        console.log(world.camera);

        setCameraReady(true);
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
    if (!loaded || !finderResult) {
      return () => {
        if (roofRef) {
          world.scene.three.remove(roofRef);
        }
      };
    } else {
      const caricaModello = async () => {
        try {
          await ifcLoader.setup();
          const buffer = new Uint8Array(finderResult);
          const model = await ifcLoader.load(buffer);
          world.scene.three.add(model);
          const relations = indexer.getRelationsMapFromJSON(relationsResult);

          indexer.setRelationMap(model, relations);
          classifier.byEntity(model);
          classifier.bySpatialStructure(model, {
            isolate: new Set([WEBIFC.IFCBUILDINGSTOREY]),
          });

          const webIfcApi = new WEBIFC.IfcAPI();
          webIfcApi.SetWasmPath("https://unpkg.com/web-ifc@0.0.66/", true);
          await webIfcApi.Init();

          const splitted = await ifcIsolator.splitIfc(webIfcApi, buffer, [
            22620,
          ]);
          const roofModel = await ifcLoader.load(splitted);
          world.scene.three.add(roofModel);

          setRoofRef(roofModel);
          const found = classifier.list.spatialStructures["Nivel 2"].map;
          hider.set(false, found);
          console.log(model);
        } catch (error) {
          console.error("Errore nel caricamento del modello:", error);
        }
      };

      caricaModello();
    }
  }, [loaded, finderResult, relationsResult]);

  useGSAP(() => {
    if (!cameraReady || !world.camera || !world.camera.controls || !roofRef) {
      return () => console.log(world.camera);
    }

    const spherical = new THREE.Spherical(14, 0.9553166181245093, 0); // Iniziale: raggio, phi, theta
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
              // console.log(modelRef.current);
              // debugger;
            }
          },
        },
        "startExploration"
      )

      .to(
        world.camera.controls.camera.position,
        {
          ease: "none",
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
        },
        "roofAnimation"
      )

      .to(
        roofRef.position,
        {
          y: 10,
          duration: 5,
          onUpdate: function () {
            setRoofRef(roofRef);
          },
        },
        "roofAnimation"
      )
      .to(world.camera.controls.camera.position, {
        ease: "none",
        x: -1,
        y: 0.2,
        z: 2.5,

        duration: 5,
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
        duration: 10,
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
        duration: 10,
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
        duration: 10,
        onUpdate: function () {
          if (world.camera.controls) {
            world.camera.controls.camera.lookAt(-1, 1, -12);
          }
        },
      })
      .to(world.camera.controls.camera.position, {
        x: 3,
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
      .to(
        spherical,
        {
          theta: "+=" + Math.PI ,
          duration: 15,
          ease: "none",

          onUpdate: function () {
            if (world.camera.controls) {
              const progress = this.progress();
              const pos = new THREE.Vector3().setFromSpherical(spherical);
              pos.y = yStart + progress * (yEnd - yStart);

              world.camera.controls.camera.position.copy(pos);
              world.camera.controls.camera.lookAt(-3, 1, -7);
            }
          },
          onComplete: function () {
            exploder.set(false);
          },
        },
        "roofAnimationClose"
      )
      .to(
        roofRef.position,
        {
          y: 2.3523,
          duration: 15,
          onUpdate: function () {
            setRoofRef(roofRef);
          },
        },
        "roofAnimationClose"
      )
      .to(world.camera.controls.camera.position, {
        ease: "none",
        x: -3,
        y: 50,
        z: -14,

        duration: 5,
        onUpdate: function () {
          if (world.camera.controls) {
            world.camera.controls.camera.lookAt(-3, 1, -7);
          }
        },
        onComplete: function () {
          exploder.set(false);
        },
      });
  }, [loaded, cameraReady, world, roofRef]);

  return <div id="container" ref={container}></div>;
});

export default ExploderComponent;
