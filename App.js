import React, { useEffect } from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './screens/DashboardScreen';
import MenuScreen from './screens/MenuScreen';
import AddLoteScreen from './screens/AddLoteScreen';
import AddRacionScreen from './screens/AddRacionScreen';
import ComprasScreen from './screens/ComprasScreen';
import AddCompraScreen from './screens/AddCompraScreen';
import VentasScreen from './screens/VentasScreen';
import AddVentaScreen from './screens/AddVentaScreen';
import TestDBScreen from './screens/TestDBScreen';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { initDatabase } from './db';

const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    displayLarge: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    displayMedium: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    displaySmall: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    headlineLarge: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    headlineMedium: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    headlineSmall: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    titleLarge: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    titleMedium: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    titleSmall: {
      fontFamily: 'Roboto_700Bold',
      fontWeight: 'normal',
    },
    bodyLarge: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    bodyMedium: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    bodySmall: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    labelLarge: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    labelMedium: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
    labelSmall: {
      fontFamily: 'Roboto_400Regular',
      fontWeight: 'normal',
    },
  },
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  // Crear la instancia de Stack Navigator
  const Stack = createStackNavigator();

  useEffect(() => {
    initDatabase()
      .then(() => {
        console.log('Base de datos inicializada correctamente');
      })
      .catch((error) => {
        console.error('Error al inicializar la base de datos:', error);
      });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="AddLote" component={AddLoteScreen} />
          <Stack.Screen name="AddRacion" component={AddRacionScreen} />
          <Stack.Screen name="Compras" component={ComprasScreen} />
          <Stack.Screen name="AddCompra" component={AddCompraScreen} />
          <Stack.Screen name="Ventas" component={VentasScreen} />
          <Stack.Screen name="AddVenta" component={AddVentaScreen} />
          <Stack.Screen name="TestDB" component={TestDBScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}