import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface GyroDataPoint {
  time: string;
  gx: number;
  gy: number;
  gz: number;
}

interface GyroscopeChartProps {
  data: GyroDataPoint[];
  title?: string;
}

const GyroscopeChart = ({ data, title = "Gyroscope (GX, GY, GZ) vs Time" }: GyroscopeChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="text-sm font-medium text-foreground">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-muted-foreground">
              {`${entry.name.toUpperCase()}: ${entry.value.toFixed(2)} °/s`}
            </p>
          ))}
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
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
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
                label={{
                  value: "Angular Velocity (°/s)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Line
                type="monotone"
                dataKey="gx"
                stroke="#34d399"
                strokeWidth={2}
                dot={false}
                name="GX"
              />
              <Line
                type="monotone"
                dataKey="gy"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
                name="GY"
              />
              <Line
                type="monotone"
                dataKey="gz"
                stroke="#f87171"
                strokeWidth={2}
                dot={false}
                name="GZ"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GyroscopeChart;
