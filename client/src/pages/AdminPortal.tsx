import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useAdManagement } from "@/hooks/useAdManagement";
import { Shield, BarChart3, Settings, Users, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPortal() {
  const { user, login, logout, isAdmin } = useAuth();
  const { adSlots, analytics, updateAdSlot, createAdSlot } = useAdManagement();
  const { toast } = useToast();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin Portal - ToolSuite Pro";
    
    // Redirect non-admin users
    if (user && !isAdmin) {
      window.location.href = "/";
    }
  }, [user, isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginForm.email, loginForm.password);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin portal.",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials or insufficient permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md glassmorphism">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2" size={24} />
              Admin Portal Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This portal is restricted to authorized administrators only.
              </AlertDescription>
            </Alert>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="admin@toolsuitepro.com"
                  required
                  data-testid="input-admin-email"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  data-testid="input-admin-password"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full gradient-bg"
                disabled={isLoading}
                data-testid="button-admin-login"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. You do not have administrator privileges.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Shield className="mr-3 text-primary" size={32} />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics" data-testid="tab-analytics">
              <BarChart3 className="mr-2" size={16} />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ads" data-testid="tab-ads">
              <Settings className="mr-2" size={16} />
              Ad Management
            </TabsTrigger>
            <TabsTrigger value="users" data-testid="tab-users">
              <Users className="mr-2" size={16} />
              User Management
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="glassmorphism">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Tool Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-total-usage">
                    {analytics?.totalUsage || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Most Popular Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-popular-tool">
                    {analytics?.mostPopular || "PDF to Word"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {analytics?.popularUsage || 1240} uses this month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="stat-success-rate">
                    {analytics?.successRate || "99.2%"}
                  </div>
                  <p className="text-xs text-muted-foreground">Across all tools</p>
                </CardContent>
              </Card>
            </div>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Tool Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tool Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Usage Count</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Avg Processing Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics?.toolStats?.map((tool, index) => (
                      <TableRow key={index} data-testid={`analytics-row-${index}`}>
                        <TableCell className="font-medium">{tool.name}</TableCell>
                        <TableCell>{tool.category}</TableCell>
                        <TableCell>{tool.usageCount}</TableCell>
                        <TableCell>{tool.successRate}%</TableCell>
                        <TableCell>{tool.avgProcessingTime}ms</TableCell>
                      </TableRow>
                    )) || (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No analytics data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ad Management Tab */}
          <TabsContent value="ads">
            <div className="space-y-6">
              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle>Ad Slot Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Ad Slot Name</Label>
                        <Input placeholder="e.g., Home Page Banner" data-testid="input-ad-name" />
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Select>
                          <SelectTrigger data-testid="select-ad-position">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="header">Header</SelectItem>
                            <SelectItem value="sidebar">Sidebar</SelectItem>
                            <SelectItem value="footer">Footer</SelectItem>
                            <SelectItem value="tool-top">Tool Top</SelectItem>
                            <SelectItem value="tool-bottom">Tool Bottom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Page</Label>
                        <Select>
                          <SelectTrigger data-testid="select-ad-page">
                            <SelectValue placeholder="Select page" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">Home</SelectItem>
                            <SelectItem value="pdf-tools">PDF Tools</SelectItem>
                            <SelectItem value="image-tools">Image Tools</SelectItem>
                            <SelectItem value="audio-tools">Audio Tools</SelectItem>
                            <SelectItem value="text-tools">Text Tools</SelectItem>
                            <SelectItem value="productivity-tools">Productivity Tools</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Ad Provider</Label>
                        <Select>
                          <SelectTrigger data-testid="select-ad-provider">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google-adsense">Google AdSense</SelectItem>
                            <SelectItem value="media-net">Media.net</SelectItem>
                            <SelectItem value="amazon-associates">Amazon Associates</SelectItem>
                            <SelectItem value="propeller-ads">PropellerAds</SelectItem>
                            <SelectItem value="infolinks">InfoLinks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Ad Code</Label>
                      <Textarea
                        placeholder="Paste your ad code here..."
                        className="min-h-[120px]"
                        data-testid="textarea-ad-code"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="ad-active" data-testid="switch-ad-active" />
                        <Label htmlFor="ad-active">Active</Label>
                      </div>
                      <Button className="gradient-bg" data-testid="button-save-ad">
                        Save Ad Slot
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism">
                <CardHeader>
                  <CardTitle>Existing Ad Slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Page</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adSlots?.map((slot, index) => (
                        <TableRow key={index} data-testid={`ad-slot-row-${index}`}>
                          <TableCell className="font-medium">{slot.name}</TableCell>
                          <TableCell>{slot.position}</TableCell>
                          <TableCell>{slot.page}</TableCell>
                          <TableCell>{slot.adProvider}</TableCell>
                          <TableCell>
                            <Badge variant={slot.isActive ? "default" : "secondary"}>
                              {slot.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" data-testid={`button-edit-${index}`}>
                                Edit
                              </Button>
                              <Button size="sm" variant="destructive" data-testid={`button-delete-${index}`}>
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )) || (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            No ad slots configured
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="glassmorphism">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold" data-testid="stat-total-users">1,247</div>
                        <p className="text-xs text-muted-foreground">Total Users</p>
                      </CardContent>
                    </Card>
                    <Card className="glassmorphism">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold" data-testid="stat-active-users">892</div>
                        <p className="text-xs text-muted-foreground">Active Users</p>
                      </CardContent>
                    </Card>
                    <Card className="glassmorphism">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold" data-testid="stat-new-users">45</div>
                        <p className="text-xs text-muted-foreground">New This Week</p>
                      </CardContent>
                    </Card>
                    <Card className="glassmorphism">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold" data-testid="stat-admin-users">3</div>
                        <p className="text-xs text-muted-foreground">Administrators</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center text-muted-foreground py-8">
                    User management features will be available in a future update.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
