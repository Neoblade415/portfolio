import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface SlotTextProps {
  text: string;
  className?: string;
}

export function SlotText({ text, className = "" }: SlotTextProps) {
  // Ensure we always have exactly 5 characters by padding
  const paddedText = text.padEnd(5, " ");
  
  return (
    <div className={`flex overflow-hidden h-[0.85em] leading-[0.85] ${className}`}>
      {paddedText.split("").map((char, index) => (
        <SlotChar key={index} targetChar={char} index={index} />
      ))}
    </div>
  );
}

function SlotChar({ targetChar, index }: { targetChar: string, index: number }) {
  const [column, setColumn] = useState<string[]>([targetChar]);
  const [animationKey, setAnimationKey] = useState(0);
  const prevCharRef = useRef(targetChar);

  useEffect(() => {
    if (targetChar !== prevCharRef.current) {
      const r1 = targetChar === " " && prevCharRef.current === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
      const r2 = targetChar === " " && prevCharRef.current === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
      
      setColumn([prevCharRef.current, r1, r2, targetChar]);
      setAnimationKey(k => k + 1);
      prevCharRef.current = targetChar;
    }
  }, [targetChar]);

  // We use percentages for absolutely perfect alignment regardless of font sizing quirks.
  // If we have N items in the column, the column height is N * 100% of the container.
  // We want to scroll up to the last item, which means scrolling up by (N - 1) items.
  // In percentages of the motion.div's own height, that is -((N - 1) / N) * 100%.
  const yTarget = column.length > 1 ? `-${((column.length - 1) / column.length) * 100}%` : "0%";

  return (
    <div className="relative flex justify-center h-full">
      {/* Invisible target char to set the exact width of the slot smoothly */}
      <span className="invisible whitespace-pre flex items-end">{targetChar}</span>
      
      <motion.div
        key={animationKey}
        initial={{ y: "0%" }}
        animate={{ y: yTarget }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.05, // 50ms stagger per character
        }}
        className="absolute top-0 left-0 w-full flex flex-col items-center"
        style={{ height: `${column.length * 100}%` }}
      >
        {column.map((char, i) => (
          <span 
            key={i} 
            className="flex items-end justify-center whitespace-pre text-center w-full overflow-hidden"
            style={{ height: `${100 / column.length}%` }}
          >
            {char}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
