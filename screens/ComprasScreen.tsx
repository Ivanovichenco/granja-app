import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getCompras } from '../db';

const ComprasScreen = ({ navigation }) => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const loadCompras = async () => {
      try {
        const comprasData = await getCompras();
        // En la nueva API, los resultados ya son un array
        setCompras(comprasData);
      } catch (error) {
        console.error('Error loading compras:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      loadCompras();
    });

    // Cargar datos inicialmente
    loadCompras();

    return unsubscribe;
  }, [navigation]);

  const renderCompraItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{item.concepto}</Text>
        <Text variant="bodyMedium">Proveedor: {item.proveedor}</Text>
        <Text variant="bodyMedium">Tipo: {item.tipo_compra}</Text>
        <Text variant="bodyMedium">Cantidad: {item.cantidad}</Text>
        <Text variant="bodyMedium">Precio Unitario: {item.precio_unitario}</Text>
        <Text variant="bodyMedium">Total: {item.total_compra}</Text>
        <Text variant="bodyMedium">Fecha: {item.fecha_compra}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.Content title="Compras" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Compras Recientes</Text>
        <FlatList
          data={compras}
          renderItem={renderCompraItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyListText}>No hay compras registradas.</Text>}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddCompra')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
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

export default ComprasScreen;
