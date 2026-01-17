import { Github, FileText, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="font-semibold">SZGF</span>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SZGF. Open source.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
