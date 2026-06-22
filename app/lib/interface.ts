export interface CalendarDays {
  day:                    number,
  day_code:               number,
  day_weather:            string | null,
  night_weather:          string | null,
  special_day_weather:    string | null,
  special_night_weather:  string | null,
  world:                  string | string[] | null,
  activities:             string | string[] | null,
  social_events:          string | string[] | null,
  events:                 string | string[] | null,
  events_spoiler:         string | string[] | null,
  day_activities:         string | null,
  night_activities:       string | null,
  is_day_playable:        boolean
}

export interface CalendarMonths {
  [month: string] : CalendarDays[];
}

interface IconMap {
  day_modifier: {
    [modifier:string]: {
      src: string,
      alt: string,
    }
  },
  special_day_modifier: {
    [modifier:string]: React.ReactElement
  },
  monthHeaders: string[],
  dayHeaders: string[],
  confidants: ConfidantData[]
}
export interface GameIcons {
  [game:string]: IconMap
}

export interface ConfidantData {
  name: string,
  short_name: string,
  arcana: string,
  unlock: {type: string, month: string, day: number},
  condition: string | null
  schedule: {
    ignoresRain: boolean,
    time: string,
    availability: {[day:string]:string | undefined}
  } | null
}

