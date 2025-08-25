import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SafetyGaugeProps {
  score: number;
  title?: string;
}

const SafetyGauge = ({ score, title = "Safety Score" }: SafetyGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-safety-excellent";
    if (score >= 60) return "text-safety-good";
    if (score >= 40) return "text-safety-warning";
    return "text-safety-critical";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "from-safety-excellent to-safety-good";
    if (score >= 60) return "from-safety-good to-safety-warning";
    if (score >= 40) return "from-safety-warning to-safety-critical";
    return "from-safety-critical to-destructive";
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <Card className="bg-card shadow-card-lg border-0 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-dashboard opacity-30" />
      <CardHeader className="relative">
        <CardTitle className="text-lg font-semibold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative flex flex-col items-center pb-8">
        <div className="relative w-48 h-48 mb-4">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
              opacity="0.3"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="url(#gaugeGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-2000 ease-out"
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="stop-color-safety-excellent" />
                <stop offset="30%" className="stop-color-safety-good" />
                <stop offset="70%" className="stop-color-safety-warning" />
                <stop offset="100%" className="stop-color-safety-critical" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(animatedScore)} transition-colors duration-500`}>
              {Math.round(animatedScore)}
            </span>
            <span className="text-sm text-muted-foreground mt-1">out of 100</span>
          </div>
        </div>

        {/* Score Description */}
        <div className="text-center">
          <div className={`text-lg font-semibold ${getScoreColor(animatedScore)} mb-2`}>
            {animatedScore >= 80 && "Excellent"}
            {animatedScore >= 60 && animatedScore < 80 && "Good"}
            {animatedScore >= 40 && animatedScore < 60 && "Needs Improvement"}
            {animatedScore < 40 && "Critical"}
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            {animatedScore >= 80 && "Outstanding safety performance. Keep up the great work!"}
            {animatedScore >= 60 && animatedScore < 80 && "Good safety record with room for minor improvements."}
            {animatedScore >= 40 && animatedScore < 60 && "Safety concerns detected. Review driving patterns."}
            {animatedScore < 40 && "Immediate attention required. Multiple safety issues detected."}
          </p>
        </div>

        {/* Pulse Animation for Low Scores */}
        {animatedScore < 60 && (
          <div className="absolute inset-0 bg-gradient-to-r from-safety-warning/10 to-safety-critical/10 animate-pulse-slow rounded-lg" />
        )}
      </CardContent>
    </Card>
  );
};

export default SafetyGauge;