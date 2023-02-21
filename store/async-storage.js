import React, { useState } from 'react'
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
    //console.log("setting: " + key + ", " + value.toString())
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
          else setFun(oldArray => [item, ...oldArray]); // item into array at the start

        } else {
          if (isBool) {/*item = true;*/}
          else item = null;
          //console.log(key + ': failed to find the key or the value was null')
        }
        //console.log("reading: " + key + ", " + item)
        return item;
      })
  } catch (error) {
    console.log('error! failed to get data from asyncstorage: ')
    console.log(error)
    return null;
  }

}

export function getAllKeysFromAS() {
  getAllKeysFun = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
  
    // disp keys retrieved to console
    //console.log("keys: ")
    //console.log(keys)
    //for (let i = 0; i < keys.length; i++) console.log("K: "+keys[i]) 

    return keys;
  }

  let keysTemp = getAllKeysFun();
  
  // clear AS if needed
  // clearALLItemsFromAS();

  return keysTemp;

}

export async function clearALLItemsFromAS() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('error! failed to remove data from asyncstorage: ')
    console.log(error)
  }
}

export async function removeItemFromAS(id) {
  try {
    await AsyncStorage.removeItem(id)
  } catch (error) {
    console.log('error! failed to remove data from asyncstorage: ')
    console.log(error)
  }
}