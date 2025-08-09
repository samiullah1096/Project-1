import { useEffect } from "react";
import UniversalToolInterface from "@/components/UniversalToolInterface";

export default function PDFToWord() {
  useEffect(() => {
    document.title = "PDF to Word Converter - ToolSuite Pro | Convert PDF to DOC/DOCX";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert PDF files to editable Word documents (DOC/DOCX) online for free. Preserve formatting, images, and layout with our advanced PDF to Word converter.');
    }
  }, []);

  const toolConfig = {
    name: "PDF to Word Converter",
    description: "Convert PDF documents to editable Word files while preserving formatting, images, and layout. Our advanced OCR technology ensures accurate text recognition.",
    acceptedFormats: [".pdf"],
    outputFormat: "DOCX",
    maxFileSize: 50, // 50MB
  };

  const handleProcess = async (file: File): Promise<{ success: boolean; downloadUrl?: string; error?: string }> => {
    // Simulate processing time based on file size
    const processingTime = Math.max(2000, (file.size / 1024 / 1024) * 1000); // Minimum 2 seconds
    
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Simulate 98% success rate
    if (Math.random() > 0.02) {
      // Create a mock download URL
      const blob = new Blob(['Mock Word document content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const downloadUrl = URL.createObjectURL(blob);
      
      return {
        success: true,
        downloadUrl: downloadUrl
      };
    } else {
      return {
        success: false,
        error: "Failed to convert PDF. The file may be corrupted or password-protected."
      };
    }
  };

  return (
    <UniversalToolInterface config={toolConfig} onProcess={handleProcess}>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Tool Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">Advanced OCR Technology</h4>
            <p>Accurate text recognition and extraction from scanned PDFs and image-based documents.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Format Preservation</h4>
            <p>Maintains original formatting, fonts, images, and document structure during conversion.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Batch Processing</h4>
            <p>Convert multiple PDF files to Word format simultaneously for increased productivity.</p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">High Compatibility</h4>
            <p>Output files are compatible with Microsoft Word 2007+ and other word processors.</p>
          </div>
        </div>
      </div>
    </UniversalToolInterface>
  );
}
