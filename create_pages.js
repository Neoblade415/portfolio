const fs = require('fs');

const createPage = (filename, title, routePath, nextProjectName, nextProjectHref) => {
  const content = `import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("${routePath}")({
  head: () => ({
    meta: [
      { title: "${title} — Galekto" },
      { name: "description", content: "Case study for ${title}." },
    ],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <motion.div ref={scrollRef} className="w-full h-full crt-content-scroll" style={{ background: "#f2f0ec" }}>
      <div className="w-full text-[#222]">
        
        {/* Site Header */}
        <div className="relative z-50 p-6 pointer-events-none">
          <div className="pointer-events-auto">
            <SiteHeader variant="light" centerIcons="diamond" />
          </div>
        </div>
          
        {/* Hero */}
        <div className="w-full bg-[#1c1c1c] aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 flex justify-end items-center opacity-80 pointer-events-none">
            <div className="w-[60%] h-[120%] bg-white/5 rotate-12 translate-x-[20%]"></div>
          </div>
          <h1 className="display-heading text-[12vw] md:text-[9rem] leading-[0.85] text-[#f2f0ec] relative z-10">
            ${title}
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">CLIENT</h4>
              <p className="text-sm font-medium">Example Client</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">202X</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">Lead Designer</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PLATFORM</h4>
              <p className="text-sm font-medium">iOS, Android, Web</p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT OVERVIEW</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
          </div>
        </div>

        {/* The Challenge & The Solution */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </p>
            </div>
          </div>
        </div>

        {/* Generic Image Mockup */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="w-full bg-[#e8e6e1] aspect-video rounded-xl border border-black/10 flex items-center justify-center shadow-sm">
            <span className="text-xs tracking-[0.2em] opacity-50">PROJECT MOCKUP (16:9)</span>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden">
          <div className="flex justify-center whitespace-nowrap px-4">
            <span className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16">
              <span>UX DESIGN</span>
              <span>UI DESIGN</span>
              <span>WIREFRAMING</span>
              <span>DESIGN SYSTEM</span>
            </span>
          </div>
        </div>

        {/* Learnings */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">LEARNINGS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
        </div>

        {/* Next Project Hero */}
        <Link to="${nextProjectHref}" className="block w-full bg-[#111] text-white aspect-[21/9] flex items-end p-8 md:p-16 hover:bg-black transition-colors relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
            <span className="display-heading text-[15vw] text-white whitespace-nowrap select-none opacity-20">${nextProjectName}</span>
          </div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                ${nextProjectName}
              </h1>
            </div>
            <div className="text-right pb-4 hidden md:block">
              <p className="text-xs tracking-[0.3em] opacity-50 mb-2">NEXT PROJECT</p>
              <p className="text-sm font-semibold tracking-widest">VIEW CASE STUDY ↗</p>
            </div>
          </div>
        </Link>

        <SiteFooter />
      </div>
    </motion.div>
  );
}
`;
  fs.writeFileSync(`./src/routes/${filename}`, content);
}

createPage('projects_.agent-chaos.tsx', 'A.G.E.N.T. CHAOS', '/projects_/agent-chaos', 'ZYNGA SOLITAIRE', '/projects/zynga-solitaire');
createPage('projects_.zynga-solitaire.tsx', 'ZYNGA SOLITAIRE', '/projects_/zynga-solitaire', 'BEIN SPORTS CONNECT', '/projects/bein-sports-connect');
createPage('projects_.bein-sports-connect.tsx', 'BEIN SPORTS CONNECT', '/projects_/bein-sports-connect', 'ING BANK', '/projects/ing-bank');
createPage('projects_.ing-bank.tsx', 'ING BANK', '/projects_/ing-bank', 'CONTACT ME', '/contact');

console.log('Pages created successfully.');
