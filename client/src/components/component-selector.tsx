import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useCustomization } from "@/hooks/use-customization";
import { cn } from "@/lib/utils";
import type { GuitarComponent } from "@shared/schema";

export default function ComponentSelector() {
  const [selectedCategory, setSelectedCategory] = useState("body");
  const { selectedComponents, selectComponent } = useCustomization();

  const { data: components, isLoading } = useQuery({
    queryKey: [`/api/components/${selectedCategory}`],
  });

  const categories = [
    { id: "body", label: "Body" },
    { id: "neck", label: "Neck" },
    { id: "pickups", label: "Pickups" },
    { id: "hardware", label: "Hardware" },
  ];

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-guitar-accent mx-auto mb-4"></div>
        <p>Loading components...</p>
      </div>
    );
  }

  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">Customize Components</h3>
      
      {/* Component categories tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto custom-scroll">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={cn(
              "whitespace-nowrap font-medium",
              selectedCategory === category.id
                ? "bg-guitar-accent hover:bg-red-600 text-white shadow-lg"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Component grid */}
      <div className="grid grid-cols-2 gap-4">
        {components?.map((component: GuitarComponent) => {
          const isSelected = selectedComponents[selectedCategory as keyof typeof selectedComponents]?.id === component.id;
          
          return (
            <Card
              key={component.id}
              className={cn(
                "overflow-hidden border-2 transition-all duration-300 cursor-pointer",
                isSelected 
                  ? "border-guitar-accent shadow-lg" 
                  : "border-transparent hover:border-guitar-accent"
              )}
              onClick={() => selectComponent(selectedCategory, component)}
            >
              <img 
                src={component.imageUrl} 
                alt={component.name}
                className="w-full h-32 object-cover" 
              />
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm mb-1">{component.name}</h4>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{component.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-guitar-accent font-bold text-sm">
                    +${component.price}
                  </Badge>
                  <Check 
                    className={cn(
                      "w-5 h-5 transition-opacity",
                      isSelected 
                        ? "text-guitar-accent opacity-100" 
                        : "text-gray-300 opacity-0"
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
