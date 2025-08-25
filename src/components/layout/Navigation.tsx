import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  BarChart3, 
  Shield, 
  TrendingUp, 
  FileText, 
  Info, 
  Moon, 
  Sun,
  Menu,
  X
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: BarChart3 },
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/ml-insights", label: "ML Insights", icon: TrendingUp },
    { href: "/about", label: "About", icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Card className="bg-nav-background border-nav-border shadow-card mb-8 sticky top-0 z-50">
      <nav className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-safety rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Safety Index Monitor</h1>
              <p className="text-sm text-muted-foreground">Real-time Analytics Dashboard</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      isActive(item.href) 
                        ? "bg-nav-active text-white shadow-sm" 
                        : "text-muted-foreground hover:bg-nav-hover hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-nav-border animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} to={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className={`w-full justify-start space-x-2 ${
                        isActive(item.href) 
                          ? "bg-nav-active text-white" 
                          : "text-muted-foreground hover:bg-nav-hover hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </Card>
  );
};

export default Navigation;