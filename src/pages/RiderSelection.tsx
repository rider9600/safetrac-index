import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RiderSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRider, setSelectedRider] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRiderName, setNewRiderName] = useState("");
  const [riders, setRiders] = useState([
    { id: "1", name: "Rider 001" },
    { id: "2", name: "Rider 002" },
    { id: "3", name: "Rider 003" },
    { id: "4", name: "Rider 004" },
  ]);

  const handleAddRider = () => {
    if (!newRiderName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a rider name",
        variant: "destructive",
      });
      return;
    }

    const newRider = {
      id: String(riders.length + 1),
      name: newRiderName.trim(),
    };

    setRiders([...riders, newRider]);
    setNewRiderName("");
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: `${newRider.name} has been added`,
    });
  };

  const handleSelectRider = () => {
    if (!selectedRider) {
      toast({
        title: "Error",
        description: "Please select a rider",
        variant: "destructive",
      });
      return;
    }

    const rider = riders.find(r => r.id === selectedRider);
    navigate(`/dashboard?rider=${rider?.name}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Users className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">SafeTrac</CardTitle>
          <CardDescription className="text-base">Select a rider to view their dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rider-select">Select Rider</Label>
            <Select value={selectedRider} onValueChange={setSelectedRider}>
              <SelectTrigger id="rider-select">
                <SelectValue placeholder="Choose a rider..." />
              </SelectTrigger>
              <SelectContent>
                {riders.map((rider) => (
                  <SelectItem key={rider.id} value={rider.id}>
                    {rider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSelectRider} 
            className="w-full"
            size="lg"
          >
            Continue to Dashboard
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size="lg">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Rider
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Rider</DialogTitle>
                <DialogDescription>
                  Enter the name of the new rider to add to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="rider-name">Rider Name</Label>
                  <Input
                    id="rider-name"
                    placeholder="Enter rider name..."
                    value={newRiderName}
                    onChange={(e) => setNewRiderName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddRider();
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRider}>Add Rider</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiderSelection;
