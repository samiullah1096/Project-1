import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdSlot from "@/components/AdSlot";
import { TrendingUp, ArrowRight, Star } from "lucide-react";

const productivityTools = [
  {
    name: "Calculator",
    description: "Advanced calculator with scientific functions",
    icon: "fas fa-calculator",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    link: "/tools/calculator",
    popular: true,
  },
  {
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: "fas fa-exchange-alt",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    link: "/tools/unit-converter",
    popular: true,
  },
  {
    name: "Color Picker",
    description: "Pick colors and get hex, RGB, HSL codes",
    icon: "fas fa-palette",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    link: "/tools/color-picker",
  },
  {
    name: "Invoice Generator",
    description: "Create professional invoices and receipts",
    icon: "fas fa-receipt",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    link: "/tools/invoice-generator",
  },
  {
    name: "QR Scanner",
    description: "Scan and decode QR codes from images",
    icon: "fas fa-qrcode",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    link: "/tools/qr-scanner",
  },
  {
    name: "Barcode Generator",
    description: "Generate various types of barcodes",
    icon: "fas fa-barcode",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/20",
    link: "/tools/barcode-generator",
  },
  {
    name: "URL Shortener",
    description: "Create short URLs for easy sharing",
    icon: "fas fa-link",
    color: "text-teal-500",
    bgColor: "bg-teal-500/20",
    link: "/tools/url-shortener",
  },
  {
    name: "Pomodoro Timer",
    description: "Focus timer for productivity enhancement",
    icon: "fas fa-clock",
    color: "text-pink-500",
    bgColor: "bg-pink-500/20",
    link: "/tools/pomodoro-timer",
  },
  {
    name: "Note Taking",
    description: "Quick notes with rich text formatting",
    icon: "fas fa-sticky-note",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    link: "/tools/note-taking",
  },
  {
    name: "Task Manager",
    description: "Organize and track your daily tasks",
    icon: "fas fa-tasks",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/20",
    link: "/tools/task-manager",
  },
  {
    name: "QR Generator",
    description: "Generate QR codes for text, URLs, and more",
    icon: "fas fa-qrcode",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
    link: "/tools/qr-generator",
    popular: true,
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    icon: "fas fa-code",
    color: "text-violet-500",
    bgColor: "bg-violet-500/20",
    link: "/tools/base64-encoder",
  },
];

export default function ProductivityTools() {
  useEffect(() => {
    document.title = "Productivity & Financial Tools - ToolSuite Pro | Calculator, Unit Converter, Invoice Generator";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional productivity tools for business and personal use. Calculator, unit converter, invoice generator, QR codes, and more online tools.');
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="gradient-bg p-3 rounded-lg mr-4">
            <TrendingUp className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold gradient-text">Productivity & Financial Tools</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Boost your productivity and manage your business with our comprehensive suite of tools. 
          From calculators to invoice generators, everything you need to work smarter.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="productivity-tools-top" position="productivity-tools-top" size="banner" />

      {/* Popular Tools Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="text-yellow-500 mr-2" size={24} />
          Most Popular Productivity Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productivityTools.filter(tool => tool.popular).map((tool, index) => (
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
      <AdSlot id="productivity-tools-middle" position="productivity-tools-middle" size="banner" />

      {/* All Productivity Tools */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All Productivity Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productivityTools.map((tool, index) => (
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
      <AdSlot id="productivity-tools-bottom" position="productivity-tools-bottom" size="banner" className="mt-12" />
    </div>
  );
}
