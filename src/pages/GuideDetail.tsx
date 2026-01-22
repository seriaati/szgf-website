import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { fetchGuide } from "@/services/guideService";
import {
  parseGuideText,
  formatDate,
  getRarityColor,
  getElementColor,
  formatRarity,
  formatElement,
  formatSpecialty,
  getElementIcon,
  getSpecialtyIcon,
  PLACEHOLDER_WENGINE_ICON,
} from "@/lib/guideParser";

interface MainStatItem {
  stat_priority: string;
  pos: number;
}

const GuideDetail = () => {
  const { characterId } = useParams<{ characterId: string }>();

  const {
    data: guide,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guide", characterId],
    queryFn: () => fetchGuide(characterId!),
    enabled: !!characterId,
  });

  const tocSections = [
    { id: "overview", label: "Overview" },
    { id: "wengines", label: "W-Engines" },
    { id: "discs", label: "Drive Discs" },
    { id: "stats", label: "Stats" },
    { id: "skills", label: "Skills" },
    { id: "mindscapes", label: "Mindscapes" },
    { id: "teams", label: "Teams" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container px-6">
            <div className="mx-auto max-w-5xl animate-pulse space-y-8">
              <div className="h-8 bg-white/10 rounded w-48" />
              <div className="h-64 bg-white/5 rounded-xl" />
              <div className="space-y-4">
                <div className="h-6 bg-white/10 rounded w-32" />
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container px-6">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The guide you're looking for doesn't exist or couldn't be
                loaded.
              </p>
              <Link to="/guides">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Guides
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const elementIcon = getElementIcon(guide.character.element);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container px-6">
          <div className="mx-auto max-w-6xl">
            {/* Back button */}
            <Link to="/guides" className="inline-block mb-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Guides
              </Button>
            </Link>

            <div className="flex gap-8">
              {/* Table of Contents - Sticky sidebar */}
              <aside className="hidden lg:block w-48 shrink-0">
                <div className="sticky top-32">
                  <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
                    Contents
                  </h3>
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    <nav className="space-y-1">
                      {tocSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="block w-full text-left px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                        >
                          {section.label}
                        </button>
                      ))}
                    </nav>
                  </ScrollArea>
                </div>
              </aside>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <section id="overview" className="section-fade mb-12">
                  <div className="glass overflow-hidden">
                    <div className="aspect-[21/9] overflow-hidden bg-black/20">
                      <img
                        src={guide.character.banner}
                        alt={guide.character.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h1 className="text-3xl font-bold">
                          {guide.character.name}
                        </h1>
                        <span
                          className={`text-xl font-bold ${getRarityColor(guide.character.rarity)}`}
                        >
                          {formatRarity(guide.character.rarity)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-4">
                        <span
                          className={`flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm ${getElementColor(guide.character.element)}`}
                        >
                          {elementIcon && (
                            <img
                              src={elementIcon}
                              alt=""
                              className="w-4 h-4"
                            />
                          )}
                          {formatElement(guide.character.element)}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm">
                          {getSpecialtyIcon(guide.character.specialty) && (
                            <img
                              src={getSpecialtyIcon(guide.character.specialty)!}
                              alt=""
                              className="w-4 h-4"
                            />
                          )}
                          {formatSpecialty(guide.character.specialty)}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {guide.author}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(guide.last_updated)}
                        </span>
                      </div>

                      {guide.description && (
                        <div
                          className="prose prose-invert max-w-none guide-content"
                          dangerouslySetInnerHTML={{
                            __html: parseGuideText(guide.description),
                          }}
                        />
                      )}
                    </div>
                  </div>
                </section>

                {/* W-Engines */}
                {guide.weapons && guide.weapons.length > 0 && (
                  <section id="wengines" className="section-fade mb-12">
                    <h2 className="text-2xl font-bold mb-6">W-Engines</h2>
                    <div className="space-y-4">
                      {guide.weapons.map((weapon, index) => (
                        <div key={index} className="glass p-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={weapon.icon || PLACEHOLDER_WENGINE_ICON}
                              alt={weapon.name}
                              className="w-16 h-16 rounded-lg object-cover bg-white/5"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{weapon.name}</h3>
                                {weapon.rarity && (
                                  <span
                                    className={`text-sm ${getRarityColor(weapon.rarity)}`}
                                  >
                                    {formatRarity(weapon.rarity)}
                                  </span>
                                )}
                              </div>
                              {weapon.title && (
                                <p className="text-sm text-primary mb-2">
                                  {weapon.title}
                                </p>
                              )}
                              {weapon.description && (
                                <div
                                  className="text-sm text-muted-foreground guide-content"
                                  dangerouslySetInnerHTML={{
                                    __html: parseGuideText(weapon.description),
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Drive Discs */}
                {guide.discs && (
                  <section id="discs" className="section-fade mb-12">
                    <h2 className="text-2xl font-bold mb-6">Drive Discs</h2>
                    <div className="space-y-6">
                      {guide.discs.four_pieces &&
                        guide.discs.four_pieces.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                              4-Piece Sets
                            </h3>
                            <div className="space-y-3">
                              {guide.discs.four_pieces.map((disc, index) => (
                                <div key={index} className="glass p-4">
                                  <div className="flex items-start gap-4">
                                    {disc.icon && (
                                      <img
                                        src={disc.icon}
                                        alt={disc.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                      />
                                    )}
                                    <div className="flex-1">
                                      <h4 className="font-semibold mb-1">
                                        {disc.name}
                                      </h4>
                                      {disc.description && (
                                        <div
                                          className="text-sm text-muted-foreground guide-content"
                                          dangerouslySetInnerHTML={{
                                            __html: parseGuideText(
                                              disc.description
                                            ),
                                          }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {guide.discs.two_pieces &&
                        guide.discs.two_pieces.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                              2-Piece Sets
                            </h3>
                            <div className="space-y-3">
                              {guide.discs.two_pieces.map((disc, index) => (
                                <div key={index} className="glass p-4">
                                  <div className="flex items-start gap-4">
                                    {disc.icon && (
                                      <img
                                        src={disc.icon}
                                        alt={disc.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                      />
                                    )}
                                    <div className="flex-1">
                                      <h4 className="font-semibold mb-1">
                                        {disc.name}
                                      </h4>
                                      {disc.description && (
                                        <div
                                          className="text-sm text-muted-foreground guide-content"
                                          dangerouslySetInnerHTML={{
                                            __html: parseGuideText(
                                              disc.description
                                            ),
                                          }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </section>
                )}

                {/* Stats */}
                {guide.stat && (
                  <section id="stats" className="section-fade mb-12">
                    <h2 className="text-2xl font-bold mb-6">Stats</h2>
                    <div className="glass p-6 space-y-6">
                      {/* Drive Disc Main Stats */}
                      {guide.stat.main_stats &&
                        Array.isArray(guide.stat.main_stats) &&
                        guide.stat.main_stats.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3">
                              Drive Disc Main Stats
                            </h3>
                            <div className="grid gap-3 sm:grid-cols-3">
                              {(guide.stat.main_stats as MainStatItem[]).map(
                                (stat, index) => (
                                  <div key={index} className="glass-subtle p-3">
                                    <p className="text-sm font-medium text-muted-foreground mb-1">
                                      Slot {stat.pos}
                                    </p>
                                    <div
                                      className="text-sm guide-content"
                                      dangerouslySetInnerHTML={{
                                        __html: parseGuideText(
                                          stat.stat_priority
                                        ),
                                      }}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* Sub Stats */}
                      {guide.stat.sub_stats && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Sub Stats
                          </h3>
                          <div
                            className="text-sm guide-content"
                            dangerouslySetInnerHTML={{
                              __html: parseGuideText(String(guide.stat.sub_stats)),
                            }}
                          />
                        </div>
                      )}

                      {/* Baseline Stats */}
                      {guide.stat.baseline_stats && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Baseline Stats
                          </h3>
                          <div
                            className="text-sm guide-content glass-subtle p-4"
                            dangerouslySetInnerHTML={{
                              __html: parseGuideText(
                                String(guide.stat.baseline_stats)
                              ),
                            }}
                          />
                        </div>
                      )}

                      {/* Extra Sections */}
                      {guide.stat.extra_sections &&
                        guide.stat.extra_sections.length > 0 && (
                          <div className="space-y-4">
                            {guide.stat.extra_sections.map((section, index) => (
                              <div key={index}>
                                {section.title && (
                                  <h4 className="font-semibold mb-2">
                                    {section.title}
                                  </h4>
                                )}
                                {section.description && (
                                  <div
                                    className="text-sm text-muted-foreground guide-content"
                                    dangerouslySetInnerHTML={{
                                      __html: parseGuideText(
                                        section.description
                                      ),
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </section>
                )}

                {/* Skills */}
                {guide.skills && guide.skills.length > 0 && (
                  <section id="skills" className="section-fade mb-12">
                    <h2 className="text-2xl font-bold mb-6">Skills</h2>
                    <div className="space-y-4">
                      {guide.skills.map((skill, index) => (
                        <div key={index} className="glass p-4">
                          <h3 className="font-semibold mb-2">{skill.title}</h3>
                          {skill.description && (
                            <div
                              className="text-sm text-muted-foreground mb-3 guide-content"
                              dangerouslySetInnerHTML={{
                                __html: parseGuideText(skill.description),
                              }}
                            />
                          )}
                          {skill.explanation && (
                            <div
                              className="text-sm border-l-2 border-primary/50 pl-3 guide-content"
                              dangerouslySetInnerHTML={{
                                __html: parseGuideText(skill.explanation),
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Mindscapes */}
                {guide.mindscapes && guide.mindscapes.length > 0 && (
                  <section id="mindscapes" className="section-fade mb-12">
                    <h2 className="text-2xl font-bold mb-6">Mindscapes</h2>
                    <div className="space-y-4">
                      {guide.mindscapes.map((mindscape, index) => (
                        <div key={index} className="glass p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                              M{mindscape.num || index + 1}
                            </span>
                            <h3 className="font-semibold">
                              Mindscape {mindscape.num || index + 1}
                            </h3>
                          </div>
                          {mindscape.description && (
                            <div
                              className="text-sm text-muted-foreground guide-content"
                              dangerouslySetInnerHTML={{
                                __html: parseGuideText(mindscape.description),
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Teams */}
                {guide.team && guide.team.teams && guide.team.teams.length > 0 && (
                  <section id="teams" className="section-fade mb-12">
                    <h2 className="text-2xl font-bold mb-6">Teams</h2>
                    {guide.team.description && (
                      <div
                        className="mb-6 text-muted-foreground guide-content"
                        dangerouslySetInnerHTML={{
                          __html: parseGuideText(guide.team.description),
                        }}
                      />
                    )}
                    <div className="space-y-4">
                      {guide.team.teams.map((team, index) => (
                        <div key={index} className="glass p-4">
                          {team.name && (
                            <h3 className="font-semibold mb-3">{team.name}</h3>
                          )}
                          <div className="flex flex-wrap gap-3">
                            {team.characters &&
                              team.characters.map((char, charIndex) => {
                                // Handle icons array from new format
                                const charIcon =
                                  (char as { icons?: string[] }).icons?.[0] ||
                                  (char as { icon?: string }).icon;
                                return (
                                  <div
                                    key={charIndex}
                                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2"
                                  >
                                    {charIcon && (
                                      <img
                                        src={charIcon}
                                        alt={char.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                    )}
                                    <span className="text-sm">{char.name}</span>
                                  </div>
                                );
                              })}
                          </div>
                          {team.description && (
                            <div
                              className="mt-3 text-sm text-muted-foreground guide-content"
                              dangerouslySetInnerHTML={{
                                __html: parseGuideText(team.description),
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Team Extra Sections */}
                    {guide.team.extra_sections &&
                      guide.team.extra_sections.length > 0 && (
                        <div className="mt-6 space-y-4">
                          {guide.team.extra_sections.map((section, index) => (
                            <div key={index} className="glass p-4">
                              {section.title && (
                                <h4 className="font-semibold mb-2">
                                  {section.title}
                                </h4>
                              )}
                              {section.description && (
                                <div
                                  className="text-sm text-muted-foreground guide-content"
                                  dangerouslySetInnerHTML={{
                                    __html: parseGuideText(section.description),
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuideDetail;
