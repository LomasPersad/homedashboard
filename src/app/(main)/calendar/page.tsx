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

  const allEvents = [...events].sort((a,b) => a.date.getTime() - b.date.getTime());

  const selectedDayEvents = date
    ? allEvents.filter(
        (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">Event Calendar</CardTitle>
            <CardDescription>Your family's schedule at a glance.</CardDescription>
          </div>
          <AddEventDialog onEventAdd={handleAddEvent}>
          <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
          </AddEventDialog>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
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
        </div>
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-headline text-lg">
              {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
          </h3>
          <div className="space-y-3 h-[280px] overflow-y-auto pr-2">
              {date && selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map(event => (
                      <div key={event.id} className="rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md">
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{format(event.date, 'p')}</p>
                          <Badge variant={categoryVariants[event.category]} className="mt-2">{event.category}</Badge>
                      </div>
                  ))
              ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
                    <p>No events for this day.</p>
                  </div>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
