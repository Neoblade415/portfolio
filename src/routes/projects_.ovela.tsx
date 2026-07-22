import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { Safari } from "@/components/ui/safari";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Route = createFileRoute("/projects_/ovela")({
  head: () => ({
    meta: [
      { title: "OVELA — Galekto" },
      { name: "description", content: "Case study for OVELA — Premium Luxury Fashion E-Commerce Platform." },
    ],
  }),
  component: OvelaCaseStudy,
});

function MobileStorefrontCarousel() {
  const images = ["/ovela1.png", "/ovela2.png", "/ovela3.png"];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slides = gsap.utils.toArray<HTMLElement>(".gsap-slide");
    
    // Initial setup
    gsap.set(slides, { xPercent: -150, scale: 0.85 });
    gsap.set(slides[0], { xPercent: 0, scale: 0.85 }); // First slide is ready in the center

    const tl = gsap.timeline({ repeat: -1 });

    slides.forEach((slide: HTMLElement, i: number) => {
      const nextSlide = slides[(i + 1) % slides.length];

      tl.to(slide, { scale: 1, duration: 1.2, ease: "expo.inOut" }, "+=0.2") // Expand
        .to({}, { duration: 1.5 }) // Hold at full scale
        .to(slide, { scale: 0.85, duration: 1.0, ease: "expo.inOut" }) // Shrink
        .addLabel(`slide-${i}`)
        // Transition: Current slide moves right out of frame, next slide moves from left into center
        .to(slide, { xPercent: 150, duration: 1.2, ease: "power4.inOut" }, `slide-${i}`)
        .to(nextSlide, 
          { xPercent: 0, duration: 1.2, ease: "power4.inOut" }, 
          `slide-${i}`
        )
        // Reset current slide to the left instantly so it's ready for its next turn
        .set(slide, { xPercent: -150 });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full md:w-2/5 bg-[#faf9f6] rounded-md border border-black/10 shadow-lg p-0 overflow-hidden aspect-[3/4] relative flex items-center justify-center">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          className="gsap-slide absolute w-full h-full object-cover rounded-md shadow-md"
          alt={`Mobile Storefront ${i + 1}`}
        />
      ))}
    </div>
  );
}

function BentoCarousel({ images, duration, direction = "right" }: { images: string[], duration: number, direction?: "left" | "right" | "up" | "down" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slides = gsap.utils.toArray<HTMLElement>(".bento-slide", containerRef.current);
    
    const axis = direction === "left" || direction === "right" ? "xPercent" : "yPercent";
    const isReversed = direction === "left" || direction === "up";
    const offScreenStart = isReversed ? 120 : -120;
    const offScreenEnd = isReversed ? -120 : 120;

    gsap.set(slides, { xPercent: 0, yPercent: 0, scale: 0.85 });
    gsap.set(slides, { [axis]: offScreenStart });
    gsap.set(slides[0], { [axis]: 0, scale: 1 }); 

    const tl = gsap.timeline({ repeat: -1 });

    slides.forEach((slide, i) => {
      const nextSlide = slides[(i + 1) % slides.length];

      tl.to({}, { duration: duration * 0.4 }) // hold
        .to(slide, { scale: 0.85, duration: duration * 0.2, ease: "power2.inOut" }) // shrink
        .addLabel(`slide-${i}`)
        .to(slide, { [axis]: offScreenEnd, duration: duration * 0.3, ease: "power4.inOut" }, `slide-${i}`)
        .to(nextSlide, 
          { [axis]: 0, duration: duration * 0.3, ease: "power4.inOut" }, 
          `slide-${i}`
        )
        .to(nextSlide, { scale: 1, duration: duration * 0.2, ease: "power2.inOut" }) // expand next
        .set(slide, { [axis]: offScreenStart });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          className="bento-slide absolute w-full h-full object-cover rounded-md shadow-xl"
          alt="Feature preview"
        />
      ))}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
    </div>
  );
}

