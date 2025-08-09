import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PDFTools from "./pages/PDFTools";
import ImageTools from "./pages/ImageTools";
import AudioTools from "./pages/AudioTools";
import TextTools from "./pages/TextTools";
import ProductivityTools from "./pages/ProductivityTools";
import AdminPortal from "./pages/AdminPortal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "@/pages/not-found";

// Tool imports
import PDFToWord from "./tools/pdf/PDFToWord";
import MergePDF from "./tools/pdf/MergePDF";
import CompressPDF from "./tools/pdf/CompressPDF";
import ImageCompressor from "./tools/image/ImageCompressor";
import BackgroundRemover from "./tools/image/BackgroundRemover";
import ImageResizer from "./tools/image/ImageResizer";
import AudioConverter from "./tools/audio/AudioConverter";
import AudioCompressor from "./tools/audio/AudioCompressor";
import WordCounter from "./tools/text/WordCounter";
import GrammarChecker from "./tools/text/GrammarChecker";
import Calculator from "./tools/productivity/Calculator";
import QRGenerator from "./tools/productivity/QRGenerator";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/pdf-tools" component={PDFTools} />
        <Route path="/image-tools" component={ImageTools} />
        <Route path="/audio-tools" component={AudioTools} />
        <Route path="/text-tools" component={TextTools} />
        <Route path="/productivity-tools" component={ProductivityTools} />
        <Route path="/admin" component={AdminPortal} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        
        {/* PDF Tools */}
        <Route path="/tools/pdf-to-word" component={PDFToWord} />
        <Route path="/tools/merge-pdf" component={MergePDF} />
        <Route path="/tools/compress-pdf" component={CompressPDF} />
        
        {/* Image Tools */}
        <Route path="/tools/image-compressor" component={ImageCompressor} />
        <Route path="/tools/background-remover" component={BackgroundRemover} />
        <Route path="/tools/image-resizer" component={ImageResizer} />
        
        {/* Audio Tools */}
        <Route path="/tools/audio-converter" component={AudioConverter} />
        <Route path="/tools/audio-compressor" component={AudioCompressor} />
        
        {/* Text Tools */}
        <Route path="/tools/word-counter" component={WordCounter} />
        <Route path="/tools/grammar-checker" component={GrammarChecker} />
        
        {/* Productivity Tools */}
        <Route path="/tools/calculator" component={Calculator} />
        <Route path="/tools/qr-generator" component={QRGenerator} />
        
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
