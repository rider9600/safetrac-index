import { supabase } from "@/lib/supabaseclient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [riders, setRiders] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
  const fetchRiders = async () => {
    const { data, error } = await supabase
      .from("riders")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching riders:", error);
      toast({
        title: "Error",
        description: "Failed to load riders",
        variant: "destructive",
      });
      return;
    }

    console.log("Fetched riders:", data);
    setRiders(data || []);
  };

  fetchRiders();
}, []);

  const handleAddRider = async () => {
    if (!newRiderName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a rider name",
        variant: "destructive",
      });
      return;
    }

    // Correct table name!
    const { data, error } = await supabase
      .from("riders")
      .insert({ name: newRiderName.trim() })
      .select();

    if (error) {
      toast({ title: "Error", description: "Failed to add rider", variant: "destructive" });
      console.error(error);
      return;
    }

    setRiders(prev => [...prev, ...(data || [])]);
    setNewRiderName("");
    setIsDialogOpen(false);

    if (data?.[0]?.name) {
      toast({ title: "Success", description: `${data[0].name} has been added` });
    }
  };

  // Route with riderId for consistency with database!
  const handleSelectRider = () => {
    if (!selectedRider) {
      toast({
        title: "Error",
        description: "Please select a rider",
        variant: "destructive",
      });
      return;
    }
    navigate(`/dashboard?riderId=${selectedRider}`);
  };

   return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Users className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">SafeTrac</CardTitle>
          <CardDescription className="text-base">
            Select a rider to view their dashboard
          </CardDescription>
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

          <Button onClick={handleSelectRider} className="w-full" size="lg">
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
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
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
