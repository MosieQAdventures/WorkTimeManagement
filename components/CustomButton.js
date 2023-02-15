import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles'

export default function CustomButton({ children, onPress, mode }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: GlobalStyles.colors.red400A,
  },
  buttonOuterContainer: {
    minWidth: 100,
    marginHorizontal: 8,
  },
  flat: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 3,
    borderColor: 'white',
  },
  buttonText: {
    color: GlobalStyles.colors.red400A,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  flatText: {
    color: 'white'
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.red100,
    borderRadius: 4,
  },
})
