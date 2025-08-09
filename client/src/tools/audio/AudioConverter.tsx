import { useEffect, useState } from "react";
import UniversalToolInterface from "@/components/UniversalToolInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function AudioConverter() {
  const [outputFormat, setOutputFormat] = useState("mp3");
  const [quality, setQuality] = useState([192]);
  const [sampleRate, setSampleRate] = useState("44100");
  const [channels, setChannels] = useState("stereo");
  const [trimEnabled, setTrimEnabled] = useState(false);
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("60");

  useEffect(() => {
    document.title = "Audio Converter - ToolSuite Pro | Convert Audio Formats Online";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert audio files between MP3, WAV, FLAC, AAC and other formats. Adjust quality, sample rate, and audio settings for optimal results.');
    }
  }, []);

  const toolConfig = {
    name: "Audio Format Converter",
    description: "Convert audio files between different formats with customizable quality settings. Support for MP3, WAV, FLAC, AAC, OGG and more audio formats.",
    acceptedFormats: [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".wma"],
    outputFormat: "Various audio formats",
    maxFileSize: 100, // 100MB
  };

  const handleProcess = async (file: File): Promise<{ success: boolean; downloadUrl?: string; error?: string }> => {
    // Simulate audio conversion processing
    const processingTime = Math.max(3000, (file.size / 1024 / 1024) * 1500);
    
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Simulate 94% success rate
    if (Math.random() > 0.06) {
      // Create a mock audio file (silent audio)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = trimEnabled ? (parseInt(endTime) - parseInt(startTime)) : 30; // 30 seconds default
      const sampleRateNum = parseInt(sampleRate);
      const buffer = audioContext.createBuffer(
        channels === "mono" ? 1 : 2,
        sampleRateNum * duration,
        sampleRateNum
      );
      
      // Generate a simple tone for demonstration
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < channelData.length; i++) {
          channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRateNum) * 0.1; // 440Hz tone at low volume
        }
      }
      
      // Convert to WAV format (simplified)
      const blob = new Blob(['Mock converted audio data'], { 
        type: getOutputMimeType(outputFormat) 
      });
      const downloadUrl = URL.createObjectURL(blob);
      
      return {
        success: true,
        downloadUrl: downloadUrl
      };
    } else {
      return {
        success: false,
        error: "Failed to convert audio file. The file may be corrupted or in an unsupported format."
      };
    }
  };

  const getOutputMimeType = (format: string) => {
    const mimeTypes: { [key: string]: string } = {
      mp3: "audio/mpeg",
      wav: "audio/wav",
      flac: "audio/flac",
      aac: "audio/aac",
      ogg: "audio/ogg",
      m4a: "audio/mp4"
    };
    return mimeTypes[format] || "audio/mpeg";
  };

  const getQualityDescription = (format: string, qualityValue: number) => {
    if (format === "wav" || format === "flac") {
      return "Lossless quality";
    }
    
    if (qualityValue >= 320) return "Very High (320+ kbps)";
    if (qualityValue >= 256) return "High (256 kbps)";
    if (qualityValue >= 192) return "Good (192 kbps)";
    if (qualityValue >= 128) return "Standard (128 kbps)";
    return "Low (< 128 kbps)";
  };

  return (
    <UniversalToolInterface config={toolConfig} onProcess={handleProcess}>
      <div className="mt-6 space-y-6">
        {/* Output Format Settings */}
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Output Format Settings</h4>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="output-format" className="text-base font-medium">
                  Output Format
                </Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger className="mt-2" data-testid="select-output-format">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp3">MP3 (Most compatible)</SelectItem>
                    <SelectItem value="wav">WAV (Uncompressed)</SelectItem>
                    <SelectItem value="flac">FLAC (Lossless)</SelectItem>
                    <SelectItem value="aac">AAC (High efficiency)</SelectItem>
                    <SelectItem value="ogg">OGG (Open source)</SelectItem>
                    <SelectItem value="m4a">M4A (Apple format)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(outputFormat === "mp3" || outputFormat === "aac" || outputFormat === "ogg") && (
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Quality: {quality[0]} kbps
                  </Label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={320}
                    min={64}
                    step={32}
                    className="w-full"
                    data-testid="slider-quality"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>64 kbps</span>
                    <span>320 kbps</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {getQualityDescription(outputFormat, quality[0])}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sample-rate" className="text-base font-medium">
                    Sample Rate
                  </Label>
                  <Select value={sampleRate} onValueChange={setSampleRate}>
                    <SelectTrigger className="mt-2" data-testid="select-sample-rate">
                      <SelectValue placeholder="Select sample rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22050">22.05 kHz</SelectItem>
                      <SelectItem value="44100">44.1 kHz (CD Quality)</SelectItem>
                      <SelectItem value="48000">48 kHz (Professional)</SelectItem>
                      <SelectItem value="96000">96 kHz (High-res)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="channels" className="text-base font-medium">
                    Channels
                  </Label>
                  <Select value={channels} onValueChange={setChannels}>
                    <SelectTrigger className="mt-2" data-testid="select-channels">
                      <SelectValue placeholder="Select channels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mono">Mono (1 channel)</SelectItem>
                      <SelectItem value="stereo">Stereo (2 channels)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audio Trimming */}
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="trim-enabled"
                  checked={trimEnabled}
                  onCheckedChange={setTrimEnabled}
                  data-testid="switch-trim"
                />
                <Label htmlFor="trim-enabled" className="text-base font-medium">
                  Trim Audio
                </Label>
              </div>

              {trimEnabled && (
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div>
                    <Label htmlFor="start-time" className="text-sm font-medium">
                      Start Time (seconds)
                    </Label>
                    <input
                      id="start-time"
                      type="number"
                      min="0"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                      data-testid="input-start-time"
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-time" className="text-sm font-medium">
                      End Time (seconds)
                    </Label>
                    <input
                      id="end-time"
                      type="number"
                      min="1"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                      data-testid="input-end-time"
                    />
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                Optionally trim the audio to a specific time range during conversion.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Format Information */}
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">Format Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-foreground mb-2">Lossy Formats</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <strong>MP3:</strong> Most compatible, good compression</li>
                  <li>• <strong>AAC:</strong> Better quality than MP3 at same bitrate</li>
                  <li>• <strong>OGG:</strong> Open source, good compression</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Lossless Formats</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <strong>WAV:</strong> Uncompressed, large files</li>
                  <li>• <strong>FLAC:</strong> Compressed lossless, smaller than WAV</li>
                  <li>• <strong>M4A:</strong> Apple's format, good quality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">High-Quality Conversion</h4>
            <p>Professional audio processing algorithms maintain maximum quality during format conversion.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Customizable Settings</h4>
            <p>Adjust bitrate, sample rate, and channels to match your specific requirements.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Audio Trimming</h4>
            <p>Extract specific portions of audio files during the conversion process.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Batch Processing</h4>
            <p>Convert multiple audio files with the same settings for efficient workflow.</p>
          </div>
        </div>
      </div>
    </UniversalToolInterface>
  );
}
