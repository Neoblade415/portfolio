import { useState, useEffect } from "react";
import { motion } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface OdometerTextProps {
  text: string;
  className?: string;
}

const OdometerLetter = ({ char, index }: { char: string; index: number }) => {
  const [column, setColumn] = useState<string[]>([char]);

  useEffect(() => {
    if (column[column.length - 1] !== char) {
      // create a sequence of random characters leading up to the new char
      const randoms = Array.from({ length: 4 }).map(
        () => CHARS[Math.floor(Math.random() * CHARS.length)]
      );
      setColumn((prev) => [...prev, ...randoms, char]);
    }
  }, [char]);

  // Handle spaces without collapsing
  if (char === " ") {
    return <span className="inline-block w-[0.5em]">&nbsp;</span>;
  }

  return (
    <span className="overflow-hidden inline-flex flex-col" style={{ height: "0.85em" }}>
      <motion.span
        initial={false}
        animate={{ y: `-${(column.length - 1) * 100}%` }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
        className="flex flex-col"
      >
        {column.map((c, i) => (
          <span key={i} className="flex items-center justify-center" style={{ height: "0.85em", lineHeight: 0.85 }}>
            {c}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

export function OdometerText({ text, className = "" }: OdometerTextProps) {
  return (
    <div className={`flex ${className}`}>
      {text.split("").map((char, i) => (
        <OdometerLetter key={i} char={char} index={i} />
      ))}
    </div>
  );
}
