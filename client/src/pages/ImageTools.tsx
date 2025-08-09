import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdSlot from "@/components/AdSlot";
import { Image, ArrowRight, Star } from "lucide-react";

const imageTools = [
  {
    name: "Image Compressor",
    description: "Reduce image file size without losing quality",
    icon: "fas fa-compress",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    link: "/tools/image-compressor",
    popular: true,
  },
  {
    name: "Background Remover",
    description: "Remove backgrounds from images automatically",
    icon: "fas fa-crop",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    link: "/tools/background-remover",
    popular: true,
  },
  {
    name: "Image Resizer",
    description: "Resize images to specific dimensions",
    icon: "fas fa-expand-arrows-alt",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    link: "/tools/image-resizer",
    popular: true,
  },
  {
    name: "Format Converter",
    description: "Convert between JPG, PNG, WebP, AVIF formats",
    icon: "fas fa-exchange-alt",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    link: "/tools/image-converter",
  },
  {
    name: "Photo Editor",
    description: "Edit photos with filters and adjustments",
    icon: "fas fa-edit",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    link: "/tools/photo-editor",
  },
  {
    name: "Watermark Remover",
    description: "Remove watermarks from images",
    icon: "fas fa-eraser",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/20",
    link: "/tools/watermark-remover",
  },
  {
    name: "Image Upscaler",
    description: "Enhance and upscale images using AI",
    icon: "fas fa-search-plus",
    color: "text-teal-500",
    bgColor: "bg-teal-500/20",
    link: "/tools/image-upscaler",
  },
  {
    name: "Collage Maker",
    description: "Create photo collages and layouts",
    icon: "fas fa-th",
    color: "text-pink-500",
    bgColor: "bg-pink-500/20",
    link: "/tools/collage-maker",
  },
  {
    name: "Meme Generator",
    description: "Create memes with text and images",
    icon: "fas fa-laugh",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    link: "/tools/meme-generator",
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    icon: "fas fa-qrcode",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/20",
    link: "/tools/qr-generator",
  },
  {
    name: "Favicon Generator",
    description: "Create favicons for websites",
    icon: "fas fa-globe",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
    link: "/tools/favicon-generator",
  },
  {
    name: "Image Filter",
    description: "Apply artistic filters and effects",
    icon: "fas fa-palette",
    color: "text-violet-500",
    bgColor: "bg-violet-500/20",
    link: "/tools/image-filter",
  },
];

export default function ImageTools() {
  useEffect(() => {
    document.title = "Image Tools & Converters - ToolSuite Pro | Compress, Resize, Edit Images";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional image editing and conversion tools. Compress images, remove backgrounds, resize photos, and convert formats online for free.');
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="gradient-bg p-3 rounded-lg mr-4">
            <Image className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold gradient-text">Image Tools & Converters</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Professional image processing tools for photographers, designers, and content creators. 
          Edit, convert, compress, and enhance your images with our advanced online tools.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="image-tools-top" position="image-tools-top" size="banner" />

      {/* Popular Tools Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="text-yellow-500 mr-2" size={24} />
          Most Popular Image Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {imageTools.filter(tool => tool.popular).map((tool, index) => (
            <Link key={index} href={tool.link}>
              <Card className="tool-card border-primary/20" data-testid={`popular-tool-${tool.name.toLowerCase().replace(/ /g, "-")}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`${tool.bgColor} p-3 rounded-lg mr-4`}>
                      <i className={`${tool.icon} ${tool.color} text-2xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{tool.name}</h3>
                      <Badge className="bg-primary/20 text-primary text-xs">Popular</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <Button className="w-full gradient-bg" size="sm">
                    Use Tool <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Slot 2 */}
      <AdSlot id="image-tools-middle" position="image-tools-middle" size="banner" />

      {/* All Image Tools */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All Image Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {imageTools.map((tool, index) => (
            <Link key={index} href={tool.link}>
              <Card className="tool-card" data-testid={`tool-${tool.name.toLowerCase().replace(/ /g, "-")}`}>
                <CardContent className="p-4">
                  <div className={`${tool.bgColor} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                    <i className={`${tool.icon} ${tool.color} text-xl`}></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{tool.name}</h3>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{tool.description}</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Open Tool
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Slot 3 */}
      <AdSlot id="image-tools-bottom" position="image-tools-bottom" size="banner" className="mt-12" />
    </div>
  );
}
