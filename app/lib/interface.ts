export interface calendar {
  month: string,
  day: number,
  day_code: number,
  day_weather: string | null,
  night_weather: string | null,
  special_day_weather: string | null,
  special_night_weather: string | null,
  city_events: Array<string> | null,
  confidant_events: Array<string> | null,
  events: Array<string> | null,
  events_spoiler: Array<string> | null,
  day_activities: string,
  night_activities: string
}