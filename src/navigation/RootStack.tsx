import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListHomeScreen } from '../screens/index';
import { MainStack } from '../share/navigation/List/index.types';
import EventItem from '../screens/EventList/EventItem';

const Stack = createNativeStackNavigator<MainStack>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="ListHomeScreen">
        <Stack.Screen name="ListHomeScreen" component={ListHomeScreen} />
        <Stack.Screen name="EventItemScreen" component={EventItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
