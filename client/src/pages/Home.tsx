import { useEffect } from "react";
import Hero from "@/components/Hero";
import ToolCategories from "@/components/ToolCategories";
import PopularTools from "@/components/PopularTools";
import Features from "@/components/Features";
import AdSlot from "@/components/AdSlot";
import { Button } from "@/components/ui/button";
import { Play, List } from "lucide-react";

export default function Home() {
  useEffect(() => {
    // Update page title and meta description
    document.title = "ToolSuite Pro - Ultimate Online Tools & Converters | PDF, Image, Audio, Text Tools";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online tools and converters for PDF, Image, Audio, Text processing. Convert, compress, edit files instantly. 80+ professional tools in one platform.');
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Ad Slot 1 */}
      <AdSlot id="home-top" position="home-top" size="banner" />

      {/* Tool Categories */}
      <ToolCategories />

      {/* Ad Slot 2 */}
      <AdSlot id="home-middle" position="home-middle" size="banner" />

      {/* Popular Tools */}
      <PopularTools />

      {/* Features */}
      <Features />

      {/* Ad Slot 3 */}
      <AdSlot id="home-features" position="home-features" size="banner" />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-6">
            Start Using Our Tools <span className="gradient-text">Right Now</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            No registration required. No hidden fees. Just professional tools that work instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="gradient-bg px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity"
              data-testid="button-start-converting"
            >
              <Play className="mr-2" size={20} />
              Start Converting Now
            </Button>
            <Button
              variant="outline"
              className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary hover:text-primary-foreground transition-all"
              data-testid="button-browse-tools"
            >
              <List className="mr-2" size={20} />
              Browse All Tools
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
