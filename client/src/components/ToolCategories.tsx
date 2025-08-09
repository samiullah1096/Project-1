import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Image, 
  Volume2, 
  Type, 
  TrendingUp, 
  Star,
  ArrowRight 
} from "lucide-react";

const categories = [
  {
    id: "pdf",
    title: "PDF Tools & Converters",
    description: "Convert, merge, split, compress and edit PDF files with professional-grade tools.",
    icon: FileText,
    toolCount: "20+",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    link: "/pdf-tools",
    tags: ["PDF to Word", "Merge PDF", "Compress"],
  },
  {
    id: "image",
    title: "Image Tools & Converters",
    description: "Edit, convert, compress and enhance images with advanced processing tools.",
    icon: Image,
    toolCount: "25+",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    link: "/image-tools",
    tags: ["Background Remover", "Resize", "Compress"],
  },
  {
    id: "audio",
    title: "Audio Tools & Converters",
    description: "Convert, compress, trim and enhance audio files with professional quality.",
    icon: Volume2,
    toolCount: "15+",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    link: "/audio-tools",
    tags: ["MP3 Converter", "Trim Audio", "Merge"],
  },
  {
    id: "text",
    title: "Text Tools & Converters",
    description: "Analyze, format, convert and enhance text with powerful processing tools.",
    icon: Type,
    toolCount: "20+",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    link: "/text-tools",
    tags: ["Word Counter", "Case Converter", "Grammar Check"],
  },
  {
    id: "productivity",
    title: "Productivity & Financial Tools",
    description: "Boost productivity with calculators, converters and business tools.",
    icon: TrendingUp,
    toolCount: "15+",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    link: "/productivity-tools",
    tags: ["Calculator", "Unit Converter", "QR Generator"],
  },
  {
    id: "all",
    title: "All Tools Suite",
    description: "Access all 80+ professional tools in one unified dashboard experience.",
    icon: Star,
    toolCount: "Complete Access",
    color: "text-yellow-400",
    bgColor: "bg-gradient-to-r from-primary to-accent",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    link: "/all-tools",
    tags: ["Premium", "All-in-One"],
    featured: true,
  },
];

export default function ToolCategories() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">Explore Tool Categories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional-grade tools for all your file processing needs. Choose a category to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <Card
                key={category.id}
                className={`tool-card group ${category.featured ? 'border-2 border-primary/30' : ''}`}
                data-testid={`card-${category.id}`}
              >
                <CardContent className="p-0">
                  <img
                    src={category.image}
                    alt={`${category.title} illustration`}
                    className="w-full h-48 object-cover rounded-t-lg"
                    loading="lazy"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`${category.bgColor} p-3 rounded-lg mr-4 ${category.featured ? 'animate-glow' : ''}`}>
                        <IconComponent className={`${category.color} text-2xl`} size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
                        <p className={`text-sm ${category.featured ? 'text-primary' : 'text-muted-foreground'}`}>
                          {category.toolCount} Tools Available
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={category.featured 
                            ? "bg-gradient-to-r from-primary to-accent text-white"
                            : "bg-primary/20 text-primary"
                          }
                          data-testid={`tag-${tag.toLowerCase().replace(" ", "-")}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link href={category.link}>
                      <Button
                        className={`w-full ${category.featured 
                          ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                          : 'gradient-bg hover:opacity-90'
                        } transition-opacity`}
                        data-testid={`button-explore-${category.id}`}
                      >
                        {category.featured ? 'View All Tools' : `Explore ${category.title.split(' ')[0]} Tools`}
                        {category.featured ? (
                          <Star className="ml-2" size={16} />
                        ) : (
                          <ArrowRight className="ml-2" size={16} />
                        )}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
