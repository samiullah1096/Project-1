interface AdSlotProps {
  id: string;
  position: string;
  size: "banner" | "square" | "rectangle" | "skyscraper";
  className?: string;
}

const adSizes = {
  banner: { width: "728px", height: "90px", label: "728x90 Banner" },
  square: { width: "300px", height: "250px", label: "300x250 Square" },
  rectangle: { width: "300px", height: "600px", label: "300x600 Rectangle" },
  skyscraper: { width: "160px", height: "600px", label: "160x600 Skyscraper" },
};

export default function AdSlot({ id, position, size, className = "" }: AdSlotProps) {
  const adSize = adSizes[size];

  return (
    <div className={`max-w-7xl mx-auto px-4 mb-8 ${className}`} data-testid={`ad-slot-${id}`}>
      <div className="glassmorphism rounded-lg p-6 text-center border-dashed border-2 border-border">
        <div className="text-muted-foreground mb-2 text-sm">Advertisement</div>
        <div 
          className="bg-muted/30 rounded flex items-center justify-center mx-auto"
          style={{ 
            width: adSize.width, 
            height: adSize.height,
            maxWidth: "100%"
          }}
        >
          <span className="text-muted-foreground text-sm">{adSize.label} Ad Slot</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2">Position: {position}</div>
      </div>
    </div>
  );
}
