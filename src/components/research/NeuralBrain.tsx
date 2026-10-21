"use client";

import { useEffect, useRef, useState } from "react";

// R&D 히어로 — 디지털 뇌 신경망 (그리기 로직은 brainScene.ts, 형태는 brainGeometry.ts)
export default function NeuralBrain({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let disposed = false;
    let cleanup: (() => void) | null = null;
    import("./brainScene")
      .then(({ mountNeuralBrain }) => mountNeuralBrain(wrap, "/research/novan-brain.bin", () => disposed))
      .then((c) => {
        if (!c) return;
        if (disposed) c();
        else {
          cleanup = c;
          setReady(true);
        }
      })
      .catch(() => {});
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`${className} transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      role="img"
      aria-label="천천히 회전하는 디지털 뇌 신경망"
    />
  );
}
