import React from 'react'
import { Text, View, FlatList } from 'react-native'
import WorkDayItem from './WorkDayItem'

function renderWorkdayItem(itemData) {
  return (
    <WorkDayItem {...itemData.item} />  
  )
}

export default function WorkDaysList({ workdays }) {
  return (
    <FlatList 
      data={workdays} 
      renderItem={renderWorkdayItem} 
      keyExtractor={(item) => item.id} 
    />
  )
}
