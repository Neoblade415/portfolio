import { useScroll, useMotionValue, useMotionValueEvent, transform } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

export function useScrollColorPlateaus(
  containerRef: RefObject<HTMLElement | null>,
  sections: Array<{ ref: RefObject<HTMLElement | null>; color: string }>
) {
  const { scrollY } = useScroll({ container: containerRef });
  const bg = useMotionValue(sections[0]?.color ?? "#000000");
  
  const [ranges, setRanges] = useState<{ inputs: number[]; outputs: string[] }>({
    inputs: [0, 10000],
    outputs: [sections[0]?.color ?? "#000000", sections[0]?.color ?? "#000000"],
  });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateRanges = () => {
      const inputs: number[] = [];
      const outputs: string[] = [];
      
      const containerHeight = containerRef.current!.clientHeight;
      const scrollHeight = containerRef.current!.scrollHeight;
      
      sections.forEach((section, i) => {
        if (!section.ref.current) return;
        
        const top = section.ref.current.offsetTop;
        
        if (i === 0) {
          inputs.push(0);
          outputs.push(section.color);
        } else {
          // We crossfade when the boundary between the previous section and this one
          // crosses the center of the viewport.
          const centerScroll = top - (containerHeight / 2);
          
          // Use 12% of the incoming section's height, clamped between 50px and 300px
          const sectionHeight = section.ref.current.clientHeight;
          const fadeDistance = Math.max(50, Math.min(300, sectionHeight * 0.12)); 
          
          inputs.push(centerScroll - fadeDistance);
          outputs.push(sections[i - 1].color);
          
          inputs.push(centerScroll + fadeDistance);
          outputs.push(section.color);
        }
      });
      
      if (inputs.length > 0) {
         inputs.push(scrollHeight + 1000); // arbitrarily large to hold the last color
         outputs.push(sections[sections.length - 1].color);
      }
      
      setRanges({ inputs, outputs });
    };

    updateRanges();
    
    const observer = new ResizeObserver(updateRanges);
    observer.observe(containerRef.current);
    sections.forEach(s => s.ref.current && observer.observe(s.ref.current));
    
    return () => observer.disconnect();
  }, [containerRef, sections]);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (ranges.inputs.length > 1) {
      const color = transform(y, ranges.inputs, ranges.outputs);
      bg.set(color);
    }
  });

  return bg;
}
