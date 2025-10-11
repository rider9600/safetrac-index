import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GpsChart = ({ data }) => {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle>GPS Coordinates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="latitude"
                stroke="#8884d8"
                name="Latitude"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="longitude"
                stroke="#82ca9d"
                name="Longitude"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GpsChart;
