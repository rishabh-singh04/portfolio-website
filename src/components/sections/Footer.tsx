import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground tracking-tight">Rishabh Singh</span>
        </div>
        
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} Rishabh Singh. All rights reserved.
        </p>
        
        <div className="flex items-center gap-4 text-sm font-medium">
          <a href="#about" className="text-muted-foreground hover:text-white transition-colors">About</a>
          <a href="#projects" className="text-muted-foreground hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="text-muted-foreground hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
