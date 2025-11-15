import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, ArrowRight } from "lucide-react";
import { events } from "@/lib/data";
import { format } from "date-fns";
import Link from "next/link";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { AddEventDialog } from "@/app/components/add-event-dialog";

const categoryVariants: Record<typeof events[0]['category'], BadgeProps['variant']> = {
    family: 'secondary',
    baby: 'default',
    doctor: 'destructive',
    festival: 'outline',
}

export function CalendarWidget() {
    const upcomingEvents = events
        .filter(e => e.category !== 'festival' && e.date >= new Date())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 3);

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-headline text-lg">Upcoming Events</CardTitle>
                <div className="flex items-center gap-2">
                     <AddEventDialog>
                        <Button size="sm" variant="outline">
                            <Plus className="mr-2 h-4 w-4" /> Add
                        </Button>
                    </AddEventDialog>
                    <Button variant="default" size="sm" asChild>
                        <Link href="/calendar">All Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map(event => (
                            <div key={event.id} className="flex items-start gap-4">
                                <div className="flex flex-col items-center justify-center rounded-md bg-secondary p-2 text-secondary-foreground w-12 h-12 flex-shrink-0">
                                    <span className="text-xs font-semibold">{format(event.date, 'MMM')}</span>
                                    <span className="text-xl font-bold">{format(event.date, 'dd')}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{event.title}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>{format(event.date, 'EEEE, p')}</span>
                                    </div>
                                </div>
                                <Badge variant={categoryVariants[event.category]} className="self-center">{event.category}</Badge>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No upcoming events.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
