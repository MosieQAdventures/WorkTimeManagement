import React from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AsyncStorageFun() {
  return (
    <View><Text>Use setItemFrom and getItemFrom</Text></View>
  )
}

export async function saveItemToAS(key, value) {

  try {
    await AsyncStorage.setItem(key, value.toString());
    console.log("setting: " + key + ", " + value.toString())
  } catch (error) {
    console.log('error! failed to save data to asyncstorage: ')
    console.log(error)
  }
}

export function getItemFromAS(key, setFun, isInt, isBool) {
  let item;

  try {
    AsyncStorage.getItem(key)
      .then(value => {
        if (value != null) {
          item = value;

          if (isInt) setFun(parseInt(item));
          else if (isBool) setFun((item === 'true'));
          else setFun(item); // as a string

        } else {
        if (isBool) {/*item = true;*/}
          else item = null;
          //console.log(key + ': failed to find the key or the value was null')
        }
        console.log("reading: " + key + ", " + item)
        return item;
      })
  } catch (error) {
    console.log('error! failed to get data from asyncstorage: ')
    console.log(error)
  }

  return null;
}

export async function clearItemsFromAS() {
  try {
    //await AsyncStorage.clear(); //dont use - make it for the keys if possible
  } catch (error) {
    console.log('error! failed to remove data from asyncstorage: ')
    console.log(error)
  }
}