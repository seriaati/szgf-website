import { FileCheck, Code2, Sparkles, Github } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Standardized Format",
    description: "YAML-based structure ensures consistency across all guides, making them easy to read, write, and maintain.",
    color: "text-blue-500",
  },
  {
    icon: Code2,
    title: "Schema Validation",
    description: "Built-in JSON schema validates your guides automatically, catching errors before they become problems.",
    color: "text-amber-500",
  },
  {
    icon: Sparkles,
    title: "Easy to Write",
    description: "Use the SZGF Generator, no technical knowledge required. The tool creates valid YAML for you.",
    color: "text-purple-500",
  },
  {
    icon: Github,
    title: "Open Source",
    description: "Fully open source and community-driven. Contribute guides, improve the schema, or build your own tools.",
    color: "text-emerald-500",
  },
];

const Features = () => {
  return (
    <section className="relative py-24">
      <div className="container px-6">
        <div className="section-fade mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Why <span className="text-primary">SZGF</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A modern approach to game guide documentation
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="section-fade card-flat hover-lift p-6"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
