import { useState, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const animate = () => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 2; // Controls how fast it resolves left to right
    };

    interval = setInterval(animate, 30); // Frame rate of the scramble

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block ${className}`}
    >
      {/* Invisible original text to maintain the exact layout width and height */}
      <span className="invisible">{text}</span>
      {/* Absolute positioned scrambled text */}
      <span className="absolute inset-0 left-0 whitespace-nowrap">{displayText}</span>
    </span>
  );
}
