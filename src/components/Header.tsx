import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, FileText, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/guides", label: "Guides" },
    { path: "/changelog", label: "Changelog" },
    { path: "/applications", label: "Applications" },
    { path: "/sdk", label: "SDK" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            SZGF
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <a
              href="https://docs.szgf.seria.moe"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <FileText className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://link.seria.moe/hb-dc"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://github.com/seriaati/szgf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-border mt-4">
              <a
                href="https://docs.szgf.seria.moe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <FileText className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://link.seria.moe/hb-dc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://github.com/seriaati/szgf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
