import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';

const MetodoPago = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddCard = () => {
    // Validar y procesar los datos de la tarjeta aquí
    if (cardNumber === '' || cardHolder === '' || expiry === '' || cvv === '') {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    // Validar la longitud de los números de fecha
    if (expiry.length !== 5) {
      Alert.alert('Error', 'Ingrese una fecha de vencimiento válida (MM/AA)');
      return;
    }

    // Obtener el mes y el año de la fecha de vencimiento
    const month = expiry.slice(0, 2);
    const year = expiry.slice(3, 5);

    // Realizar acciones adicionales, como enviar los datos al servidor, guardar en la base de datos, etc.

    // Restablecer los campos después de agregar la tarjeta
    setCardNumber('');
    setCardHolder('');
    setExpiry('');
    setCvv('');

    Alert.alert('Éxito', 'La tarjeta se ha agregado correctamente');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/metodos-pago.png')}
        style={styles.logo}
      />

      <View style={styles.cardContainer}>
        <Image
          source={require('../../assets/images/credit-card.png')}
          style={styles.cardIcon}
        />
        <TextInput
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
          style={styles.cardInput}
          placeholder="Número de tarjeta"
          keyboardType="numeric"
        />
      </View>

      <TextInput
        value={cardHolder}
        onChangeText={(text) => setCardHolder(text)}
        style={styles.input}
        placeholder="Titular de la tarjeta"
      />

      <View style={styles.row}>
        <View style={styles.dateContainer}>
          <TextInput
            value={expiry}
            onChangeText={(text) => setExpiry(text.replace(/[^0-9/]/g, '').replace(/(\d{2})(\d{2})/, '$1/$2'))}
            style={styles.dateInput}
            placeholder="MM/AA"
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <TextInput
          value={cvv}
          onChangeText={(text) => setCvv(text.replace(/[^0-9]/g, ''))}
          style={styles.cvvInput}
          placeholder="CVV"
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
    
      <Button title="Agregar Tarjeta" onPress={handleAddCard} />
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  logo: {
    width: 200,
    height: 40,
    marginBottom: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIcon: {
    width: 30,
    height: 22,
    marginRight: 10,
  },
  cardInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  dateInput: {
    flex: 1,
  },
  cvvInput: {
    width: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MetodoPago;
