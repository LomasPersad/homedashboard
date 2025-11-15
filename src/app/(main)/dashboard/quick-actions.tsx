import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus, ListPlus } from "lucide-react";
import { AddEventDialog } from "@/app/components/add-event-dialog";
import { AddTaskDialog } from "@/app/components/add-task-dialog";

export function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AddEventDialog>
                    <Button size="lg" className="h-auto py-4">
                        <div className="flex flex-col items-center gap-2">
                            <CalendarPlus className="h-8 w-8" />
                            <span className="font-headline text-base">Add Event</span>
                        </div>
                    </Button>
                </AddEventDialog>
                <AddTaskDialog>
                    <Button size="lg" variant="secondary" className="h-auto py-4">
                        <div className="flex flex-col items-center gap-2">
                            <ListPlus className="h-8 w-8" />
                            <span className="font-headline text-base">Add Task</span>
                        </div>
                    </Button>
                </AddTaskDialog>
            </CardContent>
        </Card>
    )
}
