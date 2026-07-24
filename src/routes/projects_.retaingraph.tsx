import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Macbook } from "@/components/ui/macbook";
import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function BentoCarousel({ images, duration, direction = "right" }: { images: string[], duration: number, direction?: "left" | "right" | "up" | "down" | "up-left" | "up-right" | "down-left" | "down-right" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slides = gsap.utils.toArray<HTMLElement>(".bento-slide", containerRef.current);
    
    // Parse direction
    const isUp = direction.includes("up");
    const isDown = direction.includes("down");
    const isLeft = direction.includes("left");
    const isRight = direction.includes("right");

    const xStart = isLeft ? 120 : isRight ? -120 : 0;
    const xEnd = isLeft ? -120 : isRight ? 120 : 0;
    
    const yStart = isUp ? 120 : isDown ? -120 : 0;
    const yEnd = isUp ? -120 : isDown ? 120 : 0;

    gsap.set(slides, { xPercent: 0, yPercent: 0, scale: 0.85 });
    gsap.set(slides, { xPercent: xStart, yPercent: yStart });
    gsap.set(slides[0], { xPercent: 0, yPercent: 0, scale: 1 }); 

    const tl = gsap.timeline({ repeat: -1 });

    slides.forEach((slide, i) => {
      const nextSlide = slides[(i + 1) % slides.length];

      tl.to({}, { duration: duration * 0.4 }) // hold
        .to(slide, { scale: 0.85, duration: duration * 0.2, ease: "power2.inOut" }) // shrink
        .addLabel(`slide-${i}`)
        .to(slide, { xPercent: xEnd, yPercent: yEnd, duration: duration * 0.3, ease: "power4.inOut" }, `slide-${i}`)
        .to(nextSlide, 
          { xPercent: 0, yPercent: 0, duration: duration * 0.3, ease: "power4.inOut" }, 
          `slide-${i}`
        )
        .to(nextSlide, { scale: 1, duration: duration * 0.2, ease: "power2.inOut" }) // expand next
        .set(slide, { xPercent: xStart, yPercent: yStart });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          className="bento-slide absolute w-full h-full object-cover rounded-md shadow-xl"
          alt="Dashboard preview"
        />
      ))}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
    </div>
  );
}

export const Route = createFileRoute("/projects_/retaingraph")({
  head: () => ({
    meta: [
      { title: "RETAINGRAPH — Galekto" },
      { name: "description", content: "Case study for RETAINGRAPH — AI-Powered Customer Success Intelligence Platform." },
    ],
  }),
  component: RetainGraphCaseStudy,
});

