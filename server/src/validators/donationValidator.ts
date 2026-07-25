import { z } from "zod";

export const createDonationSchema = z.object({
  foodName: z.string().min(2).max(100),

  description: z.string().min(5).max(500),

  category: z.string().min(2),

  foodType: z.enum(["Veg", "Non-Veg", "Vegan"]),

  quantity: z.number().positive(),

  quantityUnit: z.string().min(1),

  pickupAddress: z.string().min(5),

  pickupTime: z.string().datetime(),

  expiryTime: z.string().datetime(),

  latitude: z.number(),

  longitude: z.number(),

  images: z.array(z.string().url()).optional().default([]),
});