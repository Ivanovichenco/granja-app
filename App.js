import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './screens/DashboardScreen';
import AddLoteScreen from './screens/AddLoteScreen';
import AddRacionScreen from './screens/AddRacionScreen';
import ComprasScreen from './screens/ComprasScreen';
import AddCompraScreen from './screens/AddCompraScreen';
import VentasScreen from './screens/VentasScreen';
import AddVentaScreen from './screens/AddVentaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="AddLote" component={AddLoteScreen} />
          <Stack.Screen name="AddRacion" component={AddRacionScreen} />
          <Stack.Screen name="Compras" component={ComprasScreen} />
          <Stack.Screen name="AddCompra" component={AddCompraScreen} />
          <Stack.Screen name="Ventas" component={VentasScreen} />
          <Stack.Screen name="AddVenta" component={AddVentaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}