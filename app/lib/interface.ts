export interface CalendarDays {
  day:                    number,
  day_code:               number,
  day_weather:            string | null,
  night_weather:          string | null,
  special_day_weather:    string | null,
  special_night_weather:  string | null,
  world:                  string[] | null,
  notice:                 string[] | null,
  day_activities:         string[] | null,
  night_activities:       string[] | null,
  social_events:          string[] | null,
  events:                 string[] | null,
  events_spoiler:         string[] | null,
  time_day:               string | null,
  time_night:             string | null,
  is_day_playable:        boolean
}

export interface CalendarMonths {
  [month: string] : CalendarDays[];
}

export interface Image {
  [modifier:string]: {
    src: string,
    alt: string,
  }
}

interface IconMap {
  weather_icons: Image,
  special_day_modifier: {
    [modifier:string]: React.ReactElement
  },
  monthHeaders: readonly string[],
  dayHeaders: readonly string[],
  confidants: ConfidantData,
  general_icons: Image
}
export interface GameIcons {
  [game:string]: IconMap
}

export interface ConfidantData {
  normal_arcanas: readonly NormalArcanas[],
  special_arcanas: readonly SpecialArcanas[]
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
    availability: {[month:string]:string[] | null}
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
