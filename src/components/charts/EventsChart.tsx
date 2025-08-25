import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

interface EventData {
  date: string;
  overspeed: number;
  harshBraking: number;
  swerving: number;
  nightRides: number;
}

interface EventsChartProps {
  data: EventData[];
  showPieChart?: boolean;
  title?: string;
}

const EventsChart = ({ data, showPieChart = false, title = "Safety Events Analysis" }: EventsChartProps) => {
  const colors = {
    overspeed: "hsl(var(--chart-events))",
    harshBraking: "hsl(var(--chart-braking))",
    swerving: "hsl(var(--chart-swerving))",
    nightRides: "hsl(var(--chart-night))"
  };

  // Calculate totals for pie chart
  const pieData = [
    {
      name: "Overspeed",
      value: data.reduce((sum, item) => sum + item.overspeed, 0),
      color: colors.overspeed
    },
    {
      name: "Harsh Braking",
      value: data.reduce((sum, item) => sum + item.harshBraking, 0),
      color: colors.harshBraking
    },
    {
      name: "Swerving",
      value: data.reduce((sum, item) => sum + item.swerving, 0),
      color: colors.swerving
    },
    {
      name: "Night Rides",
      value: data.reduce((sum, item) => sum + item.nightRides, 0),
      color: colors.nightRides
    }
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="text-sm font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} events`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = pieData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-sm" style={{ color: data.payload.color }}>
            {`${data.value} events (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (showPieChart) {
    return (
      <Card className="bg-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <div className="w-2 h-2 bg-chart-events rounded-full"></div>
            <span>Event Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Custom Legend */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{entry.name}</span>
                <span className="text-sm font-medium text-foreground">{entry.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <div className="w-2 h-2 bg-chart-events rounded-full"></div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="date" 
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
                label={{ value: 'Number of Events', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="rect"
              />
              
              <Bar 
                dataKey="overspeed" 
                name="Overspeed"
                fill={colors.overspeed}
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="harshBraking" 
                name="Harsh Braking"
                fill={colors.harshBraking}
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="swerving" 
                name="Swerving"
                fill={colors.swerving}
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="nightRides" 
                name="Night Rides"
                fill={colors.nightRides}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsChart;