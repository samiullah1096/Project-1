import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy - ToolSuite Pro";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ToolSuite Pro Privacy Policy. Learn how we collect, use, and protect your personal information when using our online tools and converters.');
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                use our tools, or contact us for support.
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• <strong>Personal Information:</strong> Name, email address, and account preferences</li>
                <li>• <strong>Usage Data:</strong> Information about how you use our tools and services</li>
                <li>• <strong>Device Information:</strong> Browser type, operating system, and IP address</li>
                <li>• <strong>File Data:</strong> Files you upload for processing (automatically deleted after use)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                We use the information we collect to provide, maintain, and improve our services.
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• Process your files using our online tools</li>
                <li>• Provide customer support and respond to your requests</li>
                <li>• Improve our services and develop new features</li>
                <li>• Send important updates about our services</li>
                <li>• Analyze usage patterns to enhance user experience</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>File Security and Deletion</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Your privacy and data security are our top priorities.
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• All uploaded files are processed on secure servers</li>
                <li>• Files are automatically deleted within 1 hour of processing</li>
                <li>• We use SSL encryption to protect data in transit</li>
                <li>• No files are stored permanently on our servers</li>
                <li>• We never share your files with third parties</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to improve your experience.
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• <strong>Essential Cookies:</strong> Required for basic site functionality</li>
                <li>• <strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
                <li>• <strong>Advertising Cookies:</strong> Used to show relevant ads (with your consent)</li>
                <li>• <strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-muted-foreground">
                You can control cookie preferences through your browser settings or our cookie consent banner.
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                We may use third-party services to provide better functionality.
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• <strong>Google Analytics:</strong> For website usage analytics</li>
                <li>• <strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                <li>• <strong>CDN Services:</strong> For faster content delivery</li>
                <li>• <strong>Payment Processors:</strong> For handling premium features (if applicable)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                You have several rights regarding your personal information.
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                <li>• <strong>Correction:</strong> Update or correct your information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
                <li>• <strong>Portability:</strong> Request transfer of your data</li>
                <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                We retain your information only as long as necessary to provide our services.
              </p>
              <ul className="text-muted-foreground space-y-2 mb-4">
                <li>• <strong>Uploaded Files:</strong> Deleted within 1 hour</li>
                <li>• <strong>Account Data:</strong> Retained until account deletion</li>
                <li>• <strong>Usage Logs:</strong> Retained for up to 2 years for analytics</li>
                <li>• <strong>Support Records:</strong> Retained for up to 3 years</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">
                Our services are not intended for children under 13. We do not knowingly collect 
                personal information from children under 13. If you become aware that a child has 
                provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li>• Email: privacy@toolsuitepro.com</li>
                <li>• Address: ToolSuite Pro, Privacy Team</li>
                <li>• Phone: +1 (555) 123-4567</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
