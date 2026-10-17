import style from './tableContainer.module.css';
import { use } from 'react';
import { ResourcesContext, DataContext } from '@/app/utils/context';

export default function TableContainer() {
  const {weather_icons, special_day_modifier} = use(ResourcesContext);
  const data = use(DataContext);

  if (!data) return;
  

  return (
    <>
    </>
  )
}