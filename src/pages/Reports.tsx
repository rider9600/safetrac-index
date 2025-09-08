import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock CSV file logs data
  const csvLogs = [
    {
      id: 1,
      fileName: "sensor_readings_2024_01_15.csv",
      uploadTime: "2024-01-15 09:30:22",
      fileSize: "2.4MB",
      recordCount: 12847,
      status: "processed",
      sensorType: "Temperature",
      location: "Building A - Floor 3",
      processingTime: "45s",
      errors: 0,
      warnings: 2
    },
    {
      id: 2,
      fileName: "pressure_sensors_2024_01_15.csv",
      uploadTime: "2024-01-15 08:15:10",
      fileSize: "1.8MB",
      recordCount: 9634,
      status: "processing",
      sensorType: "Pressure",
      location: "Building B - Floor 1",
      processingTime: "30s",
      errors: 0,
      warnings: 0
    },
    {
      id: 3,
      fileName: "humidity_data_2024_01_14.csv",
      uploadTime: "2024-01-14 16:45:33",
      fileSize: "3.1MB",
      recordCount: 15203,
      status: "error",
      sensorType: "Humidity",
      location: "Building C - Floor 2",
      processingTime: "1m 20s",
      errors: 3,
      warnings: 1
    },
    {
      id: 4,
      fileName: "vibration_sensors_2024_01_14.csv",
      uploadTime: "2024-01-14 14:20:15",
      fileSize: "4.2MB",
      recordCount: 18956,
      status: "processed",
      sensorType: "Vibration",
      location: "Building A - Floor 1",
      processingTime: "2m 10s",
      errors: 0,
      warnings: 5
    },
    {
      id: 5,
      fileName: "air_quality_2024_01_13.csv",
      uploadTime: "2024-01-13 11:10:05",
      fileSize: "1.5MB",
      recordCount: 7832,
      status: "processed",
      sensorType: "Air Quality",
      location: "Building B - Floor 3",
      processingTime: "25s",
      errors: 0,
      warnings: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20"><CheckCircle className="w-3 h-3 mr-1" />Processed</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case "error":
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20"><AlertCircle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredLogs = csvLogs.filter((log) => {
    const matchesSearch = log.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.sensorType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">CSV File Reports</h1>
          <p className="text-muted-foreground">Monitor and manage sensor data file uploads and processing</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Files</CardTitle>
              <div className="text-2xl font-bold text-foreground">24</div>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Processed</CardTitle>
              <div className="text-2xl font-bold text-success">18</div>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
              <div className="text-2xl font-bold text-warning">3</div>
            </CardHeader>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Errors</CardTitle>
              <div className="text-2xl font-bold text-destructive">3</div>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              File Processing Logs
            </CardTitle>
            <CardDescription>Track CSV file uploads and processing status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search files, sensor types, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* File Logs Table */}
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted/50">
                    <TableHead>File Name</TableHead>
                    <TableHead>Upload Time</TableHead>
                    <TableHead>Sensor Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Processing Time</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          {log.fileName}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{log.uploadTime}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {log.sensorType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{log.location}</TableCell>
                      <TableCell className="font-mono">{log.recordCount.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{log.fileSize}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{log.processingTime}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {log.errors > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {log.errors} errors
                            </Badge>
                          )}
                          {log.warnings > 0 && (
                            <Badge variant="outline" className="text-xs bg-warning/10 text-warning">
                              {log.warnings} warnings
                            </Badge>
                          )}
                          {log.errors === 0 && log.warnings === 0 && (
                            <Badge variant="outline" className="text-xs bg-success/10 text-success">
                              Clean
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reports;