import React, { useState, useLayoutEffect, useContext } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles';
import CustomButton from './CustomButton';
import WorkDaysList from './WorkDaysList'
import WorkDaysSummary from './WorkDaysSummary'
import { ItemsContext } from '../store/items-context';
import { getMMDDfromDDMM, getFormattedDateDDMM, getFormattedTime, getTimeBetweenDates } from '../util.js/date';

export default function WorkDaysOutput({ workdays, workdaysPeriod, fallbackText, isMonthView }) {
  const ctx = useContext(ItemsContext);

  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (workdays.length > 0) {
    content = <WorkDaysList workdays={workdays} />;
  }

  const [isStartDisabled, setIsStartDisabled] = useState(false);
  //const [newItemId, setNewItemId] = useState(new Date(1999, 0, 1, 0, 0, 0, 0))

  useLayoutEffect(() => {
    //console.log('reloading screen');
  }, [isStartDisabled]);

  function startBtnHandler() {
    //console.log('start')
    const today = new Date();
    const currentYear = today.getFullYear();
    let tempStartDate = new Date(currentYear+"-"+getMMDDfromDDMM(getFormattedDateDDMM(today))+"T"+getFormattedTime(today)+":00+01:00");
    let tempEndDate = tempStartDate;
    let tempTotal = getTimeBetweenDates(tempStartDate, tempEndDate);

    ctx.addItem(
      {
        dateStart: tempStartDate,
        dateEnd: tempEndDate,
        total: tempTotal, //in hours
        description: "custom notatki",
      },
    );
    
    //console.log(today.toString())
    //console.log(tempStartDate.toString())
    setIsStartDisabled(!isStartDisabled);
  }
  function finishBtnHandler() {
    //console.log('finish')
    const today = new Date();
    const currentYear = today.getFullYear();
    let tempEndDate = new Date(currentYear+"-"+getMMDDfromDDMM(getFormattedDateDDMM(today))+"T"+getFormattedTime(today)+":00+01:00");

    const id = ctx.items[0].id
    console.log(id);
    ctx.updateItem(id, {dateEnd: tempEndDate, total: getTimeBetweenDates(ctx.items[0].dateStart, tempEndDate)})

    setIsStartDisabled(!isStartDisabled);
  }

  return (
    <>
      <View style={styles.horizontalLine}></View>
      <View style={styles.container}>
        <WorkDaysSummary workdays={workdays} periodName={workdaysPeriod} />
        {content}
      </View>     
      <View style={styles.horizontalLine}></View>
      {!isMonthView ? <></> :
        (<View style={styles.buttonContainer}>
          <CustomButton onPress={startBtnHandler} mode={isStartDisabled ? "disabled" : ''}>Start</CustomButton>
          <CustomButton onPress={finishBtnHandler} mode={!isStartDisabled ? "disabled" : ''}>Finish</CustomButton>      
        </View>)
      }
      <View style={styles.horizontalLine}></View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { //main background with summary and list
    flex: 10,
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.red700,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 0,
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
