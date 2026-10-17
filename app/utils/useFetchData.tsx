import { useEffect, useState } from "react";
import { ResourceMapping } from "@/app/lib/resourceMapping";

export default function useFetchData(dataName:string) {
  const [calendarData, setCalendarData] = useState(null);
  const [socialsData, setSocialsData] = useState(null);
  const [jobsData, setJobsData] = useState(null);

  useEffect(()=>{
    fetch(ResourceMapping[dataName].dataSrc.calendarData)
      .then((res) => res.json())
      .then((data) => setCalendarData(data));

    fetch(ResourceMapping[dataName].dataSrc.socialsData)
      .then((res) => res.json())
      .then((data) => setSocialsData(data));

    fetch(ResourceMapping[dataName].dataSrc.jobsData)
      .then((res) => res.json())
      .then((data) => setJobsData(data));
  }, [])

  return {calendarData, socialsData, jobsData};
}