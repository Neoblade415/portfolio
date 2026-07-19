import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LINES: Array<{label: string, value?: string | null}> = [
  { label: "DEEP SIGNAL SCAN", value: "[LOCKED]" },
  { label: "COSMIC NETWORK LINK", value: "[ESTABLISHED]" },
  { label: "CREATIVE MATRIX", value: "[ONLINE]" },
  { label: "VISUAL CORTEX", value: "[SYNCHRONIZED]" },
  { label: "NEURAL CANVAS", value: "[LOADED]" },
  { label: "STYLE MATRIX", value: "[STABLE]" },
  { label: "ARTWORK ENGINE", value: "[ACTIVE]" },
  { label: "PROJECT GRID", value: "[MOUNTED]" },
  { label: "SYSTEM DIAGNOSTICS", value: null },
  { label: "MEMORY BANK", value: "[CLEAR]" },
  { label: "ERROR TRACE", value: "[NONE]" },
  { label: "LATENCY", value: "0.01ms" },
  { label: "CREATIVE POWER", value: "99%" },
  { label: "IMAGINATION CORE", value: "[FLOWING]" },
  { label: "CREATOR SIGNATURE", value: "[VERIFIED]" },
  { label: "ACCESS LEVEL", value: "[OMEGA PRIME]" },
  { label: "NEURAL LINK", value: "[STABLE]" },
  { label: "", value: null },
  { label: "GALACTIC CREATIVE SYSTEM READY" },
  { label: "WELCOME, FRIEND" },
  { label: "IT'S ALWAYS NICE TO SEE YOU" },
  { label: "HAVE A NICE DAY" },
  { label: "ENTERING THE DROME..." }
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [stage, setStage] = useState<"checking" | "stage1" | "stage2" | "complete">("checking");
  const [loadProgress, setLoadProgress] = useState(0);
  const [stage1VisualProgress, setStage1VisualProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to ensure we don't trigger completion multiple times
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (stage === "stage2") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [visibleLines, stage]);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted === "true") {
      setStage("complete");
      onComplete();
      return;
    }

    setStage("stage1");

    let isCancelled = false;
    let loadedCount = 0;
    
    // 1. Assets to preload
    const imagesToPreload = [
      "/pink_bg.png",
      "/art_one.png",
      "/black_and_white.png",
    ];

    // 2. We explicitly load the display fonts used on the site 
    // to ensure they don't pop-in later. The terminal uses system monospace.
    const fontPromises = [
      document.fonts.load("1em Anton").catch(() => {}),
      document.fonts.load("1em 'Space Grotesk'").catch(() => {})
    ];

    const totalAssets = imagesToPreload.length + fontPromises.length;

    const updateProgress = () => {
      if (isCancelled) return;
      loadedCount++;
      setLoadProgress(Math.min(100, Math.round((loadedCount / totalAssets) * 100)));
    };

    // Trigger preloads
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // still count as finished if error
      img.src = src;
    });

    Promise.all(fontPromises).then(() => {
      if (!isCancelled) {
        loadedCount += fontPromises.length;
        setLoadProgress(Math.min(100, Math.round((loadedCount / totalAssets) * 100)));
      }
    });

    // Timeouts to manage visual progression regardless of instant caching
    // Stage 1 (Color bars) min duration: 4500ms to allow the progress bar to fill slowly
    const stage1Duration = 4500;
    
    // Simulate stage 1 visual progress filling up slowly
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      if (isCancelled) return;
      const elapsed = Date.now() - startTime;
      setStage1VisualProgress(Math.min(100, (elapsed / (stage1Duration - 300)) * 100)); // Finish slightly before stage transition
    }, 30);

    const stage1Timer = setTimeout(() => {
      if (!isCancelled) setStage("stage2");
    }, stage1Duration);

    return () => {
      isCancelled = true;
      clearTimeout(stage1Timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  // Keyboard shortcut to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Escape") {
        if (!hasCompleted.current) {
          hasCompleted.current = true;
          sessionStorage.setItem("hasBooted", "true");
          setStage("complete");
          onComplete();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  // Handle Stage 2 progression based on loadProgress
  useEffect(() => {
    if (stage !== "stage2") return;

    let isCancelled = false;

    const printNextLine = (currentIdx: number) => {
      if (isCancelled) return;
      if (currentIdx > BOOT_LINES.length) {
        // Give a tiny pause at the end before completing
        setTimeout(() => {
          if (isCancelled || hasCompleted.current) return;
          hasCompleted.current = true;
          sessionStorage.setItem("hasBooted", "true");
          setStage("complete");
          setTimeout(() => onComplete(), 500); // allow wipe animation to run
        }, 400);
        return;
      }

      setVisibleLines(currentIdx);

      // Determine delay for the next line based on remaining load progress
      // Map currentIdx/totalLines to expected progress
      const expectedProgress = (currentIdx / BOOT_LINES.length) * 100;
      
      let delay = 800; // Deliberate per-line stagger (base typing speed)
      if (loadProgress < expectedProgress) {
        // If we're waiting for assets, artificially stall slightly (max 1200ms per line)
        // This caps the total stall time, ensuring we never hang forever.
        delay = 1200; 
      }

      setTimeout(() => printNextLine(currentIdx + 1), delay);
    };

    const startTimer = setTimeout(() => printNextLine(1), 300); // Initial delay entering stage 2

    return () => {
      isCancelled = true;
      clearTimeout(startTimer);
    };
  }, [stage, loadProgress, onComplete]);

  if (stage === "checking" || stage === "complete") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-[200] overflow-hidden boot-sequence-container"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }}
      >
        <AnimatePresence mode="wait">
          {stage === "stage1" && (
            <motion.div 
              key="stage1"
              className="absolute inset-0 flex flex-col bg-black test-pattern-container origin-center"
              exit={{ 
                scaleY: [1, 0.01, 0], 
                scaleX: [1, 1, 0], 
                opacity: [1, 1, 0], 
                filter: ["brightness(1)", "brightness(5)", "brightness(10)"],
                transition: { duration: 0.35, ease: "easeInOut", times: [0, 0.5, 1] } 
              }}
            >
            {/* Color bars */}
            <div className="flex-1 flex">
              {['#C0C0C0', '#C0C000', '#00C0C0', '#00C000', '#C000C0', '#C00000', '#0000C0'].map((color, i) => (
                <div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />
              ))}
            </div>
            {/* Lower section */}
            <div className="h-1/4 flex">
              {['#0000C0', '#000000', '#C000C0', '#000000', '#00C0C0', '#000000', '#C0C0C0'].map((color, i) => (
                <div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />
              ))}
            </div>

            {/* Noise overlay */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none boot-glitch-layer" />

            {/* Centered Message */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative bg-[#0a0a0a] px-16 py-12 md:px-32 md:py-20 text-center shadow-2xl border border-white/10 overflow-hidden">
                {/* Internal Noise for the box */}
                <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-15" 
                     style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} 
                />
                
                <div className="relative z-10 font-mono text-white text-2xl md:text-4xl lg:text-5xl tracking-[0.25em] mb-12 md:mb-16 uppercase leading-relaxed text-glitch">
                  STREAM<br/>STARTING<br/>SOON
                </div>
                {/* Progress Indicator */}
                <div className="relative z-10 flex gap-[4px] justify-center h-6 md:h-8 mb-10 text-glitch" style={{ animationDelay: '0.5s' }}>
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 md:w-2.5 h-full bg-white transition-opacity duration-150"
                      style={{ opacity: stage1VisualProgress > (i * (100/32)) ? 1 : 0 }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10 font-mono text-[#ffb000] text-xs md:text-sm tracking-[0.2em] opacity-75 uppercase">
                  PRESS SPACE OR ESC TO SKIP
                </div>
              </div>
            </div>
          </motion.div>
        )}

          {stage === "stage2" && (
            <motion.div
              key="stage2"
              className="absolute inset-0 bg-[#151515] p-8 md:p-16 lg:p-24 flex flex-col terminal-stage overflow-hidden origin-center"
              initial={{ opacity: 0, scale: 0.9, filter: "brightness(2)" }}
              animate={{ opacity: 1, scale: 1, filter: "brightness(1)", transition: { duration: 0.3, ease: "easeOut" } }}
            >
            {/* Ambient scan overlay just for the terminal background */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)" }}
            />
            
            <div className="relative z-10 w-full max-w-4xl text-[#ffb000] text-left shrink-0">
              <div className="font-mono text-4xl md:text-5xl lg:text-6xl tracking-[0.3em] mb-4 uppercase terminal-glow">
                GALEKTODROME
              </div>
              <div className="font-mono text-xs md:text-sm tracking-normal opacity-60 mb-6 uppercase flex items-center gap-2">
                CREATIVE COMPUTING SYSTEM <span className="text-[10px] opacity-60">■</span> v2026
              </div>
              
              <div className="font-mono text-sm md:text-base tracking-normal uppercase opacity-90 mb-3">
                GALEKTODROME NEURAL BOOT SEQUENCE v1.3
              </div>
              <div className="h-[1px] w-full max-w-[650px] bg-[#ffb000]/20 mb-10"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-[650px] flex-1 overflow-y-hidden overflow-x-hidden no-scrollbar">
              <div className="flex flex-col gap-4 font-mono text-sm md:text-base tracking-normal w-full leading-[2] pb-12">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="typewriter-line w-full">
                    {line.value === null ? (
                      <div className="mt-10 mb-2">
                        {line.label && <div className="uppercase opacity-90">{line.label}</div>}
                        <div className="h-[1px] w-full bg-[#ffb000]/20 mt-4"></div>
                      </div>
                    ) : line.value === undefined ? (
                      <div className="uppercase opacity-95">
                        {line.label || '\u00A0'}
                      </div>
                    ) : (
                      <div className="flex items-baseline uppercase opacity-95">
                        <span className="whitespace-nowrap">{line.label}</span>
                        <div className="flex-1 overflow-hidden opacity-20 text-clip select-none mx-2 translate-y-[-2px]">
                          .....................................................................................................................................................................
                        </div>
                        <span className="whitespace-nowrap font-bold">{line.value}</span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} className="h-4" />
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
