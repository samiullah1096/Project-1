import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdSlot from "@/components/AdSlot";
import { Type, ArrowRight, Star } from "lucide-react";

const textTools = [
  {
    name: "Word Counter",
    description: "Count words, characters, and paragraphs",
    icon: "fas fa-list-ol",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    link: "/tools/word-counter",
    popular: true,
  },
  {
    name: "Grammar Checker",
    description: "Check and correct grammar mistakes",
    icon: "fas fa-spell-check",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    link: "/tools/grammar-checker",
    popular: true,
  },
  {
    name: "Plagiarism Checker",
    description: "Detect plagiarism and duplicated content",
    icon: "fas fa-search",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    link: "/tools/plagiarism-checker",
  },
  {
    name: "Paraphrasing Tool",
    description: "Rewrite text while maintaining meaning",
    icon: "fas fa-edit",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    link: "/tools/paraphrasing-tool",
  },
  {
    name: "Case Converter",
    description: "Convert text between different cases",
    icon: "fas fa-font",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    link: "/tools/case-converter",
    popular: true,
  },
  {
    name: "Text Summarizer",
    description: "Summarize long text into key points",
    icon: "fas fa-compress-alt",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/20",
    link: "/tools/text-summarizer",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for design",
    icon: "fas fa-paragraph",
    color: "text-teal-500",
    bgColor: "bg-teal-500/20",
    link: "/tools/lorem-ipsum",
  },
  {
    name: "Markdown Converter",
    description: "Convert Markdown to HTML and vice versa",
    icon: "fab fa-markdown",
    color: "text-pink-500",
    bgColor: "bg-pink-500/20",
    link: "/tools/markdown-converter",
  },
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: "fas fa-code",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    link: "/tools/json-formatter",
  },
  {
    name: "Password Generator",
    description: "Generate secure random passwords",
    icon: "fas fa-key",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/20",
    link: "/tools/password-generator",
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    icon: "fas fa-hashtag",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
    link: "/tools/hash-generator",
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode and decode URL strings",
    icon: "fas fa-link",
    color: "text-violet-500",
    bgColor: "bg-violet-500/20",
    link: "/tools/url-encoder",
  },
];

export default function TextTools() {
  useEffect(() => {
    document.title = "Text Tools & Converters - ToolSuite Pro | Word Counter, Grammar Checker, Text Editor";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional text processing tools for writers and content creators. Count words, check grammar, convert cases, and format text online for free.');
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="gradient-bg p-3 rounded-lg mr-4">
            <Type className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold gradient-text">Text Tools & Converters</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Professional text processing tools for writers, content creators, and developers. 
          Analyze, format, convert, and enhance your text with our comprehensive suite of online tools.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="text-tools-top" position="text-tools-top" size="banner" />

      {/* Popular Tools Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="text-yellow-500 mr-2" size={24} />
          Most Popular Text Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {textTools.filter(tool => tool.popular).map((tool, index) => (
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
      <AdSlot id="text-tools-middle" position="text-tools-middle" size="banner" />

      {/* All Text Tools */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All Text Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {textTools.map((tool, index) => (
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
      <AdSlot id="text-tools-bottom" position="text-tools-bottom" size="banner" className="mt-12" />
    </div>
  );
}
