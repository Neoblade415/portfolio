import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/projects_/navswap")({
  head: () => ({
    meta: [
      { title: "NavSwap — Galekto" },
      { name: "description", content: "Engineering Case Study for NavSwap." },
    ],
  }),
  component: NavSwapCaseStudy,
});

function NavSwapCaseStudy() {
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
        
        {/* Site Header (Sticky across whole page) */}
        <div className="sticky top-0 z-50 w-full h-0 pointer-events-none">
          <div className="pointer-events-auto pt-4 md:pt-6">
            <SiteHeader variant="dark" centerIcons="diamond" backLink="/projects" bgColor={isScrolled ? "#333333" : "transparent"} />
          </div>
        </div>
          
        {/* NavSwap Hero */}
        <div className="w-full bg-[#1c1c1c] h-screen min-h-[600px] flex items-end p-8 md:p-16 relative overflow-hidden">
          <img src="/pep_app_hero.png" alt="NavSwap Hero" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
          <h1 className="display-heading text-[12vw] md:text-[9rem] leading-[0.85] text-[#f2f0ec] relative z-10 drop-shadow-2xl">
            NAVSWAP
          </h1>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PROJECT</h4>
              <p className="text-sm font-medium">NavSwap OS</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2026</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">Lead Engineer</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PLATFORM</h4>
              <p className="text-sm font-medium">Cloud & Web</p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">ABOUT NAVSWAP</h3>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
              NavSwap is an AI-powered Operating System for Battery Swapping. Far beyond a simple EV charging application, it serves as a centralized intelligent platform that continuously monitors, predicts, optimizes, and orchestrates distributed battery swapping networks in real time. 
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              By maintaining live operational models of stations, batteries, chargers, users, and technicians, NavSwap acts as a complete Digital Twin of the entire ecosystem, translating complex telemetry into actionable intelligence.
            </p>
          </div>
        </div>

        {/* The Challenge & The Solution */}
        <div className="px-8 md:px-16 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-4">
                Real-world EV battery swapping ecosystems are plagued by station congestion, uneven battery distribution, long waiting times, and unpredictable hardware failures. Inefficient inventory management and manual monitoring lead to poor fleet coordination and significant operational downtime.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                These challenges cannot be effectively solved using traditional rule-based systems. The sheer volume of variables requires intelligent AI-driven orchestration to balance supply and demand dynamically.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-4">
                We engineered a platform that continuously collects real-time telemetry from charging stations, IoT sensors, and operational infrastructure. 
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                At the core of NavSwap is an AI Decision Engine that powers intelligent station recommendations, dynamic driver rerouting, battery inventory balancing, predictive demand forecasting, and automated fault management—drastically reducing downtime.
              </p>
            </div>
          </div>
        </div>

        {/* Laptop Mockup */}
        <div className="px-8 md:px-16 py-12 max-w-[1600px] mx-auto">
          <img src="/macbook.png" alt="Web Dashboard Laptop Mockup" className="w-full h-auto drop-shadow-2xl rounded-xl" />
        </div>

        {/* Core Architecture */}
        <div className="px-8 md:px-16 py-16 md:py-20 max-w-7xl mx-auto">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">TECHNICAL ARCHITECTURE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                <strong>Real-Time Data Pipeline:</strong> The system architecture ingests telemetry via event streams. We use <strong>Kafka</strong> for event-driven communication between ingestion services, feature engineering pipelines, recommendation engines, and analytics. <strong>Redis</strong> acts as a high-speed caching layer for recommendation results, session management, and low-latency dashboard updates.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                <strong>Backend & Database:</strong> <strong>PostgreSQL</strong> serves as the primary relational database storing historical telemetry, maintenance records, and inventory data. The backend utilizes an API Gateway, robust REST APIs, and background processing for AI inference. Security is enforced through JWT-based authentication, RBAC, and secure session management.
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                <strong>Frontend & Visualization:</strong> The frontend is built with <strong>Next.js App Router, TypeScript, and Tailwind CSS</strong>. We leveraged <strong>Framer Motion</strong> for smooth UI transitions and <strong>React Three Fiber</strong> to create immersive 3D Digital Twin experiences of the stations.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                <strong>Scalability:</strong> Deployed via a cloud-native Docker strategy, the modular microservices architecture allows NavSwap to scale seamlessly from a few stations to a nationwide infrastructure network.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">AI ORCHESTRATION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                The <strong>Intelligent Recommendation Engine</strong> analyzes user location, battery percentage, queue lengths, charger availability, and predicted traffic to recommend optimal stations. It utilizes a multi-objective scoring engine factoring in wait times, distance, and energy stability, providing users with AI-generated natural language explanations for transparency.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                A <strong>Hierarchical Fault Resolution Model</strong> automatically detects and diagnoses hardware degradation. Level 1 handles self-recovery, Level 2 performs AI impact assessment, and Level 3 generates automated technician assignment tickets—all while predictive maintenance prevents failures before they happen.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              {/* iPhone 17 Pro Frame */}
              <div className="relative w-full max-w-[280px] aspect-[9/19.5] rounded-[3.5rem] bg-[#1a1a1a] p-2 shadow-2xl border border-white/10 ring-4 ring-[#2a2a2a]">
                <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[32%] h-7 bg-black rounded-full z-20 flex items-center justify-between px-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 ml-1"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 mr-1"></div>
                  </div>
                  <img src="/phone_view.png" alt="App Home Screen" className="absolute inset-0 w-full h-full object-cover z-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Result */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-black/10">
                <img src="/dashboard.png" alt="NavSwap Dashboard" className="w-full h-auto object-cover" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="display-heading text-3xl md:text-4xl mb-6">BUSINESS IMPACT</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-6">
                The implementation of NavSwap dramatically reduced driver waiting times and improved overall station utilization. By leveraging AI for inventory management, the network maintains significantly higher battery availability.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Predictive analytics lowered maintenance costs and optimized fleet operations, increasing infrastructure efficiency and drastically elevating customer satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Wireframe to Visual (Two Phones) */}
        <div className="px-8 md:px-16 py-20 max-w-7xl mx-auto">
          <div className="w-full bg-[#d0cac2] min-h-[500px] aspect-video md:aspect-[21/9] rounded-xl flex items-center justify-center shadow-inner overflow-hidden relative">
             <div className="absolute inset-0 flex items-center justify-center gap-6 md:gap-12 rotate-[-15deg] scale-[1.15] md:scale-125">
               <div className="w-48 md:w-64 aspect-[9/19.5] bg-[#111] rounded-3xl border-4 border-[#333] shadow-2xl overflow-hidden relative">
                 <div className="absolute inset-0 bg-white/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
                   <span className="text-white text-[10px] tracking-[0.2em] font-bold">DARK THEME</span>
                 </div>
                 <img src="/wireframe_Dark_full.png" alt="Dark Wireframe" className="absolute top-0 w-full object-cover" />
               </div>
               <div className="w-48 md:w-64 aspect-[9/19.5] bg-white/80 rounded-3xl border-4 border-white/50 shadow-2xl overflow-hidden relative mt-16 md:mt-24">
                 <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
                   <span className="text-white text-[10px] tracking-[0.2em] font-bold">LIGHT THEME</span>
                 </div>
                 <img src="/wire_frame_bright.png" alt="Bright Wireframe" className="absolute top-0 w-full object-cover" />
               </div>
             </div>
          </div>
          <p className="text-center text-xs tracking-[0.2em] opacity-50 mt-8">MOBILE WIREFRAME EXPLORATION</p>
        </div>

        {/* Wireframes Grid */}
        <div className="px-8 md:px-16 py-12 max-w-[1400px] mx-auto">
          <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-black/10">
             <img src="/wireframe_grid.png" alt="Wireframe Architecture Grid" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Footer Tags (Moving Trail Effect) */}
        <div className="w-full py-16 md:py-24 border-t border-black/10 overflow-hidden mt-12 relative">
          <div className="flex whitespace-nowrap w-[200vw]">
            <motion.div
              className="display-heading text-[5vw] md:text-5xl opacity-30 tracking-widest flex gap-8 md:gap-16 pr-8 md:pr-16"
              style={{ willChange: "transform" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-8 md:gap-16">
                  <span>AI ORCHESTRATION</span>
                  <span>DIGITAL TWIN</span>
                  <span>DISTRIBUTED SYSTEMS</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Future Scope */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">FUTURE ENHANCEMENTS</h2>
          <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-4xl">
            The roadmap for NavSwap includes autonomous station operations, edge AI deployment for offline reliability, and smart city grid optimization. We are actively exploring reinforcement learning-based optimization for dynamic pricing, robotics-assisted maintenance, and Vehicle-to-Grid (V2G) integrations to transform swapping stations into decentralized energy hubs.
          </p>
        </div>

        {/* Next Project Hero (CORTEX) */}
        <Link to="/projects/cortex" state={{ transitionText: "LOADING" }} className="block w-full bg-black text-white aspect-[21/9] flex items-end p-8 md:p-16 cursor-pointer transition-colors relative overflow-hidden group">
          <img src="/cortex_hero_logo.png" alt="Cortex" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 z-0 transition-colors duration-700 group-hover:bg-black/60 pointer-events-none"></div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                CORTEX
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
