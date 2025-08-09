import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertToolUsageSchema, insertAdSlotSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password } = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const user = await storage.createUser({ username, email, password });
      
      // Remove password from response
      const { password: _, ...userResponse } = user;
      
      res.json({ user: userResponse });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(1),
      });

      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Remove password from response
      const { password: _, ...userResponse } = user;
      
      res.json({ user: userResponse });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    // In a real app, you would invalidate the session here
    res.json({ message: "Logged out successfully" });
  });

  app.patch("/api/auth/profile", async (req, res) => {
    try {
      // In a real app, you would get user ID from session/JWT
      const updateSchema = z.object({
        username: z.string().optional(),
        email: z.string().email().optional(),
      });

      const updates = updateSchema.parse(req.body);
      
      // For demo purposes, we'll assume user ID is passed in header
      const userId = req.headers['user-id'] as string;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const updatedUser = await storage.updateUser(userId, updates);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove password from response
      const { password: _, ...userResponse } = updatedUser;
      
      res.json({ user: userResponse });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  // Analytics routes
  app.post("/api/analytics/tool-usage", async (req, res) => {
    try {
      const usage = insertToolUsageSchema.parse(req.body);
      const savedUsage = await storage.createToolUsage(usage);
      res.json(savedUsage);
    } catch (error) {
      console.error("Tool usage tracking error:", error);
      res.status(400).json({ message: "Invalid usage data" });
    }
  });

  app.get("/api/admin/analytics", async (req, res) => {
    try {
      // Check admin authorization (in real app, verify JWT/session)
      const userRole = req.headers['user-role'] as string;
      if (userRole !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Analytics fetch error:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Ad management routes
  app.get("/api/admin/ad-slots", async (req, res) => {
    try {
      const userRole = req.headers['user-role'] as string;
      if (userRole !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const adSlots = await storage.getAdSlots();
      res.json(adSlots);
    } catch (error) {
      console.error("Ad slots fetch error:", error);
      res.status(500).json({ message: "Failed to fetch ad slots" });
    }
  });

  app.post("/api/admin/ad-slots", async (req, res) => {
    try {
      const userRole = req.headers['user-role'] as string;
      if (userRole !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const adSlot = insertAdSlotSchema.parse(req.body);
      const savedAdSlot = await storage.createAdSlot(adSlot);
      res.json(savedAdSlot);
    } catch (error) {
      console.error("Ad slot creation error:", error);
      res.status(400).json({ message: "Invalid ad slot data" });
    }
  });

  app.patch("/api/admin/ad-slots/:id", async (req, res) => {
    try {
      const userRole = req.headers['user-role'] as string;
      if (userRole !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const updates = req.body;
      
      const updatedAdSlot = await storage.updateAdSlot(id, updates);
      if (!updatedAdSlot) {
        return res.status(404).json({ message: "Ad slot not found" });
      }

      res.json(updatedAdSlot);
    } catch (error) {
      console.error("Ad slot update error:", error);
      res.status(400).json({ message: "Invalid ad slot update data" });
    }
  });

  app.delete("/api/admin/ad-slots/:id", async (req, res) => {
    try {
      const userRole = req.headers['user-role'] as string;
      if (userRole !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const deleted = await storage.deleteAdSlot(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Ad slot not found" });
      }

      res.json({ message: "Ad slot deleted successfully" });
    } catch (error) {
      console.error("Ad slot deletion error:", error);
      res.status(500).json({ message: "Failed to delete ad slot" });
    }
  });

  // Public API for getting active ad slots (for frontend)
  app.get("/api/ad-slots/:page", async (req, res) => {
    try {
      const { page } = req.params;
      const activeAdSlots = await storage.getActiveAdSlots(page);
      res.json(activeAdSlots);
    } catch (error) {
      console.error("Active ad slots fetch error:", error);
      res.status(500).json({ message: "Failed to fetch ad slots" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
  });

  // SEO endpoints
  app.get("/api/seo/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await storage.generateSitemap();
      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error("Sitemap generation error:", error);
      res.status(500).json({ message: "Failed to generate sitemap" });
    }
  });

  app.get("/api/seo/robots.txt", (req, res) => {
    const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${req.protocol}://${req.get('host')}/api/seo/sitemap.xml`;
    
    res.set('Content-Type', 'text/plain');
    res.send(robots);
  });

  const httpServer = createServer(app);
  return httpServer;
}
