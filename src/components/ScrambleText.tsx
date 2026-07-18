import { useState, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const scrambleStates = new Map<string, string>();
const listeners = new Map<string, Set<() => void>>();
const intervals = new Map<string, ReturnType<typeof setInterval>>();
const iterations = new Map<string, number>();

function updateText(text: string, newText: string) {
  scrambleStates.set(text, newText);
  listeners.get(text)?.forEach((l) => l());
}

function startScramble(text: string) {
  if (intervals.has(text)) clearInterval(intervals.get(text)!);
  iterations.set(text, 0);

  const animate = () => {
    const iteration = iterations.get(text)!;
    const newText = text
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";
        if (index < iteration) return text[index];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");

    updateText(text, newText);

    if (iteration >= text.length) {
      clearInterval(intervals.get(text)!);
    }
    
    iterations.set(text, iteration + 1); // Speed
  };

  const interval = setInterval(animate, 30); // Frame rate
  intervals.set(text, interval);
}

function stopScramble(text: string) {
  if (intervals.has(text)) {
    clearInterval(intervals.get(text)!);
    intervals.delete(text);
  }
  updateText(text, text);
}

export function ScrambleText({ text, className = "", trigger }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(() => scrambleStates.get(text) || text);

  useEffect(() => {
    if (!listeners.has(text)) listeners.set(text, new Set());
    
    const l = () => setDisplayText(scrambleStates.get(text) || text);
    listeners.get(text)!.add(l);
    
    return () => {
      listeners.get(text)!.delete(l);
    };
  }, [text]);

  useEffect(() => {
    if (trigger !== undefined) {
      if (trigger) startScramble(text);
      else stopScramble(text);
    }
  }, [trigger, text]);

  return (
    <span
      onMouseEnter={trigger === undefined ? () => startScramble(text) : undefined}
      onMouseLeave={trigger === undefined ? () => stopScramble(text) : undefined}
      className={`relative inline-block ${className}`}
    >
      <span className="invisible">{text}</span>
      <span className="absolute inset-0 left-0 whitespace-nowrap">{displayText}</span>
    </span>
  );
}
