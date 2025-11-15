import { TasksWidget } from "./dashboard/tasks-widget";
import { PhotosWidget } from "./dashboard/photos-widget";
import { QuickActions } from "./dashboard/quick-actions";
import { FullCalendarWidget } from "./dashboard/full-calendar";
import { CalendarWidget } from "./dashboard/calendar-widget";
import { FestivalsWidget } from "./dashboard/festivals-widget";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main content area */}
      <div className="lg:col-span-2">
        <div className="space-y-6">
          <FullCalendarWidget />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CalendarWidget />
            <TasksWidget />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FestivalsWidget />
            <PhotosWidget />
          </div>
        </div>
      </div>

      {/* Right sidebar for quick actions */}
      <div className="lg:col-span-1">
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
