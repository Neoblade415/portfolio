import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowUpRight } from "lucide-react";
import { useRef, useMemo, useLayoutEffect } from "react";
import { useScrollColorPlateaus } from "@/hooks/useScrollColorPlateaus";
import { motion } from "motion/react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Galekto" },
      { name: "description", content: "Get in touch with Evren Yılmaz (Galekto) for UX/UI design and illustration collaborations." },
      { property: "og:title", content: "Contact — Galekto" },
      { property: "og:description", content: "Get in touch with Evren Yılmaz for design and illustration collaborations." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => [
    { ref: contactRef, color: "#2b1f3d" },
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
      <div ref={contactRef}>
          <div className="pt-4 md:pt-6">
            <SiteHeader variant="dark" centerIcons="space" logo="I WANT TO BELIEVE" />
          </div>

          <div className="relative px-8 md:px-16 pt-10 pb-32 min-h-[75vh] grid md:grid-cols-2 gap-10 items-center">
            {/* Big outline text */}
            <h1
              className="display-heading text-[16vw] md:text-[9rem] leading-[0.9] tracking-tight"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(240,235,227,0.35)",
              }}
            >
              GET IN
              <br />
              TOUCH
            </h1>

            {/* UFO + beam */}
            <div className="relative">
              <svg
                aria-hidden
                className="absolute -top-32 right-0 w-[380px] h-[500px] pointer-events-none"
                viewBox="0 0 380 500"
              >
                <defs>
                  <linearGradient id="beam" x1="0.5" y1="0" x2="0.9" y2="1">
                    <stop offset="0%" stopColor="#5eff9f" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#5eff9f" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M280,60 L380,-40 L340,90 Z" fill="url(#beam)" opacity="0.7" />
              </svg>

              <div className="relative flex justify-center mb-8">
                <svg viewBox="0 0 120 60" className="w-40 h-20">
                  <ellipse cx="60" cy="42" rx="50" ry="10" fill="#c8c8d0" />
                  <ellipse cx="60" cy="38" rx="40" ry="8" fill="#a0a0b0" />
                  <path d="M35,35 Q60,10 85,35 Z" fill="#d8d8e0" />
                  <circle cx="45" cy="45" r="2" fill="#f2c94c" />
                  <circle cx="60" cy="47" r="2" fill="#e14b42" />
                  <circle cx="75" cy="45" r="2" fill="#5eff9f" />
                </svg>
              </div>

              <p className="text-sm text-[#5eff9f] mb-4">The truth is out there... but a collaboration starts here.</p>
              <a
                href="mailto:hello@galekto.com"
                className="display-heading text-3xl md:text-5xl text-[#f0ebe3] hover:text-[#5eff9f] transition-colors block"
                style={{ textShadow: "0 0 20px rgba(240,235,227,0.4)" }}
              >
                hello@galekto.com
              </a>

              <div className="mt-6 flex gap-6 text-xs tracking-[0.3em] text-[#f0ebe3]/80">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  INSTAGRAM <ArrowUpRight size={12} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  LINKEDIN <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            {/* faint stars */}
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className="absolute w-[2px] h-[2px] rounded-full bg-white/60"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  opacity: 0.3 + ((i * 7) % 5) / 10,
                }}
              />
            ))}
          </div>
        </div>

        <div ref={footerRef}>
          <SiteFooter />
        </div>
    </motion.div>
  );
}
