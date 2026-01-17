import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24">
      <div className="container relative z-10 px-6 text-center">
        <div className="section-fade mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 bg-secondary border border-border px-4 py-2 rounded-full text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Open Source</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-foreground">Standardized</span>
            <br />
            <span className="text-foreground">ZZZ Guide Format</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
            A YAML-based format for writing structured, validated, and easily parseable
            guides for agents in Zenless Zone Zero.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://generator.szgf.seria.moe" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group">
                Open Generator
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="https://docs.szgf.seria.moe" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Read Documentation
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Author credit */}
          <p className="mt-12 text-sm text-muted-foreground">
            Created by{" "}
            <a
              href="https://github.com/seriaati"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              seriaati
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
