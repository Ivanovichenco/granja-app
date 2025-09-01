import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Card, Text, Switch } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const AddLoteScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState(true); // true for activo, false for inactivo

  const handleAddLote = () => {
    // Aquí irá la lógica para guardar el nuevo lote
    console.log('Nombre Lote:', nombre);
    console.log('Cantidad Inicial:', cantidad);
    console.log('Fecha de Inicio:', fechaInicio);
    console.log('Fecha de Fin:', fechaFin);
    console.log('Estado:', estado ? 'activo' : 'inactivo');
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Añadir Nuevo Lote" />
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
            <Button mode="contained" onPress={handleAddLote} style={styles.button}>
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
  }
});

export default AddLoteScreen;