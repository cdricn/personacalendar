export interface CalendarDays {
  day:                    number,
  day_code:               number,
  day_weather:            string | null,
  night_weather:          string | null,
  special_day_weather:    string | null,
  special_night_weather:  string | null,
  world:                  string[] | null,
  alert:                  string[] | null,
  notice:                 string[] | null,
  missable_stat:          string[] | null,
  missable_item:          string[] | null,
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
  normal_arcanas: readonly NormalArcanas[]
}


type Day = number[] | string;
export interface NormalArcanas {
  name: string,
  arcana: string,
  unlock_date: string,
  rank_up: {
    initiate: string,
    conditions: string[]
  },
  availability?: {
    ignoresRain: boolean,
    time: string,
    schedule: { 
      [month:string]: {day?: Day, night?: Day}
    },
  }
  location?: {normal: string, no_classes?: string}
}

export interface InfoBlockInterface {
  blockHeader: string;
  blockSubHeader?: string | null;
  blockIcon?: string | null;
  blockSubIcon?: string | null;
  blockInfo?: string[] | null;
  blockStyling?: string | null;
  blockDisplay?: boolean | string[] | null;
}