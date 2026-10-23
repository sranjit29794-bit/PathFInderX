import { Link, NavLink } from "react-router-dom";
import { CircleHelp, Compass, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "font-medium text-sm flex relative px-4 items-center h-full transition-colors",
      isActive
        ? "text-primary after:bg-primary after:absolute after:inset-x-4 after:bottom-0 after:h-0.5"
        : "text-muted-foreground hover:text-foreground",
    );

  return (
    <header className="bg-sidebar text-foreground border-b border-border w-full h-16 shrink-0">
      <div className="flex mx-auto px-6 items-center size-full">
        <Link
          to="/"
          aria-label="PATHFINDER home"
          className="flex items-center shrink-0 gap-3 group"
        >
          <span className="rounded-md bg-background text-primary border border-border flex justify-center items-center size-8 transition-colors group-hover:border-primary/50">
            <Compass aria-hidden="true" className="size-4" />
          </span>
          <span className="font-semibold text-foreground text-sm tracking-[0.2em]">
            PATHFINDER
          </span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="flex ml-10 items-center gap-1 h-full"
        >
          <NavLink to="/studio" className={navLinkClass}>
            Graph Studio
          </NavLink>
          <NavLink to="/arena" className={navLinkClass}>
            Algorithm Arena
          </NavLink>
          <NavLink to="/learn" className={navLinkClass}>
            Learn
          </NavLink>
        </nav>
        <div className="flex ml-auto items-center gap-3">
          <Link
            to="/learn"
            aria-label="Documentation and help"
            className="transition-colors rounded-md text-muted-foreground flex justify-center items-center size-9 hover:bg-accent hover:text-foreground"
            title="Help and Guide"
          >
            <CircleHelp aria-hidden="true" className="size-4" />
          </Link>
          <Link
            to="/studio"
            className="font-semibold transition-colors rounded-md bg-primary text-primary-foreground text-sm flex px-3.5 items-center gap-2 h-9 hover:bg-primary/90"
          >
            <Rocket aria-hidden="true" className="size-4" />
            <span>Launch Studio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
