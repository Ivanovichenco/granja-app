import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getLotes } from '../db';

const DashboardScreen = ({ navigation }) => {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    const loadLotes = async () => {
      try {
        const lotesData = await getLotes();
        // En la nueva API, los resultados ya son un array
        setLotes(lotesData);
      } catch (error) {
        console.error('Error loading lotes:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      loadLotes();
    });

    // Cargar datos inicialmente
    loadLotes();

    return unsubscribe;
  }, [navigation]);

  const renderLoteItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{item.nombre}</Text>
        <Text variant="bodyMedium">Cantidad inicial: {item.cantidad_inicial}</Text>
        <Text variant="bodyMedium">Inicio: {item.fecha_inicio}</Text>
        <Text variant="bodyMedium">Fin: {item.fecha_fin}</Text>
        <Text variant="bodyMedium">Estado: {item.estado}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.Content title="Granja la Y de Potosí" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <View style={styles.content}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Lotes Activos</Text>
        <FlatList
          data={lotes}
          renderItem={renderLoteItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyListText}>No hay lotes activos.</Text>}
        />
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
          onPress={() => navigation.navigate('Ventas')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          elevation={5}
        >
          Ver Ventas
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

export default DashboardScreen;