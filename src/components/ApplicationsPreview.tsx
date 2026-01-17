import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import applications from "@/data/applications.json";

const ApplicationsPreview = () => {
  const featured = applications[0];

  return (
    <section className="relative py-24">
      <div className="container px-6">
        <div className="section-fade mb-12 text-center">
          <span className="mb-4 inline-block text-sm font-medium text-muted-foreground">
            Ecosystem
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Built with SZGF
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Applications that integrate SZGF to bring guides to life
          </p>
        </div>

        <div className="section-fade mx-auto max-w-4xl animation-delay-200">
          <div className="card-flat overflow-hidden hover-lift">
            <div className="aspect-[21/9] w-full overflow-hidden">
              <img
                src={featured.banner}
                alt={featured.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-2 text-2xl font-bold">{featured.name}</h3>
              <p className="mb-6 text-muted-foreground">{featured.description}</p>
              <div className="flex flex-wrap gap-3">
                <a href={featured.url} target="_blank" rel="noopener noreferrer">
                  <Button>
                    Visit {featured.name}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
                <Link to="/applications">
                  <Button variant="outline" className="group">
                    View All Applications
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsPreview;
