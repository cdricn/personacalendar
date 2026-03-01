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
  night_activities: string | null,
  invalidDay: boolean
}

export interface Calendar {
  [month: string] : Array<CalendarData>;
}

interface IconMap {
  normal: {
    [modifier:string]: {
      src: string,
      alt: string,
    }
  },
  special: {
    [modifier:string]: React.ReactElement
  }
}
export interface GameIcons {
  [game:string]: IconMap
}

export interface ConfidantData {
  name: "Igor",
  short_name: "Igor",
  arcana: "Fool",
  type: "auto",
  schedule: {
    rainy: true,
    time: "day",
    availability: {[day:string]:string}
  }
}

