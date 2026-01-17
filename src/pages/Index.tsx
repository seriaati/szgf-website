import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChangelogPreview from "@/components/ChangelogPreview";
import ApplicationsPreview from "@/components/ApplicationsPreview";
import SDKPreview from "@/components/SDKPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <ChangelogPreview />
        <ApplicationsPreview />
        <SDKPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
