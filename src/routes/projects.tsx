import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Download } from "lucide-react";
import { useRef, useMemo, useLayoutEffect } from "react";
import { useScrollColorPlateaus } from "@/hooks/useScrollColorPlateaus";
import { motion } from "motion/react";
import { ScrambleText } from "@/components/ScrambleText";

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
  { name: "PEP APP", tag: "MOBILE APP", year: "2026", href: "/projects/pep-app" },
  { name: "A.G.E.N.T. CHAOS", tag: "MOBILE APP", year: "2025", href: "/projects/agent-chaos" },
  { name: "ZYNGA SOLITAIRE", tag: "MOBILE APP", year: "2020", href: "/projects/zynga-solitaire" },
  { name: "BEIN SPORTS CONNECT", tag: "WEB DESIGN, MOBILE APP", year: "2019", href: "/projects/bein-sports-connect" },
  { name: "ING BANK", tag: "WEB DESIGN, MOBILE APP", year: "2018", href: "/projects/ing-bank" },
];

const chapters = [
  {
    n: "01",
    name: "PALADIUM ELEKTRONIK PARA",
    badge: "FINTECH",
    role: "LEAD UX/UI DESIGNER — ART DIRECTOR",
    years: "2024–2026",
    body:
      "Reworked missing or inconsistent product pages into a unified experience. Restructured user journeys, improved navigation between core features, and shipped a scalable design system that raised visual coherence across major fintech functionalities.",
  },
  {
    n: "02",
    name: "JOLLIFY GAMES",
    badge: "GAMING",
    role: "LEAD UX/UI DESIGNER",
    years: "2022–2023",
    body:
      "Worked closely with art, game design and dev teams on multiple game projects. Owned gameplay-related UX elements, visual clarity, and interaction patterns inside the games.",
  },
  {
    n: "03",
    name: "MUDIO GAMES",
    badge: "GAMING",
    role: "LEAD UX/UI DESIGNER",
    years: "2021–2022",
    body:
      "Designed and improved visual and UX elements for the Evox game. Focused on usability, interface clarity and player interaction inside the game environment.",
  },
  {
    n: "04",
    name: "ZYNGA TÜRKİYE",
    badge: "GAMING",
    role: "UX/UI DESIGNER",
    years: "2020–2021",
    body:
      "Casual card games team: Solitaire, FreeCell and classics. Designed interface layouts and interaction patterns that support clear gameplay flows and accessible player experiences.",
  },
  {
    n: "05",
    name: "BEIN CONNECT",
    badge: "MEDIA",
    role: "UX/UI DESIGNER",
    years: "2019–2020",
    body:
      "Collaborated with teams in Turkey and Asia Pacific on web and mobile streaming products. Contributed to interface design and UX improvements across multiple markets.",
  },
];

const clients = ["DANONE", "HYUNDAI", "ŞİŞECAM", "SAMSUNG", "DUREX", "QNB", "DOĞUŞ", "TAV"];
const skills = [
  "PRODUCT DESIGN",
  "UX/UI DESIGN",
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

  const backgroundColor = useScrollColorPlateaus(scrollRef, sections);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <motion.div ref={scrollRef} className="w-full h-full crt-content-scroll" style={{ background: backgroundColor }}>
      <div className="w-full">
        <div className="sticky top-0 z-50 pt-4 md:pt-6 pointer-events-none">
          <div className="pointer-events-auto">
            <SiteHeader variant="light" centerIcons="diamond" bgColor="#e14b42" />
          </div>
        </div>
          
          {/* Hero Section */}
          <div ref={heroRef} className="px-8 md:px-16 pt-4 pb-20 text-[#f0ebe3]">
            <h1 className="display-heading text-[18vw] md:text-[14rem] leading-[0.85] text-white">
              PROJECTS
            </h1>
            <p className="mt-6 max-w-3xl text-base md:text-lg text-white/85">
              I'm Evren Yılmaz — UX/UI designer & project lead. A few selected works from different eras — each one a different challenge,
              a different client, the same obsession with craft.
            </p>

            <ul className="mt-14 divide-y divide-black/20 border-t border-black/20">
              {featured.map((p) => {
                const Item = (
                  <li key={p.name} className="flex items-baseline justify-between gap-4 py-6 group cursor-pointer">
                    <span className="display-heading text-4xl md:text-6xl text-[#f0ebe3] group-hover:text-black transition-colors">
                      <ScrambleText text={p.name} />
                    </span>
                    <span className="flex items-baseline gap-6 text-xs tracking-[0.2em] text-[#f0ebe3]/80">
                      <span className="hidden md:inline">{p.tag}</span>
                      <span className="text-black/70">{p.year}</span>
                    </span>
                  </li>
                );

                return p.href ? (
                  <Link to={p.href} state={{ transitionText: p.name }} key={p.name} className="block">
                    {Item}
                  </Link>
                ) : Item;
              })}
            </ul>

            <div className="mt-16">
              <p className="text-xs tracking-[0.3em] text-black/70 mb-4">PROUD TO HAVE WORKED WITH</p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                {clients.map((c) => (
                  <span key={c} className="text-sm md:text-base font-semibold tracking-[0.15em] text-[#f0ebe3]/85">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Chapters Section */}
          <div ref={chaptersRef} className="px-8 md:px-16 pt-12 pb-14 text-black min-h-screen">
            <h2 className="display-heading text-[18vw] md:text-[13rem] leading-[0.85] text-black pt-4">
              JOURNEY
            </h2>
            <p className="text-xs tracking-[0.3em] text-black/60 mb-8 pt-8">A FEW CHAPTERS — SCROLL FOR THE FULL STORY</p>
            <ul className="space-y-10">
              {chapters.map((c) => (
                <li key={c.n} className="grid grid-cols-[auto,1fr,auto] items-baseline gap-x-4 md:gap-x-8 border-b border-black/15 pb-8">
                  <span className="text-xs md:text-sm font-semibold text-black/50 tabular-nums">{c.n}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="display-heading text-3xl md:text-5xl text-black">{c.name}</h3>
                      <span className="bg-black text-[#f0ebe3] text-[10px] tracking-[0.2em] px-2 py-1 rounded-sm">{c.badge}</span>
                    </div>
                    <p className="mt-2 text-xs tracking-[0.2em] text-black/60">{c.role}</p>
                    <p className="mt-3 max-w-3xl text-sm text-black/70 leading-relaxed">{c.body}</p>
                  </div>
                  <span className="text-xs text-black/50 tabular-nums whitespace-nowrap">{c.years}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-black text-[#f0ebe3] text-xs tracking-[0.25em] rounded-md px-4 py-3 hover:bg-[#e14b42] transition-colors"
              >
                DOWNLOAD FULL CV <Download size={14} />
              </a>
            </div>

            <div className="mt-16">
              <p className="text-xs tracking-[0.3em] text-black/50 mb-4">SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] tracking-[0.2em] border border-black/20 rounded-sm px-3 py-2 text-black/80 hover:bg-black hover:text-[#f0ebe3] transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-20 border-t border-[#e14b42]/40 pt-10">
              <p className="text-xs tracking-[0.3em] text-[#e14b42]">LET'S CONNECT</p>
              <h2 className="display-heading text-4xl md:text-6xl text-black mt-3">WANT TO WORK TOGETHER?</h2>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-black text-[#f0ebe3] text-xs tracking-[0.25em] rounded-md px-5 py-3 hover:bg-[#e14b42] transition-colors"
              >
                GET IN TOUCH ↗
              </a>
            </div>
          </div>

          <div ref={footerRef}>
            <SiteFooter />
          </div>
        </div>
    </motion.div>
  );
}
