import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from "recharts";

interface SpeedDataPoint {
  time: string;
  speed: number;
  speedLimit: number;
  overspeed: boolean;
}

interface SpeedChartProps {
  data: SpeedDataPoint[];
  title?: string;
}

const SpeedChart = ({ data, title = "Speed vs Time Analysis" }: SpeedChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="text-sm font-medium text-foreground">{`Time: ${label}`}</p>
          <p className="text-sm text-chart-speed">
            {`Speed: ${data.speed} km/h`}
          </p>
          <p className="text-sm text-muted-foreground">
            {`Limit: ${data.speedLimit} km/h`}
          </p>
          {data.overspeed && (
            <p className="text-sm text-safety-critical font-medium">⚠️ Overspeed Detected</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <div className="w-2 h-2 bg-chart-speed rounded-full"></div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-speed))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-speed))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="overspeedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--safety-critical))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--safety-critical))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Speed limit reference line */}
              <ReferenceLine 
                y={data[0]?.speedLimit || 50} 
                stroke="hsl(var(--safety-warning))" 
                strokeDasharray="5 5"
                label={{ value: "Speed Limit", position: "insideTopRight" }}
              />
              
              {/* Overspeed zones */}
              <Area
                dataKey={(entry: SpeedDataPoint) => entry.overspeed ? entry.speed : 0}
                stroke="hsl(var(--safety-critical))"
                fill="url(#overspeedGradient)"
                strokeWidth={2}
              />
              
              {/* Normal speed area */}
              <Area
                dataKey="speed"
                stroke="hsl(var(--chart-speed))"
                fill="url(#speedGradient)"
                strokeWidth={3}
              />
              
              {/* Speed line */}
              <Line
                type="monotone"
                dataKey="speed"
                stroke="hsl(var(--chart-speed))"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, stroke: "hsl(var(--chart-speed))", strokeWidth: 2, fill: "hsl(var(--background))" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-chart-speed"></div>
            <span className="text-muted-foreground">Vehicle Speed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-safety-warning border-dashed border-t"></div>
            <span className="text-muted-foreground">Speed Limit</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-2 bg-safety-critical/30 border border-safety-critical rounded-sm"></div>
            <span className="text-muted-foreground">Overspeed Zone</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeedChart;