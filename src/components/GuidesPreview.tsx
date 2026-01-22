import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { fetchGuides, getGuidesSortedByLastUpdated } from "@/services/guideService";
import { formatDate, formatElement, formatSpecialty, getElementIcon, getSpecialtyIcon, getElementColor } from "@/lib/guideParser";

const GuidesPreview = () => {
  const {
    data: guidesMap,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: fetchGuides,
  });

  const sortedGuides = guidesMap ? getGuidesSortedByLastUpdated(guidesMap) : [];
  const latestGuide = sortedGuides[0];

  if (isLoading) {
    return (
      <section className="relative py-24">
        <div className="container px-6">
          <div className="section-fade mb-12 text-center">
            <span className="mb-4 inline-block text-sm font-medium text-muted-foreground">
              Character Guides
            </span>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Latest Guide
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Expert character guides for Zenless Zone Zero
            </p>
          </div>
          <div className="section-fade mx-auto max-w-4xl animation-delay-200">
            <div className="card-flat overflow-hidden animate-pulse">
              <div className="aspect-[21/9] bg-white/5" />
              <div className="p-6 space-y-4">
                <div className="h-8 bg-white/10 rounded w-1/3" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !latestGuide) {
    return null;
  }

  return (
    <section className="relative py-24">
      <div className="container px-6">
        <div className="section-fade mb-12 text-center">
          <span className="mb-4 inline-block text-sm font-medium text-muted-foreground">
            Character Guides
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Latest Guide
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Expert character guides for Zenless Zone Zero
          </p>
        </div>

        <div className="section-fade mx-auto max-w-4xl animation-delay-200">
          <div className="card-flat overflow-hidden hover-lift">
            <div className="aspect-[21/9] w-full overflow-hidden bg-black/20">
              <img
                src={latestGuide.character.banner}
                alt={latestGuide.character.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-2xl font-bold">{latestGuide.character.name}</h3>
                <div className="flex gap-2">
                  <span className={`flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ${getElementColor(latestGuide.character.element)}`}>
                    {getElementIcon(latestGuide.character.element) && (
                      <img
                        src={getElementIcon(latestGuide.character.element)!}
                        alt=""
                        className="w-4 h-4"
                      />
                    )}
                    {formatElement(latestGuide.character.element)}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
                    {getSpecialtyIcon(latestGuide.character.specialty) && (
                      <img
                        src={getSpecialtyIcon(latestGuide.character.specialty)!}
                        alt=""
                        className="w-4 h-4"
                      />
                    )}
                    {formatSpecialty(latestGuide.character.specialty)}
                  </span>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {latestGuide.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(latestGuide.last_updated)}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to={`/guides/${latestGuide.character.id}`}>
                  <Button>
                    Read Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/guides">
                  <Button variant="outline" className="group">
                    View All Guides
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

export default GuidesPreview;
