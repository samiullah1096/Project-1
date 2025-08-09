import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const popularTools = [
  {
    name: "PDF to Word",
    description: "Convert instantly",
    icon: "fas fa-file-pdf",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    link: "/tools/pdf-to-word",
  },
  {
    name: "Image Compressor",
    description: "Reduce file size",
    icon: "fas fa-compress",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    link: "/tools/image-compressor",
  },
  {
    name: "Background Remover",
    description: "AI-powered",
    icon: "fas fa-crop",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    link: "/tools/background-remover",
  },
  {
    name: "Audio Converter",
    description: "High quality",
    icon: "fas fa-volume-up",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    link: "/tools/audio-converter",
  },
  {
    name: "Grammar Checker",
    description: "AI-powered",
    icon: "fas fa-spell-check",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    link: "/tools/grammar-checker",
  },
  {
    name: "QR Generator",
    description: "Custom design",
    icon: "fas fa-qrcode",
    color: "text-pink-400",
    bgColor: "bg-pink-500/20",
    link: "/tools/qr-generator",
  },
];

export default function PopularTools() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-transparent to-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">Most Popular Tools</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quick access to our most frequently used conversion and editing tools
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularTools.map((tool, index) => (
            <Link key={index} href={tool.link}>
              <Card className="feature-card group cursor-pointer" data-testid={`tool-${tool.name.toLowerCase().replace(" ", "-")}`}>
                <CardContent className="p-4 text-center">
                  <div className={`${tool.bgColor} p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <i className={`${tool.icon} ${tool.color} text-xl`}></i>
                  </div>
                  <h4 className="font-medium mb-1 text-sm sm:text-base">{tool.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            className="gradient-bg px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            data-testid="button-view-all-popular"
          >
            View All Popular Tools <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
