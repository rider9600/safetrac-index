import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SensorDataPoint {
  time: string;
  ax: number;
  ay: number;
  az: number;
}

interface SensorChartProps {
  data: SensorDataPoint[];
  title?: string;
}

const AccelerometerChart = ({ data, title = "Accelerometer vs Time" }: SensorChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card text-xs">
          <p><b>Time:</b> {label}</p>
          <p className="text-chart-speed">AX: {d.ax.toFixed(2)}</p>
          <p className="text-green-500">AY: {d.ay.toFixed(2)}</p>
          <p className="text-orange-500">AZ: {d.az.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card shadow-card border-0">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="axGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="ayGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="azGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3}/>
              <XAxis dataKey="time" tickLine={false} axisLine={false} fontSize={12}/>
              <YAxis tickLine={false} axisLine={false} fontSize={12} label={{ value: "m/s²", angle: -90, position: 'insideLeft' }}/>
              <Tooltip content={<CustomTooltip />} />

              <Area dataKey="ax" stroke="#3b82f6" fill="url(#axGradient)" strokeWidth={2} />
              <Area dataKey="ay" stroke="#10b981" fill="url(#ayGradient)" strokeWidth={2} />
              <Area dataKey="az" stroke="#f97316" fill="url(#azGradient)" strokeWidth={2} />

              <Line type="monotone" dataKey="ax" stroke="#3b82f6" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="ay" stroke="#10b981" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="az" stroke="#f97316" strokeWidth={2} dot={false}/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccelerometerChart;
