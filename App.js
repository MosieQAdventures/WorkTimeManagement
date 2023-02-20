import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { GlobalStyles } from './constants/styles';
import AllWorkDays from './screens/AllWorkDays';
import EditWorkDay from './screens/EditWorkDay';
import MonthWorkDays from './screens/MonthWorkDays';
import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/IconButton';
import ItemsContextProvider from './store/items-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function WorkDaysOverView() {
  return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: {backgroundColor: GlobalStyles.colors.red700A},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.red700A},
    tabBarActiveTintColor: 'white',
    headerRight: ({tintColor}) => <IconButton 
      icon="add-circle-outline" 
      size={30} 
      color={tintColor} 
      onPress={() => {navigation.navigate('EditWorkDay')}} 
    />,
  })}>
    <BottomTabs.Screen name="MonthWorkDays" component={MonthWorkDays} options={{
      title: "Current Month",
      headerTitleAlign: "center",
      tabBarLabel: "MONTH",
      tabBarIcon: ({color, size}) => (<Ionicons name="calendar-sharp" size={size} color={color} />)
    }} />
    <BottomTabs.Screen name="AllWorkDays" component={AllWorkDays} options={{
      title: "Total Added",
      headerTitleAlign: "center",
      tabBarLabel: "ALL",
      tabBarIcon: ({color, size}) => (<Ionicons name="infinite" size={size} color={color} />)
    }} />
  </BottomTabs.Navigator>
}

export default function App() {
  console.log("")
  console.log("- - start app - -")
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <ItemsContextProvider>    
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.red700A },
              headerTintColor: 'white' 
            }}>
              <Stack.Screen name="WorkDaysOverView" component={WorkDaysOverView} 
              options={{headerShown: false, headerTitleAlign: "center",}}/>
              <Stack.Screen name="EditWorkDay" component={EditWorkDay} options={{
                //presentation: 'transparentModal',
                headerTitleAlign: "center",
              }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ItemsContextProvider>
      </SafeAreaView>
    </>
  );
}
