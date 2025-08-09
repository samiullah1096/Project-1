import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Smartphone, Infinity } from "lucide-react";

const features = [
  {
    title: "100% Secure",
    description: "Your files are processed securely and automatically deleted after conversion.",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    title: "Lightning Fast",
    description: "Advanced processing algorithms ensure quick conversion without quality loss.",
    icon: Zap,
    color: "text-success",
    bgColor: "bg-success/20",
  },
  {
    title: "Mobile Friendly",
    description: "All tools work perfectly on any device - desktop, tablet, or mobile.",
    icon: Smartphone,
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
  {
    title: "Unlimited Usage",
    description: "No file size limits, no daily restrictions. Use as much as you need.",
    icon: Infinity,
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
];

export default function Features() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">Why Choose ToolSuite Pro?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional-grade tools with enterprise security and blazing-fast performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <Card key={index} className="feature-card" data-testid={`feature-${feature.title.toLowerCase().replace(" ", "-")}`}>
                <CardContent className="p-6 text-center">
                  <div className={`${feature.bgColor} p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                    <IconComponent className={`${feature.color} text-2xl`} size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
