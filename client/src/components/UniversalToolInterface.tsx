import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Download, RefreshCw, CheckCircle, AlertCircle, X } from "lucide-react";
import AdSlot from "./AdSlot";

interface ToolConfig {
  name: string;
  description: string;
  acceptedFormats: string[];
  outputFormat?: string;
  maxFileSize?: number; // in MB
}

interface UniversalToolInterfaceProps {
  config: ToolConfig;
  onProcess: (file: File) => Promise<{ success: boolean; downloadUrl?: string; error?: string }>;
  children?: React.ReactNode;
}

export default function UniversalToolInterface({ config, onProcess, children }: UniversalToolInterfaceProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ success: boolean; downloadUrl?: string; error?: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    // Validate file type
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (fileExtension && !config.acceptedFormats.includes(`.${fileExtension}`)) {
      setResult({
        success: false,
        error: `Unsupported file format. Accepted formats: ${config.acceptedFormats.join(', ')}`
      });
      return;
    }

    // Validate file size
    if (config.maxFileSize && selectedFile.size > config.maxFileSize * 1024 * 1024) {
      setResult({
        success: false,
        error: `File size exceeds ${config.maxFileSize}MB limit`
      });
      return;
    }

    setFile(selectedFile);
    setResult(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setResult(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    try {
      const result = await onProcess(file);
      setProgress(100);
      setTimeout(() => {
        setResult(result);
        setIsProcessing(false);
      }, 500);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Processing failed'
      });
      setIsProcessing(false);
    } finally {
      clearInterval(progressInterval);
    }
  };

  const resetTool = () => {
    setFile(null);
    setResult(null);
    setProgress(0);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Tool Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-sans font-bold mb-4">{config.name}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{config.description}</p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="tool-top" position="tool-top" size="banner" className="mb-8" />

      {/* Tool Interface */}
      <Card className="glassmorphism mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>File Processing</span>
            {file && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetTool}
                disabled={isProcessing}
                data-testid="button-reset"
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          {!file && (
            <div
              className={`upload-area ${isDragOver ? 'dragover' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              data-testid="upload-area"
            >
              <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Drop your file here or click to browse</h3>
              <p className="text-muted-foreground mb-4">
                Supported formats: {config.acceptedFormats.join(', ')}
              </p>
              {config.maxFileSize && (
                <p className="text-sm text-muted-foreground">
                  Maximum file size: {config.maxFileSize}MB
                </p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={config.acceptedFormats.join(',')}
                onChange={handleFileInputChange}
                data-testid="file-input"
              />
            </div>
          )}

          {/* Selected File Display */}
          {file && !isProcessing && !result && (
            <div className="glassmorphism rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/20 p-2 rounded">
                    <Upload size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium" data-testid="file-name">{file.name}</p>
                    <p className="text-sm text-muted-foreground" data-testid="file-size">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={processFile}
                  className="gradient-bg"
                  data-testid="button-process"
                >
                  Process File
                </Button>
              </div>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="glassmorphism rounded-lg p-6 text-center">
              <div className="spinner w-12 h-12 mx-auto mb-4" data-testid="processing-spinner"></div>
              <h3 className="text-lg font-medium mb-2">Processing your file...</h3>
              <p className="text-muted-foreground mb-4">Please wait while we process your file</p>
              <Progress value={progress} className="w-full max-w-md mx-auto" data-testid="progress-bar" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="space-y-4">
              {result.success ? (
                <Alert className="border-success/20 bg-success/10" data-testid="success-alert">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    File processed successfully! Your download is ready.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive" data-testid="error-alert">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {result.error || 'Processing failed. Please try again.'}
                  </AlertDescription>
                </Alert>
              )}

              {result.success && result.downloadUrl && (
                <div className="glassmorphism rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-success/20 p-2 rounded">
                        <Download size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="font-medium">Download Ready</p>
                        <p className="text-sm text-muted-foreground">
                          {config.outputFormat ? `Format: ${config.outputFormat}` : 'Processed file'}
                        </p>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="gradient-bg"
                      data-testid="button-download"
                    >
                      <a href={result.downloadUrl} download>
                        <Download size={16} className="mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Custom Children Content */}
          {children}
        </CardContent>
      </Card>

      {/* Ad Slot 2 */}
      <AdSlot id="tool-bottom" position="tool-bottom" size="banner" />

      {/* Tool Information */}
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Tool Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Supported Formats</h4>
              <div className="flex flex-wrap gap-1">
                {config.acceptedFormats.map((format, index) => (
                  <span
                    key={index}
                    className="bg-primary/20 text-primary text-xs px-2 py-1 rounded"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
            
            {config.maxFileSize && (
              <div>
                <h4 className="font-medium mb-2">File Size Limit</h4>
                <p className="text-muted-foreground text-sm">{config.maxFileSize}MB maximum</p>
              </div>
            )}
            
            <div>
              <h4 className="font-medium mb-2">Security</h4>
              <p className="text-muted-foreground text-sm">
                Files are automatically deleted after processing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
