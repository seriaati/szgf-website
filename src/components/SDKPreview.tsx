import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import sdks from "@/data/sdks.json";
import { getSDKIcon } from "@/utils/sdkIcons";

const SDKPreview = () => {
  return (
    <section className="relative py-24">
      <div className="container px-6">
        <div className="section-fade grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-4">
              {sdks.map((sdk, index) => (
                <div
                  key={sdk.id}
                  className="card-subtle p-5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                        {getSDKIcon(sdk.id)}
                      </div>
                      <span className="font-semibold">{sdk.name}</span>
                    </div>
                  </div>
                  {sdk.installCommand && (
                    <code className="mt-3 block rounded-md bg-secondary px-4 py-2 text-sm text-foreground font-mono">
                      {sdk.installCommand}
                    </code>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="mb-4 inline-block text-sm font-medium text-muted-foreground">
              For Developers
            </span>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Integrate SZGF
            </h2>
            <p className="mb-8 text-muted-foreground">
              Use SDKs to programmatically download and read SZGF guides
              in your own applications.
            </p>
            <Link to="/sdk">
              <Button variant="outline" className="group">
                Explore SDKs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDKPreview;
