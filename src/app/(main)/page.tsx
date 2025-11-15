import { TasksWidget } from "./dashboard/tasks-widget";
import { PhotosWidget } from "./dashboard/photos-widget";
import { QuickActions } from "./dashboard/quick-actions";
import { FullCalendarWidget } from "./dashboard/full-calendar";
import { CalendarWidget } from "./dashboard/calendar-widget";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <FullCalendarWidget />
        <PhotosWidget />
      </div>
      <div className="space-y-6 lg:col-span-1">
        <QuickActions />
        <CalendarWidget />
        <TasksWidget />
      </div>
    </div>
  );
}
