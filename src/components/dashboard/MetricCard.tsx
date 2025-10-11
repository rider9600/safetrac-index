import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import React from "react"; // Make sure React is imported

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  trend?: number;
  color: "speed" | "events" | "braking" | "swerving" | "night";
  description?: React.ReactNode; // <-- Updated: now accepts JSX
}

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  color, 
  description 
}: MetricCardProps) => {
  const getColorClasses = (color: string) => {
    const colors = {
      speed: "text-chart-speed bg-chart-speed/10 border-chart-speed/20",
      events: "text-chart-events bg-chart-events/10 border-chart-events/20",
      braking: "text-chart-braking bg-chart-braking/10 border-chart-braking/20",
      swerving: "text-chart-swerving bg-chart-swerving/10 border-chart-swerving/20",
      night: "text-chart-night bg-chart-night/10 border-chart-night/20",
    };
    return colors[color as keyof typeof colors] || colors.speed;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-safety-critical bg-safety-critical/10";
    if (trend < 0) return "text-safety-excellent bg-safety-excellent/10";
    return "text-muted-foreground bg-muted/10";
  };

  const getTrendSymbol = (trend: number) => {
    if (trend > 0) return "↑";
    if (trend < 0) return "↓";
    return "→";
  };

  const colorClasses = getColorClasses(color);

  return (
    <Card className="bg-card shadow-card border-0 overflow-hidden relative group hover:shadow-card-lg transition-all duration-300 animate-fade-in">
      <div className={`absolute inset-0 ${colorClasses.split(' ')[1]} opacity-5`} />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg ${colorClasses}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative pt-0">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-3xl font-bold text-foreground">
            {value.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            {unit}
          </span>
        </div>

        {trend !== undefined && (
          <div className="flex items-center space-x-2 mb-2">
            <Badge 
              variant="secondary" 
              className={`text-xs px-2 py-1 ${getTrendColor(trend)}`}
            >
              {getTrendSymbol(trend)} {Math.abs(trend)}%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        )}

        {description && (
          <div className="text-xs text-muted-foreground leading-relaxed">
            {description} {/* Can now render multiple lines / JSX */}
          </div>
        )}

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default MetricCard;
