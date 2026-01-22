import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import applications from "@/data/applications.json";

const Applications = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Applications - SZGF"
        description="Projects and tools that integrate with SZGF"
        path="/applications"
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container px-6">
          <div className="section-fade mx-auto max-w-5xl">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="gradient-text">Applications</span>
            </h1>
            <p className="mb-12 text-lg text-muted-foreground">
              Projects and tools that integrate with SZGF
            </p>

            <div className="grid gap-8">
              {applications.map((app, index) => (
                <div
                  key={app.id}
                  className="section-fade glass overflow-hidden hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-video w-full overflow-hidden md:aspect-auto md:h-full rounded">
                      <img
                        src={app.banner}
                        alt={app.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {app.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="mb-3 text-3xl font-bold">{app.name}</h2>
                      <p className="mb-6 text-muted-foreground leading-relaxed">
                        {app.description}
                      </p>
                      <div>
                        <a href={app.url} target="_blank" rel="noopener noreferrer">
                          <Button>
                            Visit {app.name}
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contribute CTA */}
            <div className="section-fade mt-16 glass-subtle p-8 text-center animation-delay-200">
              <h3 className="mb-3 text-xl font-semibold">
                Building with SZGF?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Add your application to this list by contributing to the repository.
              </p>
              <a
                href="https://github.com/seriaati/szgf-website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  Contribute on GitHub
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Applications;
