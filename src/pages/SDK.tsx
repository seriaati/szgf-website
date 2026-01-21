import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import sdks from "@/data/sdks.json";

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
  </svg>
);

const getLanguageIcon = (id: string) => {
  switch (id) {
    case "python":
      return <PythonIcon />;
    case "typescript":
      return <TypeScriptIcon />;
    default:
      return <PythonIcon />;
  }
};

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
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                          {getLanguageIcon(sdk.id)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{sdk.name}</h2>
                          <p className="text-sm text-muted-foreground">
                            {sdk.description}
                          </p>
                        </div>
                      </div>
                      {sdk.status === "coming-soon" && (
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
