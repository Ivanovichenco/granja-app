import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Card, Text, HelperText, Menu, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getLotes } from '../db';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddRacionScreen = ({ navigation }) => {
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loteId, setLoteId] = useState('');
  const [peso, setPeso] = useState('');
  const [tipoAlimento, setTipoAlimento] = useState('');
  const [consumido, setConsumido] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [lotes, setLotes] = useState([]);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const lotesData = await getLotes();
        setLotes(lotesData);
      } catch (error) {
        console.error('Error fetching lots:', error);
        setError('Error al cargar los lotes');
      }
    };

    fetchLotes();
  }, []);

  const handleAddRacion = () => {
    if (!loteId) {
      setError('Por favor seleccione un lote');
      return;
    }
    
    // Format date as YYYY-MM-DD for submission
    const formattedDate = fecha.toISOString().split('T')[0];
    
    console.log('Fecha:', formattedDate);
    console.log('Lote ID:', loteId);
    console.log('Peso:', peso);
    console.log('Tipo de Alimento:', tipoAlimento);
    console.log('Consumido:', consumido);
    console.log('Observaciones:', observaciones);
    navigation.goBack();
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const selectLote = (id) => {
    setLoteId(id.toString());
    setError('');
    closeMenu();
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Añadir Ración Diaria" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.content}>
          <Card>
            <Card.Content>
              <Text variant="titleLarge">Detalles de la Ración</Text>
              
              <View style={styles.input}>
                <Text style={styles.label}>Fecha</Text>
                <Button
                  mode="outlined"
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dateButton}
                  contentStyle={styles.dateButtonContent}
                >
                  {formatDate(fecha)}
                </Button>
                {showDatePicker && (
                  <DateTimePicker
                    value={fecha}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}
              </View>
              
              <View style={styles.input}>
                <Text style={styles.label}>Lote</Text>
                <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={openMenu}
                      style={styles.selectButton}
                      contentStyle={styles.selectButtonContent}
                    >
                      {loteId 
                        ? lotes.find(lote => lote.id == loteId)?.nombre || `Lote ID: ${loteId}`
                        : "Seleccione un lote"}
                    </Button>
                  }
                >
                  {lotes.map((lote) => (
                    <Menu.Item
                      key={lote.id}
                      onPress={() => selectLote(lote.id)}
                      title={`${lote.nombre} (ID: ${lote.id})`}
                    />
                  ))}
                </Menu>
              </View>
              
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
              
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
      </ScrollView>
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  dateButton: {
    justifyContent: 'flex-start',
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  dateButtonContent: {
    justifyContent: 'flex-start',
  },
  selectButton: {
    justifyContent: 'flex-start',
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  selectButtonContent: {
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: 16,
  },
});

export default AddRacionScreen;