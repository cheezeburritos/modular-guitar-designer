import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getOrCreateSessionId, calculateProgress, calculateTotalPrice } from "@/lib/guitar-data";
import type { GuitarComponent, Customization } from "@shared/schema";

interface SelectedComponents {
  body?: GuitarComponent;
  neck?: GuitarComponent;
  pickups?: GuitarComponent;
  hardware?: GuitarComponent;
}

export function useCustomization() {
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({});
  const sessionId = getOrCreateSessionId();
  const queryClient = useQueryClient();

  // Get all components to initialize defaults
  const { data: allComponents } = useQuery({
    queryKey: ['/api/components'],
  });

  // Get existing customization
  const { data: customization, isLoading } = useQuery({
    queryKey: [`/api/customizations/${sessionId}`],
    retry: false,
  });

  // Initialize default components on first load
  useEffect(() => {
    if (allComponents && Object.keys(selectedComponents).length === 0) {
      const defaults: SelectedComponents = {};
      
      ['body', 'neck', 'pickups', 'hardware'].forEach(category => {
        const defaultComponent = allComponents.find(
          (c: GuitarComponent) => c.category === category && c.isDefault
        );
        if (defaultComponent) {
          defaults[category as keyof SelectedComponents] = defaultComponent;
        }
      });
      
      setSelectedComponents(defaults);
    }
  }, [allComponents]);

  // Load existing customization
  useEffect(() => {
    if (customization && allComponents) {
      const loadedComponents: SelectedComponents = {};
      
      if (customization.bodyId) {
        loadedComponents.body = allComponents.find((c: GuitarComponent) => c.id === customization.bodyId);
      }
      if (customization.neckId) {
        loadedComponents.neck = allComponents.find((c: GuitarComponent) => c.id === customization.neckId);
      }
      if (customization.pickupsId) {
        loadedComponents.pickups = allComponents.find((c: GuitarComponent) => c.id === customization.pickupsId);
      }
      if (customization.hardwareId) {
        loadedComponents.hardware = allComponents.find((c: GuitarComponent) => c.id === customization.hardwareId);
      }
      
      setSelectedComponents(loadedComponents);
    }
  }, [customization, allComponents]);

  // Save customization mutation
  const saveCustomizationMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/customizations", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/customizations/${sessionId}`] });
    },
  });

  const selectComponent = (category: string, component: GuitarComponent) => {
    const newComponents = {
      ...selectedComponents,
      [category]: component,
    };
    
    setSelectedComponents(newComponents);
    
    // Save to backend
    const totalPrice = calculateTotalPrice(newComponents);
    saveCustomizationMutation.mutate({
      sessionId,
      bodyId: newComponents.body?.id || null,
      neckId: newComponents.neck?.id || null,
      pickupsId: newComponents.pickups?.id || null,
      hardwareId: newComponents.hardware?.id || null,
      totalPrice,
    });
  };

  const progress = calculateProgress(selectedComponents);
  const totalPrice = calculateTotalPrice(selectedComponents);

  return {
    selectedComponents,
    selectComponent,
    customization,
    isLoading,
    progress,
    totalPrice,
  };
}
