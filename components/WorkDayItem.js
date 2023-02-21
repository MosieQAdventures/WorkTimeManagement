import React, { } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from '../constants/styles'
import { getFormattedDate, getFormattedDateDDMM, getFormattedTime } from '../util.js/date'
import IconButton from './IconButton'

export default function WorkDayItem({id, idAsync, dateStart, dateEnd, total}) {

  const navigation = useNavigation();

  let isSameDate = false;
  if (dateStart.toString() == dateEnd.toString()) isSameDate = true;
  //console.log(isGreyBg)

  function itemPressHandler() {
    navigation.navigate('EditWorkDay', {
      itemId: id,
      itemAsyncId: idAsync,
      hourStart: getFormattedTime(dateStart),
      hourEnd: getFormattedTime(dateEnd),
      dateStart: getFormattedDateDDMM(dateStart),
      dateEnd: getFormattedDateDDMM(dateEnd),
    });
  }
  function convertToHHMM(item) {
    let hours = Math.floor(item)
    let minutes = Math.round((item.toFixed(2)-hours)*60)

    if (minutes < 10) minutes = `0${minutes}`;

    return `${hours}:${minutes}`
  }

  return (
    <Pressable 
      onPress={itemPressHandler} 
      style={({pressed}) => pressed && styles.pressed}
    >
      <View style={[styles.workdayItem, isSameDate ? styles.sameDateBg : null ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconContainer}>
            <IconButton
              icon="search" 
              color={'white'} 
              size={32}  
              onPress={itemPressHandler}
            />
          </View>

          <View style={styles.verticalLine}/>

          <View style={styles.start}>
            <Text style={styles.textBaseBigger}>
              {getFormattedTime(dateStart)} 
            </Text>
            <Text style={styles.textBase}>
              {getFormattedDate(dateStart)}
            </Text>
          </View>

          <View style={styles.verticalLine}/>

          <View style={styles.end}>
            <Text style={styles.textBaseBigger}>
              {getFormattedTime(dateEnd)} 
            </Text>
            <Text style={styles.textBase}>
              {getFormattedDate(dateEnd)}
            </Text>
          </View>

          <View style={styles.verticalLine}/>

        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.total}>{convertToHHMM(total)} h</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  workdayItem: {
    flex:1,
    padding: 4,
    marginVertical: 6,
    marginHorizontal: 10,
    backgroundColor: GlobalStyles.colors.red400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderColor: GlobalStyles.colors.red50,
    borderWidth: 2,
    elevation: 4,
    shadowColor: 'white',
    shadowRadius: 4,
    shadowOffset: { width:1, height: 1},
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.red50,
    fontWeight: 'bold',
    fontSize: 12,
  },
  textBaseBigger: {
    color: GlobalStyles.colors.red50,
    fontWeight: 'bold',
    fontSize: 25,
  },
  totalContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    margin: 4,
    backgroundColor: GlobalStyles.colors.red50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 90,
  },
  total: {
    color: GlobalStyles.colors.red800,
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  end: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalLine: {
    width: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderLeftColor: GlobalStyles.colors.red50,
    borderLeftWidth: 2,
  },
  pressed: {
    opacity: 0.75
  },
  sameDateBg: {
    backgroundColor: '#FF4081'
  }
})
