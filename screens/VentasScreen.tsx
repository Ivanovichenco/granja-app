import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const VentasScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.Content title="Ventas" subtitle={'Resumen de Ventas'} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Ventas Recientes</Text>
            <Text variant="bodyMedium">Aquí se mostrará un resumen de las ventas recientes.</Text>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddVenta')}
          style={styles.button}
        >
          Añadir Nueva Venta
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  }
});

export default VentasScreen;
