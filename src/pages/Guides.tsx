import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User } from "lucide-react";
import {
  fetchGuides,
  getGuidesSortedByLastUpdated,
  searchGuides,
} from "@/services/guideService";
import { formatDate, getRarityColor, formatRarity, formatElement, formatSpecialty, getElementIcon, getElementColor } from "@/lib/guideParser";

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: guidesMap,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: fetchGuides,
  });

  const sortedGuides = guidesMap ? getGuidesSortedByLastUpdated(guidesMap) : [];
  const filteredGuides = searchGuides(sortedGuides, searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container px-6">
          <div className="section-fade mx-auto max-w-6xl">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
              <span className="gradient-text">Guides</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Character guides for Zenless Zone Zero
            </p>

            {/* Search */}
            <div className="relative mb-8 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search characters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="glass animate-pulse rounded-xl overflow-hidden"
                  >
                    <div className="aspect-[16/9] bg-white/5" />
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-white/10 rounded w-3/4" />
                      <div className="h-4 bg-white/5 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="glass p-8 text-center">
                <p className="text-red-400">Failed to load guides</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {error instanceof Error ? error.message : "Unknown error"}
                </p>
              </div>
            )}

            {/* Guide grid */}
            {!isLoading && !error && (
              <>
                {filteredGuides.length === 0 ? (
                  <div className="glass p-8 text-center">
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "No characters found matching your search"
                        : "No guides available"}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredGuides.map((guide, index) => (
                      <Link
                        key={guide.character.id}
                        to={`/guides/${guide.character.id}`}
                        className="section-fade glass overflow-hidden hover-lift group"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Banner */}
                        <div className="aspect-[16/9] overflow-hidden bg-black/20">
                          <img
                            src={guide.character.banner}
                            alt={guide.character.name}
                            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold">
                              {guide.character.name}
                            </h2>
                            <span
                              className={`text-sm font-semibold ${getRarityColor(guide.character.rarity)}`}
                            >
                              {formatRarity(guide.character.rarity)}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {guide.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(guide.last_updated)}
                            </span>
                          </div>

                          <div className="mt-3 flex gap-2">
                            <span className={`flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs ${getElementColor(guide.character.element)}`}>
                              {getElementIcon(guide.character.element) && (
                                <img
                                  src={getElementIcon(guide.character.element)!}
                                  alt=""
                                  className="w-3 h-3"
                                />
                              )}
                              {formatElement(guide.character.element)}
                            </span>
                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                              {formatSpecialty(guide.character.specialty)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
