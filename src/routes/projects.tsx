import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Download } from "lucide-react";
import { useRef, useMemo, useLayoutEffect, useState } from "react";
import { useScrollColorPlateaus } from "@/hooks/useScrollColorPlateaus";
import { motion } from "motion/react";
import { ScrambleText } from "@/components/ScrambleText";
import SplashCursor from "@/components/SplashCursor";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Galekto" },
      { name: "description", content: "Selected UX/UI projects by Evren Yılmaz: mobile apps, fintech, gaming and streaming products." },
      { property: "og:title", content: "Projects — Galekto" },
      { property: "og:description", content: "Selected UX/UI projects by Evren Yılmaz." },
    ],
  }),
  component: ProjectsPage,
});

const featured = [
  { name: "NAVSWAP OS", tag: "CLOUD PLATFORM", year: "2026", href: "/projects/navswap" },
  { name: "CORTEX", tag: "AI PLATFORM", year: "2026", href: "/projects/cortex" },
  { name: "POLARIS", tag: "AI PLATFORM", year: "2025", href: "/projects/polaris" },
  { name: "OVELA", tag: "E-COMMERCE PLATFORM", year: "2025", href: "/projects/ovela" },
  { name: "RETAINGRAPH", tag: "AI PLATFORM", year: "2025", href: "/projects/retaingraph" },
];

const chapters = [
  {
    n: "01",
    name: "PALADIUM ELEKTRONIK PARA",
    badge: "FINTECH",
    role: "LEAD UX/UI DESIGNER - ART DIRECTOR",
    years: "2024-2025",
    body:
      "Reworked missing or inconsistent product pages into a unified experience. Restructured user journeys, improved navigation between core features, and shipped a scalable design system that raised visual coherence across major fintech functionalities.",
  },
  {
    n: "02",
    name: "JOLLIFY GAMES",
    badge: "GAMING",
    role: "LEAD UX/UI DESIGNER",
    years: "2022-2023",
    body:
      "Worked closely with art, game design and dev teams on multiple game projects. Owned gameplay-related UX elements, visual clarity, and interaction patterns inside the games.",
  },
  {
    n: "03",
    name: "MUDIO GAMES",
    badge: "GAMING",
    role: "LEAD UX/UI DESIGNER",
    years: "2021-2022",
    body:
      "Designed and improved visual and UX elements for the Evox game. Focused on usability, interface clarity and player interaction inside the game environment.",
  },
  {
    n: "04",
    name: "ZYNGA TÜRKİYE",
    badge: "GAMING",
    role: "UX/UI DESIGNER",
    years: "2020-2021",
    body:
      "Casual card games team: Solitaire, FreeCell and classics. Designed interface layouts and interaction patterns that support clear gameplay flows and accessible player experiences.",
  },
  {
    n: "05",
    name: "BEIN CONNECT",
    badge: "MEDIA",
    role: "UX/UI DESIGNER",
    years: "2019-2020",
    body:
      "Collaborated with teams in Turkey and Asia Pacific on web and mobile streaming products. Contributed to interface design and UX improvements across multiple markets.",
  },
];

const clients = ["DANONE", "HYUNDAI", "ŞİŞECAM", "SAMSUNG", "DUREX", "QNB", "DOĞUŞ", "TAV"];
const skills = [
  "PRODUCT DESIGN",
  "UX / UI DESIGN",
  "INTERACTION DESIGN",
  "PRODUCT THINKING",
  "DESIGN SYSTEMS",
  "INFORMATION ARCHITECTURE",
  "RESPONSIVE DESIGN",
  "GAME UI SYSTEMS",
  "PROTOTYPING",
  "USABILITY OPTIMIZATION",
  "AI-ASSISTED DESIGN",
  "ILLUSTRATION",
];

function ProjectItem({ p, isReveal, isPlaceholder }: { p: any, isReveal: boolean, isPlaceholder: boolean }) {
  const [hovered, setHovered] = useState(false);

  const Item = (
    <li 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between gap-4 py-6 group cursor-pointer"
    >
      <span className={`display-heading text-5xl md:text-7xl ${isReveal ? 'text-[#333] group-hover:text-[#333]/50' : 'text-[#f0ebe3] group-hover:text-black'} transition-colors`}>
        {isPlaceholder ? p.name : <ScrambleText text={p.name} trigger={hovered} />}
      </span>
      <span className={`flex items-center gap-4 tracking-[0.2em] transition-colors duration-300 ${isReveal ? 'text-[#333]/80 group-hover:text-[#333]/50' : 'text-[#f0ebe3]/80 group-hover:text-black/80'}`}>
        <span className="hidden md:inline text-2xl md:text-3xl display-heading">{p.tag}</span>
        <span className={`text-sm md:text-base display-heading transition-colors duration-300 ${isReveal ? 'text-[#333]/70 group-hover:text-[#333]/50' : 'text-white/70 group-hover:text-black'}`}>{p.year}</span>
      </span>
    </li>
  );

  return p.href ? (
    <Link to={p.href} state={{ transitionText: p.name }} className="block">
      {Item}
    </Link>
  ) : Item;
}

