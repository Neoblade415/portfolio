import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { Safari } from "@/components/ui/safari";
import { Carousel_003 } from "@/components/ui/carousel-003";

export const Route = createFileRoute("/projects_/cortex")({
  head: () => ({
    meta: [
      { title: "CORTEX — Galekto" },
      { name: "description", content: "Case study for Cortex AI Operations Platform." },
    ],
  }),
  component: CortexCaseStudy,
});

function CortexCaseStudy() {
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
        
        {/* Site Header */}
        <div className="sticky top-0 z-50 w-full h-0 pointer-events-none">
          <div className="pointer-events-auto pt-4 md:pt-6">
            <SiteHeader variant="dark" centerIcons="diamond" backLink="/projects" bgColor={isScrolled ? "#333333" : "transparent"} />
          </div>
        </div>
          
        {/* Hero */}
        <div className="w-full bg-[#1c1c1c] h-screen min-h-[600px] flex items-end p-8 md:p-16 relative overflow-hidden">
          <img src="/cortex_hero_logo.png" alt="Cortex Dashboard Hero" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
          <h1 className="display-heading text-[12vw] md:text-[9rem] leading-[0.85] text-[#f2f0ec] relative z-10 drop-shadow-2xl">
            CORTEX
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">CLIENT</h4>
              <p className="text-sm font-medium">Internal R&D</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2026</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">Lead Frontend & UI Engineer</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PLATFORM</h4>
              <p className="text-sm font-medium">Web Platform & API</p>
            </div>
          </div>
        </div>

        {/* Overview & Grid */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT CONTEXT</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              Cortex is an AI-powered Virtual Chief Operating Officer (COO) designed specifically for modern e-commerce businesses. Rather than just a static dashboard, it is an intelligent operational layer that combines Generative AI, predictive analytics, and automated decision support to streamline fragmented supply chain operations and accelerate growth.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              E-commerce businesses historically struggle with isolated data silos—inventory, financial reporting, competitor tracking, and customer management are often scattered. Traditional tools visualize this data, but fail to provide conversational decision support or automated recommendations. Cortex solves this by ingesting real-time operational data via APIs and using Large Language Models (LLMs) to detect risks, track financial health, calculate safety stock levels, and provide proactive, context-aware operational guidance.
            </p>
          </div>
          <div className="w-full relative rounded-xl overflow-hidden shadow-2xl">
            <Safari url="cortex.ai" videoSrc="/safari_cortex_boomerang.mp4" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Engineering Architecture */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">FRONTEND ARCHITECTURE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                The frontend is built on the Next.js App Router, leveraging Server-Side Rendering (SSR) and React Server Components (RSC) to maintain performance despite heavy data visualization loads. I engineered a highly modular UI architecture, separating stateful dashboard widgets from static layout elements to ensure crisp 60fps rendering even when processing massive telemetry streams.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                To protect API keys and ensure secure backend communication, all AI requests are securely proxied through Next.js Route Handlers. The conversational AI interface relies on sophisticated Markdown rendering libraries, transforming raw LLM output into readable financial reports, tables, and structured operational summaries instantly.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">BACKEND & AI INFERENCE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                The backend service architecture is powered by Flask and Gunicorn, designed to handle concurrent, high-latency AI inference requests. This lightweight service acts as the orchestration layer between the frontend and the LLM providers (supporting OpenAI and Gemini via secure API keys managed in Render Secrets).
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                This environment-driven architecture cleanly separates deployment concerns. The Next.js frontend is deployed on Vercel for edge caching and global delivery, while the Flask inference engine is hosted on Render, optimized for compute-heavy natural language processing and API webhook ingestion from e-commerce platforms like Shopify and WooCommerce.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Screens UI */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
          {[1,2,3,4].map((i) => (
             <div key={i} className="w-full md:w-1/4 bg-[#333] aspect-[9/19.5] rounded-xl flex items-center justify-center border-4 border-[#222] shadow-xl">
               <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center">WIDGET UI {i}</span>
             </div>
          ))}
        </div>

        {/* UI Design & 2 Screens */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">INTELLIGENT WORKFLOWS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mb-12">
            <p className="text-sm md:text-base opacity-80 leading-relaxed">
              <strong>Inventory & Logistics:</strong> The system automatically calculates dynamic safety stock levels based on historical sales trends and seasonal fluctuations. It scrapes competitor pricing data to benchmark product availability, alerting owners to low-stock risks before they impact revenue.
            </p>
            <p className="text-sm md:text-base opacity-80 leading-relaxed">
              <strong>Financial Intelligence:</strong> Cortex acts as a virtual Chartered Accountant (CA). It automates profit and loss analysis, categorizes expenses, generates invoices, and identifies tax deduction opportunities. It consolidates this data into a unified, dark-mode-first dashboard that prevents cognitive overload.
            </p>
          </div>
          <div className="w-full relative mt-16">
            <Carousel_003 
              images={[
                { src: "/cortex_dashboard_1.png", alt: "Cortex Dashboard Screen 1" },
                { src: "/cortex_dashboard_2.png", alt: "Cortex Dashboard Screen 2" },
                { src: "/cortex_dashboard_3.png", alt: "Cortex Dashboard Screen 3" },
                { src: "/cortex_dashboard_4.png", alt: "Cortex Dashboard Screen 4" },
                { src: "/cortex_dashboard_5.png", alt: "Cortex Dashboard Screen 5" },
                { src: "/cortex_dashboard_6.png", alt: "Cortex Dashboard Screen 6" }
              ]} 
              showPagination={true} 
              showNavigation={true} 
              loop={true} 
              autoplay={true} 
            />
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
                  <span>SYSTEM ARCHITECTURE</span>
                  <span>AI ORCHESTRATION</span>
                  <span>DIGITAL TWIN</span>
                  <span>REACT SERVER COMPONENTS</span>
                  <span>FLASK APIS</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Learnings */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16 border-b border-black/10">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">MY CONTRIBUTIONS & IMPACT</h2>
          <div className="max-w-4xl">
            <ul className="list-disc pl-5 opacity-80 space-y-3 text-sm md:text-base">
              <li>Designed and developed the complete frontend architecture using Next.js App Router and React.</li>
              <li>Engineered the UI/UX experience, prioritizing high-contrast data visualizations and modular dashboard widgets.</li>
              <li>Integrated the conversational AI interface, developing the secure proxy layer to communicate with the Flask backend.</li>
              <li>Implemented real-time Markdown rendering for structured financial reports and AI-generated insights.</li>
              <li>Optimized client-side rendering performance and accessibility across the operational dashboards.</li>
              <li>Collaborated deeply with AI engineers to ensure the complete request lifecycle—from user interaction to LLM inference and frontend state hydration—was seamless and robust.</li>
            </ul>
            <p className="mt-8 text-sm md:text-base opacity-80 leading-relaxed font-semibold">
              The platform significantly reduced manual administrative effort, providing e-commerce managers with unparalleled operational visibility, automated compliance tracking, and actionable intelligence to drive accelerated business growth. The scalability roadmap envisions evolving Cortex into a fully Autonomous Commerce platform, where AI agents independently execute supply chain workflows with minimal human oversight.
            </p>
          </div>
        </div>

        {/* Next Project Hero (POLARIS) */}
        <Link to="/projects/polaris" state={{ transitionText: "LOADING" }} className="block w-full bg-[#1e4a3b] text-white h-screen min-h-[600px] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <div className="absolute inset-0 flex justify-end items-center opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-700">
             <span className="display-heading text-[25vw] text-white whitespace-nowrap select-none">POLARIS</span>
          </div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                POLARIS
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
