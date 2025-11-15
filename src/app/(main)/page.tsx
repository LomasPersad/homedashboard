import { TasksWidget } from "./dashboard/tasks-widget";
import { PhotosWidget } from "./dashboard/photos-widget";
import { QuickActions } from "./dashboard/quick-actions";
import { CalendarWidget } from "./dashboard/calendar-widget";
import { FestivalsWidget } from "./dashboard/festivals-widget";
import CalendarPage from "./calendar/page";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <CalendarPage />
      <QuickActions />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CalendarWidget />
        <TasksWidget />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FestivalsWidget />
        <PhotosWidget />
      </div>
    </div>
  );
}
