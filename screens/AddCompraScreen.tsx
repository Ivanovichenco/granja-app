import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, TextInput, Button, Card, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { addCompra } from '../db';

const AddCompraScreen = ({ navigation }) => {
  const [proveedor, setProveedor] = useState('');
  const [concepto, setConcepto] = useState('');
  const [tipoCompra, setTipoCompra] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');
  const [factura, setFactura] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleAddCompra = async () => {
    // Validar campos requeridos
    if (!proveedor || !concepto || !tipoCompra || !cantidad || !precioUnitario || !fechaCompra) {
      Alert.alert('Error', 'Por favor, complete todos los campos requeridos');
      return;
    }

    // Validar que cantidad y precio sean números válidos
    const cantidadNum = parseFloat(cantidad);
    const precioUnitarioNum = parseFloat(precioUnitario);
    
    if (isNaN(cantidadNum) || isNaN(precioUnitarioNum)) {
      Alert.alert('Error', 'Cantidad y precio deben ser números válidos');
      return;
    }

    // Calcular total de compra
    const totalCompra = cantidadNum * precioUnitarioNum;

    try {
      await addCompra(
        fechaCompra, 
        proveedor, 
        concepto, 
        tipoCompra, 
        cantidadNum, 
        precioUnitarioNum, 
        totalCompra, 
        factura || null, 
        observaciones || null
      );
      Alert.alert('Éxito', 'Compra añadida correctamente');
      // Limpiar campos
      setProveedor('');
      setConcepto('');
      setTipoCompra('');
      setCantidad('');
      setPrecioUnitario('');
      setFechaCompra('');
      setFactura('');
      setObservaciones('');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al añadir la compra');
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

        <Appbar.Content title="Añadir Nueva Compra" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Detalles de la Compra</Text>
            <TextInput
              label="Proveedor *"
              value={proveedor}
              onChangeText={setProveedor}
              style={styles.input}
            />
            <TextInput
              label="Concepto *"
              value={concepto}
              onChangeText={setConcepto}
              style={styles.input}
            />
            <TextInput
              label="Tipo de Compra *"
              value={tipoCompra}
              onChangeText={setTipoCompra}
              style={styles.input}
            />
            <TextInput
              label="Cantidad *"
              value={cantidad}
              onChangeText={setCantidad}
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
              label="Fecha de Compra (YYYY-MM-DD) *"
              value={fechaCompra}
              onChangeText={setFechaCompra}
              style={styles.input}
            />
            <TextInput
              label="Número de Factura"
              value={factura}
              onChangeText={setFactura}
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
            <Button mode="contained" onPress={handleAddCompra} style={styles.button} labelStyle={styles.buttonLabel} elevation={5}>
              Guardar Compra
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

export default AddCompraScreen;
