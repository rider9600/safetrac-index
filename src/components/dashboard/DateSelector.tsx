import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Folder, RefreshCw, Download } from "lucide-react";

interface DataFolder {
  date: string;
  hasData: boolean;
  fileCount: number;
  size: string;
}

interface DateSelectorProps {
  availableDates: DataFolder[];
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  onSyncData?: () => void;
  isLoading?: boolean;
}

const DateSelector = ({ 
  availableDates, 
  selectedDate, 
  onDateSelect, 
  onSyncData,
  isLoading = false 
}: DateSelectorProps) => {
  const [sortBy, setSortBy] = useState<'date' | 'files'>('date');

  const sortedDates = [...availableDates].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.fileCount - a.fileCount;
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  const getStatusColor = (folder: DataFolder) => {
    if (!folder.hasData) return "bg-muted text-muted-foreground";
    if (folder.fileCount >= 10) return "bg-safety-excellent text-white";
    if (folder.fileCount >= 5) return "bg-safety-good text-white";
    return "bg-safety-warning text-white";
  };

  return (
    <Card className="bg-card shadow-card border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Data Browser</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy(sortBy === 'date' ? 'files' : 'date')}
            >
              Sort by {sortBy === 'date' ? 'Files' : 'Date'}
            </Button>
            
            {onSyncData && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSyncData}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Sync Now</span>
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Select a date to view trip data and analytics. Data is automatically organized by collection date.
        </p>
      </CardHeader>
      
      <CardContent>
        {sortedDates.length === 0 ? (
          <div className="text-center py-8">
            <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Data Available</h3>
            <p className="text-sm text-muted-foreground mb-4">
              No trip data found. Make sure your Raspberry Pi is uploading data to Supabase Storage.
            </p>
            {onSyncData && (
              <Button onClick={onSyncData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Sync Data
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {sortedDates.map((folder) => {
              const formatted = formatDate(folder.date);
              const isSelected = selectedDate === folder.date;
              
              return (
                <Button
                  key={folder.date}
                  variant={isSelected ? "default" : "outline"}
                  className={`p-4 h-auto justify-start transition-all duration-200 ${
                    isSelected ? "bg-primary text-primary-foreground shadow-safety" : "hover:shadow-card"
                  }`}
                  onClick={() => onDateSelect(folder.date)}
                  disabled={!folder.hasData}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      {/* Date Display */}
                      <div className="text-center">
                        <div className="text-2xl font-bold leading-none">
                          {formatted.day}
                        </div>
                        <div className="text-xs opacity-80">
                          {formatted.month}
                        </div>
                      </div>
                      
                      {/* Date Info */}
                      <div className="text-left">
                        <div className="font-medium">
                          {formatted.weekday}, {formatted.month} {formatted.day}, {formatted.year}
                        </div>
                        <div className="text-sm opacity-80">
                          {folder.hasData ? `${folder.fileCount} files` : 'No data'} • {folder.size}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="flex items-center space-x-2">
                      {folder.hasData && (
                        <Badge className={getStatusColor(folder)}>
                          {folder.fileCount >= 10 ? 'Complete' : 
                           folder.fileCount >= 5 ? 'Partial' : 'Limited'}
                        </Badge>
                      )}
                      
                      {isSelected && (
                        <Download className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        )}
        
        {/* Summary Stats */}
        {sortedDates.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-lg font-bold text-foreground">
                  {sortedDates.filter(f => f.hasData).length}
                </div>
                <div className="text-muted-foreground">Days with Data</div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">
                  {sortedDates.reduce((sum, f) => sum + f.fileCount, 0)}
                </div>
                <div className="text-muted-foreground">Total Files</div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">
                  {sortedDates.reduce((sum, f) => sum + parseFloat(f.size.replace(/[^0-9.]/g, '')), 0).toFixed(1)}MB
                </div>
                <div className="text-muted-foreground">Total Size</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateSelector;