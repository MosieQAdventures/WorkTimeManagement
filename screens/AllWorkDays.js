import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WorkDaysOutput from '../components/WorkDaysOutput'
import { ItemsContext } from '../store/items-context';

export default function AllWorkDays() {
  const ctx = useContext(ItemsContext);
  return (
    <WorkDaysOutput 
    workdays={ctx.items} 
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