function RetainGraphCaseStudy() {
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
    <motion.div ref={scrollRef} onScroll={handleScroll} className="w-full h-full crt-content-scroll" style={{ background: "#ffffff" }}>
      <div className="w-full text-[#222]">

        {/* Site Header (Sticky across whole page) */}
        <div className="sticky top-0 z-50 w-full h-0 pointer-events-none">
          <div className="pointer-events-auto pt-4 md:pt-6">
            <SiteHeader variant="dark" centerIcons="diamond" backLink="/projects" bgColor={isScrolled ? "#333333" : "transparent"} />
          </div>
        </div>

        {/* Hero */}
        <div className="w-full h-screen min-h-[600px] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <img src="/retaingraph_hero.png" alt="RetainGraph Interface" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/40 z-0 transition-opacity duration-700 group-hover:bg-black/20 pointer-events-none"></div>
          
          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-0">
            <div>
              <h1 className="display-heading text-[12vw] md:text-[10rem] leading-[0.85] text-[#f0ebe3] drop-shadow-lg mix-blend-difference">
                RETAINGRAPH
              </h1>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10 text-[#222]">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PROJECT</h4>
              <p className="text-sm font-medium">RetainGraph CS Platform</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2025</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">Backend & AI Systems</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">STACK</h4>
              <p className="text-sm font-medium">Node.js, Cognee, Groq, React</p>
            </div>
          </div>
        </div>

        {/* Overview — Kept standard */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT CONTEXT</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              RetainGraph is an AI-powered Customer Success Intelligence Platform that combines persistent knowledge graphs, autonomous AI agents, graph reasoning, and zero-latency inference to proactively prevent customer churn. Rather than a chatbot or CRM extension, it functions as a Customer Success Operating System — continuously ingesting interactions, constructing semantic knowledge graphs per account, and autonomously evaluating health before issues escalate.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              The platform transforms fragmented customer communications — emails, meeting transcripts, support tickets, CRM notes, and product usage events — into structured graph intelligence capable of multi-hop causal reasoning across entire customer histories.
            </p>
          </div>
        </div>

        {/* Standard Challenge & Solution order (challenge first) */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Customer Success teams operate across fragmented communication channels with no unified intelligence layer. Traditional CRM systems and vector search retrieve isolated documents without understanding relationships, temporal dependencies, or causal chains. Context is lost between meetings, tickets pile up without connection to account history, and churn signals surface only after they've already materialized. The result: reactive customer management, inconsistent account knowledge, and preventable revenue loss.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                RetainGraph builds persistent knowledge graphs for every customer account using Cognee Cloud, enabling multi-hop graph traversal instead of isolated document retrieval. Autonomous background workers continuously process new interactions, evaluate account health, and generate structured recommendations — all without manual analyst intervention. Groq LPUs power zero-latency inference for real-time conversational intelligence, while AES-256-GCM encryption in a Trusted Execution Environment ensures enterprise-grade data confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* Single panoramic mockup with floating stat badges */}
        <div className="px-8 md:px-16 py-12 max-w-6xl mx-auto">
          <Macbook variant="space-black" videoSrc="/retaingraph_video.mp4" />
        </div>

        {/* Pipeline Steps — Clean architectural grid layout */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto border-t border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <h2 className="display-heading text-3xl md:text-4xl">INFERENCE PIPELINE</h2>
            <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-md">
              Structured AI reasoning flows from ingestion through graph memory to dispatch-ready intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10">
            {[
              { step: "01", title: "INGEST", desc: "Emails, tickets, transcripts, events." },
              { step: "02", title: "GRAPH", desc: "Entity extraction & relationship construction." },
              { step: "03", title: "EVALUATE", desc: "Health scoring & churn risk detection." },
              { step: "04", title: "ACT", desc: "Briefings, alerts & recommendations." },
            ].map((item, i) => (
              <div key={i} className={`pt-8 md:pt-0 pb-8 md:pb-0 ${i === 0 ? 'md:pr-12' : i === 3 ? 'md:pl-12' : 'md:px-12'}`}>
                <div className="text-xs tracking-[0.2em] font-bold opacity-40 mb-4">
                  {item.step}
                </div>
                <h4 className="text-sm tracking-[0.2em] font-bold mb-3">{item.title}</h4>
                <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture — Reversed: image left, text right */}
        <div className="px-8 md:px-16 py-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="order-2 md:order-1 w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-black/10 bg-[#e8e6e1]">
              <video 
                src="/liquid_retaingraph.mov" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="display-heading text-3xl md:text-4xl mb-6">ARCHITECTURE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                The backend is built on Node.js, Express, and Prisma with SQLite for lightweight persistent storage. Cognee Cloud serves as the semantic memory layer — continuously constructing and updating knowledge graphs from ingested customer interactions. Autonomous background workers process interaction deltas, evaluate account health, calculate churn scores, and generate structured recommendations via deterministic JSON outputs.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Every AI output is validated through structured JSON schemas, ensuring reliable parsing, downstream automation, and complete auditability across the reasoning pipeline.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards — Clean text grid to match aesthetic */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">PLATFORM CAPABILITIES</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                RetainGraph combines persistent graph memory with autonomous health evaluation, zero-latency inference, and enterprise-grade encryption — surfacing hidden churn signals via graph traversal that isolated document retrieval consistently misses.
              </p>
            </div>
            <div className="flex flex-col gap-8 md:gap-12">
              {[
                { label: "GRAPH TRAVERSAL", desc: "Multi-hop reasoning across entity relationships, temporal dependencies, and causal chains." },
                { label: "COMPARE ENGINE", desc: "Live side-by-side comparison between vector search retrieval and graph-based reasoning." },
                { label: "ZERO-LATENCY INFERENCE", desc: "Groq LPU-powered streaming responses with sub-100ms inference latency." },
              ].map((item, i) => (
                <div key={i}>
                  <h4 className="text-[10px] tracking-[0.2em] font-bold mb-2">{item.label}</h4>
                  <p className="text-sm leading-relaxed opacity-60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard section — full-width alternate background */}
        <div className="w-full bg-[#111] py-16 md:py-24 mt-12">
          <div className="px-8 md:px-16 max-w-[1400px] mx-auto text-center">
            <h2 className="display-heading text-3xl md:text-4xl text-[#f2f0ec] mb-8">INTELLIGENCE DASHBOARDS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 md:h-[800px] xl:h-[1000px] w-full">
              
              {/* 1. Top Left Tall (Phone) */}
              <div className="md:col-span-1 md:row-span-2 bg-transparent rounded-md relative overflow-hidden group aspect-[3/4] md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph1.png", "/retaingraph3.png", "/retaingraph_hero.png", "/retaingraph4.png", "/retaingraph5.png", "/retaingraph6.png"]} duration={7.0} direction="down" />
              </div>

              {/* 2. Top Middle-Left Square (4.875) */}
              <div className="md:col-span-1 md:row-span-1 bg-transparent rounded-md relative overflow-hidden group aspect-square md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph3.png", "/retaingraph4.png", "/retaingraph_hero.png", "/retaingraph5.png", "/retaingraph6.png", "/retaingraph1.png"]} duration={5.0} direction="up-left" />
              </div>

              {/* 3. Top Middle-Right Square (57K) */}
              <div className="md:col-span-1 md:row-span-1 bg-transparent rounded-md relative overflow-hidden group aspect-square md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph4.png", "/retaingraph5.png", "/retaingraph_hero.png", "/retaingraph6.png", "/retaingraph1.png", "/retaingraph3.png"]} duration={6.0} direction="down-right" />
              </div>

              {/* 4. Top Right Tall (Team) */}
              <div className="md:col-span-1 md:row-span-2 bg-transparent rounded-md relative overflow-hidden group aspect-[3/4] md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph5.png", "/retaingraph6.png", "/retaingraph_hero.png", "/retaingraph1.png", "/retaingraph3.png", "/retaingraph4.png"]} duration={7.5} direction="up" />
              </div>

              {/* 5. Center Large (Chart) */}
              <div className="md:col-span-2 md:row-span-2 bg-transparent rounded-md relative overflow-hidden group aspect-video md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph6.png", "/retaingraph1.png", "/retaingraph_hero.png", "/retaingraph3.png", "/retaingraph4.png", "/retaingraph5.png"]} duration={8.0} direction="left" />
              </div>

              {/* 6. Bottom Left Tall (Smart Digital) */}
              <div className="md:col-span-1 md:row-span-2 bg-transparent rounded-md relative overflow-hidden group aspect-[3/4] md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph4.png", "/retaingraph6.png", "/retaingraph_hero.png", "/retaingraph5.png", "/retaingraph1.png", "/retaingraph3.png"]} duration={6.5} direction="up-right" />
              </div>

              {/* 7. Bottom Right Square (CUBO) */}
              <div className="md:col-span-1 md:row-span-1 bg-transparent rounded-md relative overflow-hidden group aspect-square md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph3.png", "/retaingraph1.png", "/retaingraph_hero.png", "/retaingraph6.png", "/retaingraph4.png", "/retaingraph5.png"]} duration={4.5} direction="down-left" />
              </div>

              {/* 8. Bottom Middle-Left Square (Font) */}
              <div className="md:col-span-1 md:row-span-1 bg-transparent rounded-md relative overflow-hidden group aspect-square md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph1.png", "/retaingraph5.png", "/retaingraph_hero.png", "/retaingraph3.png", "/retaingraph6.png", "/retaingraph4.png"]} duration={5.5} direction="right" />
              </div>

              {/* 9. Bottom Right Wide (We Build Future) */}
              <div className="md:col-span-2 md:row-span-1 bg-transparent rounded-md relative overflow-hidden group aspect-[21/9] md:aspect-auto w-full h-full">
                <BentoCarousel images={["/retaingraph5.png", "/retaingraph4.png", "/retaingraph_hero.png", "/retaingraph1.png", "/retaingraph6.png", "/retaingraph3.png"]} duration={6.0} direction="left" />
              </div>

            </div>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden">
          <div className="flex whitespace-nowrap w-[200vw]">
            <motion.div
              className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16 pr-8 md:pr-16"
              style={{ willChange: "transform" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-8 md:gap-16">
                  <span>KNOWLEDGE GRAPHS</span>
                  <span>COGNEE</span>
                  <span>GROQ LPU</span>
                  <span>NODE.JS</span>
                  <span>PRISMA</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Learnings — Standard treatment */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">ENGINEERING TAKEAWAYS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            Building RetainGraph reinforced that long-term AI memory is fundamentally a systems engineering problem — not a prompt engineering one. Graph traversal provides qualitatively different reasoning than vector similarity search: multi-hop causal chains, temporal relationship evolution, and entity-level semantic linking surface churn signals that isolated document retrieval cannot. Autonomous background processing with structured JSON outputs turned what could have been a fragile prototype into a production-grade intelligence pipeline. The TEE encryption architecture was non-negotiable for enterprise customer data — security isn't a feature, it's the foundation.
          </p>
        </div>

        {/* Next Project Hero (NAVSWAP) */}
        <Link to="/projects/navswap" state={{ transitionText: "LOADING" }} className="block w-full bg-black text-[#f2f0ec] aspect-[21/9] flex items-end p-8 md:p-16 cursor-pointer relative overflow-hidden group">
          <img src="/pep_app_hero.png" alt="NavSwap" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 z-0 transition-colors duration-700 group-hover:bg-black/60 pointer-events-none"></div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                NAVSWAP
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
