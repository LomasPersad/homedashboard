export type Event = {
  id: string;
  title: string;
  date: Date;
  category: 'family' | 'baby' | 'doctor' | 'festival';
  description?: string;
};

export type Task = {
  id: string;
  title: string;
  list: 'Home' | 'Baby' | 'Errands' | 'Chores';
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
};

export type BabyActivity = {
  id: string;
  type: 'Nap' | 'Bottle' | 'Meds';
  time: Date;
  details: {
    startTime?: Date;
    endTime?: Date;
    duration?: string; // e.g., "1h 30m"
    amount?: number; // in ml or oz
    unit?: 'ml' | 'oz';
    medicine?: string;
    dosage?: string;
  };
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const twoWeeks = new Date(today);
twoWeeks.setDate(twoWeeks.getDate() + 14);

export const events: Event[] = [
  { id: '1', title: 'Family Dinner Night', date: tomorrow, category: 'family' },
  { id: '2', title: 'Baby\'s 6-Month Checkup', date: nextWeek, category: 'doctor' },
  { id: '3', title: 'Diwali', date: new Date(today.getFullYear(), 10, 1), category: 'festival' },
  { id: '4', title: 'Buy baby formula', date: today, category: 'baby' },
  { id: '5', title: 'Grandma\'s Birthday', date: twoWeeks, category: 'family' },
];

export const tasks: Task[] = [
    { id: '1', title: 'Clean the kitchen', list: 'Home', completed: false, priority: 'medium' },
    { id: '2', title: 'Buy diapers', list: 'Baby', completed: false, dueDate: today, priority: 'high' },
    { id: '3', title: 'Go to the post office', list: 'Errands', completed: true, priority: 'low' },
    { id: '4', title: 'Take out the trash', list: 'Chores', completed: false, priority: 'medium' },
    { id: '5', title: 'Schedule baby\'s next appointment', list: 'Baby', completed: false, dueDate: tomorrow, priority: 'high' },
    { id: '6', title: 'Water the plants', list: 'Home', completed: true, priority: 'low' },
    { id: '7', title: 'Mow the lawn', list: 'Chores', completed: false, dueDate: nextWeek, priority: 'medium' },
    { id: '8', title: 'Pick up dry cleaning', list: 'Errands', completed: false, priority: 'low' },
];

export const festivals = [
    { name: 'Diwali', date: 'November 1, 2024' },
    { name: 'Holi', date: 'March 14, 2025' },
    { name: 'Navaratri', date: 'October 3, 2024' },
    { name: 'Raksha Bandhan', date: 'August 19, 2024' },
];

export const initialBabyActivities: BabyActivity[] = [
  {
    id: '1',
    type: 'Bottle',
    time: new Date(new Date().setHours(new Date().getHours() - 2)),
    details: { amount: 120, unit: 'ml' }
  },
  {
    id: '2',
    type: 'Nap',
    time: new Date(new Date().setHours(new Date().getHours() - 4)),
    details: { 
        startTime: new Date(new Date().setHours(new Date().getHours() - 5, 30)),
        endTime: new Date(new Date().setHours(new Date().getHours() - 4)),
        duration: '1h 30m' 
    }
  },
    {
    id: '3',
    type: 'Meds',
    time: new Date(new Date().setHours(new Date().getHours() - 8)),
    details: { medicine: 'Vitamin D Drops', dosage: '0.5ml' }
  },
];
