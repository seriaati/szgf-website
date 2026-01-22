import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChangelogPreview from "@/components/ChangelogPreview";
import GuidesPreview from "@/components/GuidesPreview";
import ApplicationsPreview from "@/components/ApplicationsPreview";
import SDKPreview from "@/components/SDKPreview";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="SZGF - Standardized Zenless Zone Zero Guide Format"
        description="A YAML-based format for writing structured, validated, and easily parseable guides for agents in Zenless Zone Zero."
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <Features />
        <ChangelogPreview />
        <GuidesPreview />
        <ApplicationsPreview />
        <SDKPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
