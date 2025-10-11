import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const SpeedChart1 = ({ data }) => {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle>Speed Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis label={{ value: "km/h", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <ReferenceLine
                y={50}
                stroke="red"
                strokeDasharray="4 4"
                label="Speed Limit"
              />
              <Line
                type="monotone"
                dataKey="speed"
                stroke="#007BFF"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeedChart1;
