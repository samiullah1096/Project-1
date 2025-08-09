import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdSlot from "@/components/AdSlot";
import { FileText, ArrowRight, Star } from "lucide-react";

const pdfTools = [
  {
    name: "PDF to Word",
    description: "Convert PDF documents to editable Word files",
    icon: "fas fa-file-word",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    link: "/tools/pdf-to-word",
    popular: true,
  },
  {
    name: "PDF to Excel",
    description: "Extract tables and data to Excel spreadsheets",
    icon: "fas fa-file-excel",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    link: "/tools/pdf-to-excel",
  },
  {
    name: "PDF to PowerPoint",
    description: "Convert PDF to editable PowerPoint presentations",
    icon: "fas fa-file-powerpoint",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    link: "/tools/pdf-to-powerpoint",
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    icon: "fas fa-object-group",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    link: "/tools/merge-pdf",
    popular: true,
  },
  {
    name: "Split PDF",
    description: "Split PDF into separate pages or documents",
    icon: "fas fa-cut",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    link: "/tools/split-pdf",
  },
  {
    name: "Compress PDF",
    description: "Reduce PDF file size without quality loss",
    icon: "fas fa-compress-arrows-alt",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/20",
    link: "/tools/compress-pdf",
    popular: true,
  },
  {
    name: "PDF Password Remover",
    description: "Remove password protection from PDF files",
    icon: "fas fa-unlock",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    link: "/tools/pdf-password-remover",
  },
  {
    name: "PDF Editor",
    description: "Edit text, images, and annotations in PDF",
    icon: "fas fa-edit",
    color: "text-teal-500",
    bgColor: "bg-teal-500/20",
    link: "/tools/pdf-editor",
  },
  {
    name: "PDF to Image",
    description: "Convert PDF pages to high-quality images",
    icon: "fas fa-image",
    color: "text-pink-500",
    bgColor: "bg-pink-500/20",
    link: "/tools/pdf-to-image",
  },
  {
    name: "OCR Scanner",
    description: "Extract text from scanned PDF documents",
    icon: "fas fa-scanner",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/20",
    link: "/tools/ocr-scanner",
  },
  {
    name: "Digital Signature",
    description: "Add digital signatures to PDF documents",
    icon: "fas fa-signature",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
    link: "/tools/digital-signature",
  },
  {
    name: "PDF Watermark",
    description: "Add text or image watermarks to PDF",
    icon: "fas fa-stamp",
    color: "text-violet-500",
    bgColor: "bg-violet-500/20",
    link: "/tools/pdf-watermark",
  },
  {
    name: "PDF Rotate",
    description: "Rotate PDF pages to correct orientation",
    icon: "fas fa-redo",
    color: "text-amber-500",
    bgColor: "bg-amber-500/20",
    link: "/tools/pdf-rotate",
  },
  {
    name: "PDF Crop",
    description: "Crop PDF pages to remove unwanted areas",
    icon: "fas fa-crop-alt",
    color: "text-lime-500",
    bgColor: "bg-lime-500/20",
    link: "/tools/pdf-crop",
  },
  {
    name: "PDF Repair",
    description: "Fix corrupted or damaged PDF files",
    icon: "fas fa-tools",
    color: "text-rose-500",
    bgColor: "bg-rose-500/20",
    link: "/tools/pdf-repair",
  },
  {
    name: "PDF Metadata Editor",
    description: "Edit PDF properties and metadata",
    icon: "fas fa-info-circle",
    color: "text-slate-500",
    bgColor: "bg-slate-500/20",
    link: "/tools/pdf-metadata",
  },
];

export default function PDFTools() {
  useEffect(() => {
    document.title = "PDF Tools & Converters - ToolSuite Pro | Convert, Merge, Split, Compress PDF";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional PDF tools for converting, merging, splitting, and compressing PDF files. 20+ free online PDF converters and editors.');
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="gradient-bg p-3 rounded-lg mr-4">
            <FileText className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold gradient-text">PDF Tools & Converters</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Professional PDF processing tools for all your document needs. Convert, merge, split, compress, 
          and edit PDF files with our comprehensive suite of online tools.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="pdf-tools-top" position="pdf-tools-top" size="banner" />

      {/* Popular Tools Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="text-yellow-500 mr-2" size={24} />
          Most Popular PDF Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pdfTools.filter(tool => tool.popular).map((tool, index) => (
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
      <AdSlot id="pdf-tools-middle" position="pdf-tools-middle" size="banner" />

      {/* All PDF Tools */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All PDF Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pdfTools.map((tool, index) => (
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
      <AdSlot id="pdf-tools-bottom" position="pdf-tools-bottom" size="banner" className="mt-12" />

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto mt-16 px-4">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>About Our PDF Tools</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Our comprehensive suite of PDF tools provides everything you need to work with PDF documents efficiently. 
              Whether you need to convert PDFs to other formats, merge multiple documents, or compress large files, 
              our tools are designed for speed, security, and ease of use.
            </p>
            <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
            <ul className="text-muted-foreground space-y-2 mb-4">
              <li>• High-quality conversion with OCR technology</li>
              <li>• Batch processing for multiple files</li>
              <li>• Advanced compression algorithms</li>
              <li>• Secure processing with automatic file deletion</li>
              <li>• No file size limits or watermarks</li>
              <li>• Compatible with all PDF versions</li>
            </ul>
            <p className="text-muted-foreground">
              All our PDF tools are completely free to use and require no registration. Your files are processed 
              securely and deleted automatically after conversion for maximum privacy and security.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
