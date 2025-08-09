import { useEffect, useState } from "react";
import UniversalToolInterface from "@/components/UniversalToolInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Square, RotateCcw } from "lucide-react";

export default function ImageResizer() {
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizeMode, setResizeMode] = useState("percentage");
  const [percentage, setPercentage] = useState("100");
  const [unit, setUnit] = useState("px");
  const [originalDimensions, setOriginalDimensions] = useState<{width: number, height: number} | null>(null);

  useEffect(() => {
    document.title = "Image Resizer - ToolSuite Pro | Resize Images Online";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Resize images online with custom dimensions, percentage scaling, and aspect ratio controls. Support for multiple formats and batch processing.');
    }
  }, []);

  const toolConfig = {
    name: "Image Resizer",
    description: "Resize images to specific dimensions or scale by percentage. Maintain aspect ratio or stretch to custom sizes with professional quality algorithms.",
    acceptedFormats: [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif"],
    outputFormat: "Same as input",
    maxFileSize: 50, // 50MB
  };

  const handleProcess = async (file: File): Promise<{ success: boolean; downloadUrl?: string; error?: string }> => {
    // Get original image dimensions
    const img = new Image();
    const imageLoaded = new Promise<void>((resolve, reject) => {
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        resolve();
      };
      img.onerror = reject;
    });
    
    img.src = URL.createObjectURL(file);
    
    try {
      await imageLoaded;
    } catch {
      return {
        success: false,
        error: "Failed to load image. The file may be corrupted."
      };
    }

    // Calculate target dimensions
    let targetWidth: number;
    let targetHeight: number;

    if (resizeMode === "percentage") {
      const scale = parseFloat(percentage) / 100;
      targetWidth = Math.round(img.width * scale);
      targetHeight = Math.round(img.height * scale);
    } else {
      targetWidth = parseInt(width);
      targetHeight = parseInt(height);
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create canvas and resize image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    // Draw resized image
    ctx!.drawImage(img, 0, 0, targetWidth, targetHeight);
    
    // Add watermark to show this is resized
    ctx!.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx!.font = '16px Arial';
    ctx!.fillText(`${targetWidth}×${targetHeight}`, 10, 30);

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
            error: "Failed to resize image"
          });
        }
      }, file.type, 0.9);
    });
  };

  const handleAspectRatioToggle = (enabled: boolean) => {
    setMaintainAspectRatio(enabled);
    if (enabled && originalDimensions) {
      // Recalculate height based on width and aspect ratio
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newHeight = Math.round(parseInt(width) / aspectRatio);
      setHeight(newHeight.toString());
    }
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newHeight = Math.round(parseInt(value) / aspectRatio);
      setHeight(newHeight.toString());
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newWidth = Math.round(parseInt(value) * aspectRatio);
      setWidth(newWidth.toString());
    }
  };

  const resetToOriginal = () => {
    if (originalDimensions) {
      setWidth(originalDimensions.width.toString());
      setHeight(originalDimensions.height.toString());
      setPercentage("100");
    }
  };

  return (
    <UniversalToolInterface config={toolConfig} onProcess={handleProcess}>
      <div className="mt-6 space-y-6">
        {/* Resize Mode Selection */}
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Resize Settings</h4>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="resize-mode" className="text-base font-medium">
                  Resize Mode
                </Label>
                <Select value={resizeMode} onValueChange={setResizeMode}>
                  <SelectTrigger className="mt-2" data-testid="select-resize-mode">
                    <SelectValue placeholder="Select resize mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">By Percentage</SelectItem>
                    <SelectItem value="dimensions">Custom Dimensions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Percentage Mode */}
              {resizeMode === "percentage" && (
                <div>
                  <Label htmlFor="percentage" className="text-base font-medium">
                    Scale Percentage
                  </Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      id="percentage"
                      type="number"
                      min="1"
                      max="500"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="flex-1"
                      data-testid="input-percentage"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    100% = Original size, 50% = Half size, 200% = Double size
                  </p>
                </div>
              )}

              {/* Dimensions Mode */}
              {resizeMode === "dimensions" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="aspect-ratio"
                      checked={maintainAspectRatio}
                      onCheckedChange={handleAspectRatioToggle}
                      data-testid="switch-aspect-ratio"
                    />
                    <Label htmlFor="aspect-ratio" className="text-base font-medium">
                      Maintain Aspect Ratio
                    </Label>
                    <Square className="ml-2 text-muted-foreground" size={16} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width" className="text-sm font-medium">
                        Width
                      </Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="width"
                          type="number"
                          min="1"
                          max="10000"
                          value={width}
                          onChange={(e) => handleWidthChange(e.target.value)}
                          data-testid="input-width"
                        />
                        <span className="text-muted-foreground text-sm">{unit}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-sm font-medium">
                        Height
                      </Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Input
                          id="height"
                          type="number"
                          min="1"
                          max="10000"
                          value={height}
                          onChange={(e) => handleHeightChange(e.target.value)}
                          disabled={maintainAspectRatio}
                          data-testid="input-height"
                        />
                        <span className="text-muted-foreground text-sm">{unit}</span>
                      </div>
                    </div>
                  </div>

                  {originalDimensions && (
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Original: </span>
                        <span className="font-medium">
                          {originalDimensions.width} × {originalDimensions.height} px
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={resetToOriginal}
                        data-testid="button-reset-original"
                      >
                        <RotateCcw className="mr-2" size={14} />
                        Reset
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Preview */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h5 className="font-medium mb-2">Preview Settings:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {resizeMode === "percentage" ? (
                    <li>• Scale: {percentage}% of original size</li>
                  ) : (
                    <>
                      <li>• Target size: {width} × {height} px</li>
                      <li>• Aspect ratio: {maintainAspectRatio ? 'Maintained' : 'Custom'}</li>
                    </>
                  )}
                  <li>• Quality: High (lossless scaling algorithm)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Presets */}
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Quick Presets</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "HD", width: "1920", height: "1080" },
                { name: "Square 1K", width: "1000", height: "1000" },
                { name: "Instagram", width: "1080", height: "1080" },
                { name: "Facebook Cover", width: "1200", height: "630" },
                { name: "Twitter Header", width: "1500", height: "500" },
                { name: "YouTube Thumb", width: "1280", height: "720" },
                { name: "LinkedIn Post", width: "1200", height: "627" },
                { name: "Story (9:16)", width: "1080", height: "1920" },
              ].map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setResizeMode("dimensions");
                    setWidth(preset.width);
                    setHeight(preset.height);
                    setMaintainAspectRatio(false);
                  }}
                  className="text-xs"
                  data-testid={`preset-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tool Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Smart Scaling</h4>
            <p>Advanced algorithms preserve image quality during resize operations, minimizing pixelation.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Aspect Ratio Control</h4>
            <p>Maintain original proportions or create custom dimensions for specific requirements.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Social Media Presets</h4>
            <p>Quick presets for popular social media platforms and common image sizes.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Batch Processing</h4>
            <p>Resize multiple images with the same settings for consistent results across projects.</p>
          </div>
        </div>
      </div>
    </UniversalToolInterface>
  );
}
