import { guitarComponents, customizations, orders, type GuitarComponent, type InsertGuitarComponent, type Customization, type InsertCustomization, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  // Guitar Components
  getGuitarComponents(): Promise<GuitarComponent[]>;
  getGuitarComponentsByCategory(category: string): Promise<GuitarComponent[]>;
  getGuitarComponent(id: number): Promise<GuitarComponent | undefined>;
  
  // Customizations
  createCustomization(customization: InsertCustomization): Promise<Customization>;
  getCustomization(id: number): Promise<Customization | undefined>;
  getCustomizationBySessionId(sessionId: string): Promise<Customization | undefined>;
  updateCustomization(id: number, customization: Partial<InsertCustomization>): Promise<Customization | undefined>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByEmail(email: string): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private guitarComponents: Map<number, GuitarComponent>;
  private customizations: Map<number, Customization>;
  private orders: Map<number, Order>;
  private currentComponentId: number;
  private currentCustomizationId: number;
  private currentOrderId: number;

  constructor() {
    this.guitarComponents = new Map();
    this.customizations = new Map();
    this.orders = new Map();
    this.currentComponentId = 1;
    this.currentCustomizationId = 1;
    this.currentOrderId = 1;
    
    this.initializeComponents();
  }

  private initializeComponents() {
    const components: Omit<GuitarComponent, 'id'>[] = [
      // Fender Electric Guitar Bodies
      { category: 'body', name: 'Stratocaster - 3-Tone Sunburst', description: 'Classic alder Stratocaster body with 3-tone sunburst finish', price: '329.00', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: true },
      { category: 'body', name: 'Stratocaster - Olympic White', description: 'Alder Stratocaster body with crisp Olympic White finish', price: '329.00', imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'body', name: 'Telecaster - Butterscotch Blonde', description: 'Ash Telecaster body with classic butterscotch blonde finish', price: '299.00', imageUrl: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'body', name: 'Telecaster - Black', description: 'Alder Telecaster body with sleek black finish', price: '299.00', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'body', name: 'Jazzmaster - Surf Green', description: 'Alder Jazzmaster body with vintage surf green finish', price: '359.00', imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'body', name: 'P-Bass - Sunburst', description: 'Alder Precision Bass body with classic sunburst finish', price: '389.00', imageUrl: 'https://pixabay.com/get/g6f1594f00e2a11f14a3d266def0210231aec56c1dced4eed8959d3a12536a52009dddcac4ac340061235743d522a3e774fb8e5521b149f2687681edd03b7d6df_1280.jpg', isDefault: false },
      { category: 'body', name: 'Jazz Bass - Olympic White', description: 'Alder Jazz Bass body with Olympic White finish', price: '389.00', imageUrl: 'https://pixabay.com/get/g43373159cd722d04f0375a33752a4b205805b74031be7441a52ef869b3fec56bc911d5b9c4d3d6e0d0d02aceb9988e60eda6426ec51fcff7c9ec1271ba99a185_1280.jpg', isDefault: false },
      
      // Fender Necks
      { category: 'neck', name: 'Maple Neck - Maple Fretboard', description: 'Classic one-piece maple neck with 21 frets', price: '169.00', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: true },
      { category: 'neck', name: 'Maple Neck - Rosewood Fretboard', description: 'Maple neck with rosewood fretboard, 21 frets', price: '169.00', imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'neck', name: 'Maple Neck - Pau Ferro Fretboard', description: 'Maple neck with pau ferro fretboard, modern C shape', price: '189.00', imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      
      // Fender Pickups
      { category: 'pickups', name: 'Stratocaster - Single Coil Set', description: 'Classic Fender Stratocaster single-coil pickup set (SSS)', price: '159.00', imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: true },
      { category: 'pickups', name: 'Stratocaster - HSS Configuration', description: 'Humbucker at bridge, single coils at neck and middle', price: '199.00', imageUrl: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'pickups', name: 'Telecaster - Single Coil Set', description: 'Classic Telecaster single-coil pickup set with twang', price: '139.00', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'pickups', name: 'Jazzmaster - Jazzmaster Pickups', description: 'Authentic Jazzmaster single-coil pickups with soap bar design', price: '229.00', imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'pickups', name: 'P-Bass - Split Coil Pickup', description: 'Classic Precision Bass split-coil pickup for punchy tone', price: '149.00', imageUrl: 'https://pixabay.com/get/g6f1594f00e2a11f14a3d266def0210231aec56c1dced4eed8959d3a12536a52009dddcac4ac340061235743d522a3e774fb8e5521b149f2687681edd03b7d6df_1280.jpg', isDefault: false },
      { category: 'pickups', name: 'Jazz Bass - Single Coil Set', description: 'Jazz Bass single-coil pickup set for bright, articulate tone', price: '179.00', imageUrl: 'https://pixabay.com/get/g43373159cd722d04f0375a33752a4b205805b74031be7441a52ef869b3fec56bc911d5b9c4d3d6e0d0d02aceb9988e60eda6426ec51fcff7c9ec1271ba99a185_1280.jpg', isDefault: false },
      
      // Fender Hardware
      { category: 'hardware', name: 'Chrome Vintage Style', description: 'Classic chrome hardware with vintage Fender styling', price: '129.00', imageUrl: 'https://pixabay.com/get/g43373159cd722d04f0375a33752a4b205805b74031be7441a52ef869b3fec56bc911d5b9c4d3d6e0d0d02aceb9988e60eda6426ec51fcff7c9ec1271ba99a185_1280.jpg', isDefault: true },
      { category: 'hardware', name: 'Nickel Vintage Style', description: 'Warm nickel hardware with vintage Fender appearance', price: '139.00', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'hardware', name: 'Black Hardware Set', description: 'Modern black hardware for contemporary Fender look', price: '159.00', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'hardware', name: 'Gold Hardware Set', description: 'Premium gold-plated hardware for luxury Fender styling', price: '199.00', imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
    ];

    components.forEach(component => {
      const id = this.currentComponentId++;
      this.guitarComponents.set(id, { ...component, id });
    });
  }

  async getGuitarComponents(): Promise<GuitarComponent[]> {
    return Array.from(this.guitarComponents.values());
  }

  async getGuitarComponentsByCategory(category: string): Promise<GuitarComponent[]> {
    return Array.from(this.guitarComponents.values()).filter(
      component => component.category === category
    );
  }

  async getGuitarComponent(id: number): Promise<GuitarComponent | undefined> {
    return this.guitarComponents.get(id);
  }

  async createCustomization(insertCustomization: InsertCustomization): Promise<Customization> {
    const id = this.currentCustomizationId++;
    const customization: Customization = {
      ...insertCustomization,
      id,
      createdAt: new Date().toISOString(),
    };
    this.customizations.set(id, customization);
    return customization;
  }

  async getCustomization(id: number): Promise<Customization | undefined> {
    return this.customizations.get(id);
  }

  async getCustomizationBySessionId(sessionId: string): Promise<Customization | undefined> {
    return Array.from(this.customizations.values()).find(
      customization => customization.sessionId === sessionId
    );
  }

  async updateCustomization(id: number, updates: Partial<InsertCustomization>): Promise<Customization | undefined> {
    const existing = this.customizations.get(id);
    if (!existing) return undefined;

    const updated: Customization = { ...existing, ...updates };
    this.customizations.set(id, updated);
    return updated;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = {
      ...insertOrder,
      id,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByEmail(email: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      order => order.email === email
    );
  }
}

export const storage = new MemStorage();
