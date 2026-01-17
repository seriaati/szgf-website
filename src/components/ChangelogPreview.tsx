import { ArrowRight, Plus, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import changelog from "@/data/changelog.json";

const ChangelogPreview = () => {
  const latestChanges = changelog[0];

  return (
    <section className="relative py-24">
      <div className="container px-6">
        <div className="section-fade grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="mb-4 inline-block text-sm font-medium text-muted-foreground">
              What's New
            </span>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Latest Changes
            </h2>
            <p className="mb-8 text-muted-foreground">
              Stay up to date with the latest improvements and additions to the SZGF standard.
            </p>
            <Link to="/changelog">
              <Button variant="outline" className="group">
                View Full Changelog
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="card-flat p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xl font-semibold">v{latestChanges.version}</span>
              <span className="text-sm text-muted-foreground">{latestChanges.date}</span>
            </div>
            <ul className="space-y-3">
              {latestChanges.changes.slice(0, 4).map((change, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    change.type === "added" 
                      ? "bg-secondary text-foreground" 
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {change.type === "added" ? <Plus className="h-3 w-3" /> : <RefreshCw className="h-3 w-3" />}
                  </span>
                  <span className="text-sm text-muted-foreground">{change.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangelogPreview;
