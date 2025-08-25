import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConfusionMatrixProps {
  data: number[][];
  labels: string[];
  title?: string;
}

const ConfusionMatrix = ({ 
  data, 
  labels, 
  title = "Event Detection Model - Confusion Matrix" 
}: ConfusionMatrixProps) => {
  // Calculate total for percentage display
  const total = data.flat().reduce((sum, val) => sum + val, 0);
  
  // Get max value for color scaling
  const maxValue = Math.max(...data.flat());
  
  const getCellColor = (value: number, isCorrect: boolean) => {
    const intensity = value / maxValue;
    if (isCorrect) {
      return `rgba(34, 197, 94, ${0.1 + intensity * 0.7})`; // Green for correct predictions
    } else {
      return `rgba(239, 68, 68, ${0.1 + intensity * 0.7})`; // Red for incorrect predictions
    }
  };

  const getTextColor = (value: number) => {
    const intensity = value / maxValue;
    return intensity > 0.5 ? 'white' : 'hsl(var(--foreground))';
  };

  return (
    <Card className="bg-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Matrix */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="grid gap-1" style={{ gridTemplateColumns: `60px repeat(${labels.length}, 1fr)` }}>
                {/* Top-left empty cell */}
                <div className="h-12 flex items-center justify-center text-sm font-medium text-muted-foreground">
                  
                </div>
                
                {/* Column headers (Predicted) */}
                {labels.map((label, index) => (
                  <div key={`col-${index}`} className="h-12 flex items-center justify-center text-sm font-medium text-muted-foreground border-b border-border">
                    {label}
                  </div>
                ))}
                
                {/* Row headers and data */}
                {data.map((row, rowIndex) => (
                  <>
                    {/* Row header (Actual) */}
                    <div key={`row-${rowIndex}`} className="h-12 flex items-center justify-center text-sm font-medium text-muted-foreground border-r border-border">
                      {labels[rowIndex]}
                    </div>
                    
                    {/* Data cells */}
                    {row.map((value, colIndex) => {
                      const isCorrect = rowIndex === colIndex;
                      const percentage = ((value / total) * 100).toFixed(1);
                      
                      return (
                        <div
                          key={`cell-${rowIndex}-${colIndex}`}
                          className="h-12 flex flex-col items-center justify-center text-xs border border-border/50 transition-all duration-200 hover:scale-105"
                          style={{
                            backgroundColor: getCellColor(value, isCorrect),
                            color: getTextColor(value)
                          }}
                        >
                          <span className="font-bold">{value}</span>
                          <span className="opacity-80">({percentage}%)</span>
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Predicted Labels →</span>
            </div>
            <div className="text-sm text-muted-foreground transform -rotate-90 absolute left-4 top-1/2">
              <span className="font-medium">Actual Labels</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-safety-excellent/60 border border-safety-excellent rounded"></div>
              <span className="text-muted-foreground">Correct Predictions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-safety-critical/60 border border-safety-critical rounded"></div>
              <span className="text-muted-foreground">Incorrect Predictions</span>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-safety-excellent">
                {((data.reduce((sum, row, i) => sum + row[i], 0) / total) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Accuracy</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{total}</div>
              <div className="text-sm text-muted-foreground">Total Predictions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfusionMatrix;