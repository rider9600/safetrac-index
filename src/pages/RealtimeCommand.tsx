import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Power, Activity, Navigation, Radio } from "lucide-react";

const RealtimeCommand = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const riderName = searchParams.get("rider") || "Unknown Rider";
  const [isActive, setIsActive] = useState(true);

  // Mock real-time sensor data with random updates
  const [imuData, setImuData] = useState({
    ax: 0.12,
    ay: -0.05,
    az: 9.81,
    gx: 0.02,
    gy: -0.01,
    gz: 0.00,
  });

  const [gpsData, setGpsData] = useState({
    latitude: 17.4485,
    longitude: 78.3908,
    speed: 45.3,
    altitude: 542.5,
  });

  const [ultrasonicData, setUltrasonicData] = useState({
    distance: 2.4,
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setImuData({
        ax: parseFloat((Math.random() * 2 - 1).toFixed(2)),
        ay: parseFloat((Math.random() * 2 - 1).toFixed(2)),
        az: parseFloat((9.81 + Math.random() * 0.5 - 0.25).toFixed(2)),
        gx: parseFloat((Math.random() * 0.1 - 0.05).toFixed(2)),
        gy: parseFloat((Math.random() * 0.1 - 0.05).toFixed(2)),
        gz: parseFloat((Math.random() * 0.1 - 0.05).toFixed(2)),
      });

      setGpsData(prev => ({
        latitude: prev.latitude + (Math.random() * 0.0001 - 0.00005),
        longitude: prev.longitude + (Math.random() * 0.0001 - 0.00005),
        speed: Math.max(0, prev.speed + (Math.random() * 2 - 1)),
        altitude: prev.altitude + (Math.random() * 1 - 0.5),
      }));

      setUltrasonicData({
        distance: parseFloat(Math.max(0.1, Math.random() * 5).toFixed(1)),
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleStopRider = () => {
    setIsActive(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Realtime Command</h1>
              <p className="text-muted-foreground">{riderName}</p>
            </div>
          </div>
          <Badge variant={isActive ? "default" : "destructive"} className="text-sm px-4 py-2">
            {isActive ? "Active" : "Stopped"}
          </Badge>
        </div>

        {/* Stop Control */}
        <Card className="mb-6 border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Power className="w-5 h-5" />
              Rider Control
            </CardTitle>
            <CardDescription>Emergency stop and control</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              size="lg" 
              onClick={handleStopRider}
              disabled={!isActive}
              className="w-full"
            >
              <Power className="w-5 h-5 mr-2" />
              {isActive ? "Stop Rider" : "Rider Stopped"}
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* IMU Sensor Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                IMU Sensor Data
              </CardTitle>
              <CardDescription>Real-time accelerometer and gyroscope readings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Accelerometer (m/s²)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">X-axis</div>
                      <div className="text-2xl font-mono font-bold text-foreground">{imuData.ax}</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Y-axis</div>
                      <div className="text-2xl font-mono font-bold text-foreground">{imuData.ay}</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Z-axis</div>
                      <div className="text-2xl font-mono font-bold text-foreground">{imuData.az}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Gyroscope (rad/s)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">X-axis</div>
                      <div className="text-2xl font-mono font-bold text-foreground">{imuData.gx}</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Y-axis</div>
                      <div className="text-2xl font-mono font-bold text-foreground">{imuData.gy}</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Z-axis</div>
                      <div className="text-2xl font-mono font-bold text-foreground">{imuData.gz}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GPS Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                GPS Data
              </CardTitle>
              <CardDescription>Real-time location and speed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Latitude</div>
                    <div className="text-xl font-mono font-bold text-foreground">{gpsData.latitude.toFixed(6)}</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Longitude</div>
                    <div className="text-xl font-mono font-bold text-foreground">{gpsData.longitude.toFixed(6)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Speed (km/h)</div>
                    <div className="text-2xl font-mono font-bold text-foreground">{gpsData.speed.toFixed(1)}</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Altitude (m)</div>
                    <div className="text-2xl font-mono font-bold text-foreground">{gpsData.altitude.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ultrasonic Data */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="w-5 h-5" />
                Ultrasonic Sensor Data
              </CardTitle>
              <CardDescription>Real-time distance measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-2">Distance to Object</div>
                <div className="text-5xl font-mono font-bold text-foreground mb-2">{ultrasonicData.distance}</div>
                <div className="text-lg text-muted-foreground">meters</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealtimeCommand;
