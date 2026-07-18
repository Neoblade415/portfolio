import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter({ isReveal = false }: { isReveal?: boolean }) {
  return (
    <footer className={`${isReveal ? 'bg-[#f0ebe3] text-black/70' : 'bg-[#222222] text-white/70'} px-8 md:px-16 pt-16 pb-8`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ul className={`display-heading text-2xl md:text-3xl space-y-2 ${isReveal ? 'text-black/60' : 'text-white/60'}`}>
          {[
            { to: "/", label: "HOME" },
            { to: "/projects", label: "PROJECTS" },
            { to: "/artworks", label: "ARTWORKS" },
            { to: "/contact", label: "CONTACT" },
          ].map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={`transition-colors ${isReveal ? 'hover:text-black' : 'hover:text-white'}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:text-right space-y-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className={`display-heading text-2xl md:text-3xl transition-colors inline-flex items-center gap-2 ${isReveal ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'}`}
          >
            INSTAGRAM <ArrowUpRight size={22} />
          </a>
          <br />
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer noopener"
            className={`display-heading text-2xl md:text-3xl transition-colors inline-flex items-center gap-2 ${isReveal ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'}`}
          >
            LINKEDIN <ArrowUpRight size={22} />
          </a>
          <p className={`text-xs tracking-[0.25em] pt-2 ${isReveal ? 'text-black/50' : 'text-white/50'}`}>ISTANBUL, TURKEY</p>
        </div>
      </div>
      <div className={`mt-16 border-t pt-6 text-center text-xs ${isReveal ? 'border-black/10 text-black/40' : 'border-white/10 text-white/40'}`}>
        © {new Date().getFullYear()} Galekto. All rights reserved.
      </div>
    </footer>
  );
}
