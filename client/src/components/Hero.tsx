import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, List } from "lucide-react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search for:", searchQuery);
  };

  return (
    <section className="pt-24 pb-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-5"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="fade-in-animation">
          <h1 className="text-4xl md:text-6xl font-sans font-bold mb-6 leading-tight">
            Ultimate Online <span className="gradient-text">Tools & Converters</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light">
            Transform, convert, and optimize your files with 80+ professional tools. 
            PDF, Image, Audio, Text processing made simple and fast.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="glassmorphism rounded-full p-2 flex items-center">
              <Search className="text-muted-foreground ml-4" size={20} />
              <Input
                type="text"
                placeholder="Search tools... (e.g., PDF to Word, Image Compressor)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0"
                data-testid="input-search"
              />
              <Button
                type="submit"
                className="gradient-bg px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
                data-testid="button-search"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text" data-testid="stat-tools">80+</div>
              <div className="text-muted-foreground">Tools Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text" data-testid="stat-files">1M+</div>
              <div className="text-muted-foreground">Files Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text" data-testid="stat-free">100%</div>
              <div className="text-muted-foreground">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text" data-testid="stat-available">24/7</div>
              <div className="text-muted-foreground">Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
