import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { festivals } from "@/lib/data";
import { Calendar } from "lucide-react";

export function FestivalsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">Hindu Festivals</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {festivals.slice(0,3).map((festival) => (
            <li key={festival.name} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/50 text-accent-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">{festival.name}</p>
                <p className="text-sm text-muted-foreground">{festival.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
