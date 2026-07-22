import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";

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
          {/* Background Image */}
          <img src="/polaris_hero.png" alt="Polaris Hero" className="absolute inset-0 w-full h-full object-cover z-0" />

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

        {/* Overview & Intro text */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT CONTEXT</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              Polaris is an AI-powered Urban Operating System that orchestrates multiple specialized LLM agents to transform citizen-submitted infrastructure reports into dispatch-ready municipal work orders within seconds. Built to replace fragmented manual triage workflows with autonomous, explainable reasoning pipelines.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              The platform unifies computer vision, semantic search, geospatial intelligence, and structured reasoning to give municipalities a real-time understanding of infrastructure health — turning disconnected complaints into predictive operational intelligence.
            </p>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">THE PROBLEM</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              Municipalities process thousands of citizen reports annually — cracked sidewalks, potholes, broken streetlights, water main leaks — yet the infrastructure managing these complaints hasn't evolved. Fragmented reports arrive through phone calls, emails, and apps with no unified intake. Duplicate complaints from different citizens about the same issue pile up unchecked. Manual triage teams spend hours classifying, prioritizing, and routing issues that should take seconds.
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              Traditional systems rely on static workflows, disconnected databases, and human reviewers making triage decisions without context — no access to infrastructure history, weather conditions, geospatial clustering, or related incidents. The result: delayed response times, missed cascading failures, and reactive maintenance that costs municipalities significantly more than preventive intervention.
            </p>
          </div>
        </div>

        {/* 3 Architecture Diagrams */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-center">
          {[1,2,3].map((i) => (
             <div key={i} className="w-full md:w-1/3 bg-[#2a6853] aspect-[9/19.5] rounded-[2rem] flex items-center justify-center border-[8px] border-[#1e4a3b] shadow-2xl relative overflow-hidden">
               <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center px-4">{["MULTI-AGENT PIPELINE", "GIS DASHBOARD", "AI REASONING"][i-1]}</span>
             </div>
          ))}
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
            <div className="w-full bg-white aspect-square md:aspect-[4/3] rounded-xl flex items-center justify-center shadow-sm border border-black/10 p-8">
              <span className="text-xs tracking-[0.2em] opacity-50 text-center">PIPELINE ARCHITECTURE DIAGRAM</span>
            </div>
          </div>
        </div>

        {/* 4 Agent Screens */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
          {["INTAKE AGENT", "EVIDENCE AGENT", "SYNTHESIS AGENT", "BRIEF AGENT"].map((label, i) => (
             <div key={i} className="w-full md:w-1/4 bg-[#111] aspect-[9/19.5] rounded-xl flex items-center justify-center border border-black/10 shadow-lg">
               <span className="text-[10px] tracking-[0.2em] opacity-40 text-white text-center px-2">{label}</span>
             </div>
          ))}
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
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="w-full bg-[#e8e6e1] aspect-[21/9] rounded-xl flex items-center justify-center shadow-sm border border-black/10">
             <span className="text-xs tracking-[0.2em] opacity-50 text-center">GIS INTELLIGENCE DASHBOARD — INFRASTRUCTURE OVERLAYS & CLUSTER VISUALIZATION</span>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden mt-12">
          <div className="flex justify-center whitespace-nowrap px-4">
            <span className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16">
              <span>MULTI-AGENT AI</span>
              <span>COMPUTER VISION</span>
              <span>SEMANTIC SEARCH</span>
              <span>GIS</span>
              <span>GCP</span>
            </span>
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
        <Link to="/projects/ovela" state={{ transitionText: "LOADING" }} className="block w-full bg-[#201041] text-white aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <div className="absolute inset-0 flex justify-end items-center opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-700">
             <span className="display-heading text-[25vw] text-white whitespace-nowrap select-none">OVELA</span>
          </div>
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
