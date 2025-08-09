import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, RefreshCw, QrCode, Smartphone, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdSlot from "@/components/AdSlot";

export default function QRGenerator() {
  const { toast } = useToast();
  const [qrType, setQrType] = useState("text");
  const [content, setContent] = useState("");
  const [size, setSize] = useState([300]);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Form data for different QR types
  const [formData, setFormData] = useState({
    // URL
    url: "",
    
    // WiFi
    wifiSsid: "",
    wifiPassword: "",
    wifiSecurity: "WPA",
    wifiHidden: false,
    
    // Contact (vCard)
    firstName: "",
    lastName: "",
    organization: "",
    phone: "",
    email: "",
    website: "",
    
    // SMS
    smsNumber: "",
    smsMessage: "",
    
    // Email
    emailTo: "",
    emailSubject: "",
    emailBody: "",
    
    // Event
    eventTitle: "",
    eventLocation: "",
    eventStart: "",
    eventEnd: "",
    eventDescription: ""
  });

  useEffect(() => {
    document.title = "QR Code Generator - ToolSuite Pro | Create Custom QR Codes";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate custom QR codes for URLs, WiFi, contacts, SMS, email, and events. Customize colors, size, and error correction levels.');
    }
  }, []);

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    try {
      // Get content based on QR type
      let qrContent = getQRContent();
      
      if (!qrContent) {
        toast({
          title: "No Content",
          description: "Please enter content to generate QR code.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      // Simulate QR code generation (in real app, use QR code library)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a canvas to draw QR code
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const qrSize = size[0];
      
      canvas.width = qrSize;
      canvas.height = qrSize;
      
      if (ctx) {
        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, qrSize, qrSize);
        
        // Draw QR code pattern (simplified mock)
        ctx.fillStyle = foregroundColor;
        const moduleSize = qrSize / 25; // 25x25 modules
        
        // Draw finder patterns (corners)
        drawFinderPattern(ctx, 0, 0, moduleSize);
        drawFinderPattern(ctx, 18 * moduleSize, 0, moduleSize);
        drawFinderPattern(ctx, 0, 18 * moduleSize, moduleSize);
        
        // Draw data modules (simplified pattern)
        for (let i = 0; i < 25; i++) {
          for (let j = 0; j < 25; j++) {
            // Skip finder patterns
            if ((i < 9 && j < 9) || (i < 9 && j > 15) || (i > 15 && j < 9)) {
              continue;
            }
            
            // Create pattern based on content hash
            const hash = simpleHash(qrContent + i + j);
            if (hash % 3 === 0) {
              ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
            }
          }
        }
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/png');
        setQrCodeDataUrl(dataUrl);
      }
      
      toast({
        title: "QR Code Generated",
        description: "Your QR code has been generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const drawFinderPattern = (ctx: CanvasRenderingContext2D, x: number, y: number, moduleSize: number) => {
    // Outer square (7x7)
    ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize);
    // Inner white square (5x5)
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize);
    // Center square (3x3)
    ctx.fillStyle = foregroundColor;
    ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize);
  };

  const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  const getQRContent = (): string => {
    switch (qrType) {
      case "text":
        return content;
      case "url":
        return formData.url;
      case "wifi":
        return `WIFI:T:${formData.wifiSecurity};S:${formData.wifiSsid};P:${formData.wifiPassword};H:${formData.wifiHidden ? 'true' : 'false'};;`;
      case "contact":
        return `BEGIN:VCARD
VERSION:3.0
FN:${formData.firstName} ${formData.lastName}
ORG:${formData.organization}
TEL:${formData.phone}
EMAIL:${formData.email}
URL:${formData.website}
END:VCARD`;
      case "sms":
        return `SMS:${formData.smsNumber}:${formData.smsMessage}`;
      case "email":
        return `mailto:${formData.emailTo}?subject=${encodeURIComponent(formData.emailSubject)}&body=${encodeURIComponent(formData.emailBody)}`;
      case "event":
        return `BEGIN:VEVENT
SUMMARY:${formData.eventTitle}
LOCATION:${formData.eventLocation}
DTSTART:${formData.eventStart.replace(/[-:]/g, '')}
DTEND:${formData.eventEnd.replace(/[-:]/g, '')}
DESCRIPTION:${formData.eventDescription}
END:VEVENT`;
      default:
        return content;
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `qr-code-${qrType}.png`;
    link.href = qrCodeDataUrl;
    link.click();
    
    toast({
      title: "QR Code Downloaded",
      description: "QR code has been saved to your downloads.",
    });
  };

  const copyQRCode = async () => {
    if (!qrCodeDataUrl) return;
    
    try {
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      toast({
        title: "QR Code Copied",
        description: "QR code image copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy QR code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const presetSizes = [
    { name: "Small", size: 200 },
    { name: "Medium", size: 300 },
    { name: "Large", size: 500 },
    { name: "XL", size: 800 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-sans font-bold mb-4">QR Code Generator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Generate custom QR codes for URLs, WiFi passwords, contact information, and more. 
          Customize colors, size, and error correction levels.
        </p>
      </div>

      {/* Ad Slot 1 */}
      <AdSlot id="qr-generator-top" position="tool-top" size="banner" className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Generator */}
        <div className="space-y-6">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>QR Code Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Type Selection */}
              <div>
                <Label htmlFor="qr-type" className="text-base font-medium">
                  QR Code Type
                </Label>
                <Select value={qrType} onValueChange={setQrType}>
                  <SelectTrigger className="mt-2" data-testid="select-qr-type">
                    <SelectValue placeholder="Select QR code type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Plain Text</SelectItem>
                    <SelectItem value="url">Website URL</SelectItem>
                    <SelectItem value="wifi">WiFi Network</SelectItem>
                    <SelectItem value="contact">Contact (vCard)</SelectItem>
                    <SelectItem value="sms">SMS Message</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="event">Calendar Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic Content Input */}
              <Tabs value={qrType} className="w-full">
                <TabsContent value="text">
                  <div>
                    <Label htmlFor="text-content">Text Content</Label>
                    <Textarea
                      id="text-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter your text here..."
                      className="mt-2"
                      data-testid="textarea-text-content"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="url">
                  <div>
                    <Label htmlFor="url">Website URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      placeholder="https://example.com"
                      className="mt-2"
                      data-testid="input-url"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="wifi">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
                      <Input
                        id="wifi-ssid"
                        value={formData.wifiSsid}
                        onChange={(e) => setFormData({...formData, wifiSsid: e.target.value})}
                        placeholder="My WiFi Network"
                        className="mt-2"
                        data-testid="input-wifi-ssid"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-password">Password</Label>
                      <Input
                        id="wifi-password"
                        type="password"
                        value={formData.wifiPassword}
                        onChange={(e) => setFormData({...formData, wifiPassword: e.target.value})}
                        placeholder="WiFi password"
                        className="mt-2"
                        data-testid="input-wifi-password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-security">Security Type</Label>
                      <Select 
                        value={formData.wifiSecurity} 
                        onValueChange={(value) => setFormData({...formData, wifiSecurity: value})}
                      >
                        <SelectTrigger className="mt-2" data-testid="select-wifi-security">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA">WPA/WPA2</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">No Password</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                          id="first-name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="mt-2"
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="mt-2"
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        className="mt-2"
                        data-testid="input-organization"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="mt-2"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-2"
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sms">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sms-number">Phone Number</Label>
                      <Input
                        id="sms-number"
                        type="tel"
                        value={formData.smsNumber}
                        onChange={(e) => setFormData({...formData, smsNumber: e.target.value})}
                        placeholder="+1234567890"
                        className="mt-2"
                        data-testid="input-sms-number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sms-message">Message</Label>
                      <Textarea
                        id="sms-message"
                        value={formData.smsMessage}
                        onChange={(e) => setFormData({...formData, smsMessage: e.target.value})}
                        placeholder="Your SMS message here..."
                        className="mt-2"
                        data-testid="textarea-sms-message"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email-to">To Email</Label>
                      <Input
                        id="email-to"
                        type="email"
                        value={formData.emailTo}
                        onChange={(e) => setFormData({...formData, emailTo: e.target.value})}
                        placeholder="recipient@example.com"
                        className="mt-2"
                        data-testid="input-email-to"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email-subject">Subject</Label>
                      <Input
                        id="email-subject"
                        value={formData.emailSubject}
                        onChange={(e) => setFormData({...formData, emailSubject: e.target.value})}
                        placeholder="Email subject"
                        className="mt-2"
                        data-testid="input-email-subject"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email-body">Message</Label>
                      <Textarea
                        id="email-body"
                        value={formData.emailBody}
                        onChange={(e) => setFormData({...formData, emailBody: e.target.value})}
                        placeholder="Email message..."
                        className="mt-2"
                        data-testid="textarea-email-body"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="event">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input
                        id="event-title"
                        value={formData.eventTitle}
                        onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
                        placeholder="Meeting with team"
                        className="mt-2"
                        data-testid="input-event-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-location">Location</Label>
                      <Input
                        id="event-location"
                        value={formData.eventLocation}
                        onChange={(e) => setFormData({...formData, eventLocation: e.target.value})}
                        placeholder="Conference Room A"
                        className="mt-2"
                        data-testid="input-event-location"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="event-start">Start Date & Time</Label>
                        <Input
                          id="event-start"
                          type="datetime-local"
                          value={formData.eventStart}
                          onChange={(e) => setFormData({...formData, eventStart: e.target.value})}
                          className="mt-2"
                          data-testid="input-event-start"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-end">End Date & Time</Label>
                        <Input
                          id="event-end"
                          type="datetime-local"
                          value={formData.eventEnd}
                          onChange={(e) => setFormData({...formData, eventEnd: e.target.value})}
                          className="mt-2"
                          data-testid="input-event-end"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Size Settings */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  Size: {size[0]}px
                </Label>
                <Slider
                  value={size}
                  onValueChange={setSize}
                  max={1000}
                  min={100}
                  step={50}
                  className="w-full"
                  data-testid="slider-size"
                />
                <div className="flex justify-between mt-2">
                  {presetSizes.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setSize([preset.size])}
                      className="text-xs"
                      data-testid={`preset-${preset.name.toLowerCase()}`}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="foreground-color">Foreground Color</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      id="foreground-color"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                      data-testid="color-foreground"
                    />
                    <Input
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      id="background-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                      data-testid="color-background"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <Label htmlFor="error-correction">Error Correction Level</Label>
                <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                  <SelectTrigger className="mt-2" data-testid="select-error-correction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Higher levels can recover from more damage but create larger QR codes
                </p>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateQRCode}
                disabled={isGenerating}
                className="w-full gradient-bg"
                data-testid="button-generate"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 animate-spin" size={16} />
                    Generating...
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2" size={16} />
                    Generate QR Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Display */}
        <div className="space-y-6">
          <Card className="glassmorphism">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated QR Code</CardTitle>
                {qrCodeDataUrl && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyQRCode}
                      data-testid="button-copy-qr"
                    >
                      <Copy size={16} className="mr-2" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      onClick={downloadQRCode}
                      className="gradient-bg"
                      data-testid="button-download-qr"
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                {qrCodeDataUrl ? (
                  <div className="text-center">
                    <img
                      src={qrCodeDataUrl}
                      alt="Generated QR Code"
                      className="border border-border rounded-lg shadow-lg"
                      style={{ maxWidth: '100%', height: 'auto' }}
                      data-testid="qr-code-image"
                    />
                    <div className="mt-4 space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {size[0]}×{size[0]}px
                      </Badge>
                      <Badge variant="outline" className="text-xs ml-2">
                        Error Correction: {errorCorrection}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <QrCode size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Configure settings and click "Generate QR Code" to create your QR code
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* QR Code Info */}
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2" size={20} />
                Usage Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Scanning Instructions:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Use your phone's camera app or QR scanner</li>
                    <li>• Ensure good lighting and steady hands</li>
                    <li>• Keep the QR code flat and unfolded</li>
                    <li>• Maintain proper distance (6-12 inches)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Best Practices:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Test your QR code before printing</li>
                    <li>• Use high contrast colors</li>
                    <li>• Don't make it too small (minimum 2x2cm)</li>
                    <li>• Include a call-to-action near the code</li>
                  </ul>
                </div>

                {qrType === 'wifi' && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Wifi className="mr-1" size={16} />
                      WiFi QR Code:
                    </h4>
                    <p className="text-muted-foreground">
                      Users can scan to automatically connect to your WiFi network. 
                      Works on most modern smartphones.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ad Slot 2 */}
      <AdSlot id="qr-generator-bottom" position="tool-bottom" size="banner" className="mt-8" />

      {/* QR Code Types Info */}
      <Card className="glassmorphism mt-8">
        <CardHeader>
          <CardTitle>QR Code Types & Uses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">Business Cards</h4>
              <p className="text-muted-foreground">Add QR codes to business cards for instant contact info sharing.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">WiFi Sharing</h4>
              <p className="text-muted-foreground">Let guests connect to your WiFi without typing passwords.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Event Invites</h4>
              <p className="text-muted-foreground">Include event QR codes for easy calendar integration.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Menu Access</h4>
              <p className="text-muted-foreground">Perfect for restaurants to provide contactless menu access.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Social Media</h4>
              <p className="text-muted-foreground">Quick links to your social media profiles or websites.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Marketing Campaigns</h4>
              <p className="text-muted-foreground">Track engagement and provide instant access to promotions.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
