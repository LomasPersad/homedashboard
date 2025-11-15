'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BabyActivity } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, Bot, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const napSchema = z.object({
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)"),
});

const bottleSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be greater than 0."),
  unit: z.enum(['ml', 'oz']),
});

const medsSchema = z.object({
  medicine: z.string().min(2, "Medicine name is required."),
  dosage: z.string().min(1, "Dosage is required."),
});

const activitySchema = z.union([
    napSchema.extend({ type: z.literal('Nap') }),
    bottleSchema.extend({ type: z.literal('Bottle') }),
    medsSchema.extend({ type: z.literal('Meds') })
]);

type ActivityFormValues = z.infer<typeof activitySchema>;

interface AddBabyActivityDialogProps {
  children: React.ReactNode;
  onActivityAdd?: (activity: BabyActivity) => void;
  activityType?: 'Nap' | 'Bottle' | 'Meds';
}

export function AddBabyActivityDialog({ children, onActivityAdd, activityType }: AddBabyActivityDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'Nap' | 'Bottle' | 'Meds'>(activityType || 'Nap');
  const { toast } = useToast();

  const form = useForm<any>({
    // Using `any` here because the resolver and default values change based on the tab
  });

  const setFormForTab = (tab: 'Nap' | 'Bottle' | 'Meds') => {
      setCurrentTab(tab);
      let resolver;
      let defaultValues;
      switch (tab) {
          case 'Nap':
              resolver = zodResolver(napSchema);
              defaultValues = { startTime: format(new Date(), 'HH:mm'), endTime: format(new Date(), 'HH:mm') };
              break;
          case 'Bottle':
              resolver = zodResolver(bottleSchema);
              defaultValues = { amount: 120, unit: 'ml' };
              break;
          case 'Meds':
              resolver = zodResolver(medsSchema);
              defaultValues = { medicine: '', dosage: '' };
              break;
      }
      form.reset(defaultValues);
      // This is a bit of a hack to switch validation schema dynamically
      (form as any)._resolver = resolver;
  }

  // Set initial form state
  useState(() => {
      setFormForTab(currentTab);
  });
  

  const onSubmit = (data: any) => {
    const today = new Date();
    const newActivityBase = {
      id: new Date().toISOString(),
      time: today,
    };
    
    let newActivity: BabyActivity;

    if (currentTab === 'Nap') {
      const [startH, startM] = data.startTime.split(':').map(Number);
      const [endH, endM] = data.endTime.split(':').map(Number);
      const startTime = new Date(today.setHours(startH, startM));
      const endTime = new Date(today.setHours(endH, endM));

      if (endTime < startTime) {
          form.setError("endTime", { type: "manual", message: "End time cannot be before start time." });
          return;
      }

      const durationMs = endTime.getTime() - startTime.getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

      newActivity = {
          ...newActivityBase,
          type: 'Nap',
          details: { startTime, endTime, duration: `${hours}h ${minutes}m` }
      };
    } else if (currentTab === 'Bottle') {
        newActivity = {
            ...newActivityBase,
            type: 'Bottle',
            details: { amount: data.amount, unit: data.unit }
        };
    } else { // Meds
        newActivity = {
            ...newActivityBase,
            type: 'Meds',
            details: { medicine: data.medicine, dosage: data.dosage }
        };
    }

    onActivityAdd?.(newActivity);
    toast({
      title: "Activity Logged",
      description: `Successfully added a ${currentTab.toLowerCase()} activity.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Log Baby Activity</DialogTitle>
          <DialogDescription>
            Record a nap, bottle feeding, or medicine dose.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={currentTab} onValueChange={(val) => setFormForTab(val as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="Nap"><Bed className="mr-2 h-4 w-4"/>Nap</TabsTrigger>
                <TabsTrigger value="Bottle"><Bot className="mr-2 h-4 w-4"/>Bottle</TabsTrigger>
                <TabsTrigger value="Meds"><Pill className="mr-2 h-4 w-4"/>Meds</TabsTrigger>
            </TabsList>

             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <TabsContent value="Nap" className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                   </div>
                </TabsContent>
                <TabsContent value="Bottle" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 120" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Unit</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a unit" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ml">ml</SelectItem>
                                        <SelectItem value="oz">oz</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                </TabsContent>
                <TabsContent value="Meds" className="space-y-4">
                     <FormField
                        control={form.control}
                        name="medicine"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Medicine Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Vitamin D" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dosage"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Dosage</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 0.5ml" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </TabsContent>
                <DialogFooter>
                    <Button type="submit">Save Activity</Button>
                </DialogFooter>
              </form>
            </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
