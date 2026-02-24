export interface CalendarData {
  month: string,
  day: number,
  day_code: number,
  day_weather: string | null,
  night_weather: string | null,
  special_day_weather: string | null,
  special_night_weather: string | null,
  world: Array<string> | null,
  activities: Array<string> | null,
  confidant_events: Array<string> | null,
  events: Array<string> | null,
  events_spoiler: Array<string> | null,
  day_activities: string | null,
  night_activities: string | null
}

export interface Calendar {
  [month: string] : Array<CalendarData>;
}