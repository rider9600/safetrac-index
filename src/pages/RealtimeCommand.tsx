// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ArrowLeft, Power, Activity, Navigation, Radio } from "lucide-react";
// import { supabase } from "@/lib/supabase";
// const RealtimeCommand = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const riderName = searchParams.get("rider") || "Unknown Rider";
//   const [isActive, setIsActive] = useState(true);
//   const { toast } = useToast();

//   // Mock real-time sensor data with random updates
//   const [imuData, setImuData] = useState({
//     ax: 0.12,
//     ay: -0.05,
//     az: 9.81,
//     gx: 0.02,
//     gy: -0.01,
//     gz: 0.0,
//   });

//   const [gpsData, setGpsData] = useState({
//     latitude: 17.4485,
//     longitude: 78.3908,
//     speed: 45.3,
//     altitude: 542.5,
//   });

//   const [ultrasonicData, setUltrasonicData] = useState({
//     distance: 2.4,
//   });

//   useEffect(() => {
//     // Replace setInterval with Supabase real-time subscription
//     const subscription = supabase
//       .channel("sensor_readings")
//       .on(
//         "postgres_changes",
//         { event: "INSERT", schema: "public", table: "sensor_readings" },
//         (payload) => {
//           const newReading = payload.new;

//           setImuData({
//             ax: newReading.acceleration_x,
//             ay: newReading.acceleration_y,
//             az: newReading.acceleration_z,
//             gx: newReading.gyro_x,
//             gy: newReading.gyro_y,
//             gz: newReading.gyro_z,
//           });

//           setGpsData({
//             latitude: newReading.latitude,
//             longitude: newReading.longitude,
//             speed: newReading.speed,
//             altitude: newReading.altitude,
//           });

//           setUltrasonicData({
//             distance: newReading.ultrasonic_distance,
//           });
//         }
//       )
//       .subscribe();

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [riderName]);
//   const handleStopRider = () => {
//     setIsActive(false);
//     toast({
//       title: "Ride completed",
//       description: `${riderName} ride has been stopped.`,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-6 py-8">
//         <div className="mb-6 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" onClick={() => navigate(-1)}>
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back
//             </Button>
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">
//                 Realtime Command
//               </h1>
//               <p className="text-muted-foreground">{riderName}</p>
//             </div>
//           </div>
//           <Badge
//             variant={isActive ? "default" : "destructive"}
//             className="text-sm px-4 py-2"
//           >
//             {isActive ? "Active" : "Stopped"}
//           </Badge>
//         </div>

//         {/* Stop Control */}
//         <Card className="mb-6 border-destructive/50">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Power className="w-5 h-5" />
//               Rider Control
//             </CardTitle>
//             <CardDescription>Emergency stop and control</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button
//               variant="destructive"
//               size="lg"
//               onClick={handleStopRider}
//               disabled={!isActive}
//               className="w-full"
//             >
//               <Power className="w-5 h-5 mr-2" />
//               {isActive ? "Stop Rider" : "Rider Stopped"}
//             </Button>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* IMU Sensor Data */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Activity className="w-5 h-5" />
//                 IMU Sensor Data
//               </CardTitle>
//               <CardDescription>
//                 Real-time accelerometer and gyroscope readings
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground mb-3">
//                     Accelerometer (m/s²)
//                   </h3>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="bg-muted p-4 rounded-lg">
//                       <div className="text-xs text-muted-foreground mb-1">
//                         X-axis
//                       </div>
//                       <div className="text-2xl font-mono font-bold text-foreground">
//                         {imuData.ax}
//                       </div>
//                     </div>
//                     <div className="bg-muted p-4 rounded-lg">
//                       <div className="text-xs text-muted-foreground mb-1">
//                         Y-axis
//                       </div>
//                       <div className="text-2xl font-mono font-bold text-foreground">
//                         {imuData.ay}
//                       </div>
//                     </div>
//                     <div className="bg-muted p-4 rounded-lg">
//                       <div className="text-xs text-muted-foreground mb-1">
//                         Z-axis
//                       </div>
//                       <div className="text-2xl font-mono font-bold text-foreground">
//                         {imuData.az}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground mb-3">
//                     Gyroscope (rad/s)
//                   </h3>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="bg-muted p-4 rounded-lg">
//                       <div className="text-xs text-muted-foreground mb-1">
//                         X-axis
//                       </div>
//                       <div className="text-2xl font-mono font-bold text-foreground">
//                         {imuData.gx}
//                       </div>
//                     </div>
//                     <div className="bg-muted p-4 rounded-lg">
//                       <div className="text-xs text-muted-foreground mb-1">
//                         Y-axis
//                       </div>
//                       <div className="text-2xl font-mono font-bold text-foreground">
//                         {imuData.gy}
//                       </div>
//                     </div>
//                     <div className="bg-muted p-4 rounded-lg">
//                       <div className="text-xs text-muted-foreground mb-1">
//                         Z-axis
//                       </div>
//                       <div className="text-2xl font-mono font-bold text-foreground">
//                         {imuData.gz}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* GPS Data */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Navigation className="w-5 h-5" />
//                 GPS Data
//               </CardTitle>
//               <CardDescription>Real-time location and speed</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-muted p-4 rounded-lg">
//                     <div className="text-xs text-muted-foreground mb-1">
//                       Latitude
//                     </div>
//                     <div className="text-xl font-mono font-bold text-foreground">
//                       {gpsData.latitude.toFixed(6)}
//                     </div>
//                   </div>
//                   <div className="bg-muted p-4 rounded-lg">
//                     <div className="text-xs text-muted-foreground mb-1">
//                       Longitude
//                     </div>
//                     <div className="text-xl font-mono font-bold text-foreground">
//                       {gpsData.longitude.toFixed(6)}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-muted p-4 rounded-lg">
//                     <div className="text-xs text-muted-foreground mb-1">
//                       Speed (km/h)
//                     </div>
//                     <div className="text-2xl font-mono font-bold text-foreground">
//                       {gpsData.speed.toFixed(1)}
//                     </div>
//                   </div>
//                   <div className="bg-muted p-4 rounded-lg">
//                     <div className="text-xs text-muted-foreground mb-1">
//                       Altitude (m)
//                     </div>
//                     <div className="text-2xl font-mono font-bold text-foreground">
//                       {gpsData.altitude.toFixed(1)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Ultrasonic Data */}
//           <Card className="lg:col-span-2">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Radio className="w-5 h-5" />
//                 Ultrasonic Sensor Data
//               </CardTitle>
//               <CardDescription>Real-time distance measurements</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="bg-muted p-6 rounded-lg text-center">
//                 <div className="text-sm text-muted-foreground mb-2">
//                   Distance to Object
//                 </div>
//                 <div className="text-5xl font-mono font-bold text-foreground mb-2">
//                   {ultrasonicData.distance}
//                 </div>
//                 <div className="text-lg text-muted-foreground">meters</div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealtimeCommand;
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Power, Activity, Navigation, Radio } from "lucide-react";
import { supabase } from "@/lib/supabase";

