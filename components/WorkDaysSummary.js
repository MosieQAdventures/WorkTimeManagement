import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles';

export default function WorkDaysSummary({ workdays, periodName }) {
  const workdaysTotalHrs = workdays.reduce((sum, workday) => {
    return sum + workday.total
  }, 0);

  let hours = Math.floor(workdaysTotalHrs)
  let minutes = Math.floor((workdaysTotalHrs.toFixed(2)-hours)*60)
  if (minutes < 10) minutes = `0${minutes}`;
  
  return (
    <View style={styles.outerBorder}>
      <View style={styles.container}>
        <Text style={styles.period}>{periodName}:</Text>
        <View>
          <Text style={styles.sum}>{hours}:{minutes} h</Text>
          <View style={styles.horizontalLine}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.red50,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: GlobalStyles.colors.red700A,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outerBorder: {
    borderWidth: 4,
    borderRadius: 8,
    marginBottom: 4,
    borderColor: GlobalStyles.colors.red50,
  },
  period: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.red700A,
  },
  sum: {
    fontSize: 25,
    fontWeight: 'bold',
    color: GlobalStyles.colors.red700A,
  },
  horizontalLine: {
    width: '100%',
    height: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.red700A,
  }
});
