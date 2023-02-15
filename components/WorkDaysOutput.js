import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles';
import WorkDaysList from './WorkDaysList'
import WorkDaysSummary from './WorkDaysSummary'

export default function WorkDaysOutput({ workdays, workdaysPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (workdays.length > 0) {
    content = <WorkDaysList workdays={workdays} />;
  }

  return (
    <>
      <View style={styles.horizontalLine}></View>
      <View style={styles.container}>
        <WorkDaysSummary workdays={workdays} periodName={workdaysPeriod} />
        {content}
      </View>
      <View style={styles.horizontalLine}></View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { //main background
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 6,
    backgroundColor: GlobalStyles.colors.red700,
  },
  horizontalLine: {
    width: '100%',
    height: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.red900,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  }
})
