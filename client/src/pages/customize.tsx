import NavigationHeader from "@/components/navigation-header";
import GuitarPreview from "@/components/guitar-preview";
import ComponentSelector from "@/components/component-selector";
import OrderForm from "@/components/order-form";
import { useCustomization } from "@/hooks/use-customization";

export default function Customize() {
  const { customization, isLoading } = useCustomization();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-guitar-accent mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading Components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      
      <div className="px-4 py-6 space-y-6">
        <GuitarPreview />
        <ComponentSelector />
        <OrderForm />
      </div>
    </div>
  );
}
