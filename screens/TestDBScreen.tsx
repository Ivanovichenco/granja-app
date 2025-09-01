import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { executeSql, addLote } from '../db';

const TestDBScreen = ({ navigation }) => {
  const [testResults, setTestResults] = useState([]);

  const runTests = async () => {
    const results = [];
    
    try {
      // Test 1: Crear un lote de prueba
      const insertResult = await addLote('Lote de prueba', 100, '2023-01-01', null, 'activo');
      results.push({ test: 'Crear lote', status: 'PASSED', details: `ID: ${insertResult.lastInsertRowId}` });
      
      // Test 2: Consultar lotes
      const lotes = await getLotes();
      // Filtrar para encontrar el lote de prueba
      const lotesPrueba = lotes.filter(lote => lote.nombre === 'Lote de prueba');
      if (lotesPrueba.length > 0) {
        results.push({ test: 'Consultar lotes', status: 'PASSED', details: `Encontrados: ${lotesPrueba.length}` });
      } else {
        results.push({ test: 'Consultar lotes', status: 'FAILED', details: 'No se encontraron lotes' });
      }
      
      setTestResults(results);
    } catch (error) {
      console.error('Error en las pruebas:', error);
      results.push({ test: 'Pruebas de base de datos', status: 'FAILED', details: error.message });
      setTestResults(results);
    }
  };

  const clearTestData = async () => {
    try {
      await executeSql('DELETE FROM lotes WHERE nombre = ?', ['Lote de prueba']);
      Alert.alert('Éxito', 'Datos de prueba eliminados');
      setTestResults([]);
    } catch (error) {
      Alert.alert('Error', 'Error al eliminar datos de prueba');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Prueba de Base de Datos</Title>
          <Paragraph>
            Esta pantalla permite verificar que la base de datos está funcionando correctamente.
          </Paragraph>
          <Button mode="contained" onPress={runTests} style={styles.button}>
            Ejecutar Pruebas
          </Button>
          <Button mode="outlined" onPress={clearTestData} style={styles.button}>
            Limpiar Datos de Prueba
          </Button>
        </Card.Content>
      </Card>

      {testResults.map((result, index) => (
        <Card key={index} style={styles.resultCard}>
          <Card.Content>
            <Title style={result.status === 'PASSED' ? styles.passed : styles.failed}>
              {result.test}
            </Title>
            <Paragraph>{result.details}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginBottom: 16,
  },
  resultCard: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  passed: {
    color: 'green',
  },
  failed: {
    color: 'red',
  },
});

export default TestDBScreen;