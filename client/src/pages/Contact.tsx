import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us - ToolSuite Pro | Support & Feedback";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with ToolSuite Pro support team. Contact us for technical support, feature requests, or general inquiries about our online tools.');
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully",
      description: "Thank you for your message. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: ""
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question, suggestion, or need help? We're here to assist you. 
            Get in touch with our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glassmorphism">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-3 rounded-lg mr-4">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>
                <p className="text-muted-foreground">support@toolsuitepro.com</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-success/20 p-3 rounded-lg mr-4">
                    <Phone className="text-success" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-accent/20 p-3 rounded-lg mr-4">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office Address</h3>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  123 Tech Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-secondary/20 p-3 rounded-lg mr-4">
                    <Clock className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-sm text-muted-foreground">Eastern Time Zone</p>
                  </div>
                </div>
                <div className="text-muted-foreground space-y-1 text-sm">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger data-testid="select-contact-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="business">Business Inquiry</SelectItem>
                          <SelectItem value="feedback">General Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject of your message"
                        required
                        data-testid="input-contact-subject"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your question or feedback in detail..."
                      className="min-h-[120px]"
                      required
                      data-testid="textarea-contact-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gradient-bg"
                    disabled={isSubmitting}
                    data-testid="button-send-message"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2" size={16} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">How long does file processing take?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Most files are processed within seconds to minutes, depending on file size 
                    and complexity. Large files may take longer.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Are my files safe and secure?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Yes, all files are processed on secure servers and automatically deleted 
                    within 1 hour. We never store or share your files.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Is there a file size limit?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    File size limits vary by tool but are generally up to 100MB. Premium users 
                    may have higher limits.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Do you offer customer support?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Yes, we provide email and phone support during business hours. 
                    Premium users get priority support.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
