import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdSlot from "@/components/AdSlot";
import { Volume2, ArrowRight, Star } from "lucide-react";

const audioTools = [
  {
    name: "Audio Converter",
    description: "Convert between MP3, WAV, FLAC, and other formats",
    icon: "fas fa-exchange-alt",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    link: "/tools/audio-converter",
    popular: true,
  },
  {
    name: "Audio Compressor",
    description: "Reduce audio file size while maintaining quality",
    icon: "fas fa-compress",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    link: "/tools/audio-compressor",
    popular: true,
  },
  {
    name: "Audio Merger",
    description: "Combine multiple audio files into one",
    icon: "fas fa-object-group",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    link: "/tools/audio-merger",
  },
  {
    name: "Volume Booster",
    description: "Increase audio volume and amplify sound",
    icon: "fas fa-volume-up",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    link: "/tools/volume-booster",
  },
  {
    name: "Audio Trimmer",
    description: "Cut and trim audio clips precisely",
    icon: "fas fa-cut",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    link: "/tools/audio-trimmer",
    popular: true,
  },
  {
    name: "Voice Recorder",
    description: "Record audio directly in your browser",
    icon: "fas fa-microphone",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/20",
    link: "/tools/voice-recorder",
  },
  {
    name: "Text to Speech",
    description: "Convert text to natural-sounding speech",
    icon: "fas fa-comment",
    color: "text-teal-500",
    bgColor: "bg-teal-500/20",
    link: "/tools/text-to-speech",
  },
  {
    name: "Audio Normalizer",
    description: "Normalize audio levels for consistency",
    icon: "fas fa-adjust",
    color: "text-pink-500",
    bgColor: "bg-pink-500/20",
    link: "/tools/audio-normalizer",
  },
  {
    name: "Pitch Changer",
    description: "Change audio pitch without affecting speed",
    icon: "fas fa-music",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    link: "/tools/pitch-changer",
  },
  {
    name: "Noise Reducer",
    description: "Remove background noise from audio",
    icon: "fas fa-ban",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/20",
    link: "/tools/noise-reducer",
  },
];

export default function AudioTools() {
  useEffect(() => {
    document.title = "Audio Tools & Converters - ToolSuite Pro | Convert, Edit, Compress Audio";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional audio editing and conversion tools. Convert audio formats, compress files, trim clips, and enhance sound quality online for free.');
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="gradient-bg p-3 rounded-lg mr-4">
            <Volume2 className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold gradient-text">Audio Tools & Converters</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Professional audio processing tools for musicians, podcasters, and content creators. 
          Convert, edit, compress, and enhance your audio files with our advanced online tools.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="audio-tools-top" position="audio-tools-top" size="banner" />

      {/* Popular Tools Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="text-yellow-500 mr-2" size={24} />
          Most Popular Audio Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audioTools.filter(tool => tool.popular).map((tool, index) => (
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
      <AdSlot id="audio-tools-middle" position="audio-tools-middle" size="banner" />

      {/* All Audio Tools */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All Audio Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {audioTools.map((tool, index) => (
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
      <AdSlot id="audio-tools-bottom" position="audio-tools-bottom" size="banner" className="mt-12" />
    </div>
  );
}
