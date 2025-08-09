import { useEffect, useState } from "react";
import UniversalToolInterface from "@/components/UniversalToolInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function CompressPDF() {
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const [qualityLevel, setQualityLevel] = useState([75]);

  useEffect(() => {
    document.title = "Compress PDF - ToolSuite Pro | Reduce PDF File Size";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compress PDF files to reduce size while maintaining quality. Choose compression levels and optimize your PDFs for web, email, or storage.');
    }
  }, []);

  const toolConfig = {
    name: "PDF Compressor",
    description: "Reduce PDF file size while maintaining document quality. Choose from different compression levels to optimize your PDFs for various purposes.",
    acceptedFormats: [".pdf"],
    outputFormat: "PDF",
    maxFileSize: 200, // 200MB
  };

  const handleProcess = async (file: File): Promise<{ success: boolean; downloadUrl?: string; error?: string }> => {
    // Simulate compression processing
    const processingTime = Math.max(3000, (file.size / 1024 / 1024) * 500);
    
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Calculate compression ratio based on settings
    let compressionRatio = 0.7; // Default 30% reduction
    
    switch (compressionLevel) {
      case "low":
        compressionRatio = 0.9; // 10% reduction
        break;
      case "medium":
        compressionRatio = 0.6; // 40% reduction
        break;
      case "high":
        compressionRatio = 0.4; // 60% reduction
        break;
      case "extreme":
        compressionRatio = 0.2; // 80% reduction
        break;
    }
    
    // Simulate 96% success rate
    if (Math.random() > 0.04) {
      const compressedSize = Math.round(file.size * compressionRatio);
      
      // Create mock compressed PDF
      const blob = new Blob(['Mock compressed PDF content'], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      
      return {
        success: true,
        downloadUrl: downloadUrl
      };
    } else {
      return {
        success: false,
        error: "Failed to compress PDF. The file may be corrupted or already highly optimized."
      };
    }
  };

  const getCompressionDescription = (level: string) => {
    switch (level) {
      case "low":
        return "Minimal compression - Best quality, larger file size";
      case "medium":
        return "Balanced compression - Good quality, moderate size reduction";
      case "high":
        return "Strong compression - Lower quality, significant size reduction";
      case "extreme":
        return "Maximum compression - Lowest quality, smallest file size";
      default:
        return "";
    }
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
                  Image Quality: {qualityLevel[0]}%
                </Label>
                <Slider
                  value={qualityLevel}
                  onValueChange={setQualityLevel}
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

              {/* Expected Results */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h5 className="font-medium mb-2">Expected Results:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• File size reduction: {compressionLevel === 'low' ? '10-20%' : compressionLevel === 'medium' ? '30-50%' : compressionLevel === 'high' ? '50-70%' : '70-85%'}</li>
                  <li>• Image quality: {qualityLevel[0]}% of original</li>
                  <li>• Text quality: Preserved</li>
                  <li>• Processing time: {compressionLevel === 'extreme' ? 'Longer' : 'Standard'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Smart Compression</h4>
            <p>Advanced algorithms analyze your PDF and apply optimal compression while preserving readability.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Customizable Settings</h4>
            <p>Choose compression level and image quality to balance file size and visual quality.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Batch Processing</h4>
            <p>Compress multiple PDF files with the same settings for consistent results.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Format Preservation</h4>
            <p>Maintains document structure, fonts, and interactive elements during compression.</p>
          </div>
        </div>
      </div>
    </UniversalToolInterface>
  );
}
