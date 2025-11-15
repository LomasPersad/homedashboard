'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { events as initialEvents, festivals, Event } from '@/lib/data';
import { format, parse } from 'date-fns';
import { Badge, BadgeProps } from '@/components/ui/badge';

const categoryVariants: Record<Event['category'], BadgeProps['variant']> = {
    family: 'secondary',
    baby: 'default',
    doctor: 'destructive',
    festival: 'outline',
};

const festivalDates = festivals.map(f => parse(f.date, 'MMMM d, yyyy', new Date()));

export function FullCalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const allEvents = [
      ...events,
      ...festivals.map(f => ({
          id: `fest-${f.name}`,
          title: f.name,
          date: parse(f.date, 'MMMM d, yyyy', new Date()),
          category: 'festival' as const,
      }))
  ].sort((a,b) => a.date.getTime() - b.date.getTime());

  const selectedDayEvents = date
    ? allEvents.filter(
        (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Family Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
                events: events.map(e => e.date),
                festivals: festivalDates,
            }}
            modifiersStyles={{
                events: {
                    color: 'hsl(var(--primary-foreground))',
                    backgroundColor: 'hsl(var(--primary))'
                },
                festivals: {
                    color: 'hsl(var(--accent-foreground))',
                    backgroundColor: 'hsl(var(--accent))'
                }
            }}
          />
        </CardContent>
      </Card>
      <Card className="md:col-span-1">
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
