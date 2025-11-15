import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { festivals } from "@/lib/data";
import { format, parse, differenceInDays } from "date-fns";
import { OmIcon } from "@/app/components/om-icon";

export function FestivalsWidget() {
    const upcomingFestivals = festivals
      .map(f => ({
          ...f,
          parsedDate: parse(f.date, 'MMMM d, yyyy', new Date())
      }))
      .filter(f => f.parsedDate >= new Date())
      .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
      .slice(0, 3);

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <OmIcon className="h-5 w-5 text-orange-500" />
                    Upcoming Festivals
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {upcomingFestivals.length > 0 ? (
                        upcomingFestivals.map(festival => {
                            const daysAway = differenceInDays(festival.parsedDate, new Date());
                            return (
                                <div key={festival.name} className="flex items-center gap-4 rounded-lg border border-orange-500/20 bg-orange-50/50 p-3 dark:bg-orange-950/20">
                                    <div className="flex-1">
                                        <p className="font-semibold font-headline text-orange-700 dark:text-orange-300">{festival.name}</p>
                                        <p className="text-sm text-muted-foreground">{format(festival.parsedDate, 'EEEE, MMMM do')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{daysAway}</p>
                                        <p className="text-xs text-muted-foreground">days away</p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No upcoming festivals found.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
