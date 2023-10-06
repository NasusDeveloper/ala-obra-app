import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"

const PerfilTrabajador = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [direction, setDirection] = useState('123 Main St');
  const [roles, setRoles] = useState(['Usuario']);
  const [password, setPassword] = useState('********');
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, cardNumber: '**** **** **** 1234', cardType: 'visa' },
    { id: 2, cardNumber: '**** **** **** 5678', cardType: 'visa' },
  ]);
  const [editing, setEditing] = useState(false);

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = () => {
    // Realizar acciones adicionales, como actualizar los datos en la base de datos

    // Restablecer el estado de edición
    setEditing(false);

    Alert.alert('Éxito', 'Perfil actualizado correctamente');
  };

  const handleDeletePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleAddPaymentMethod = () => {
    navigation.navigate('MetodoPago');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          source={require('../../assets/images/user-profile.png')}
          style={styles.photo}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{username}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Dirección:</Text>
        {editing ? (
          <TextInput
            value={direction}
            onChangeText={(text) => setDirection(text)}
            style={styles.input}
            placeholder="Ingrese su dirección"
          />
        ) : (
          <Text style={styles.value}>{direction}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Roles:</Text>
        <Text style={styles.value}>{roles.join(', ')}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Métodos de Pago:</Text>
        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentMethodContainer}>
            <Image
              source={require('../../assets/images/credit-card.png')}
              style={styles.paymentMethodIcon}
            />
            <Text style={styles.paymentMethod}>{method.cardNumber}</Text>
            <TouchableOpacity onPress={() => handleDeletePaymentMethod(method.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddPaymentMethod}>
        <Text style={styles.addButtonText}>Agregar Método de Pago</Text>
      </TouchableOpacity>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        {editing ? (
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Ingrese su nueva contraseña"
            secureTextEntry={true}
          />
        ) : (
          <Text style={styles.value}>{password}</Text>
        )}
      </View>

      {editing ? (
        <Button title="Guardar" onPress={handleSaveProfile} />
      ) : (
        <Button title="Editar Perfil" onPress={handleEditProfile} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  photoContainer: {
    marginBottom: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  paymentMethodIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  paymentMethod: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 'auto',
    paddingVertical: 5,
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default PerfilTrabajador;
