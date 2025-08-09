import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Globe, Zap, Shield } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "About Us - ToolSuite Pro | Our Mission & Team";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about ToolSuite Pro, our mission to provide the best online tools and converters, and meet our team of developers and designers.');
    }
  }, []);

  const stats = [
    { label: "Tools Available", value: "80+", icon: Target },
    { label: "Files Processed", value: "1M+", icon: Globe },
    { label: "Happy Users", value: "100K+", icon: Users },
    { label: "Years of Service", value: "3+", icon: Award },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized algorithms ensure your files are processed quickly without compromising quality."
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "All files are processed on secure servers and automatically deleted after conversion."
    },
    {
      icon: Globe,
      title: "Always Available",
      description: "Access our tools 24/7 from any device, anywhere in the world."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Visionary leader with 10+ years in tech startups",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      description: "Expert in scalable architecture and cloud computing",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      description: "UX specialist focused on user-centered design",
      avatar: "ER"
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      description: "Full-stack developer with expertise in modern web technologies",
      avatar: "DK"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">About ToolSuite Pro</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We're on a mission to make file processing simple, fast, and accessible to everyone. 
            Our comprehensive suite of online tools helps millions of users worldwide convert, 
            edit, and optimize their files with ease.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="glassmorphism text-center" data-testid={`stat-${stat.label.toLowerCase().replace(" ", "-")}`}>
                <CardContent className="pt-6">
                  <div className="bg-primary/20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="text-primary" size={28} />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-3 text-primary" size={28} />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  At ToolSuite Pro, we believe that powerful file processing tools shouldn't be 
                  complicated or expensive. Our mission is to democratize access to professional-grade 
                  conversion and editing tools through an intuitive web platform.
                </p>
                <p className="text-muted-foreground">
                  We're committed to continuous innovation, user privacy, and providing the best 
                  possible experience for our users around the globe.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-3 text-success" size={28} />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Privacy First</h4>
                    <p className="text-sm text-muted-foreground">
                      Your files and data are never stored or shared. Complete privacy guaranteed.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Quality & Speed</h4>
                    <p className="text-sm text-muted-foreground">
                      We use cutting-edge technology to deliver fast, high-quality results.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Accessibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Our tools work on any device, anywhere, without software installation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've built our platform from the ground up with user experience and security as our top priorities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="glassmorphism text-center" data-testid={`feature-${feature.title.toLowerCase().replace(" ", "-")}`}>
                  <CardContent className="pt-8">
                    <div className="bg-primary/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <IconComponent className="text-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate professionals dedicated to building the best file processing tools on the web.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="glassmorphism text-center" data-testid={`team-${member.name.toLowerCase().replace(" ", "-")}`}>
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-r from-primary to-accent text-white w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                    {member.avatar}
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <Badge className="bg-primary/20 text-primary mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Founded</h4>
                <p className="text-muted-foreground mb-6">2021 in San Francisco, CA</p>
                
                <h4 className="font-semibold mb-3">Headquarters</h4>
                <p className="text-muted-foreground mb-2">123 Tech Street</p>
                <p className="text-muted-foreground mb-2">San Francisco, CA 94105</p>
                <p className="text-muted-foreground mb-6">United States</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Technology Stack</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">AWS</Badge>
                </div>
                
                <h4 className="font-semibold mb-3">Certifications</h4>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">• SOC 2 Type II Compliant</p>
                  <p className="text-sm text-muted-foreground">• GDPR Compliant</p>
                  <p className="text-sm text-muted-foreground">• ISO 27001 Certified</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
