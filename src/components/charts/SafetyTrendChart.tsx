import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from "recharts";

interface TrendData {
  date: string;
  safetyScore: number;
  target: number;
}

interface SafetyTrendChartProps {
  data: TrendData[];
  title?: string;
}

const SafetyTrendChart = ({ data, title = "Safety Score Trend" }: SafetyTrendChartProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "hsl(var(--safety-excellent))";
    if (score >= 60) return "hsl(var(--safety-good))";
    if (score >= 40) return "hsl(var(--safety-warning))";
    return "hsl(var(--safety-critical))";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const score = payload[0].value;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="text-sm font-medium text-foreground">{`Date: ${label}`}</p>
          <p className="text-sm" style={{ color: getScoreColor(score) }}>
            {`Safety Score: ${score}/100`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Target: ${payload[0].payload.target}/100`}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const color = getScoreColor(payload.safetyScore);
    
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        fill={color}
        stroke="hsl(var(--background))"
        strokeWidth={2}
      />
    );
  };

  return (
    <Card className="bg-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                domain={[0, 100]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Safety Score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Target reference line */}
              <ReferenceLine 
                y={80} 
                stroke="hsl(var(--safety-excellent))" 
                strokeDasharray="5 5"
                label={{ value: "Target (80)", position: "insideTopRight" }}
              />
              
              {/* Warning threshold */}
              <ReferenceLine 
                y={60} 
                stroke="hsl(var(--safety-warning))" 
                strokeDasharray="3 3"
                opacity={0.7}
                label={{ value: "Warning (60)", position: "insideTopRight" }}
              />
              
              {/* Trend area */}
              <Area
                dataKey="safetyScore"
                stroke="hsl(var(--primary))"
                fill="url(#trendGradient)"
                strokeWidth={0}
              />
              
              {/* Safety score line */}
              <Line
                type="monotone"
                dataKey="safetyScore"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "hsl(var(--background))" }}
              />
              
              {/* Target line */}
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="8 4"
                dot={false}
                opacity={0.6}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Score Status Indicators */}
        <div className="flex justify-between items-center mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-safety-excellent rounded-full"></div>
              <span className="text-muted-foreground">Excellent (80+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-safety-good rounded-full"></div>
              <span className="text-muted-foreground">Good (60-80)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-safety-warning rounded-full"></div>
              <span className="text-muted-foreground">Warning (40-60)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-safety-critical rounded-full"></div>
              <span className="text-muted-foreground">Critical (&lt;40)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyTrendChart;