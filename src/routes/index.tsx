import { createFileRoute, Link } from "@tanstack/react-router";
import { CRTScreen } from "@/components/CRTScreen";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galekto — Evren Yılmaz" },
      { name: "description", content: "UX/UI designer & illustrator based in Istanbul. Portfolio and selected works." },
      { property: "og:title", content: "Galekto — Evren Yılmaz" },
      { property: "og:description", content: "UX/UI designer & illustrator based in Istanbul." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <CRTScreen background="linear-gradient(180deg, #f0ebe3 0%, #e8e2d6 100%)">
        <SiteHeader variant="light" centerIcons="diamond" />

        <div className="relative flex flex-col items-center justify-center px-6 md:px-12 pt-8 pb-24 min-h-[70vh]">
          <div
            aria-hidden
            className="absolute inset-x-6 top-16 bottom-16 border border-black/15 rounded-[50%] rotate-[-8deg]"
          />

          <Link
            to="/projects"
            className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 text-black/80 text-[10px] tracking-[0.4em] font-semibold"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateY(50%)" }}
          >
            ← PROJECTS
          </Link>
          <Link
            to="/artworks"
            className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 text-black/80 text-[10px] tracking-[0.4em] font-semibold"
            style={{ writingMode: "vertical-rl" }}
          >
            ARTWORKS →
          </Link>

          <div className="relative z-10 mt-6 flex items-end justify-center">
            <div
              className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, #d9c9b8 0%, #b39a83 55%, #8b6f56 100%)",
                boxShadow: "inset 0 -20px 40px rgba(0,0,0,0.25)",
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <radialGradient id="face" cx="50%" cy="45%" r="60%">
                    <stop offset="0%" stopColor="#e8d5c4" />
                    <stop offset="70%" stopColor="#b58a6b" />
                    <stop offset="100%" stopColor="#5a3a26" />
                  </radialGradient>
                </defs>
                <ellipse cx="100" cy="110" rx="60" ry="70" fill="url(#face)" />
                <path d="M40,80 Q60,20 100,25 Q150,20 160,80 Q155,55 130,50 Q100,45 70,55 Q50,60 40,80Z" fill="#1a1a1a" />
                <path d="M55,130 Q80,180 100,180 Q120,180 145,130 Q140,155 100,160 Q60,155 55,130Z" fill="#2a1a10" />
                <g opacity="0.75">
                  <circle cx="70" cy="90" r="10" fill="#e14b42" />
                  <circle cx="82" cy="75" r="6" fill="#f2c94c" />
                  <path d="M60,105 L72,100 L68,115Z" fill="#2f5be8" />
                  <circle cx="90" cy="110" r="4" fill="#5eff9f" />
                </g>
              </svg>
            </div>
          </div>

          <h1 className="display-heading text-[18vw] md:text-[14rem] leading-[0.85] text-black mt-[-6vw] md:mt-[-8rem] tracking-tight">
            GALEKTO
          </h1>

          <p className="mt-8 max-w-2xl text-center text-sm md:text-base text-black/70">
            I'm <strong className="text-black">Evren Yılmaz</strong> — a UX/UI designer, illustrator and creative director from
            Istanbul. Building interfaces by day, painting strange worlds by night.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/projects"
              className="rounded-full border border-black/30 px-6 py-3 text-xs tracking-[0.25em] font-semibold text-black hover:bg-black hover:text-[#f0ebe3] transition-colors"
            >
              SEE PROJECTS
            </Link>
            <Link
              to="/artworks"
              className="rounded-full bg-black px-6 py-3 text-xs tracking-[0.25em] font-semibold text-[#f0ebe3] hover:bg-[#e14b42] transition-colors"
            >
              VIEW ARTWORKS
            </Link>
          </div>
        </div>

        <SiteFooter />
      </CRTScreen>
    </div>
  );
}