const HeroContent = ({ isReveal = false, isPlaceholder = false }: { isReveal?: boolean, isPlaceholder?: boolean }) => (
  <div className={`pl-2 pr-8 md:pl-12 md:pr-16 pt-4 pb-20 w-full h-full ${isReveal ? 'text-[#333]' : 'text-[#f0ebe3]'}`}>
    <h1 className={`display-heading text-[18vw] md:text-[10rem] leading-[0.85] ${isReveal ? 'text-[#333]' : 'text-white'}`}>
      PROJECTS
    </h1>
    <p className={`display-heading mt-6 max-w-full text-xl md:text-2xl lg:text-3xl uppercase tracking-wide leading-snug ${isReveal ? 'text-[#333]/85' : 'text-white/85'}`}>
      I'm Evren Yılmaz — UX/UI designer & project lead. A few selected works from different eras — each one a different challenge,
      a different client, the same obsession with craft.
    </p>

    <ul className={`mt-14 divide-y ${isReveal ? 'divide-[#333]/20 border-[#333]/20' : 'divide-white/20 border-white/20'} border-t`}>
      {featured.map((p) => (
        <ProjectItem key={p.name} p={p} isReveal={isReveal} isPlaceholder={isPlaceholder} />
      ))}
    </ul>

    <div className="mt-16">
      <p className={`text-xs tracking-[0.3em] ${isReveal ? 'text-[#333]/70' : 'text-black/70'} mb-4`}>PROUD TO HAVE WORKED WITH</p>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
        {clients.map((c) => (
          <span key={c} className={`text-sm md:text-base font-semibold tracking-[0.15em] ${isReveal ? 'text-[#333]/85' : 'text-[#f0ebe3]/85'}`}>
            {c}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ChaptersContent = ({ isReveal = false, isPlaceholder = false }: { isReveal?: boolean, isPlaceholder?: boolean }) => (
  <div className={`pl-6 pr-8 md:pl-12 md:pr-16 pt-12 pb-14 min-h-screen w-full h-full ${isReveal ? 'text-[#f0ebe3]' : 'text-black'}`}>
    <h2 className={`display-heading text-[18vw] md:text-[10rem] leading-[0.85] pt-4 text-[#e14b42]`}>
      JOURNEY
    </h2>
    <p className={`display-heading text-lg md:text-2xl tracking-[0.2em] text-[#333] mb-12 pt-8 uppercase`}>A FEW CHAPTERS — DOWNLOAD FOR THE FULL STORY.</p>
    <ul className="flex flex-col">
      {chapters.map((c) => (
        <li key={c.n} className={`grid grid-cols-[auto,1fr,auto] items-start gap-x-5 md:gap-x-8 border-b ${isReveal ? 'border-[#f0ebe3]/15' : 'border-[#333]/15'} py-2`}>
          <span className={`display-heading text-xl md:text-2xl mt-1 md:mt-2 tabular-nums ${isReveal ? 'text-[#f0ebe3]' : 'text-[#333]'}`}>{c.n}</span>
          <div>
            <div className="flex flex-wrap items-start gap-3 md:gap-4">
              <h3 className={`display-heading text-5xl md:text-6xl uppercase leading-none ${isReveal ? 'text-[#f0ebe3]' : 'text-black'}`}>{c.name}</h3>
              <span className={`text-[10px] md:text-xs tracking-[0.2em] px-2 py-1 mt-1 md:mt-2 rounded-none ${isReveal ? 'bg-[#f0ebe3] text-black' : 'bg-black text-[#f0ebe3]'}`}>{c.badge}</span>
            </div>
            <p className={`display-heading mt-2 md:mt-3 text-lg md:text-xl tracking-[0.1em] uppercase text-[#333]`}>{c.role}</p>
            <p className={`mt-4 max-w-4xl text-sm md:text-base leading-relaxed text-[#333]`}>{c.body}</p>
          </div>
          <span className={`display-heading text-right self-start justify-self-end text-sm md:text-base tabular-nums whitespace-nowrap -mt-2 md:-mt-3 ${isReveal ? 'text-[#f0ebe3]/70' : 'text-[#333]/80'}`}>{c.years}</span>
        </li>
      ))}
    </ul>

    <div className="mt-10">
      <a
        href="#"
        className={`inline-flex items-center gap-2 text-xs tracking-[0.25em] rounded-none px-4 py-3 transition-colors ${isReveal ? 'bg-[#f0ebe3] text-black hover:bg-[#e14b42] hover:text-[#f0ebe3]' : 'bg-black text-[#f0ebe3] hover:bg-[#e14b42]'}`}
      >
        DOWNLOAD FULL CV <Download size={14} />
      </a>
    </div>

    <div className="mt-16">
      <p className={`display-heading text-xl md:text-2xl tracking-[0.2em] mb-6 text-[#333]`}>SKILLS</p>
      <div className="flex flex-wrap gap-3">
        {skills.map((s) => (
          <span
            key={s}
            className={`font-sans font-semibold text-[10px] md:text-xs tracking-[0.15em] border rounded-none px-4 py-2 transition-colors ${isReveal ? 'border-[#f0ebe3]/20 text-[#f0ebe3]/80 hover:bg-[#f0ebe3] hover:text-black' : 'border-black/20 text-[#333]/80 hover:bg-[#333] hover:text-[#f0ebe3]'}`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>

    <div className={`mt-24 border-t pt-12 ${isReveal ? 'border-[#f0ebe3]/15' : 'border-black/15'}`}>
      <p className="display-heading text-lg md:text-2xl tracking-[0.2em] text-[#e14b42]">LET'S CONNECT</p>
      <h2 className={`display-heading text-2xl md:text-7xl mt-4 leading-[0.85] ${isReveal ? 'text-[#f0ebe3]' : 'text-[#333]'}`}>WANT TO WORK TOGETHER?</h2>
      <a
        href="/contact"
        className={`mt-10 inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.25em] font-semibold border rounded-none px-6 py-4 transition-colors ${isReveal ? 'border-[#f0ebe3]/30 text-[#f0ebe3] hover:bg-[#f0ebe3] hover:text-black' : 'border-black/30 text-[#333] hover:bg-[#333] hover:text-[#f0ebe3]'}`}
      >
        GET IN TOUCH ↗
      </a>
    </div>
  </div>
);

function ProjectsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => [
    { ref: heroRef, color: "#e14b42" },
    { ref: chaptersRef, color: "#f2f0ec" },
    { ref: footerRef, color: "#222222" },
  ], []);

  const revealSections = useMemo(() => [
    { ref: heroRef, color: "#f0ebe3" },
    { ref: chaptersRef, color: "#222222" },
    { ref: footerRef, color: "#f0ebe3" },
  ], []);

  const backgroundColor = useScrollColorPlateaus(scrollRef, sections);
  const revealBackgroundColor = useScrollColorPlateaus(scrollRef, revealSections);
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 50);
  };

  return (
    <motion.div ref={scrollRef} onScroll={handleScroll} className="w-full h-full crt-content-scroll" style={{ background: backgroundColor }}>
      {/* Static Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="w-full">
          
          {/* Combined SplashCursor for Hero and Chapters */}
          <SplashCursor 
            baseLayer={
              <>
                <div className="sticky top-0 z-50 pt-4 md:pt-6 pointer-events-none">
                  <div className="pointer-events-auto">
                    <SiteHeader variant="light" centerIcons="diamond" bgColor={isScrolled ? "#e14b42" : "transparent"} />
                  </div>
                </div>

                {/* Hero Section */}
                <div ref={heroRef} className="relative w-full">
                  <HeroContent isReveal={false} />
                </div>

                {/* Chapters Section */}
                <div ref={chaptersRef} className="relative w-full">
                  <ChaptersContent isReveal={false} />
                </div>

                <div ref={footerRef}>
                  <SiteFooter isReveal={false} />
                </div>
              </>
            }
            revealLayer={
              <>
                <motion.div className="absolute inset-0 z-[-1] pointer-events-none" style={{ background: revealBackgroundColor }} />
                <div className="sticky top-0 z-50 pt-4 md:pt-6 pointer-events-none">
                  <div className="pointer-events-auto">
                    <SiteHeader variant="light" centerIcons="diamond" bgColor="#f0ebe3" />
                  </div>
                </div>

                <div className="relative w-full">
                  <HeroContent isReveal={true} />
                </div>

                <div className="relative w-full">
                  <ChaptersContent isReveal={true} />
                </div>

                <div>
                  <SiteFooter isReveal={true} />
                </div>
              </>
            }
          />
        </div>
    </motion.div>
  );
}
