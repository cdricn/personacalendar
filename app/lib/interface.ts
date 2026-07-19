export interface CalendarDays {
  day:                    number,
  day_code:               number,
  day_weather:            string | null,
  night_weather:          string | null,
  special_day_weather:    string | null,
  special_night_weather:  string | null,
  world:                  string[] | null,
  activities:             string[] | null,
  social_events:          string[] | null,
  events:                 string[] | null,
  events_spoiler:         string[] | null,
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
  monthHeaders: readonly string[],
  dayHeaders: readonly string[],
  confidants: ConfidantData
}
export interface GameIcons {
  [game:string]: IconMap
}

export interface ConfidantData {
  normal_arcanas: NormalArcanas[],
  special_arcanas: SpecialArcanas[]
}

export interface NormalArcanas {
  name: string,
  short_name: string,
  arcana: string,
  unlock_date: string,
  rank_up: {
    initiate: string,
    conditions: string[]
  },
  schedule: {
    ignoresRain: boolean,
    time: string,
    availability: {[day:string]:string | undefined}
  } | null,
  location: string[]
}

export interface SpecialArcanas {
  name: string,
  short_name: string,
  arcana: string,
  unlock_date: string,
  condition: string
}
