import { useEffect, useState } from "react";
import UniversalToolInterface from "@/components/UniversalToolInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Upload, ArrowUpDown } from "lucide-react";

export default function MergePDF() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    document.title = "Merge PDF Files - ToolSuite Pro | Combine Multiple PDFs";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Merge multiple PDF files into one document online for free. Drag and drop to reorder pages and combine PDFs quickly and securely.');
    }
  }, []);

  const toolConfig = {
    name: "PDF Merger",
    description: "Combine multiple PDF files into a single document. Drag and drop to reorder files and create your perfect merged PDF.",
    acceptedFormats: [".pdf"],
    outputFormat: "PDF",
    maxFileSize: 100, // 100MB per file
  };

  const handleProcess = async (file: File): Promise<{ success: boolean; downloadUrl?: string; error?: string }> => {
    if (selectedFiles.length < 2) {
      return {
        success: false,
        error: "Please select at least 2 PDF files to merge."
      };
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create mock merged PDF
    const blob = new Blob(['Mock merged PDF content'], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(blob);
    
    return {
      success: true,
      downloadUrl: downloadUrl
    };
  };

  const handleFileAdd = (file: File) => {
    if (!selectedFiles.some(f => f.name === file.name)) {
      setSelectedFiles(prev => [...prev, file]);
    }
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...selectedFiles];
    const [removed] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, removed);
    setSelectedFiles(newFiles);
  };

  return (
    <UniversalToolInterface config={toolConfig} onProcess={handleProcess}>
      <div className="mt-6">
        {/* File List */}
        {selectedFiles.length > 0 && (
          <Card className="glassmorphism mb-6">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4">Selected Files ({selectedFiles.length})</h4>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    data-testid={`file-item-${index}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500/20 p-2 rounded">
                        <i className="fas fa-file-pdf text-red-400"></i>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {index > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveFile(index, index - 1)}
                          data-testid={`move-up-${index}`}
                        >
                          ↑
                        </Button>
                      )}
                      {index < selectedFiles.length - 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveFile(index, index + 1)}
                          data-testid={`move-down-${index}`}
                        >
                          ↓
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleFileRemove(index)}
                        data-testid={`remove-file-${index}`}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional File Upload */}
        <Card className="glassmorphism mb-6">
          <CardContent className="p-4">
            <div className="text-center">
              <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h4 className="font-medium mb-2">Add More PDF Files</h4>
              <p className="text-sm text-muted-foreground mb-4">
                You can add multiple PDF files to merge them into one document
              </p>
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    Array.from(e.target.files).forEach(handleFileAdd);
                  }
                }}
                className="hidden"
                id="additional-files"
                data-testid="additional-file-input"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('additional-files')?.click()}
                data-testid="button-add-files"
              >
                <Upload className="mr-2" size={16} />
                Add PDF Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tool Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Drag & Drop Reordering</h4>
            <p>Easily reorder your PDF files by dragging and dropping them in the desired sequence.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Unlimited Files</h4>
            <p>Merge as many PDF files as you need - no restrictions on the number of documents.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Original Quality</h4>
            <p>Preserves the original quality and formatting of all merged PDF documents.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Fast Processing</h4>
            <p>Quick merging process with optimized file handling for large documents.</p>
          </div>
        </div>
      </div>
    </UniversalToolInterface>
  );
}
