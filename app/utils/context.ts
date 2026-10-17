import { createContext } from "react";
import { CalendarMonths, ResourceMap } from "../lib/interface";

export const ResourcesContext = createContext({} as ResourceMap);

export const DataContext = createContext<{
  calendarData: CalendarMonths | null,
  socialsData: string | null,
  jobsData: string | null,
}>({
  calendarData: null, 
  socialsData: null, 
  jobsData: null
});

export const DateContext = createContext<{
  currentMonth: string,
  currentDay: number
}>({
  currentMonth: '',
  currentDay: 0
});
