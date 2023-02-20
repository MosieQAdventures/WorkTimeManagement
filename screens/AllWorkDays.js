import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WorkDaysOutput from '../components/WorkDaysOutput'
import { ItemsContext } from '../store/items-context';
import { getFirstDayOfTheMonth } from '../util.js/date';


export default function AllWorkDays() {
  const ctx = useContext(ItemsContext);

  //console.log("AW")
  //console.log(ctx.items.length)

  const allItems = ctx.items.filter((item) => { // filter items that are not dates
    const randomOldDate = new Date(1999, 0, 1, 0, 0, 0, 0);
    const date1st = getFirstDayOfTheMonth(randomOldDate);

    //console.log("T: " + date1st)
    //console.log("I: " + item.dateStart)

    return item.dateStart >= date1st;
  })

  
  return (
    <WorkDaysOutput 
    workdays={allItems} 
    workdaysPeriod="TOTAL - SUMMARY" 
    fallbackText="No registered items found."
    isMonthView={false} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
