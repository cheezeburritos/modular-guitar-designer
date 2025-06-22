import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomizationSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all guitar components
  app.get("/api/components", async (req, res) => {
    try {
      const components = await storage.getGuitarComponents();
      res.json(components);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch components" });
    }
  });

  // Get components by category
  app.get("/api/components/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const components = await storage.getGuitarComponentsByCategory(category);
      res.json(components);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch components" });
    }
  });

  // Create or update customization
  app.post("/api/customizations", async (req, res) => {
    try {
      const data = insertCustomizationSchema.parse(req.body);
      
      // Check if customization exists for this session
      const existing = await storage.getCustomizationBySessionId(data.sessionId);
      
      if (existing) {
        const updated = await storage.updateCustomization(existing.id, data);
        if (!updated) {
          return res.status(404).json({ message: "Customization not found" });
        }
        res.json(updated);
      } else {
        const customization = await storage.createCustomization(data);
        res.json(customization);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid customization data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save customization" });
      }
    }
  });

  // Get customization by session ID
  app.get("/api/customizations/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const customization = await storage.getCustomizationBySessionId(sessionId);
      
      if (!customization) {
        return res.status(404).json({ message: "Customization not found" });
      }
      
      res.json(customization);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch customization" });
    }
  });

  // Create order
  app.post("/api/orders", async (req, res) => {
    try {
      const data = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(data);
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid order data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create order" });
      }
    }
  });

  // Get orders by email
  app.get("/api/orders", async (req, res) => {
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email parameter is required" });
      }
      
      const orders = await storage.getOrdersByEmail(email);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
