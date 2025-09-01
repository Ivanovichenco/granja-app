import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, TextInput, Button, Card, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { addVenta } from '../db';

const AddVentaScreen = ({ navigation }) => {
  const [loteId, setLoteId] = useState('');
  const [cantidadVendida, setCantidadVendida] = useState('');
  const [peso, setPeso] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [fecha, setFecha] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleAddVenta = async () => {
    // Validar campos requeridos
    if (!loteId || !cantidadVendida || !peso || !precioUnitario || !fecha) {
      Alert.alert('Error', 'Por favor, complete todos los campos requeridos');
      return;
    }

    // Validar que los campos numéricos sean válidos
    const loteIdNum = parseInt(loteId);
    const cantidadVendidaNum = parseInt(cantidadVendida);
    const pesoNum = parseFloat(peso);
    const precioUnitarioNum = parseFloat(precioUnitario);
    
    if (isNaN(loteIdNum) || isNaN(cantidadVendidaNum) || isNaN(pesoNum) || isNaN(precioUnitarioNum)) {
      Alert.alert('Error', 'Los campos numéricos deben contener valores válidos');
      return;
    }

    // Calcular total de venta
    const totalVenta = cantidadVendidaNum * precioUnitarioNum;

    try {
      await addVenta(
        fecha, 
        loteIdNum, 
        cantidadVendidaNum, 
        pesoNum, 
        precioUnitarioNum, 
        totalVenta, 
        observaciones || null
      );
      Alert.alert('Éxito', 'Venta añadida correctamente');
      // Limpiar campos
      setLoteId('');
      setCantidadVendida('');
      setPeso('');
      setPrecioUnitario('');
      setFecha('');
      setObservaciones('');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al añadir la venta');
      console.error(error);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Añadir Nueva Venta" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Detalles de la Venta</Text>
            <TextInput
              label="ID del Lote *"
              value={loteId}
              onChangeText={setLoteId}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Cantidad Vendida *"
              value={cantidadVendida}
              onChangeText={setCantidadVendida}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Peso Promedio (kg) *"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Precio Unitario *"
              value={precioUnitario}
              onChangeText={setPrecioUnitario}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Fecha de Venta (YYYY-MM-DD) *"
              value={fecha}
              onChangeText={setFecha}
              style={styles.input}
            />
            <TextInput
              label="Observaciones"
              value={observaciones}
              onChangeText={setObservaciones}
              style={styles.input}
              multiline
              numberOfLines={3}
            />
            <Button mode="contained" onPress={handleAddVenta} style={styles.button} labelStyle={styles.buttonLabel} elevation={5}>
              Guardar Venta
            </Button>
          </Card.Content>
        </Card>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  buttonLabel: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: 'white',
  }
});

export default AddVentaScreen;
