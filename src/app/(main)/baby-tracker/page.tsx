'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Bed, Bot, Pill } from 'lucide-react';
import { BabyActivity, initialBabyActivities } from '@/lib/data';
import { format, formatDistanceToNow } from 'date-fns';
import { AddBabyActivityDialog } from '@/app/components/add-baby-activity-dialog';

const activityIcons = {
    Nap: <Bed className="h-5 w-5 text-purple-500" />,
    Bottle: <Bot className="h-5 w-5 text-blue-500" />,
    Meds: <Pill className="h-5 w-5 text-red-500" />,
};

const activityDetails = (activity: BabyActivity) => {
    switch (activity.type) {
        case 'Nap':
            return `Napped for ${activity.details.duration}`;
        case 'Bottle':
            return `Drank ${activity.details.amount}${activity.details.unit}`;
        case 'Meds':
            return `Took ${activity.details.medicine} (${activity.details.dosage})`;
        default:
            return '';
    }
}

export default function BabyTrackerPage() {
  const [activities, setActivities] = useState<BabyActivity[]>(initialBabyActivities);

  const handleAddActivity = (newActivity: BabyActivity) => {
    setActivities(prev => [newActivity, ...prev].sort((a, b) => b.time.getTime() - a.time.getTime()));
  };

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Log Activity</CardTitle>
            <CardDescription>Quickly add a new activity for your baby.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <AddBabyActivityDialog activityType="Nap" onActivityAdd={handleAddActivity}>
                <Button variant="outline" size="lg" className="justify-start"><Bed className="mr-4 h-5 w-5 text-purple-500" /> Log a Nap</Button>
            </AddBabyActivityDialog>
             <AddBabyActivityDialog activityType="Bottle" onActivityAdd={handleAddActivity}>
                <Button variant="outline" size="lg" className="justify-start"><Bot className="mr-4 h-5 w-5 text-blue-500" /> Log a Bottle</Button>
            </AddBabyActivityDialog>
             <AddBabyActivityDialog activityType="Meds" onActivityAdd={handleAddActivity}>
                <Button variant="outline" size="lg" className="justify-start"><Pill className="mr-4 h-5 w-5 text-red-500" /> Log Medicine</Button>
            </AddBabyActivityDialog>
          </CardContent>
        </Card>
      </div>

      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">Recent Activity</CardTitle>
              <CardDescription>A log of your baby's recent activities.</CardDescription>
            </div>
             <AddBabyActivityDialog onActivityAdd={handleAddActivity}>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Activity</Button>
            </AddBabyActivityDialog>
          </div>
        </CardHeader>
        <CardContent>
            {activities.length > 0 ? (
                 <div className="space-y-4">
                    {activities.map(activity => (
                        <div key={activity.id} className="flex items-center gap-4 rounded-lg border p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                {activityIcons[activity.type]}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{activity.type}</p>
                                <p className="text-sm text-muted-foreground">{activityDetails(activity)}</p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                                <p>{formatDistanceToNow(activity.time, { addSuffix: true })}</p>
                                <p className="text-xs">{format(activity.time, 'p')}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            ) : (
                <div className="text-center text-muted-foreground py-16">
                    <Zap className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No activities logged yet</h3>
                    <p className="mt-1 text-sm">Start by adding a nap, bottle, or medicine log.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
