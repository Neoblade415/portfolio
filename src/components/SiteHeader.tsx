import { Link, useLocation } from "@tanstack/react-router";
import { Eye, Square, Circle, Skull, Orbit, Wifi, Diamond, Hash } from "lucide-react";

interface SiteHeaderProps {
  logo?: string;
  centerIcons?: "eye" | "space" | "diamond";
  variant?: "light" | "dark";
}

const iconSets = {
  eye: [Eye, Square, Circle],
  space: [Skull, Orbit, Wifi],
  diamond: [Diamond, Hash, Square],
};

export function SiteHeader({ logo = "GALEKTO", centerIcons = "eye", variant = "dark" }: SiteHeaderProps) {
  const { pathname } = useLocation();
  const Icons = iconSets[centerIcons];
  const inkClass = variant === "light" ? "text-black/80" : "text-white/70";
  const borderClass = variant === "light" ? "border-black/25" : "border-white/25";

  const links = [
    { to: "/projects", label: "PROJECTS" },
    { to: "/artworks", label: "ARTWORKS" },
    { to: "/contact", label: "CONTACT" },
  ] as const;

  return (
    <header className={`relative z-10 mx-6 mt-6 md:mx-12 md:mt-8 rounded-full border ${borderClass} px-6 py-3 backdrop-blur-sm`}>
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className={`text-xs font-semibold tracking-[0.2em] ${inkClass} hover:opacity-100 opacity-80 transition-opacity`}>
          {logo}
        </Link>
        <div className={`hidden sm:flex items-center gap-6 ${inkClass}`}>
          {Icons.map((I, i) => (
            <I key={i} size={16} strokeWidth={1.4} />
          ))}
        </div>
        <nav className="flex items-center gap-4 sm:gap-6">
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
