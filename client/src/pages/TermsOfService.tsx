import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service - ToolSuite Pro";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ToolSuite Pro Terms of Service. Read our terms and conditions for using our online tools, converters, and services.');
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">
                By accessing and using ToolSuite Pro ("the Service"), you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                ToolSuite Pro provides online tools and converters for various file types and formats, including:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• PDF tools and converters</li>
                <li>• Image editing and conversion tools</li>
                <li>• Audio processing and conversion tools</li>
                <li>• Text analysis and formatting tools</li>
                <li>• Productivity and business tools</li>
              </ul>
              <p className="text-muted-foreground">
                All services are provided "as is" and are subject to change or discontinuation without notice.
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                As a user of our service, you agree to:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Use the service only for lawful purposes</li>
                <li>• Not upload copyrighted material without permission</li>
                <li>• Not attempt to harm or compromise our systems</li>
                <li>• Not use automated systems to access our service excessively</li>
                <li>• Respect the intellectual property rights of others</li>
                <li>• Not upload malicious files or content</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Content and Files</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Regarding files and content you upload to our service:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• You retain full ownership of your files and content</li>
                <li>• Files are automatically deleted within 1 hour of processing</li>
                <li>• You are responsible for ensuring you have rights to upload content</li>
                <li>• We do not claim any ownership over your uploaded files</li>
                <li>• You grant us temporary rights to process your files for conversion</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                You may not use our service for:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Illegal activities or content</li>
                <li>• Uploading malware, viruses, or harmful code</li>
                <li>• Copyright infringement or piracy</li>
                <li>• Harassment, abuse, or threatening behavior</li>
                <li>• Spamming or excessive automated requests</li>
                <li>• Attempting to breach our security measures</li>
                <li>• Commercial use without permission</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                While we strive to provide reliable service:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• We do not guarantee 100% uptime or availability</li>
                <li>• Services may be temporarily unavailable for maintenance</li>
                <li>• We may modify or discontinue features without notice</li>
                <li>• Processing times may vary based on file size and server load</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Our service is provided "AS IS" without warranties of any kind:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• We make no warranties about service reliability or accuracy</li>
                <li>• Results may vary and are not guaranteed to meet your needs</li>
                <li>• We are not responsible for data loss or corruption</li>
                <li>• You use the service at your own risk</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• We shall not be liable for any indirect, incidental, or consequential damages</li>
                <li>• Our total liability shall not exceed the amount paid for the service</li>
                <li>• We are not responsible for third-party content or services</li>
                <li>• Users are responsible for backing up important files</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Please review our Privacy Policy for detailed information</li>
                <li>• We comply with applicable data protection laws</li>
                <li>• Files are processed securely and deleted automatically</li>
                <li>• We do not sell or share your personal data</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                All intellectual property rights in the service belong to us or our licensors:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• The ToolSuite Pro name and logo are our trademarks</li>
                <li>• Software code and algorithms are proprietary</li>
                <li>• You may not copy, modify, or distribute our technology</li>
                <li>• Third-party tools and libraries remain property of their respective owners</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Either party may terminate this agreement:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• You may stop using our service at any time</li>
                <li>• We may suspend or terminate accounts for violations</li>
                <li>• Termination does not affect previously processed files</li>
                <li>• Some provisions survive termination (e.g., liability limitations)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">
                We may update these Terms of Service from time to time. When we do, we will post 
                the updated terms on this page and update the "Last updated" date. Continued use 
                of the service after changes constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">
                These terms are governed by the laws of [Jurisdiction]. Any disputes shall be 
                resolved in the courts of [Jurisdiction]. If any provision is found unenforceable, 
                the remaining terms shall continue in effect.
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li>• Email: legal@toolsuitepro.com</li>
                <li>• Address: ToolSuite Pro, Legal Department</li>
                <li>• Phone: +1 (555) 123-4567</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
