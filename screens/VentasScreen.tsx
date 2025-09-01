import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getVentas } from '../db';

const VentasScreen = ({ navigation }) => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const loadVentas = async () => {
      try {
        const ventasData = await getVentas();
        // En la nueva API, los resultados ya son un array
        setVentas(ventasData);
      } catch (error) {
        console.error('Error loading ventas:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      loadVentas();
    });

    // Cargar datos inicialmente
    loadVentas();

    return unsubscribe;
  }, [navigation]);

  const renderVentaItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">Venta Lote {item.lote_id}</Text>
        <Text variant="bodyMedium">Cantidad Vendida: {item.cantidad_vendida}</Text>
        <Text variant="bodyMedium">Peso Promedio: {item.Peso} kg</Text>
        <Text variant="bodyMedium">Precio Unitario: {item.precio_unitario}</Text>
        <Text variant="bodyMedium">Total Venta: {item.total_venta}</Text>
        <Text variant="bodyMedium">Fecha: {item.fecha}</Text>
        {item.observaciones ? <Text variant="bodyMedium">Observaciones: {item.observaciones}</Text> : null}
      </Card.Content>
    </Card>
  );

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.Content title="Ventas" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Ventas Recientes</Text>
        <FlatList
          data={ventas}
          renderItem={renderVentaItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyListText}>No hay ventas registradas.</Text>}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddVenta')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
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
  },
  buttonLabel: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: 'white',
  },
  sectionTitle: {
    marginBottom: 10,
    color: 'white',
  },
  emptyListText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default VentasScreen;
