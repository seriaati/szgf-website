import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import changelog from "@/data/changelog.json";

const getIcon = (type: string) => {
  switch (type) {
    case "added":
      return <Plus className="h-3 w-3" />;
    case "changed":
      return <RefreshCw className="h-3 w-3" />;
    case "removed":
      return <Trash2 className="h-3 w-3" />;
    default:
      return <Plus className="h-3 w-3" />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case "added":
      return "bg-emerald-500/20 text-emerald-400";
    case "changed":
      return "bg-amber-500/20 text-amber-400";
    case "removed":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-primary/20 text-primary";
  }
};

const Changelog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container px-6">
          <div className="section-fade mx-auto max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="gradient-text">Changelog</span>
            </h1>
            <p className="mb-12 text-lg text-muted-foreground">
              Track the evolution of the SZGF standard
            </p>

            <div className="relative space-y-8">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

              {changelog.map((version, versionIndex) => (
                <div
                  key={version.version}
                  className="section-fade relative pl-10"
                  style={{ animationDelay: `${versionIndex * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background" />

                  <div className="glass p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold">v{version.version}</h2>
                      <span className="text-sm text-muted-foreground">
                        {version.date}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {version.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${getColor(
                              change.type
                            )}`}
                          >
                            {getIcon(change.type)}
                          </span>
                          <span className="text-muted-foreground">
                            {change.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
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

export default Changelog;
