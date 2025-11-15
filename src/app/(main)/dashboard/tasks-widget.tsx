import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { tasks } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AddTaskDialog } from "@/app/components/add-task-dialog";

const priorityVariant = {
    high: 'destructive',
    medium: 'secondary',
    low: 'outline'
} as const;

export function TasksWidget() {
    const highPriorityTasks = tasks.filter(t => !t.completed).sort((a,b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    }).slice(0, 4);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-headline text-lg">To-Do List</CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/tasks">View All</Link>
                    </Button>
                    <AddTaskDialog>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Add
                        </Button>
                    </AddTaskDialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {highPriorityTasks.length > 0 ? (
                        highPriorityTasks.map(task => (
                            <div key={task.id} className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted/50">
                                <Checkbox id={`task-widget-${task.id}`} checked={task.completed} />
                                <label htmlFor={`task-widget-${task.id}`} className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {task.title}
                                </label>
                                <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No tasks to show. All done!</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
