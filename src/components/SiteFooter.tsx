import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white/70 px-8 md:px-16 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ul className="display-heading text-2xl md:text-3xl space-y-2 text-white/60">
          {[
            { to: "/", label: "HOME" },
            { to: "/projects", label: "PROJECTS" },
            { to: "/artworks", label: "ARTWORKS" },
            { to: "/contact", label: "CONTACT" },
          ].map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-white transition-colors">
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
            className="display-heading text-2xl md:text-3xl text-white/60 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            INSTAGRAM <ArrowUpRight size={22} />
          </a>
          <br />
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer noopener"
            className="display-heading text-2xl md:text-3xl text-white/60 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            LINKEDIN <ArrowUpRight size={22} />
          </a>
          <p className="text-xs tracking-[0.25em] pt-2 text-white/50">ISTANBUL, TURKEY</p>
        </div>
      </div>
      <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Galekto. All rights reserved.
      </div>
    </footer>
  );
}
