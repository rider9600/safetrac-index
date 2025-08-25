import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import SafetyGauge from "@/components/dashboard/SafetyGauge";
import MetricCard from "@/components/dashboard/MetricCard";
import DateSelector from "@/components/dashboard/DateSelector";
import SpeedChart from "@/components/charts/SpeedChart";
import EventsChart from "@/components/charts/EventsChart";
import SafetyTrendChart from "@/components/charts/SafetyTrendChart";
import { Gauge, AlertTriangle, Zap, Navigation as NavIcon, Moon } from "lucide-react";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>("2024-01-15");

  // Mock data - replace with Supabase data
  const mockDates = [
    { date: "2024-01-15", hasData: true, fileCount: 12, size: "2.4MB" },
    { date: "2024-01-14", hasData: true, fileCount: 8, size: "1.8MB" },
    { date: "2024-01-13", hasData: true, fileCount: 15, size: "3.1MB" },
  ];

  const mockSpeedData = Array.from({ length: 20 }, (_, i) => ({
    time: `${8 + Math.floor(i / 4)}:${(i % 4) * 15}`,
    speed: 30 + Math.random() * 40,
    speedLimit: 50,
    overspeed: Math.random() > 0.8
  }));

  const mockEventData = [
    { date: "Jan 11", overspeed: 3, harshBraking: 2, swerving: 1, nightRides: 0 },
    { date: "Jan 12", overspeed: 1, harshBraking: 1, swerving: 0, nightRides: 1 },
    { date: "Jan 13", overspeed: 5, harshBraking: 3, swerving: 2, nightRides: 0 },
    { date: "Jan 14", overspeed: 2, harshBraking: 1, swerving: 1, nightRides: 1 },
    { date: "Jan 15", overspeed: 4, harshBraking: 2, swerving: 1, nightRides: 0 },
  ];

  const mockTrendData = [
    { date: "Jan 11", safetyScore: 72, target: 80 },
    { date: "Jan 12", safetyScore: 85, target: 80 },
    { date: "Jan 13", safetyScore: 68, target: 80 },
    { date: "Jan 14", safetyScore: 78, target: 80 },
    { date: "Jan 15", safetyScore: 82, target: 80 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Date Selector & Safety Score */}
          <div className="space-y-6">
            <DateSelector
              availableDates={mockDates}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onSyncData={() => console.log("Syncing...")}
            />
            <SafetyGauge score={82} />
          </div>

          {/* Middle Column - Metrics */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Overspeed Events"
                value={4}
                unit="events"
                icon={Gauge}
                trend={-15}
                color="events"
                description="Speed limit violations detected"
              />
              <MetricCard
                title="Harsh Braking"
                value={2}
                unit="events"
                icon={AlertTriangle}
                trend={-25}
                color="braking"
                description="Sudden deceleration events"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Swerving"
                value={1}
                unit="events"
                icon={NavIcon}
                trend={-50}
                color="swerving"
                description="Sharp steering maneuvers"
              />
              <MetricCard
                title="Night Rides"
                value={0}
                unit="trips"
                icon={Moon}
                trend={0}
                color="night"
                description="Trips during night hours"
              />
            </div>
            <EventsChart data={mockEventData} showPieChart />
          </div>

          {/* Right Column - Charts */}
          <div className="space-y-6">
            <SpeedChart data={mockSpeedData} />
            <SafetyTrendChart data={mockTrendData} />
          </div>
        </div>

        {/* Bottom Section - Detailed Charts */}
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
          <EventsChart data={mockEventData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;