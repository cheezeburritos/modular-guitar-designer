export const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('guitar-session-id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('guitar-session-id', sessionId);
  }
  return sessionId;
};

export const calculateProgress = (selectedComponents: any) => {
  const totalComponents = 4; // body, neck, pickups, hardware
  const selectedCount = Object.values(selectedComponents).filter(Boolean).length;
  return Math.round((selectedCount / totalComponents) * 100);
};

export const calculateTotalPrice = (selectedComponents: any) => {
  const basePrice = 899;
  let totalUpgrades = 0;

  Object.values(selectedComponents).forEach((component: any) => {
    if (component?.price) {
      totalUpgrades += parseFloat(component.price);
    }
  });

  return (basePrice + totalUpgrades).toFixed(0);
};
