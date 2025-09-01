import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Card, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const AddCompraScreen = ({ navigation }) => {
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');

  const handleAddCompra = () => {
    // Aquí irá la lógica para guardar la nueva compra
    console.log('Producto:', producto);
    console.log('Cantidad:', cantidad);
    console.log('Precio:', precio);
    console.log('Fecha de Compra:', fechaCompra);
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Añadir Nueva Compra" />
      </Appbar.Header>
      <View style={styles.content}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Detalles de la Compra</Text>
            <TextInput
              label="Producto"
              value={producto}
              onChangeText={setProducto}
              style={styles.input}
            />
            <TextInput
              label="Cantidad"
              value={cantidad}
              onChangeText={setCantidad}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Precio"
              value={precio}
              onChangeText={setPrecio}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Fecha de Compra (YYYY-MM-DD)"
              value={fechaCompra}
              onChangeText={setFechaCompra}
              style={styles.input}
            />
            <Button mode="contained" onPress={handleAddCompra} style={styles.button}>
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
});

export default AddCompraScreen;
