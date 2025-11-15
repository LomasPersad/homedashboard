'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tasks as initialTasks, Task } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format, isPast, isToday, isFuture } from "date-fns";
import { AddTaskDialog } from "@/app/components/add-task-dialog";

const priorityVariant = {
    high: 'destructive',
    medium: 'secondary',
    low: 'outline'
} as const;

function TaskItem({ task, onToggle }: { task: Task; onToggle: (id: string, completed: boolean) => void }) {
    const dueDateText = () => {
        if (!task.dueDate) return '';
        if (isToday(task.dueDate)) return 'Due: Today';
        if (isPast(task.dueDate) && !task.completed) return `Overdue: ${format(task.dueDate, 'MMM d')}`;
        if (isFuture(task.dueDate)) return `Due: ${format(task.dueDate, 'MMM d')}`;
        return `Due: ${format(task.dueDate, 'MMM d')}`;
    };
    
    return (
        <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
            <Checkbox 
                id={`task-${task.id}`} 
                checked={task.completed}
                onCheckedChange={(checked) => onToggle(task.id, !!checked)}
            />
            <div className="flex-1">
                <label htmlFor={`task-${task.id}`} className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                </label>
                {task.dueDate && (
                    <p className={`text-sm ${isPast(task.dueDate) && !task.completed ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {dueDateText()}
                    </p>
                )}
            </div>
            <Badge variant={priorityVariant[task.priority]} className="capitalize">{task.priority}</Badge>
        </div>
    );
}

export default function TasksPage() {
  const taskLists: ('All' | 'Home' | 'Baby' | 'Errands' | 'Chores')[] = ['All', 'Home', 'Baby', 'Errands', 'Chores'];
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const handleToggleTask = (id: string, completed: boolean) => {
    setTasks(tasks => tasks.map(task => task.id === id ? { ...task, completed } : task));
  };
  
  const TaskList = ({ listName }: { listName: 'All' | 'Home' | 'Baby' | 'Errands' | 'Chores' }) => {
    const filteredTasks = listName === 'All' ? tasks : tasks.filter(task => task.list === listName);
    const openTasks = filteredTasks.filter(t => !t.completed).sort((a, b) => (a.dueDate ? a.dueDate.getTime() : Infinity) - (b.dueDate ? b.dueDate.getTime() : Infinity));
    const completedTasks = filteredTasks.filter(t => t.completed);

    return (
        <div className="space-y-4">
            {openTasks.length > 0 ? (
                openTasks.map(task => <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />)
            ) : (
                <p className="text-muted-foreground italic text-center py-8">No open tasks in this list. Great job!</p>
            )}

            {completedTasks.length > 0 && (
                <div>
                    <h3 className="mb-2 mt-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Completed</h3>
                    <div className="space-y-4 opacity-60">
                        {completedTasks.map(task => <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />)}
                    </div>
                </div>
            )}
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-2xl">To-Do Lists</CardTitle>
            <AddTaskDialog onTaskAdd={handleAddTask}>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
            </AddTaskDialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            {taskLists.map(list => (
                <TabsTrigger key={list} value={list} className="font-headline capitalize">{list}</TabsTrigger>
            ))}
          </TabsList>
          {taskLists.map(list => (
            <TabsContent key={list} value={list} className="mt-6">
                <TaskList listName={list} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
