import { useEffect } from "react";

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export function useAmbientDisturbances(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let isInteracting = false;
    let interactionTimeout: ReturnType<typeof setTimeout>;
    
    const handleInteraction = () => {
      isInteracting = true;
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteracting = false;
      }, 100); // lowered to 100ms so it resumes almost instantly
    };

    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("wheel", handleInteraction, { passive: true });
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    let isDisturbanceActive = false;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const setVar = (name: string, val: string) => {
      document.documentElement.style.setProperty(name, val);
    };

    // Independent Scanline Roll loops
    // Removing the global lock so multiple lines can overlap!
    const scheduleLine = (index: number) => {
      const trySchedule = () => {
        if (!isInteracting) {
          const h = randomRange(0.5, 3);
          setVar(`--crt-roll${index}-h`, `${h}%`);
          setVar(`--crt-roll${index}-opacity`, randomRange(0.15, 0.35).toString());
          setVar(`--crt-roll${index}-pos`, "-10%");
          setVar(`--crt-roll${index}-duration`, "0ms");
          
          if (containerRef.current) void containerRef.current.offsetHeight;
          
          const duration = randomRange(6000, 16000);
          setVar(`--crt-roll${index}-duration`, `${duration}ms`);
          setVar(`--crt-roll${index}-pos`, "110%");

          const cleanupTimer = setTimeout(() => {
            setVar(`--crt-roll${index}-opacity`, "0");
            setVar(`--crt-roll${index}-duration`, "0ms");
            
            // Schedule next run only after this one is fully done
            const nextRunTimer = setTimeout(() => scheduleLine(index), randomRange(3000, 12000));
            timers.push(nextRunTimer);
          }, duration + 50);
          timers.push(cleanupTimer);
        } else {
          // Skip for now due to interaction, try again soon
          const retryTimer = setTimeout(() => scheduleLine(index), randomRange(1000, 3000));
          timers.push(retryTimer);
        }
      };

      // Initial delay before starting
      const startTimer = setTimeout(trySchedule, randomRange(1000, 8000));
      timers.push(startTimer);
    };

    // Chromatic Aberration loop (very frequent: 3-7s)
    const scheduleChromatic = () => {
      timers.push(setTimeout(() => {
        if (!isInteracting && !isDisturbanceActive) {
          isDisturbanceActive = true;
          const offset = (Math.random() > 0.5 ? 1 : -1) * randomRange(1, 3);
          setVar("--crt-chromatic-x", `${offset}px`);
          
          setTimeout(() => {
            setVar("--crt-chromatic-x", "0px");
            isDisturbanceActive = false;
          }, randomRange(80, 150));
        }
        scheduleChromatic();
      }, randomRange(3000, 7000)));
    };

    // Set initial vignette variables
    setVar("--crt-vignette-a1", "0.35");
    setVar("--crt-vignette-a2", "0.75");

    scheduleLine(1);
    scheduleLine(2);
    scheduleLine(3);
    scheduleChromatic();

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(interactionTimeout);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      
      [1, 2, 3].forEach((index) => {
        setVar(`--crt-roll${index}-opacity`, "0");
        setVar(`--crt-roll${index}-duration`, "0ms");
      });
      setVar("--crt-chromatic-x", "0px");
    };
  }, [containerRef]);
}
