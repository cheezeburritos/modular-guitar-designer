import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const guitarComponents = pgTable("guitar_components", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'body', 'neck', 'pickups', 'hardware'
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  isDefault: boolean("is_default").default(false),
});

export const customizations = pgTable("customizations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  bodyId: integer("body_id").references(() => guitarComponents.id),
  neckId: integer("neck_id").references(() => guitarComponents.id),
  pickupsId: integer("pickups_id").references(() => guitarComponents.id),
  hardwareId: integer("hardware_id").references(() => guitarComponents.id),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: text("created_at").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customizationId: integer("customization_id").references(() => customizations.id).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  status: text("status").default("pending"), // 'pending', 'confirmed', 'processing', 'shipped', 'delivered'
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertGuitarComponentSchema = createInsertSchema(guitarComponents).omit({
  id: true,
});

export const insertCustomizationSchema = createInsertSchema(customizations).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type GuitarComponent = typeof guitarComponents.$inferSelect;
export type InsertGuitarComponent = z.infer<typeof insertGuitarComponentSchema>;
export type Customization = typeof customizations.$inferSelect;
export type InsertCustomization = z.infer<typeof insertCustomizationSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
