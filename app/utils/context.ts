import { createContext } from "react";
import { CalendarDays } from "../lib/interface";

export const GameContext = createContext("");
export const DataContext = createContext<CalendarDays[] | undefined>(undefined);