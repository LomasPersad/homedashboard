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
