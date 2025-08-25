import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricData {
  name: string;
  precision: number;
  recall: number;
  f1Score: number;
}

interface ModelMetricsProps {
  data: MetricData[];
  title?: string;
}

const ModelMetrics = ({ data, title = "Model Performance Metrics" }: ModelMetricsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.9) return "text-safety-excellent";
    if (score >= 0.8) return "text-safety-good";
    if (score >= 0.7) return "text-safety-warning";
    return "text-safety-critical";
  };

  const getProgressColor = (score: number) => {
    if (score >= 0.9) return "bg-safety-excellent";
    if (score >= 0.8) return "bg-safety-good";
    if (score >= 0.7) return "bg-safety-warning";
    return "bg-safety-critical";
  };

  // Calculate overall metrics
  const avgPrecision = data.reduce((sum, item) => sum + item.precision, 0) / data.length;
  const avgRecall = data.reduce((sum, item) => sum + item.recall, 0) / data.length;
  const avgF1 = data.reduce((sum, item) => sum + item.f1Score, 0) / data.length;

  return (
    <Card className="bg-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Metrics Summary */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(avgPrecision)}`}>
              {(avgPrecision * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Precision</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(avgRecall)}`}>
              {(avgRecall * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Recall</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(avgF1)}`}>
              {(avgF1 * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg F1-Score</div>
          </div>
        </div>

        {/* Individual Class Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-muted-foreground">Performance by Event Type</h4>
          
          {data.map((metric, index) => (
            <div key={index} className="space-y-3 p-4 border border-border/50 rounded-lg hover:shadow-card transition-all duration-200">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-foreground">{metric.name}</h5>
                <span className={`text-sm font-medium ${getScoreColor(metric.f1Score)}`}>
                  F1: {(metric.f1Score * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="space-y-2">
                {/* Precision */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Precision</span>
                  <span className={`font-medium ${getScoreColor(metric.precision)}`}>
                    {(metric.precision * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(metric.precision)}`}
                    style={{ width: `${metric.precision * 100}%` }}
                  ></div>
                </div>
                
                {/* Recall */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Recall</span>
                  <span className={`font-medium ${getScoreColor(metric.recall)}`}>
                    {(metric.recall * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(metric.recall)}`}
                    style={{ width: `${metric.recall * 100}%` }}
                  ></div>
                </div>
                
                {/* F1 Score */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">F1-Score</span>
                  <span className={`font-medium ${getScoreColor(metric.f1Score)}`}>
                    {(metric.f1Score * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(metric.f1Score)}`}
                    style={{ width: `${metric.f1Score * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metric Explanations */}
        <div className="space-y-2 text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
          <p><strong>Precision:</strong> Percentage of predicted events that were actually correct</p>
          <p><strong>Recall:</strong> Percentage of actual events that were successfully detected</p>
          <p><strong>F1-Score:</strong> Harmonic mean of precision and recall (overall performance)</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelMetrics;