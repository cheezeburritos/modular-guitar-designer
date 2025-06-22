import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCustomization } from "@/hooks/use-customization";
import { Badge } from "@/components/ui/badge";

export default function GuitarPreview() {
  const { selectedComponents, totalPrice, progress } = useCustomization();

  return (
    <Card className="overflow-hidden">
      {/* Progress indicator */}
      <div className="bg-gray-100 px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Customization Progress</span>
          <span className="text-sm font-medium text-guitar-accent">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-4 text-center">Your Custom Guitar</h3>
        
        <img 
          src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
          alt="Custom electric guitar preview" 
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-4" 
        />

        {/* Current selection summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h4 className="font-semibold mb-3">Current Configuration</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Body:</span>
              <span className="font-medium text-guitar-accent">
                {selectedComponents.body?.name || "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Neck:</span>
              <span className="font-medium text-guitar-accent">
                {selectedComponents.neck?.name || "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pickups:</span>
              <span className="font-medium text-guitar-accent">
                {selectedComponents.pickups?.name || "Not selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hardware:</span>
              <span className="font-medium text-guitar-accent">
                {selectedComponents.hardware?.name || "Not selected"}
              </span>
            </div>
          </div>
        </div>

        {/* Price display */}
        <div className="bg-guitar-accent text-white rounded-xl p-4 text-center">
          <div className="text-sm opacity-90">Estimated Price</div>
          <div className="text-3xl font-bold">${totalPrice}</div>
          <div className="text-sm opacity-90">+ shipping & taxes</div>
        </div>
      </CardContent>
    </Card>
  );
}
