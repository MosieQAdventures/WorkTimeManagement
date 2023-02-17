import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WorkDaysOutput from '../components/WorkDaysOutput';
import { ItemsContext } from '../store/items-context';
import { getFirstDayOfTheMonth } from '../util.js/date';

export default function MonthWorkDays() {
  const ctx = useContext(ItemsContext);

  //console.log(ctx.items)

  const monthItems = ctx.items.filter((item) => {
    const today = new Date();
    const date1st = getFirstDayOfTheMonth(today);

    //console.log("T: " + date1st)
    //console.log("I: " + item.dateStart)

    return item.dateStart >= date1st;
  })

  //console.log(monthItems)

  return (
    <WorkDaysOutput 
    workdays={monthItems} 
    workdaysPeriod="TOTAL - THIS MONTH" 
    fallbackText="Register your first item with (+) button in topbar."
    isMonthView={true} />
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
