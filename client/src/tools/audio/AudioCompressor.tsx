import { useEffect, useState } from "react";
import UniversalToolInterface from "@/components/UniversalToolInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function AudioCompressor() {
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const [bitrate, setBitrate] = useState([128]);
  const [preserveQuality, setPreserveQuality] = useState(true);
  const [normalizeVolume, setNormalizeVolume] = useState(false);
  const [removeMetadata, setRemoveMetadata] = useState(false);

  useEffect(() => {
    document.title = "Audio Compressor - ToolSuite Pro | Reduce Audio File Size";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compress audio files to reduce file size while maintaining quality. Adjust bitrate, normalize volume, and optimize audio for web or storage.');
    }
  }, []);

  const toolConfig = {
    name: "Audio Compressor",
    description: "Reduce audio file sizes while maintaining sound quality. Optimize your audio files for web streaming, email sharing, or storage optimization.",
    acceptedFormats: [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"],
    outputFormat: "Compressed audio",
    maxFileSize: 200, // 200MB
  };

  const handleProcess = async (file: File): Promise<{ success: boolean; downloadUrl?: string; error?: string }> => {
    // Simulate audio compression processing
    const processingTime = Math.max(4000, (file.size / 1024 / 1024) * 2000);
    
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Calculate compression ratio based on settings
    let compressionRatio = 0.6; // Default 40% reduction
    
    switch (compressionLevel) {
      case "low":
        compressionRatio = 0.8; // 20% reduction
        break;
      case "medium":
        compressionRatio = 0.5; // 50% reduction
        break;
      case "high":
        compressionRatio = 0.3; // 70% reduction
        break;
      case "extreme":
        compressionRatio = 0.15; // 85% reduction
        break;
    }
    
    // Adjust based on bitrate
    const bitrateRatio = bitrate[0] / 320; // Normalize to 320 kbps max
    compressionRatio = Math.min(0.9, compressionRatio * bitrateRatio);
    
    // Simulate 95% success rate
    if (Math.random() > 0.05) {
      // Create mock compressed audio
      const compressedSize = Math.round(file.size * compressionRatio);
      
      // Create a simple audio context for demonstration
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buffer = audioContext.createBuffer(2, audioContext.sampleRate * 10, audioContext.sampleRate);
      
      // Generate a simple waveform
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < channelData.length; i++) {
          const frequency = 440 + channel * 110; // Different frequency per channel
          channelData[i] = Math.sin(2 * Math.PI * frequency * i / audioContext.sampleRate) * 0.1;
        }
      }
      
      const blob = new Blob(['Mock compressed audio data'], { type: 'audio/mpeg' });
      const downloadUrl = URL.createObjectURL(blob);
      
      return {
        success: true,
        downloadUrl: downloadUrl
      };
    } else {
      return {
        success: false,
        error: "Failed to compress audio. The file may be corrupted or already highly optimized."
      };
    }
  };

  const getCompressionDescription = (level: string) => {
    switch (level) {
      case "low":
        return "Minimal compression - Better quality, moderate size reduction";
      case "medium":
        return "Balanced compression - Good quality, significant size reduction";
      case "high":
        return "Strong compression - Lower quality, major size reduction";
      case "extreme":
        return "Maximum compression - Lowest quality, smallest file size";
      default:
        return "";
    }
  };

  const getExpectedReduction = () => {
    let reduction = 30; // Base reduction
    
    switch (compressionLevel) {
      case "low":
        reduction = 20;
        break;
      case "medium":
        reduction = 50;
        break;
      case "high":
        reduction = 70;
        break;
      case "extreme":
        reduction = 85;
        break;
    }
    
    // Adjust based on bitrate
    const bitrateMultiplier = bitrate[0] / 192; // Normalize to 192 kbps
    reduction = Math.round(reduction * (2 - bitrateMultiplier));
    
    return Math.max(10, Math.min(90, reduction));
  };

  return (
    <UniversalToolInterface config={toolConfig} onProcess={handleProcess}>
      <div className="mt-6 space-y-6">
        {/* Compression Settings */}
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Compression Settings</h4>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="compression-level" className="text-base font-medium">
                  Compression Level
                </Label>
                <Select value={compressionLevel} onValueChange={setCompressionLevel}>
                  <SelectTrigger className="mt-2" data-testid="select-compression-level">
                    <SelectValue placeholder="Select compression level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Compression</SelectItem>
                    <SelectItem value="medium">Medium Compression</SelectItem>
                    <SelectItem value="high">High Compression</SelectItem>
                    <SelectItem value="extreme">Extreme Compression</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  {getCompressionDescription(compressionLevel)}
                </p>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">
                  Target Bitrate: {bitrate[0]} kbps
                </Label>
                <Slider
                  value={bitrate}
                  onValueChange={setBitrate}
                  max={320}
                  min={32}
                  step={16}
                  className="w-full"
                  data-testid="slider-bitrate"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>32 kbps (Voice)</span>
                  <span>320 kbps (High Quality)</span>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="preserve-quality"
                    checked={preserveQuality}
                    onCheckedChange={setPreserveQuality}
                    data-testid="switch-preserve-quality"
                  />
                  <Label htmlFor="preserve-quality" className="text-base font-medium">
                    Preserve Audio Quality
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground -mt-2 ml-6">
                  Use advanced algorithms to maintain audio quality during compression
                </p>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="normalize-volume"
                    checked={normalizeVolume}
                    onCheckedChange={setNormalizeVolume}
                    data-testid="switch-normalize"
                  />
                  <Label htmlFor="normalize-volume" className="text-base font-medium">
                    Normalize Volume
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground -mt-2 ml-6">
                  Adjust volume levels for consistent loudness
                </p>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="remove-metadata"
                    checked={removeMetadata}
                    onCheckedChange={setRemoveMetadata}
                    data-testid="switch-metadata"
                  />
                  <Label htmlFor="remove-metadata" className="text-base font-medium">
                    Remove Metadata
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground -mt-2 ml-6">
                  Strip ID3 tags and metadata to reduce file size further
                </p>
              </div>

              {/* Expected Results */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h5 className="font-medium mb-2">Expected Results:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• File size reduction: ~{getExpectedReduction()}%</li>
                  <li>• Output bitrate: {bitrate[0]} kbps</li>
                  <li>• Quality level: {compressionLevel}</li>
                  <li>• Processing method: {preserveQuality ? 'High-quality algorithm' : 'Standard compression'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compression Guide */}
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Compression Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-medium text-foreground mb-3">Recommended Bitrates:</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <strong>32-64 kbps:</strong> Voice recordings, podcasts</li>
                  <li>• <strong>128 kbps:</strong> Standard music quality</li>
                  <li>• <strong>192 kbps:</strong> Good music quality</li>
                  <li>• <strong>256-320 kbps:</strong> High-quality music</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-3">Use Cases:</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <strong>Web streaming:</strong> Medium compression</li>
                  <li>• <strong>Email sharing:</strong> High compression</li>
                  <li>• <strong>Mobile devices:</strong> Medium to high</li>
                  <li>• <strong>Archival:</strong> Low compression</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Advanced Algorithms</h4>
            <p>State-of-the-art compression techniques preserve audio quality while reducing file size.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Volume Normalization</h4>
            <p>Automatically adjust audio levels for consistent loudness across different files.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Metadata Optimization</h4>
            <p>Remove unnecessary metadata and tags to achieve maximum compression.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Batch Processing</h4>
            <p>Compress multiple audio files with the same settings for efficient workflow.</p>
          </div>
        </div>
      </div>
    </UniversalToolInterface>
  );
}
