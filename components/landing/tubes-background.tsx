"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type TubesBackgroundProps = {
  children?: ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
  tone?: "light" | "dark";
};

type TubesApp = {
  destroy?: () => void;
  tubes?: {
    setColors?: (colors: string[]) => void;
    setLightsColors?: (colors: string[]) => void;
  };
};

const tubeColors = ["#06b6d4", "#67e8f9", "#f97316"];
const lightColors = ["#22d3ee", "#fb7185", "#facc15", "#a7f3d0"];

function randomColors(count: number) {
  return Array.from({ length: count }, () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue} 92% 62%)`;
  });
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
  tone = "light",
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<TubesApp | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;

    const init = async () => {
      try {
        const importFromUrl = new Function("url", "return import(url)") as (
          url: string,
        ) => Promise<{ default: (canvas: HTMLCanvasElement, options: unknown) => TubesApp }>;

        const tubesModule = await importFromUrl(
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js",
        );

        if (!mounted) return;

        appRef.current = tubesModule.default(canvas, {
          tubes: {
            colors: tubeColors,
            lights: {
              intensity: 180,
              colors: lightColors,
            },
          },
        });

        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load the interactive tubes background.", error);
      }
    };

    init();

    return () => {
      mounted = false;
      appRef.current?.destroy?.();
      appRef.current = null;
    };
  }, [prefersReducedMotion]);

  const handleClick = () => {
    if (!enableClickInteraction || prefersReducedMotion) return;

    appRef.current?.tubes?.setColors?.(randomColors(3));
    appRef.current?.tubes?.setLightsColors?.(randomColors(4));
  };

  return (
    <div
      className={cn(
        tone === "dark"
          ? "relative min-h-[620px] overflow-hidden bg-[#050608] text-white"
          : "relative min-h-[620px] overflow-hidden bg-transparent text-foreground",
        className,
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "absolute inset-0",
          tone === "dark"
            ? "bg-[radial-gradient(circle_at_25%_20%,rgba(6,182,212,0.28),transparent_32%),radial-gradient(circle_at_76%_12%,rgba(249,115,22,0.2),transparent_28%),linear-gradient(135deg,#050608_0%,#0b1517_54%,#11100a_100%)]"
            : "bg-transparent",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 [background-size:72px_72px]",
          tone === "dark"
            ? "opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]"
            : "opacity-0",
        )}
      />
      {!prefersReducedMotion ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 block h-full w-full transition-opacity duration-700",
            tone === "light" ? "mix-blend-multiply saturate-125" : "",
            isLoaded ? (tone === "dark" ? "opacity-90" : "opacity-40") : "opacity-0",
          )}
          style={{ touchAction: "none" }}
        />
      ) : null}
      <div
        className={cn(
          "absolute inset-0",
          tone === "dark"
            ? "bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,6,8,0.18)_42%,rgba(5,6,8,0.74)_100%)]"
            : "bg-transparent",
        )}
      />
      <div className="relative z-10 h-full pointer-events-none">{children}</div>
    </div>
  );
}
