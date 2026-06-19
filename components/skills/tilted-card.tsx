"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function TiltedCard({ children, className = "", intensity = 8 }: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -intensity;
    const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * intensity;
    setTilt({ x: rx, y: ry });
  };

  const onMouseEnter = () => {
    if (!prefersReducedMotion) setHovered(true);
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
        transition: hovered ? "transform 0.08s ease-out" : "transform 0.45s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}
