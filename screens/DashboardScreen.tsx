import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Granja de Pollos" subtitle={'Resumen de Lotes'} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Lotes Activos</Text>
            <Text variant="bodyMedium">Aquí se mostrará un resumen de los lotes de pollos activos.</Text>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddLote')}
          style={styles.button}
        >
          Añadir Nuevo Lote
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddRacion')}
          style={styles.button}
        >
          Añadir Ración Diaria
        </Button>
      </View>
    </View>
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

export default DashboardScreen;