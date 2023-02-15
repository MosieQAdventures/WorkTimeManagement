import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { GlobalStyles } from '../constants/styles'


export default function CustomInput({ children, title, onPress }) {
  return (
    <View style={styles.outerContainer}>
      <View>
        <Text style={styles.title}>{title}:</Text>
      </View>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={styles.container}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderWidth: 6,
    borderColor: 'black',
  },
  outerContainer: {
    minWidth: 150,
    minHeight: 100,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
  title: {
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.red100,
    borderRadius: 4,
  },
})
