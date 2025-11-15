import { CalendarWidget } from "./dashboard/calendar-widget";
import { FestivalsWidget } from "./dashboard/festivals-widget";
import { FullCalendarWidget } from "./dashboard/full-calendar";
import { PhotosWidget } from "./dashboard/photos-widget";
import { QuickActions } from "./dashboard/quick-actions";
import { TasksWidget } from "./dashboard/tasks-widget";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <FullCalendarWidget />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FestivalsWidget />
              <PhotosWidget />
           </div>
        </div>
        <div className="space-y-6">
          <QuickActions />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CalendarWidget />
            <TasksWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
