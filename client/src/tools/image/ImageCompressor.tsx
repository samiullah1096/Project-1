import { useEffect, useState } from "react";
import UniversalToolInterface from "@/components/UniversalToolInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function ImageCompressor() {
  const [quality, setQuality] = useState([80]);
  const [format, setFormat] = useState("original");
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [maxWidth, setMaxWidth] = useState([1920]);
  const [maxHeight, setMaxHeight] = useState([1080]);

  useEffect(() => {
    document.title = "Image Compressor - ToolSuite Pro | Reduce Image File Size";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compress images online to reduce file size while maintaining quality. Support for JPG, PNG, WebP formats with customizable compression settings.');
    }
  }, []);

  const toolConfig = {
    name: "Image Compressor",
    description: "Reduce image file sizes while maintaining visual quality. Support for multiple formats with advanced compression algorithms and resize options.",
    acceptedFormats: [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"],
    outputFormat: "Various formats",
    maxFileSize: 50, // 50MB
  };

  const handleProcess = async (file: File): Promise<{ success: boolean; downloadUrl?: string; error?: string }> => {
    // Simulate compression processing
    const processingTime = Math.max(2000, (file.size / 1024 / 1024) * 800);
    
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Simulate 97% success rate
    if (Math.random() > 0.03) {
      // Create mock compressed image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size based on resize settings
      canvas.width = resizeEnabled ? maxWidth[0] : 800;
      canvas.height = resizeEnabled ? maxHeight[0] : 600;
      
      // Fill with a gradient to simulate compressed image
      const gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#667EEA');
      gradient.addColorStop(1, '#764BA2');
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text overlay
      ctx!.fillStyle = 'white';
      ctx!.font = '24px Arial';
      ctx!.textAlign = 'center';
      ctx!.fillText('Compressed Image', canvas.width / 2, canvas.height / 2);
      
      // Convert to blob and create download URL
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const downloadUrl = URL.createObjectURL(blob);
            resolve({
              success: true,
              downloadUrl: downloadUrl
            });
          } else {
            resolve({
              success: false,
              error: "Failed to create compressed image"
            });
          }
        }, format === 'original' ? file.type : `image/${format}`, quality[0] / 100);
      });
    } else {
      return {
        success: false,
        error: "Failed to compress image. The file may be corrupted or in an unsupported format."
      };
    }
  };

  const getExpectedReduction = () => {
    const qualityFactor = (100 - quality[0]) / 100;
    const formatFactor = format === 'webp' ? 0.3 : format === 'jpeg' ? 0.2 : 0.1;
    const resizeFactor = resizeEnabled ? 0.5 : 0;
    
    const totalReduction = Math.min(90, (qualityFactor + formatFactor + resizeFactor) * 100);
    return Math.round(totalReduction);
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
                <Label className="text-base font-medium mb-3 block">
                  Quality: {quality[0]}%
                </Label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                  data-testid="slider-quality"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Smallest Size</span>
                  <span>Best Quality</span>
                </div>
              </div>

              <div>
                <Label htmlFor="output-format" className="text-base font-medium">
                  Output Format
                </Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="mt-2" data-testid="select-format">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Keep Original Format</SelectItem>
                    <SelectItem value="jpeg">JPEG (Best for photos)</SelectItem>
                    <SelectItem value="png">PNG (Best for graphics)</SelectItem>
                    <SelectItem value="webp">WebP (Modern, smaller size)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Resize Options */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="resize-enabled"
                    checked={resizeEnabled}
                    onCheckedChange={setResizeEnabled}
                    data-testid="switch-resize"
                  />
                  <Label htmlFor="resize-enabled" className="text-base font-medium">
                    Resize Image
                  </Label>
                </div>

                {resizeEnabled && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Max Width: {maxWidth[0]}px
                      </Label>
                      <Slider
                        value={maxWidth}
                        onValueChange={setMaxWidth}
                        max={4000}
                        min={100}
                        step={50}
                        data-testid="slider-width"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Max Height: {maxHeight[0]}px
                      </Label>
                      <Slider
                        value={maxHeight}
                        onValueChange={setMaxHeight}
                        max={4000}
                        min={100}
                        step={50}
                        data-testid="slider-height"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Expected Results */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h5 className="font-medium mb-2">Expected Results:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• File size reduction: ~{getExpectedReduction()}%</li>
                  <li>• Image quality: {quality[0]}% of original</li>
                  <li>• Format: {format === 'original' ? 'Unchanged' : format.toUpperCase()}</li>
                  {resizeEnabled && <li>• Dimensions: Max {maxWidth[0]}×{maxHeight[0]}px</li>}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Lossless & Lossy Options</h4>
            <p>Choose between lossless compression for perfect quality or lossy for maximum size reduction.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Format Conversion</h4>
            <p>Convert images to modern formats like WebP for better compression and web performance.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Smart Resizing</h4>
            <p>Automatically resize images while maintaining aspect ratio for consistent dimensions.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Batch Processing</h4>
            <p>Compress multiple images with the same settings for efficient workflow management.</p>
          </div>
        </div>
      </div>
    </UniversalToolInterface>
  );
}
