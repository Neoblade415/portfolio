import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useMemo, useLayoutEffect } from "react";
import { useScrollColorPlateaus } from "@/hooks/useScrollColorPlateaus";
import { motion } from "motion/react";

export const Route = createFileRoute("/artworks")({
  head: () => ({
    meta: [
      { title: "Artworks — Galekto" },
      { name: "description", content: "Illustrations and personal artworks by Evren Yılmaz — strange creatures, dusk landscapes, and colorful worlds." },
      { property: "og:title", content: "Artworks — Galekto" },
      { property: "og:description", content: "Illustrations and personal artworks by Evren Yılmaz." },
    ],
  }),
  component: ArtworksPage,
});

// SVG illustration tiles — each unique, evocative of the reference
function Tile({ variant }: { variant: number }) {
  const palettes = [
    ["#7ab8d9", "#e6e2d0", "#2b3a55"], // duck & mountain
    ["#e07a7a", "#f2b090", "#3a2540"], // sunset walker
    ["#2b1f3d", "#7060a0", "#f2c94c"], // duck lake night
    ["#f28c5a", "#4a2540", "#2b1f3d"], // volcano
    ["#c04030", "#f2c94c", "#2b1f3d"], // fire creature
    ["#e0e0e0", "#a0a0a0", "#404040"], // car
    ["#4a5580", "#c88090", "#2b1f3d"], // city dusk
    ["#a05070", "#e0a090", "#3a2540"], // mailbox
  ];
  const [a, b, c] = palettes[variant % palettes.length];

  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#sky-${variant})`} />
      {/* mountains/silhouette */}
      <path d="M0,180 L60,140 L110,170 L180,120 L260,160 L340,110 L400,150 L400,260 L0,260Z" fill={c} opacity="0.9" />
      <path d="M0,220 L80,190 L160,215 L240,195 L320,220 L400,200 L400,260 L0,260Z" fill={c} />
      {/* creature/shape */}
      <g transform={`translate(${80 + (variant % 3) * 60},${90 + (variant % 2) * 20})`}>
        <ellipse cx="40" cy="80" rx="45" ry="18" fill="#000" opacity="0.35" />
        <path
          d="M10,80 Q10,30 40,25 Q75,20 80,60 Q85,90 60,90 Q30,95 10,80Z"
          fill={c}
        />
        <circle cx="30" cy="45" r="3" fill="#fff" />
        <circle cx="55" cy="40" r="3" fill="#fff" />
      </g>
      {/* stars */}
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={30 + i * 55} cy={30 + (i % 3) * 12} r="1.2" fill="#fff" opacity="0.7" />
      ))}
    </svg>
  );
}

const artworks = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1).padStart(3, "0"),
  variant: i,
}));

function ArtworksPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const artworksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => [
    { ref: artworksRef, color: "#2f5be8" },
    { ref: footerRef, color: "#222222" },
  ], []);

  const backgroundColor = useScrollColorPlateaus(scrollRef, sections);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <motion.div ref={scrollRef} className="w-full h-full crt-content-scroll" style={{ background: backgroundColor }}>
      <div className="space-y-6">
          <div ref={artworksRef}>
            <div className="pt-4 md:pt-6">
              <SiteHeader variant="dark" centerIcons="eye" />
            </div>
            <div className="px-8 md:px-16 pt-10 pb-14">
              <h1 className="display-heading text-[18vw] md:text-[13rem] leading-[0.85] text-black">
                ARTWORKS
              </h1>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {artworks.slice(0, 4).map((a) => (
                  <ArtCard key={a.id} id={a.id} variant={a.variant} />
                ))}
              </div>
            </div>
            <div className="px-8 md:px-16 pt-10 pb-14">
              <h2 className="display-heading text-[18vw] md:text-[13rem] leading-[0.85] text-black opacity-0">
                ARTWORKS
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {artworks.slice(4).map((a) => (
                  <ArtCard key={a.id} id={a.id} variant={a.variant} />
                ))}
              </div>
            </div>
          </div>

          <div ref={footerRef}>
            <SiteFooter />
          </div>
        </div>
    </motion.div>
  );
}

function ArtCard({ id, variant }: { id: string; variant: number }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-md overflow-hidden border border-black/20 aspect-[4/3] bg-black/10 shadow-lg">
        <Tile variant={variant} />
        {/* corner brackets */}
        <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/70" />
        <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/70" />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/70" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/70" />
        <div className="absolute inset-x-3 top-3 flex items-center gap-3 text-[9px] tracking-[0.3em] text-white/90 bg-black/20 rounded-sm px-2 py-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <span>GALEKTO</span>
          <span className="opacity-70">41.0082° N, 28.9784° E</span>
        </div>
      </div>
      <p className="mt-2 text-[10px] tracking-[0.3em] text-black/70">REF.{id}</p>
    </div>
  );
}
