import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function BentoCarousel({ images, duration, direction = "right", radiusClass = "rounded-md" }: { images: string[], duration: number, direction?: "left" | "right" | "up" | "down" | "up-left" | "up-right" | "down-left" | "down-right", radiusClass?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (images.length <= 1) return;
    
    const slides = gsap.utils.toArray<HTMLElement>(".bento-slide", containerRef.current);
    
    const isUp = direction.includes("up");
    const isDown = direction.includes("down");
    const isLeft = direction.includes("left");
    const isRight = direction.includes("right");

    const xStart = isLeft ? 120 : isRight ? -120 : 0;
    const xEnd = isLeft ? -120 : isRight ? 120 : 0;
    
    const yStart = isUp ? 120 : isDown ? -120 : 0;
    const yEnd = isUp ? -120 : isDown ? 120 : 0;

    gsap.set(slides, { xPercent: 0, yPercent: 0, scale: 0.92, autoAlpha: 0 });
    gsap.set(slides, { xPercent: xStart, yPercent: yStart });
    gsap.set(slides[0], { xPercent: 0, yPercent: 0, scale: 1, autoAlpha: 1 }); 

    const tl = gsap.timeline({ repeat: -1 });

    slides.forEach((slide, i) => {
      const nextSlide = slides[(i + 1) % slides.length];

      tl.to({}, { duration: duration * 0.3 })
        .to(slide, { scale: 0.92, duration: duration * 0.3, ease: "power3.inOut" })
        .addLabel(`slide-${i}`)
        .to(slide, { xPercent: xEnd, yPercent: yEnd, autoAlpha: 0, duration: duration * 0.4, ease: "power3.inOut" }, `slide-${i}`)
        .to(nextSlide, 
          { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: duration * 0.4, ease: "power3.inOut" }, 
          `slide-${i}`
        )
        .to(nextSlide, { scale: 1, duration: duration * 0.3, ease: "power3.inOut" })
        .set(slide, { xPercent: xStart, yPercent: yStart });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center ${radiusClass}`}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          className={`bento-slide absolute inset-0 w-full h-full object-cover ${radiusClass}`}
          alt="Carousel slide"
        />
      ))}
    </div>
  );
}

export const Route = createFileRoute("/projects_/polaris")({
  head: () => ({
    meta: [
      { title: "POLARIS — Galekto" },
      { name: "description", content: "Case study for POLARIS — AI-Powered Urban Operating System." },
    ],
  }),
  component: PolarisCaseStudy,
});

function PolarisCaseStudy() {
  const scrollRef = useRef<HTMLDivElement>(null);
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
    <motion.div ref={scrollRef} onScroll={handleScroll} className="w-full h-full crt-content-scroll" style={{ background: "#f2f0ec" }}>
      <div className="w-full text-[#222]">

        {/* Header at Top (Sticky across whole page) */}
        <div className="sticky top-0 z-50 w-full h-0 pointer-events-none">
          <div className="pointer-events-auto pt-4 md:pt-6">
            <SiteHeader variant="dark" centerIcons="diamond" backLink="/projects" bgColor={isScrolled ? "#333333" : "transparent"} />
          </div>
        </div>

        {/* Full-Screen Hero */}
        <div className="relative w-full h-screen min-h-[600px] flex flex-col bg-[#1e4a3b]">
          {/* Preload hero image for LCP optimization */}
          <link rel="preload" as="image" href="/polaris_hero.webp" />
          
          {/* Background Image */}
          <img src="/polaris_hero.webp" alt="Polaris Design System" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover z-0" />

          {/* Solid Tint Overlay for text legibility */}
          <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

          {/* Title & Scroll Indicator at Bottom */}
          <div className="relative z-10 flex-1 flex items-end justify-between p-8 md:p-16 w-full">
            <h1 className="display-heading text-[18vw] md:text-[14rem] leading-[0.85] text-[#f2f0ec]">
              POLARIS
            </h1>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PROJECT</h4>
              <p className="text-sm font-medium">Polaris Urban OS</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2025</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">Full-Stack & AI Systems</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">STACK</h4>
              <p className="text-sm font-medium">React, FastAPI, Gemini, GCP</p>
            </div>
          </div>
        </div>

        {/* Overview & Problem Statement */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT CONTEXT</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              Polaris is an AI-powered Urban Operating System that orchestrates multiple specialized LLM agents to transform citizen-submitted infrastructure reports into dispatch-ready municipal work orders within seconds. Built to replace fragmented manual triage workflows with autonomous, explainable reasoning pipelines.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              The platform unifies computer vision, semantic search, geospatial intelligence, and structured reasoning to give municipalities a real-time understanding of infrastructure health — turning disconnected complaints into predictive operational intelligence.
            </p>

            <hr className="border-black/10 my-12" />

            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">THE PROBLEM</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              Municipalities process thousands of citizen reports annually — cracked sidewalks, potholes, broken streetlights, water main leaks — yet the infrastructure managing these complaints hasn't evolved. Fragmented reports arrive through phone calls, emails, and apps with no unified intake. Duplicate complaints from different citizens about the same issue pile up unchecked. Manual triage teams spend hours classifying, prioritizing, and routing issues that should take seconds.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              Traditional systems rely on static workflows, disconnected databases, and human reviewers making triage decisions without context — no access to infrastructure history, weather conditions, geospatial clustering, or related incidents. The result: delayed response times, missed cascading failures, and reactive maintenance that costs municipalities significantly more than preventive intervention.
            </p>
          </div>
        </div>


        {/* Architecture & Process */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">MULTI-AGENT ARCHITECTURE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                Polaris replaces monolithic AI with a sequential pipeline of specialized agents — each owning a single responsibility. The Intake Agent classifies submissions and evaluates severity. The Evidence Agent performs computer vision forensic analysis. The Synthesis Agent correlates reports against historical infrastructure data, geospatial clusters, and weather conditions. The Brief Agent generates dispatch-ready officer summaries.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Every inter-agent communication is validated through Pydantic schemas, ensuring structured JSON contracts between stages. This guarantees deterministic handoffs, production-grade reliability, and a complete decision audit trail from submission to dispatch.
              </p>
            </div>
            <div className="w-full aspect-video rounded-md overflow-hidden shadow-2xl bg-black flex items-center justify-center">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="metadata"
                poster="/polaris_poster.jpg"
                className="w-full h-full object-cover"
              >
                <source src="/polaris_opt.webm" type="video/webm" />
                <source src="/polaris_opt.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>


        {/* The Challenge & Solution */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Orchestrate multiple autonomous AI agents to reliably process multimodal inputs — photographs, natural language descriptions, geospatial coordinates — and produce structured, auditable outputs at production scale. The system needed to handle duplicate detection via semantic vector search, correlate infrastructure failures across geographic clusters, and generate actionable briefings while maintaining explainability at every decision point.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                A sequential multi-agent pipeline where each stage performs focused reasoning before handing validated outputs downstream. Gemini 2.5 Flash handles lightweight intake classification; Gemini 2.5 Pro powers deep synthesis with autonomous function calling against a PgVector-backed infrastructure database. Semantic embeddings enable cosine-similarity duplicate suppression, while geographic clustering surfaces cascading failures before they escalate into public safety risks.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="w-full py-16 md:py-24 mt-12 bg-[#111]">
          <div className="px-4 md:px-16 max-w-[1600px] mx-auto text-center">
            <h2 className="display-heading text-3xl md:text-4xl text-[#f2f0ec] mb-12">GIS INTELLIGENCE DASHBOARDS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 w-full h-auto min-h-[800px] md:h-[900px]">
              <div className="md:col-span-2 md:row-span-2 relative rounded-md overflow-hidden border border-[#444] bg-transparent min-h-[400px]">
                <BentoCarousel images={["/polaris1.webp", "/polaris2.webp", "/polaris4.webp", "/polaris3.webp", "/polaris5.webp"]} duration={6.5} direction="up" radiusClass="rounded-md" />
              </div>
              <div className="md:col-span-1 md:row-span-1 relative rounded-md overflow-hidden border border-[#444] bg-transparent min-h-[300px]">
                <BentoCarousel images={["/polaris2.webp", "/polaris5.webp", "/polaris1.webp", "/polaris4.webp", "/polaris3.webp"]} duration={5.0} direction="left" radiusClass="rounded-md" />
              </div>
              <div className="md:col-span-1 md:row-span-1 relative rounded-md overflow-hidden border border-[#444] bg-transparent min-h-[300px]">
                <BentoCarousel images={["/polaris3.webp", "/polaris1.webp", "/polaris5.webp", "/polaris2.webp", "/polaris4.webp"]} duration={4.5} direction="down-left" radiusClass="rounded-md" />
              </div>
              <div className="md:col-span-1 md:row-span-1 relative rounded-md overflow-hidden border border-[#444] bg-transparent min-h-[300px]">
                <BentoCarousel images={["/polaris4.webp", "/polaris3.webp", "/polaris1.webp", "/polaris5.webp", "/polaris2.webp"]} duration={7.0} direction="down" radiusClass="rounded-md" />
              </div>
              <div className="md:col-span-1 md:row-span-1 relative rounded-md overflow-hidden border border-[#444] bg-transparent min-h-[300px]">
                <BentoCarousel images={["/polaris5.webp", "/polaris4.webp", "/polaris2.webp", "/polaris1.webp", "/polaris3.webp"]} duration={5.5} direction="up-right" radiusClass="rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden mt-12">
          <div className="flex whitespace-nowrap w-[200vw]">
            <motion.div
              className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16 pr-8 md:pr-16"
              style={{ willChange: "transform" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-8 md:gap-16">
                  <span>MULTI-AGENT AI</span>
                  <span>COMPUTER VISION</span>
                  <span>SEMANTIC SEARCH</span>
                  <span>GIS</span>
                  <span>GCP</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Learnings */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">ENGINEERING TAKEAWAYS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            Building Polaris reinforced that production AI systems are fundamentally distributed systems problems. Agent orchestration, structured validation, fallback resilience, and explainability aren't optional features — they're the architecture. The semantic duplicate detection pipeline reduced redundant dispatches significantly, and geographic failure clustering identified cascading infrastructure issues that manual review consistently missed. Every design decision optimized for auditability: when an AI system makes autonomous municipal decisions, the reasoning trace is the product.
          </p>
        </div>

        {/* Next Project Hero */}
        <Link to="/projects/ovela" state={{ transitionText: "LOADING" }} className="block w-full bg-black text-white aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <img src="/ovela_hero.webp" alt="Ovela" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 z-0 transition-colors duration-700 group-hover:bg-black/60 pointer-events-none"></div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                OVELA
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
