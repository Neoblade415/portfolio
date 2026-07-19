import { Link, useLocation } from "@tanstack/react-router";
import { Eye, Square, Circle, Skull, Orbit, Wifi, Diamond, Hash } from "lucide-react";

interface SiteHeaderProps {
  logo?: string;
  centerIcons?: "eye" | "space" | "diamond" | "none";
  variant?: "light" | "dark";
  noBlur?: boolean;
  backLink?: string;
  bgColor?: string;
}

const iconSets = {
  eye: [Eye, Square, Circle],
  space: [Skull, Orbit, Wifi],
  diamond: [Diamond, Hash, Square],
  none: [],
};

export function SiteHeader({ logo = "GALEKTO", centerIcons = "eye", variant = "dark", noBlur = false, backLink, bgColor }: SiteHeaderProps) {
  const { pathname } = useLocation();
  const Icons = iconSets[centerIcons];
  const inkClass = variant === "light" ? "text-black/80" : "text-white";
  const borderClass = variant === "light" ? "border-black border-solid" : "border-white border-solid";

  const links = [
    { to: "/projects", label: "PROJECTS" },
    { to: "/artworks", label: "ARTWORKS" },
    { to: "/contact", label: "CONTACT" },
  ] as const;

  return (
    <header className={`relative z-10 mx-6 mt-2 md:mx-12 md:mt-2 rounded-lg border ${borderClass} px-8 py-3 transition-colors duration-500 ${noBlur || bgColor ? '' : 'backdrop-blur-sm'}`} style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="relative flex items-center justify-between gap-4">
        {backLink ? (
          <Link to={backLink} className={`text-[10px] sm:text-xs font-semibold tracking-[0.2em] ${inkClass} hover:opacity-100 opacity-80 transition-opacity flex items-center gap-2`}>
            <span>&larr;</span> BACK TO THE PROJECTS
          </Link>
        ) : (
          <Link to="/" className={`text-xs font-semibold tracking-[0.2em] ${inkClass} hover:opacity-100 opacity-80 transition-opacity`}>
            {logo}
          </Link>
        )}
        <div className={`hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 ${inkClass}`}>
          {Icons.map((I, i) => (
            <I key={i} size={16} strokeWidth={1.4} />
          ))}
        </div>
        <nav className="flex  items-center gap-6 sm:gap-10">
          {links.map((l) => {
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs font-semibold tracking-[0.2em] transition-opacity ${inkClass} ${
                  active ? "opacity-100 underline underline-offset-8" : "opacity-70 hover:opacity-100"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
