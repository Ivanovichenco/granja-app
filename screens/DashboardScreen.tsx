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
        <Text variant="bodyMedium">Número de pollos: {item.cantidad_inicial}</Text>
        <Text variant="bodyMedium">Fecha final: {item.fecha_fin}</Text>
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
        <View style={styles.bottomBar}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Menu')}
            style={styles.menuButton}
            labelStyle={styles.menuButtonLabel}
          >
            Menú
          </Button>
        </View>
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
  sectionTitle: {
    marginBottom: 10,
    color: 'white',
  },
  emptyListText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  menuButton: {
    width: '70%',
  },
  menuButtonLabel: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: 'white',
  },
});

export default DashboardScreen;