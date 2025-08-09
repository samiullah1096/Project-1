import { type User, type InsertUser, type ToolUsage, type InsertToolUsage, type AdSlot, type InsertAdSlot, type Analytics } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  authenticateUser(email: string, password: string): Promise<User | undefined>;

  // Tool usage tracking
  createToolUsage(usage: InsertToolUsage): Promise<ToolUsage>;
  getToolUsage(filters?: { toolName?: string; category?: string; dateFrom?: Date; dateTo?: Date }): Promise<ToolUsage[]>;

  // Ad slot management
  getAdSlots(): Promise<AdSlot[]>;
  getActiveAdSlots(page: string): Promise<AdSlot[]>;
  createAdSlot(adSlot: InsertAdSlot): Promise<AdSlot>;
  updateAdSlot(id: string, updates: Partial<AdSlot>): Promise<AdSlot | undefined>;
  deleteAdSlot(id: string): Promise<boolean>;

  // Analytics
  getAnalytics(): Promise<{
    totalUsage: number;
    mostPopular: string;
    popularUsage: number;
    successRate: string;
    toolStats: Array<{
      name: string;
      category: string;
      usageCount: number;
      successRate: number;
      avgProcessingTime: number;
    }>;
  }>;

  // SEO utilities
  generateSitemap(): Promise<string>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private toolUsages: Map<string, ToolUsage>;
  private adSlots: Map<string, AdSlot>;

  constructor() {
    this.users = new Map();
    this.toolUsages = new Map();
    this.adSlots = new Map();
    
    // Initialize with admin user
    this.initializeAdminUser();
    
    // Initialize default ad slots
    this.initializeDefaultAdSlots();
  }

  private async initializeAdminUser() {
    const adminId = randomUUID();
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const adminUser: User = {
      id: adminId,
      username: "admin",
      email: "admin@toolsuitepro.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.set(adminId, adminUser);
  }

  private async initializeDefaultAdSlots() {
    const defaultSlots: InsertAdSlot[] = [
      {
        name: "Home Page Top Banner",
        position: "home-top",
        page: "home",
        isActive: true,
        adProvider: "google-adsense",
        adCode: "<!-- Google AdSense code here -->",
        settings: { size: "728x90" }
      },
      {
        name: "PDF Tools Banner",
        position: "pdf-tools-top",
        page: "pdf-tools",
        isActive: true,
        adProvider: "google-adsense",
        adCode: "<!-- Google AdSense code here -->",
        settings: { size: "728x90" }
      },
      {
        name: "Tool Interface Top",
        position: "tool-top",
        page: "universal-tool",
        isActive: true,
        adProvider: "google-adsense",
        adCode: "<!-- Google AdSense code here -->",
        settings: { size: "728x90" }
      }
    ];

    for (const slot of defaultSlots) {
      await this.createAdSlot(slot);
    }
  }

  // User management methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    
    const user: User = {
      id,
      ...insertUser,
      password: hashedPassword,
      role: insertUser.role || "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async authenticateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByEmail(email);
    if (!user) return undefined;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : undefined;
  }

  // Tool usage tracking methods
  async createToolUsage(usage: InsertToolUsage): Promise<ToolUsage> {
    const id = randomUUID();
    const toolUsage: ToolUsage = {
      id,
      ...usage,
      timestamp: new Date(),
    };

    this.toolUsages.set(id, toolUsage);
    return toolUsage;
  }

  async getToolUsage(filters?: { 
    toolName?: string; 
    category?: string; 
    dateFrom?: Date; 
    dateTo?: Date; 
  }): Promise<ToolUsage[]> {
    let usages = Array.from(this.toolUsages.values());

    if (filters) {
      if (filters.toolName) {
        usages = usages.filter(usage => usage.toolName === filters.toolName);
      }
      if (filters.category) {
        usages = usages.filter(usage => usage.category === filters.category);
      }
      if (filters.dateFrom) {
        usages = usages.filter(usage => usage.timestamp >= filters.dateFrom!);
      }
      if (filters.dateTo) {
        usages = usages.filter(usage => usage.timestamp <= filters.dateTo!);
      }
    }

    return usages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Ad slot management methods
  async getAdSlots(): Promise<AdSlot[]> {
    return Array.from(this.adSlots.values());
  }

  async getActiveAdSlots(page: string): Promise<AdSlot[]> {
    return Array.from(this.adSlots.values())
      .filter(slot => slot.page === page && slot.isActive);
  }

  async createAdSlot(adSlot: InsertAdSlot): Promise<AdSlot> {
    const id = randomUUID();
    const newAdSlot: AdSlot = {
      id,
      ...adSlot,
      createdAt: new Date(),
    };

    this.adSlots.set(id, newAdSlot);
    return newAdSlot;
  }

  async updateAdSlot(id: string, updates: Partial<AdSlot>): Promise<AdSlot | undefined> {
    const adSlot = this.adSlots.get(id);
    if (!adSlot) return undefined;

    const updatedAdSlot: AdSlot = {
      ...adSlot,
      ...updates,
    };

    this.adSlots.set(id, updatedAdSlot);
    return updatedAdSlot;
  }

  async deleteAdSlot(id: string): Promise<boolean> {
    return this.adSlots.delete(id);
  }

  // Analytics methods
  async getAnalytics(): Promise<{
    totalUsage: number;
    mostPopular: string;
    popularUsage: number;
    successRate: string;
    toolStats: Array<{
      name: string;
      category: string;
      usageCount: number;
      successRate: number;
      avgProcessingTime: number;
    }>;
  }> {
    const usages = Array.from(this.toolUsages.values());
    
    if (usages.length === 0) {
      return {
        totalUsage: 0,
        mostPopular: "No data",
        popularUsage: 0,
        successRate: "0%",
        toolStats: []
      };
    }

    // Calculate total usage
    const totalUsage = usages.length;

    // Calculate success rate
    const successfulUsages = usages.filter(usage => usage.success).length;
    const successRate = totalUsage > 0 ? ((successfulUsages / totalUsage) * 100).toFixed(1) + "%" : "0%";

    // Calculate tool statistics
    const toolStatsMap = new Map<string, {
      name: string;
      category: string;
      usageCount: number;
      successCount: number;
      totalProcessingTime: number;
    }>();

    usages.forEach(usage => {
      const key = usage.toolName;
      const existing = toolStatsMap.get(key) || {
        name: usage.toolName,
        category: usage.category,
        usageCount: 0,
        successCount: 0,
        totalProcessingTime: 0
      };

      existing.usageCount++;
      if (usage.success) existing.successCount++;
      if (usage.processingTime) existing.totalProcessingTime += usage.processingTime;

      toolStatsMap.set(key, existing);
    });

    const toolStats = Array.from(toolStatsMap.values())
      .map(stat => ({
        name: stat.name,
        category: stat.category,
        usageCount: stat.usageCount,
        successRate: stat.usageCount > 0 ? Math.round((stat.successCount / stat.usageCount) * 100) : 0,
        avgProcessingTime: stat.usageCount > 0 ? Math.round(stat.totalProcessingTime / stat.usageCount) : 0
      }))
      .sort((a, b) => b.usageCount - a.usageCount);

    // Find most popular tool
    const mostPopularTool = toolStats[0];
    const mostPopular = mostPopularTool ? mostPopularTool.name : "No data";
    const popularUsage = mostPopularTool ? mostPopularTool.usageCount : 0;

    return {
      totalUsage,
      mostPopular,
      popularUsage,
      successRate,
      toolStats
    };
  }

  // SEO utilities
  async generateSitemap(): Promise<string> {
    const baseUrl = "https://toolsuitepro.com";
    const currentDate = new Date().toISOString().split('T')[0];
    
    const pages = [
      { url: "", priority: "1.0", changefreq: "weekly" },
      { url: "/pdf-tools", priority: "0.9", changefreq: "weekly" },
      { url: "/image-tools", priority: "0.9", changefreq: "weekly" },
      { url: "/audio-tools", priority: "0.9", changefreq: "weekly" },
      { url: "/text-tools", priority: "0.9", changefreq: "weekly" },
      { url: "/productivity-tools", priority: "0.9", changefreq: "weekly" },
      { url: "/about", priority: "0.7", changefreq: "monthly" },
      { url: "/contact", priority: "0.7", changefreq: "monthly" },
      { url: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
      { url: "/terms-of-service", priority: "0.5", changefreq: "yearly" },
    ];

    const toolPages = [
      "/tools/pdf-to-word",
      "/tools/merge-pdf",
      "/tools/compress-pdf",
      "/tools/image-compressor",
      "/tools/background-remover",
      "/tools/image-resizer",
      "/tools/audio-converter",
      "/tools/audio-compressor",
      "/tools/word-counter",
      "/tools/grammar-checker",
      "/tools/calculator",
      "/tools/qr-generator",
    ];

    toolPages.forEach(tool => {
      pages.push({ url: tool, priority: "0.8", changefreq: "monthly" });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  }
}

export const storage = new MemStorage();
