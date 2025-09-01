import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, TextInput, Button, Card, Text, Switch } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { addLote } from '../db';

const AddLoteScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState(true); // true for activo, false for inactivo

  const handleAddLote = async () => {
    // Validar campos requeridos
    if (!nombre || !cantidad || !fechaInicio) {
      Alert.alert('Error', 'Por favor, complete todos los campos requeridos');
      return;
    }

    // Validar que cantidad sea un número válido
    const cantidadNum = parseInt(cantidad);
    if (isNaN(cantidadNum)) {
      Alert.alert('Error', 'La cantidad debe ser un número válido');
      return;
    }

    try {
      await addLote(nombre, cantidadNum, fechaInicio, fechaFin || null, estado ? 'activo' : 'inactivo');
      Alert.alert('Éxito', 'Lote añadido correctamente');
      // Limpiar campos
      setNombre('');
      setCantidad('');
      setFechaInicio('');
      setFechaFin('');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al añadir el lote');
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
        <Appbar.Content title="Añadir Nuevo Lote" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
      <View style={styles.content}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Detalles del Lote</Text>
            <TextInput
              label="Nombre del Lote"
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
            <TextInput
              label="Cantidad Inicial"
              value={cantidad}
              onChangeText={setCantidad}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Fecha de Inicio (YYYY-MM-DD)"
              value={fechaInicio}
              onChangeText={setFechaInicio}
              style={styles.input}
            />
            <TextInput
              label="Fecha de Fin (YYYY-MM-DD)"
              value={fechaFin}
              onChangeText={setFechaFin}
              style={styles.input}
            />
            <View style={styles.switchContainer}>
              <Text variant="bodyMedium">Estado: {estado ? 'Activo' : 'Inactivo'}</Text>
              <Switch value={estado} onValueChange={setEstado} />
            </View>
            <Button mode="contained" onPress={handleAddLote} style={styles.button} labelStyle={styles.buttonLabel} elevation={5}>
              Guardar Lote
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonLabel: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: 'white',
  }
});

export default AddLoteScreen;