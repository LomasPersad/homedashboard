'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { events as initialEvents, Event } from '@/lib/data';
import { format } from 'date-fns';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { AddEventDialog } from '@/app/components/add-event-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categoryVariants: Record<Event['category'], BadgeProps['variant']> = {
    family: 'secondary',
    baby: 'default',
    doctor: 'destructive',
    festival: 'outline',
};

type EventCategory = 'All' | 'family' | 'baby' | 'doctor' | 'festival';
const eventCategories: EventCategory[] = ['All', 'family', 'baby', 'doctor', 'festival'];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const handleAddEvent = (newEvent: Event) => {
    setEvents(prevEvents => [...prevEvents, newEvent].sort((a,b) => a.date.getTime() - b.date.getTime()));
  };

  const allEvents = [...events].sort((a,b) => a.date.getTime() - b.date.getTime());

  const selectedDayEvents = date
    ? allEvents.filter(
        (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];
  
  const EventList = ({ filter }: { filter: EventCategory }) => {
    const filteredEvents = filter === 'All' ? allEvents : allEvents.filter(e => e.category === filter);
    return (
        <div className="space-y-3 h-[380px] overflow-y-auto pr-2">
            {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                    <div key={event.id} className="rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{format(event.date, 'PPP, p')}</p>
                            </div>
                            <Badge variant={categoryVariants[event.category]} className="capitalize">{event.category}</Badge>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
                  <p>No events in this category.</p>
                </div>
            )}
        </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Family Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                    modifiers={{
                        events: allEvents.map(e => e.date)
                    }}
                    modifiersStyles={{
                        events: {
                            color: 'hsl(var(--primary-foreground))',
                            backgroundColor: 'hsl(var(--primary))'
                        }
                    }}
                />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline">
                            {date ? `Events for ${format(date, 'MMMM d')}` : 'All Events'}
                        </CardTitle>
                        <CardDescription>
                            {date && selectedDayEvents.length > 0
                                ? `You have ${selectedDayEvents.length} event(s) today.`
                                : date
                                ? 'No events planned for today.'
                                : 'A view of all your events.'}
                        </CardDescription>
                    </div>
                    <AddEventDialog onEventAdd={handleAddEvent}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Event
                        </Button>
                    </AddEventDialog>
                </div>
            </CardHeader>
            <CardContent>
                 <Tabs defaultValue="All" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                       {eventCategories.map(cat => (
                         <TabsTrigger key={cat} value={cat} className="capitalize">{cat}</TabsTrigger>
                       ))}
                    </TabsList>
                    {eventCategories.map(cat => (
                        <TabsContent key={cat} value={cat}>
                            <EventList filter={cat} />
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
