export interface CalendarData {
  month: string,
  day: number,
  day_code: number,
  day_weather: string | null,
  night_weather: string | null,
  special_day_weather: string | null,
  special_night_weather: string | null,
  city_events: Array<string> | null| string,
  confidant_events: Array<string> | null| string,
  events: Array<string> | null | string,
  events_spoiler: Array<string> | null | string,
  day_activities: string | null,
  night_activities: string | null
}

export interface Calendar {
  [month: string] : Array<CalendarData>;
}