import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './screens/DashboardScreen';
import AddLoteScreen from './screens/AddLoteScreen';
import AddRacionScreen from './screens/AddRacionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="AddLote" component={AddLoteScreen} />
          <Stack.Screen name="AddRacion" component={AddRacionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}