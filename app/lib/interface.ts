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

export interface ResourceMap {
  title: string,
  weather_icons: Image,
  dataSrc: {
    calendarData: string,
    socialsData: string,
    jobsData: string,
  },
  special_day_modifier: {
    [modifier:string]: React.ReactElement
  },
  monthHeaders: readonly string[],
  dayHeaders: readonly string[],
  general_icons: Image
}
export interface Resource {
  [game:string] : ResourceMap
}

type Day = number[] | string;
export interface SocialsData {
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
      [month:string]: {day?: Day, night?: Day} | null
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