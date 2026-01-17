import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Terminal, Clock, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import sdks from "@/data/sdks.json";

const SDK = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container px-6">
          <div className="section-fade mx-auto max-w-4xl">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="gradient-text">SDK</span>
            </h1>
            <p className="mb-12 text-lg text-muted-foreground">
              Integrate SZGF into your projects programmatically
            </p>

            <div className="space-y-8">
              {sdks.map((sdk, index) => (
                <div
                  key={sdk.id}
                  className="section-fade glass overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="border-b border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                          <Terminal className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{sdk.name}</h2>
                          <p className="text-sm text-muted-foreground">
                            {sdk.description}
                          </p>
                        </div>
                      </div>
                      {sdk.status === "available" ? (
                        <span className="rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-400">
                          Available
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-400">
                          <Clock className="h-4 w-4" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {sdk.status === "available" && (
                    <div className="p-6 space-y-6">
                      {/* Installation */}
                      <div>
                        <h3 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                          Installation
                        </h3>
                        <div className="group relative">
                          <code className="block rounded-xl bg-black/50 p-4 font-mono text-primary">
                            {sdk.installCommand}
                          </code>
                          <button
                            onClick={() =>
                              copyToClipboard(sdk.installCommand!, `install-${sdk.id}`)
                            }
                            className="absolute right-3 top-3 rounded-lg bg-white/10 p-2 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/20"
                          >
                            {copied === `install-${sdk.id}` ? (
                              <Check className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Example */}
                      <div>
                        <h3 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                          Quick Start
                        </h3>
                        <div className="group relative">
                          <pre className="overflow-x-auto rounded-xl bg-black/50 p-4 font-mono text-sm">
                            <code className="text-muted-foreground">
                              {sdk.example}
                            </code>
                          </pre>
                          <button
                            onClick={() =>
                              copyToClipboard(sdk.example!, `example-${sdk.id}`)
                            }
                            className="absolute right-3 top-3 rounded-lg bg-white/10 p-2 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/20"
                          >
                            {copied === `example-${sdk.id}` ? (
                              <Check className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Docs link */}
                      <div className="pt-2">
                        <a href={sdk.url!} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline">
                            View on GitHub
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  )}

                  {sdk.status === "coming-soon" && (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">
                        This SDK is currently in development. Stay tuned!
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SDK;
