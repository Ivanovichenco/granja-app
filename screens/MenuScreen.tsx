import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const MenuScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Menú Principal" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Opciones</Text>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddLote')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
        >
          Añadir Nuevo Lote
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddRacion')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
        >
          Añadir Ración Diaria
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Compras')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
        >
          Ver Compras
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddCompra')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
        >
          Registrar Compra
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Ventas')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
        >
          Ver Ventas
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddVenta')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
        >
          Registrar Venta
        </Button>
        
        <Button
          mode="contained"
          onPress={() => navigation.navigate('TestDB')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
        >
          Probar Base de Datos
        </Button>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: 20,
    color: 'white',
    alignSelf: 'flex-start',
  },
  button: {
    width: '70%',
    marginTop: 16,
    backgroundColor: '#3498db',
  },
  buttonLabel: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: 'white',
  },
});

export default MenuScreen;