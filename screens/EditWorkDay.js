import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ItemsContext } from '../store/items-context';
import { getFormattedDateDDMM, getFormattedTime, getMMDDfromDDMM, getTimeBetweenDates } from '../util.js/date';

export default function EditWorkDay({route, navigation}) {
  const ctx = useContext(ItemsContext);

  const editedItemId = route.params?.itemId;
  const isEditing = !!editedItemId;

  const hourStart = route.params?.hourStart;
  const hourEnd = route.params?.hourEnd;
  const dateStart = route.params?.dateStart;
  const dateEnd = route.params?.dateEnd;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDate = getFormattedDateDDMM(today);
  const currentTime = getFormattedTime(today);

  const [startHourPressableValue, setStartHourPressableValue] = useState(currentTime)
  const [endHourPressableValue, setEndHourPressableValue] = useState(currentTime)
  const [startDatePressableValue, setStartDatePressableValue] = useState(currentDate)
  const [endDatePressableValue, setEndDatePressableValue] = useState(currentDate)

  // -------------------------------------
  // DATE PICKER

  const [date, setDate] = useState(new Date(currentYear+"-"+getMMDDfromDDMM(startDatePressableValue)+"T"+startHourPressableValue+":00+01:00"));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isStart, setIsStartTrueOrEndFalse] = useState(true);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showStartTimepicker = () => {
    setDate(new Date(currentYear+"-"+getMMDDfromDDMM(startDatePressableValue)+"T"+startHourPressableValue+":00+01:00"));
    setIsStartTrueOrEndFalse(true);
    showMode('time');
  };
  const showEndTimepicker = () => {
    setDate(new Date(currentYear+"-"+getMMDDfromDDMM(endDatePressableValue)+"T"+endHourPressableValue+":00+01:00"));
    setIsStartTrueOrEndFalse(false);
    showMode('time');
  };
  const showStartDatepicker = () => {
    setDate(new Date(currentYear+"-"+getMMDDfromDDMM(startDatePressableValue)+"T"+startHourPressableValue+":00+01:00"));
    setIsStartTrueOrEndFalse(true);
    showMode('date');
  };
  const showEndDatepicker = () => {
    setDate(new Date(currentYear+"-"+getMMDDfromDDMM(endDatePressableValue)+"T"+endHourPressableValue+":00+01:00"));
    setIsStartTrueOrEndFalse(false);
    showMode('date');
  };

  const onChange = (event, selectedDate) => {
    const changedDate = selectedDate || date;
    setDate(changedDate);
    setShow(Platform.OS === 'ios');

    if      (mode == 'time' &&  isStart) {
      //console.log("S T");
      setStartHourPressableValue(getFormattedTime(changedDate))
    }
    else if (mode == 'time' && !isStart) {
      //console.log("E T");
      setEndHourPressableValue(getFormattedTime(changedDate))
    }
    else if (mode == 'date' &&  isStart) {
      //console.log("S D");
      setStartDatePressableValue(getFormattedDateDDMM(changedDate))
    }
    else if (mode == 'date' && !isStart) {
      //console.log("E D");
      setEndDatePressableValue(getFormattedDateDDMM(changedDate))
    }
    else console.log('sad')

    //console.log(changedDate.toString())
  };

  // ------------------------------------------

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Item" : "Add New Item",
      headerRight: ({tintColor}) =>
      <IconButton 
        icon="trash" 
        size={isEditing ? 24 : 0} 
        color={tintColor} 
        onPress={isEditing ? deleteItemHandler : (() => {})} 
      />,
    })
  }, [navigation, isEditing]);

  useEffect(() => { //set values on start if editing or adding
    if (isEditing) { //passed form component
      setStartHourPressableValue(hourStart)
      setEndHourPressableValue(hourEnd)
      setStartDatePressableValue(dateStart)
      setEndDatePressableValue(dateEnd)
    } else { //isAdding than current
      setStartHourPressableValue(currentTime)
      setEndHourPressableValue(currentTime)
      setStartDatePressableValue(currentDate)
      setEndDatePressableValue(currentDate)
    }
  }, [navigation, isEditing])

  function cancelHandler() {
    navigation.goBack();
  }

  function deleteItemHandler() {
    ctx.deleteItem(editedItemId);
    navigation.goBack();
  }

  function confirmHandler() {
    let tempStartDate = new Date(currentYear+"-"+getMMDDfromDDMM(startDatePressableValue)+"T"+startHourPressableValue+":00+01:00");
    let tempEndDate = new Date(currentYear+"-"+getMMDDfromDDMM(endDatePressableValue)+"T"+endHourPressableValue+":00+01:00");
    let tempTotal = getTimeBetweenDates(tempStartDate, tempEndDate);

    // some checks below
    if (tempTotal < 0) {
      console.log('negative total error')
      Alert.alert('Sad Error', `Error: Negative Total \n=> ${tempTotal}`, [
        {text: 'OK', onPress: () => {
          //console.log('OK Pressed')
          navigation.goBack();
        }},
      ]);
      return;
    }
    if (getMMDDfromDDMM(startDatePressableValue) > getMMDDfromDDMM(endDatePressableValue)) {
      console.log('invalid date chronology error')
      Alert.alert('Sad Error', `Error: Invalid Date Chronology \n=> ${(startDatePressableValue)} -> ${(endDatePressableValue)}`, [
        {text: 'OK', onPress: () => {
          //console.log('OK Pressed')
          navigation.goBack();
        }},
      ]);
      return;
    }
    if (getMMDDfromDDMM(startDatePressableValue) < getMMDDfromDDMM(endDatePressableValue)) {
      console.log('multiple days work error')
      Alert.alert('Nani??', `Msg: You worked for >1 day? Impossible. \nApp can't handle that >.< \nThink about your life. \n=> ${(startDatePressableValue)} -> ${(endDatePressableValue)}`, [
        {text: 'OK', onPress: () => {
          console.log('OK Pressed')
          navigation.goBack();
        }},
      ]);
      return;
    }

    if (isEditing) {
      ctx.updateItem(
        editedItemId,
        {
          //dateStart: new Date("2023-03-16T08:00:00+01:00"),
          dateStart: tempStartDate,
          dateEnd: tempEndDate,
          total: tempTotal, //in hours
          description: "custom notatki",
        },
      );
    } else {
      ctx.addItem(
        {
          dateStart: tempStartDate,
          dateEnd: tempEndDate,
          total: tempTotal, //in hours
          description: "custom notatki",
        },
      );
    }
    navigation.goBack();
  }


  return (
    <View style={styles.container}>

      <View style={{height:'30%' /* just a visual break */}}></View>

      <View style={{height:'20%' /* add notatki here */}}></View>

      <View style={styles.inputOuterContainer}>
        <View style={styles.inputHourContainer}>
          <CustomInput onPress={showStartTimepicker} title="Start Hour">{startHourPressableValue}</CustomInput>
          <CustomInput onPress={showEndTimepicker} title="End Hour">{endHourPressableValue}</CustomInput>
        </View>
        <View style={styles.inputDateContainer}>
          <CustomInput onPress={showStartDatepicker} title="Start Date">{startDatePressableValue}</CustomInput>
          <CustomInput onPress={showEndDatepicker} title="End Date">{endDatePressableValue}</CustomInput>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</CustomButton>
        <CustomButton mode="flat" onPress={cancelHandler}>Cancel</CustomButton>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          style={{backgroundColor: 'white'}}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.red700,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  inputOuterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  inputHourContainer: {
    flexDirection: 'row',
  },
  inputDateContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 0,
    borderWidth: 3,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.red400A,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  }
});


//----

// {isEditing ? hourStart : currentTime}