function OvelaCaseStudy() {
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

        {/* Hero */}
        <div className="w-full bg-[#201041] h-screen min-h-[600px] flex items-end p-8 md:p-16 relative overflow-hidden">
          <img src="/ovela_hero.png" alt="Ovela Commerce" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
          <div className="relative z-10">
            <h1 className="display-heading text-[12vw] md:text-[9rem] leading-[0.85] text-[#f2f0ec] drop-shadow-2xl">
              OVELA
            </h1>
            <p className="text-xs md:text-sm tracking-[0.3em] text-white/80 mt-6 uppercase drop-shadow-md">Luxury Fashion Commerce</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="w-full border-y border-black/10 bg-[#ebe9e4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 px-8 md:px-16 py-6 md:py-8 mx-auto divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="md:px-8 first:md:pl-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">PROJECT</h4>
              <p className="text-sm font-medium">OVELA Commerce</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">YEAR</h4>
              <p className="text-sm font-medium">2025</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">ROLE</h4>
              <p className="text-sm font-medium">Frontend Architect</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-8 last:md:pr-0">
              <h4 className="text-[10px] tracking-[0.2em] font-bold opacity-60 mb-2">STACK</h4>
              <p className="text-sm font-medium">Next.js, Supabase, Firebase, Docker</p>
            </div>
          </div>
        </div>

        {/* Overview — Wide single-column with large type */}
        <div className="px-4 md:px-6 py-12 max-w-7xl mx-auto">
          <h3 className="text-xs tracking-[0.2em] font-semibold mb-6">PROJECT CONTEXT</h3>
          <p className="text-xl md:text-2xl opacity-80 leading-relaxed mb-6">
            OVELA is a full-stack luxury fashion commerce platform engineered to deliver a premium digital shopping experience while equipping businesses with intelligent operational tooling.
          </p>
          <p className="text-base md:text-lg opacity-60 leading-relaxed">
            The platform spans customer-facing storefronts and a comprehensive administrative dashboard — unifying product management, inventory synchronization, order processing, analytics, and customer engagement under a single architecture built on Next.js 14 with TypeScript, Supabase, Firebase Authentication, and Tailwind CSS.
          </p>
        </div>

        {/* Solution first, then Challenge — reversed for commerce narrative */}
        <div className="px-4 md:px-6 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE SOLUTION</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                OVELA unifies the full commerce lifecycle — from product discovery and persistent shopping carts through checkout, order tracking, and administrative dashboarding — into a single platform. React Context manages global state across authentication, cart, and user preferences. Supabase provides relational persistence with real-time inventory synchronization. The admin dashboard surfaces sales analytics, customer management, order fulfillment, and product catalog controls from a centralized interface.
              </p>
            </div>
            <div>
              <h2 className="display-heading text-3xl md:text-4xl mb-6">THE CHALLENGE</h2>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                Modern fashion retailers operate across fragmented toolchains — separate systems for inventory, order management, customer accounts, and analytics. This fragmentation leads to overselling, inconsistent user experiences, delayed fulfillment, and limited operational visibility. Most e-commerce platforms lack the integrated architecture needed to synchronize real-time inventory, secure authentication, and administrative control within a single, maintainable codebase.
              </p>
            </div>
          </div>
        </div>

        {/* Staggered Mockups — Asymmetric offset layout */}
        <div className="px-8 md:px-16 py-20 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <MobileStorefrontCarousel />
            <div className="w-full md:w-3/5 flex flex-col gap-2 justify-between">
              <div className="w-full flex items-center justify-center ">
                <img src="/ovela_logo_without_bg.png" alt="Ovela Logo" className="w-full h-auto object-contain max-h-[250px]" />
              </div>
              <div className="relative shadow-xl w-full">
                <Safari url="admin.ovela.com" videoSrc="/ovela_video.mp4" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Architecture Strip */}
        <div className="w-full bg-[#111] py-16 md:py-24">
          <div className="px-8 md:px-16 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-5">
              <h2 className="display-heading text-3xl md:text-4xl text-[#f2f0ec] mb-6">ARCHITECTURE</h2>
              <p className="text-sm md:text-base opacity-70 text-[#f2f0ec] leading-relaxed mb-6">
                The frontend is organized into customer storefront and admin dashboard modules, sharing a reusable component library and type system. Next.js App Router handles server-side rendering for product pages and secure route protection for admin interfaces. Firebase Authentication manages user identity while React Context synchronizes cart state and session data across the application.
              </p>
              <p className="text-sm md:text-base opacity-70 text-[#f2f0ec] leading-relaxed">
                Supabase provides the PostgreSQL-backed data layer with relational schemas for products, orders, customers, cart items, inventory, and error logging. Docker containerization ensures consistent development and deployment environments.
              </p>
            </div>
            <div className="md:col-span-7 w-full flex justify-center">
              <img src="/ovela_all_pages.png" alt="Ovela System Architecture Diagram" className="w-full h-auto object-cover  scale-90 md:scale-110 transform origin-center" />
            </div>
          </div>
        </div>

        {/* Bento Feature Grid — Asymmetric cards */}
        <div className="px-8 md:px-16 py-16 md:py-24 max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="display-heading text-3xl md:text-4xl mb-6">PRODUCT FEATURES</h2>
            <p className="text-sm md:text-base opacity-80 leading-relaxed">
              OVELA combines curated product discovery with a persistent cart system, secure checkout flows, order tracking, and a fully-featured administrative dashboard — all within a responsive, animation-enhanced interface designed for luxury retail.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-transparent rounded-md flex items-center justify-center aspect-[16/9] relative overflow-hidden group">
              <BentoCarousel images={["/ovela4.png", "/ovela5.png", "/ovela6.png", "/ovela7.png", "/ovela8.png", "/ovela9.png"]} duration={6.0} direction="up" />
            </div>
            <div className="bg-transparent rounded-md flex items-center justify-center aspect-[4/3] relative overflow-hidden group">
              <BentoCarousel images={["/ovela7.png", "/ovela8.png", "/ovela9.png", "/ovela4.png", "/ovela5.png", "/ovela6.png"]} duration={4.5} direction="left" />
            </div>
            <div className="bg-transparent rounded-md flex items-center justify-center aspect-[4/3] relative overflow-hidden group">
              <BentoCarousel images={["/ovela6.png", "/ovela9.png", "/ovela4.png", "/ovela8.png", "/ovela5.png", "/ovela7.png"]} duration={4.5} direction="right" />
            </div>
            <div className="md:col-span-2 bg-transparent rounded-md flex items-center justify-center aspect-[16/9] relative overflow-hidden group">
              <BentoCarousel images={["/ovela9.png", "/ovela7.png", "/ovela5.png", "/ovela6.png", "/ovela8.png", "/ovela4.png"]} duration={6.0} direction="down" />
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
                  <span>NEXT.JS</span>
                  <span>TYPESCRIPT</span>
                  <span>SUPABASE</span>
                  <span>FIREBASE AUTH</span>
                  <span>TAILWIND</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Learnings — Blockquote style */}
        <div className="px-8 md:px-16 py-16 max-w-7xl mx-auto mb-16">
          <h2 className="display-heading text-3xl md:text-4xl mb-6">ENGINEERING TAKEAWAYS</h2>
          <div className="border-l-2 border-black/20 pl-8 md:pl-12 max-w-4xl">
            <p className="text-base md:text-lg opacity-80 leading-relaxed italic">
              "Building a production commerce platform reinforced that state synchronization across authentication, cart, and inventory is the core engineering challenge — not the storefront UI."
            </p>
            <p className="text-sm md:text-base opacity-60 leading-relaxed mt-4">
              React Context with Supabase real-time subscriptions kept inventory consistent without polling. The admin dashboard revealed that operational interfaces benefit from the same design rigor as customer-facing ones: analytics visualization, order lifecycle management, and product CRUD needed the same investment in UX patterns and responsive engineering as the storefront. Dockerization and environment configuration management were non-negotiable for reproducible deployments.
            </p>
          </div>
        </div>

        {/* Next Project Hero (RETAINGRAPH) */}
        <Link to="/projects/retaingraph" state={{ transitionText: "LOADING" }} className="block w-full bg-black text-white aspect-[21/9] flex items-end p-8 md:p-16 relative overflow-hidden group">
          <img src="/retaingraph_hero.png" alt="RetainGraph" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 z-0 transition-colors duration-700 group-hover:bg-black/60 pointer-events-none"></div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h1 className="display-heading text-[8vw] md:text-[6rem] leading-[0.85] text-white">
                RETAINGRAPH
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
