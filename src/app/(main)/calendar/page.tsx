'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { events as initialEvents, Event } from '@/lib/data';
import { format } from 'date-fns';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { AddEventDialog } from '@/app/components/add-event-dialog';

const categoryVariants: Record<Event['category'], BadgeProps['variant']> = {
    family: 'secondary',
    baby: 'default',
    doctor: 'destructive',
    festival: 'outline',
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const handleAddEvent = (newEvent: Event) => {
    setEvents(prevEvents => [...prevEvents, newEvent].sort((a,b) => a.date.getTime() - b.date.getTime()));
  };

  const selectedDayEvents = date
    ? events.filter(
        (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-2xl">Event Calendar</CardTitle>
            <AddEventDialog onEventAdd={handleAddEvent}>
              <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </AddEventDialog>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
                events: events.map(e => e.date)
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
          <CardTitle className="font-headline text-xl">
            {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
          </CardTitle>
        </CardHeader>
        <CardContent>
            {date && (
                <div className="space-y-4">
                    {selectedDayEvents.length > 0 ? (
                        selectedDayEvents.map(event => (
                            <div key={event.id} className="rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{format(event.date, 'p')}</p>
                                <Badge variant={categoryVariants[event.category]} className="mt-2">{event.category}</Badge>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground py-8">No events for this day.</p>
                    )}
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
