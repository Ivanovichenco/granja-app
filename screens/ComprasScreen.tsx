import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const ComprasScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.Content title="Compras" subtitle={'Resumen de Compras'} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Compras Recientes</Text>
            <Text variant="bodyMedium">Aquí se mostrará un resumen de las compras recientes.</Text>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddCompra')}
          style={styles.button}
        >
          Añadir Nueva Compra
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

export default ComprasScreen;
