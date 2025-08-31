import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Card, Text } from 'react-native-paper';

const AddRacionScreen = ({ navigation }) => {
  const [fecha, setFecha] = useState('');
  const [loteId, setLoteId] = useState('');
  const [peso, setPeso] = useState('');
  const [tipoAlimento, setTipoAlimento] = useState('');
  const [consumido, setConsumido] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleAddRacion = () => {
    console.log('Fecha:', fecha);
    console.log('Lote ID:', loteId);
    console.log('Peso:', peso);
    console.log('Tipo de Alimento:', tipoAlimento);
    console.log('Consumido:', consumido);
    console.log('Observaciones:', observaciones);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Añadir Ración Diaria" />
      </Appbar.Header>
      <View style={styles.content}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Detalles de la Ración</Text>
            <TextInput
              label="Fecha (YYYY-MM-DD)"
              value={fecha}
              onChangeText={setFecha}
              style={styles.input}
            />
            <TextInput
              label="ID del Lote"
              value={loteId}
              onChangeText={setLoteId}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Peso del Alimento (kg)"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Tipo de Alimento"
              value={tipoAlimento}
              onChangeText={setTipoAlimento}
              style={styles.input}
            />
            <TextInput
              label="Alimento Consumido (kg)"
              value={consumido}
              onChangeText={setConsumido}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Observaciones"
              value={observaciones}
              onChangeText={setObservaciones}
              style={styles.input}
            />
            <Button mode="contained" onPress={handleAddRacion} style={styles.button}>
              Guardar Ración
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
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

export default AddRacionScreen;