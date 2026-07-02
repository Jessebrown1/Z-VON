import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Environment,
  ContactShadows,
  useProgress,
  Html,
} from "@react-three/drei";

import {
  Suspense,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";

import gsap from "gsap";
import * as THREE from "three";
import "./ProductViewer3D.css";

/* =========================
   LOADER
========================= */
function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div style={{ fontSize: 14, color: "#999" }}>
        Loading 3D... {Math.round(progress)}%
      </div>
    </Html>
  );
}

/* =========================
   MODEL (FIXED + ANIMATION + NO JUMPING)
========================= */
function Model({ url }) {
  const group = useRef();

  const { scene, animations } = useGLTF(url);
  const { actions, mixer } = useAnimations(animations, group);
  

  // center model properly (safe version)
  const centeredScene = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());

    clone.position.sub(center);

    return clone;
  }, [scene]);

  useEffect(() => {
    if (!actions) return;

    const firstAnimation = Object.values(actions)[0];

    if (firstAnimation) {
      firstAnimation.reset().fadeIn(0.3).play();
    }

    return () => {
      mixer?.stopAllAction();
    };
  }, [actions, mixer]);

  return (
    <group ref={group}>
      <primitive object={centeredScene} />
    </group>
  );
}


/* =========================
   VIEWER
========================= */
export default function Product3DViewer({ modelUrl, onClose }) {
  const overlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const closingRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  /* MOBILE DETECT */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* OPEN ANIMATION */
  useEffect(() => {
    closingRef.current = false;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 }
    );

    gsap.fromTo(
      wrapperRef.current,
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35 }
    );
  }, []);

  /* CLOSE HANDLER */
  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    overlayRef.current.style.pointerEvents = "none";

    gsap.to(wrapperRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 30,
      duration: 0.2,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => onClose?.(),
    });
  };

  return (
    <div
      ref={overlayRef}
      className="viewer3d-overlay"
      onClick={handleClose}
    >
      <div
        ref={wrapperRef}
        className="viewer3d-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          className="viewer3d-close"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
        >
          ✕
        </button>

        <Canvas
          className="viewer3d-canvas"
          dpr={[1, 2]}
          camera={{
            position: [0, 0, isMobile ? 7 : 6],
            fov: isMobile ? 55 : 40,
          }}
        >
          <color attach="background" args={["transparent"]} />

          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 3, -2]} intensity={0.8} />

          <Suspense fallback={<Loader />}>
            <Model url={modelUrl} isMobile={isMobile} />

            <Environment preset="studio" />

            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.25}
              scale={10}
              blur={2.5}
              far={4}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={isMobile ? 10 : 12}
            target={[0, 0, 0]}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>
      </div>
    </div>
  );
}

/* optional preload (important for speed) */
useGLTF.preload("/models/model.glb");