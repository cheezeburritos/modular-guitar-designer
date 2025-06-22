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
      // Bodies
      { category: 'body', name: 'Stratocaster - Sunburst', description: 'Classic alder body with stunning sunburst finish', price: '299.00', imageUrl: 'https://pixabay.com/get/g6f1594f00e2a11f14a3d266def0210231aec56c1dced4eed8959d3a12536a52009dddcac4ac340061235743d522a3e774fb8e5521b149f2687681edd03b7d6df_1280.jpg', isDefault: true },
      { category: 'body', name: 'Les Paul - Ebony Black', description: 'Mahogany body with glossy black finish', price: '399.00', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      { category: 'body', name: 'Telecaster - Natural', description: 'Ash body with natural wood finish', price: '249.00', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      
      // Necks
      { category: 'neck', name: 'Maple + Rosewood', description: 'Classic maple neck with rosewood fretboard', price: '149.00', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: true },
      { category: 'neck', name: 'Mahogany + Ebony', description: 'Rich mahogany neck with ebony fretboard', price: '199.00', imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      
      // Pickups
      { category: 'pickups', name: 'HSS Configuration', description: 'Humbucker at bridge, single coils at neck and middle', price: '199.00', imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: true },
      { category: 'pickups', name: 'HH Configuration', description: 'Dual humbuckers for powerful tone', price: '249.00', imageUrl: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
      
      // Hardware
      { category: 'hardware', name: 'Chrome Vintage Style', description: 'Classic chrome hardware with vintage styling', price: '99.00', imageUrl: 'https://pixabay.com/get/g43373159cd722d04f0375a33752a4b205805b74031be7441a52ef869b3fec56bc911d5b9c4d3d6e0d0d02aceb9988e60eda6426ec51fcff7c9ec1271ba99a185_1280.jpg', isDefault: true },
      { category: 'hardware', name: 'Black Modern Style', description: 'Sleek black hardware with modern design', price: '129.00', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300', isDefault: false },
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