const RealtimeCommand = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const riderId = searchParams.get("riderId");
  const riderName = searchParams.get("riderName") || "Unknown Rider";
  
  const [isActive, setIsActive] = useState(true);
  const [isStopping, setIsStopping] = useState(false);
  const { toast } = useToast();

  // Real-time sensor data
  const [imuData, setImuData] = useState({
    ax: 0,
    ay: 0,
    az: 0,
    gx: 0,
    gy: 0,
    gz: 0,
  });

  const [gpsData, setGpsData] = useState({
    latitude: null as number | null,
    longitude: null as number | null,
    speed: 0,
  });

  // Subscribe to real-time sensor data from Supabase
  // useEffect(() => {
  //   if (!riderId) return;

  //   const channel = supabase
  //     .channel(`riderdata-${riderId}`)
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "riderdata",
  //         filter: `rider_id=eq.${riderId}`,
  //       },
  //       (payload) => {
  //         const newReading = payload.new;

  //         // Update IMU data
  //         setImuData({
  //           ax: parseFloat(newReading.ax) || 0,
  //           ay: parseFloat(newReading.ay) || 0,
  //           az: parseFloat(newReading.az) || 0,
  //           gx: parseFloat(newReading.gx) || 0,
  //           gy: parseFloat(newReading.gy) || 0,
  //           gz: parseFloat(newReading.gz) || 0,
  //         });

  //         // Update GPS data
  //         const lat = newReading.gps_lat !== "N/A" ? parseFloat(newReading.gps_lat) : null;
  //         const lon = newReading.gps_lon !== "N/A" ? parseFloat(newReading.gps_lon) : null;
  //         const speed = newReading.gps_speed_kn ? parseFloat(newReading.gps_speed_kn) * 1.852 : 0;

  //         setGpsData({
  //           latitude: lat,
  //           longitude: lon,
  //           speed: speed,
  //         });

  //         console.log("Real-time data received:", newReading);
  //       }
  //     )
  //     .subscribe();

  //   toast({
  //     title: "Real-time monitoring active",
  //     description: "Receiving live sensor data from Raspberry Pi",
  //   });

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [riderId]);
useEffect(() => {
  if (!riderId) {
    console.error("No riderId provided");
    return;
  }

  console.log("Setting up realtime subscription for rider:", riderId);

  const channel = supabase
    .channel(`riderdata-${riderId}`, {
      config: {
        broadcast: { self: true },
      },
    })
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "riderdata",
        filter: `rider_id=eq.${riderId}`,
      },
      (payload) => {
        console.log("✅ Real-time payload received:", payload);
        const newReading = payload.new;

        // IMU data
        setImuData({
          ax: Number(newReading.ax) || 0,
          ay: Number(newReading.ay) || 0,
          az: Number(newReading.az) || 0,
          gx: Number(newReading.gx) || 0,
          gy: Number(newReading.gy) || 0,
          gz: Number(newReading.gz) || 0,
        });

        // GPS data
        const lat = newReading.gps_lat ? parseFloat(newReading.gps_lat) : null;
        const lon = newReading.gps_lon ? parseFloat(newReading.gps_lon) : null;
        const speed = newReading.gps_speed_kn ? Number(newReading.gps_speed_kn) * 1.852 : 0;

        setGpsData({
          latitude: lat,
          longitude: lon,
          speed,
        });

        toast({
          title: "Data Updated",
          description: `New reading received at ${new Date().toLocaleTimeString()}`,
          duration: 2000,
        });
      }
    )
    .subscribe((status, err) => {
      console.log("Subscription status:", status);
      if (err) {
        console.error("Subscription error:", err);
        toast({
          title: "Connection Error",
          description: err.message,
          variant: "destructive",
        });
      }
      if (status === "SUBSCRIBED") {
        console.log("✅ Successfully subscribed to realtime updates");
        toast({
          title: "Realtime monitoring active",
          description: "Receiving live sensor data from Raspberry Pi",
        });
      }
    });

  return () => {
    console.log("Cleaning up realtime subscription");
    supabase.removeChannel(channel);
  };
}, [riderId, toast]);
  const handleStopRider = async () => {
    if (!riderId) {
      toast({
        title: "Error",
        description: "Rider ID not found",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsStopping(true);

      // Insert STOP command into rider_commands table
      const { data: commandData, error: commandError } = await supabase
        .from("rider_commands")
        .insert({
          rider_id: riderId,
          command: "stop",
          status: "pending",
        })
        .select()
        .single();

      if (commandError) throw commandError;

      setIsActive(false);

      toast({
        title: "Ride stopped",
        description: `${riderName} data collection has been stopped.`,
      });

      // Wait a moment for the command to be processed by Pi
      setTimeout(() => {
        // Navigate back to dashboard
        navigate(`/dashboard?riderId=${riderId}`);
      }, 2000);
    } catch (err) {
      console.error("Error stopping ride:", err);
      toast({
        title: "Failed to stop ride",
        description: (err as any).message || "Unknown error",
        variant: "destructive",
      });
      setIsStopping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/dashboard?riderId=${riderId}`)}
              disabled={isStopping}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Realtime Command
              </h1>
              <p className="text-muted-foreground">{riderName}</p>
            </div>
          </div>
          <Badge
            variant={isActive ? "default" : "destructive"}
            className="text-sm px-4 py-2"
          >
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
              disabled={!isActive || isStopping}
              className="w-full"
            >
              <Power className="w-5 h-5 mr-2" />
              {isStopping ? "Stopping..." : isActive ? "Stop Rider" : "Rider Stopped"}
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
              <CardDescription>
                Real-time accelerometer and gyroscope readings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Accelerometer (m/s²)
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        X-axis
                      </div>
                      <div className="text-2xl font-mono font-bold text-foreground">
                        {imuData.ax.toFixed(3)}
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        Y-axis
                      </div>
                      <div className="text-2xl font-mono font-bold text-foreground">
                        {imuData.ay.toFixed(3)}
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        Z-axis
                      </div>
                      <div className="text-2xl font-mono font-bold text-foreground">
                        {imuData.az.toFixed(3)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Gyroscope (°/s)
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        X-axis
                      </div>
                      <div className="text-2xl font-mono font-bold text-foreground">
                        {imuData.gx.toFixed(3)}
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        Y-axis
                      </div>
                      <div className="text-2xl font-mono font-bold text-foreground">
                        {imuData.gy.toFixed(3)}
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">
                        Z-axis
                      </div>
                      <div className="text-2xl font-mono font-bold text-foreground">
                        {imuData.gz.toFixed(3)}
                      </div>
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
                    <div className="text-xs text-muted-foreground mb-1">
                      Latitude
                    </div>
                    <div className="text-xl font-mono font-bold text-foreground">
                      {gpsData.latitude !== null ? gpsData.latitude.toFixed(6) : "N/A"}
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">
                      Longitude
                    </div>
                    <div className="text-xl font-mono font-bold text-foreground">
                      {gpsData.longitude !== null ? gpsData.longitude.toFixed(6) : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">
                      Speed (km/h)
                    </div>
                    <div className="text-3xl font-mono font-bold text-foreground text-center">
                      {gpsData.speed.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="w-5 h-5" />
              Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-sm font-medium">
                  {isActive ? 'Connected to Raspberry Pi' : 'Disconnected'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Rider ID: {riderId}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealtimeCommand;