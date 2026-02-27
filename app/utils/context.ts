import { createContext } from "react";
import { CalendarData} from "../lib/interface";

export const GameContext = createContext("");
export const DataContext = createContext<CalendarData[] | undefined>(undefined);