"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

/**
 * Interactive hero background: an abstract "system architecture" network of
 * glowing nodes and connections, floating in a field of code-dust particles.
 * Quality adapts to the device — fewer elements on low-power hardware, and a
 * pure CSS gradient for users who prefer reduced motion.
 */

type Tier = "off" | "low" | "high";

const ACCENT = new THREE.Color("#67e8f9");
const GLOW = new THREE.Color("#a78bfa");

/** Shared pointer state, fed by a window listener so the canvas can stay pointer-events: none */
const pointer = { x: 0, y: 0 };

/** Deterministic PRNG so the scene is stable across renders (and lint-pure) */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Quality tier for the WebGL scene. This component only ever renders on the
 * client (next/dynamic with ssr: false), so window access here is safe.
 */
function detectTier(): Tier {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "off";
  }
  const lowPower =
    (navigator.hardwareConcurrency ?? 8) <= 4 || window.innerWidth < 768;
  return lowPower ? "low" : "high";
}

function ArchitectureNetwork({ nodeCount }: { nodeCount: number }) {
  const group = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const { positions, linePositions } = useMemo(() => {
    // Nodes scattered on a loose spherical shell — an abstract system map
    const rand = mulberry32(1987);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const dir = new THREE.Vector3(
        rand() * 2 - 1,
        rand() * 2 - 1,
        rand() * 2 - 1
      ).normalize();
      pts.push(dir.multiplyScalar(2.1 + rand() * 2.1));
    }
    // Connect neighbors within reach to form the network lattice
    const segments: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.3) {
          segments.push(...pts[i].toArray(), ...pts[j].toArray());
        }
      }
    }
    return {
      positions: pts,
      linePositions: new Float32Array(segments),
    };
  }, [nodeCount]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.05, 12, 12), []);
  const nodeMaterials = useMemo(
    () => [
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 }),
      new THREE.MeshBasicMaterial({ color: GLOW, transparent: true, opacity: 0.85 }),
    ],
    []
  );

  useEffect(() => {
    return () => {
      lineGeometry.dispose();
      nodeGeometry.dispose();
      nodeMaterials.forEach((m) => m.dispose());
    };
  }, [lineGeometry, nodeGeometry, nodeMaterials]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // Constant slow drift + eased mouse parallax
    g.rotation.y += delta * 0.06;
    g.rotation.y += (pointer.x * 0.35 - (g.userData.px ?? 0)) * 0.03;
    g.rotation.x += (-pointer.y * 0.25 - g.rotation.x) * 0.03;
    g.userData.px = pointer.x * 0.35;

    // Gentle breathing pulse on the nodes
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = 1 + Math.sin(t * 1.6 + i * 1.7) * 0.28;
      mesh.scale.setScalar(s);
    });
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      {positions.map((p, i) => (
        <mesh
          key={i}
          position={p}
          geometry={nodeGeometry}
          material={nodeMaterials[i % 3 === 0 ? 1 : 0]}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        />
      ))}
    </group>
  );
}

function CodeDust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rand = mulberry32(2016);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 22;
      arr[i * 3 + 1] = (rand() - 0.5) * 14;
      arr[i * 3 + 2] = (rand() - 0.5) * 10 - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y -= delta * 0.012;
    points.current.rotation.x += (pointer.y * 0.06 - points.current.rotation.x) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#7dd3fc"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  const [tier] = useState<Tier>(detectTier);
  const [running, setRunning] = useState(true);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tier === "off") return;
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [tier]);

  // Pause the render loop while the hero is scrolled out of view
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden>
      {/* Gradient underlay — also the full fallback when WebGL is skipped */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_35%,rgba(34,211,238,0.10),transparent_70%),radial-gradient(ellipse_50%_45%_at_25%_70%,rgba(167,139,250,0.09),transparent_70%)]" />

      {(tier === "low" || tier === "high") && (
        <Canvas
          className="absolute inset-0"
          frameloop={running ? "always" : "never"}
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 8.5], fov: 52 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ pointerEvents: "none" }}
        >
          <ArchitectureNetwork nodeCount={tier === "high" ? 30 : 16} />
          <CodeDust count={tier === "high" ? 550 : 220} />
          <fog attach="fog" args={["#04060c", 9, 16]} />
        </Canvas>
      )}

      {/* Bottom fade into the page background to keep contrast on hero copy */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-void" />
    </div>
  );
}
