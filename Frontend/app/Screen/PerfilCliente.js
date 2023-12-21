import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import axios from 'axios';

const PerfilCliente = () => {
  const navigation = useNavigation()
  const [username, setUserName] = useState('Usuario Ejemplo');
  const [email, setEmail] = useState('example@example.com');
  const [direcction, setDirecction] = useState('Dirección de Ejemplo');
  const [roles, setRoles] = useState(['Cliente']);
  const [password, setPassword] = useState('');
  const [editing, setEditing] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]); // Métodos de pago vacíos
  const handleCancelEdit = () => {
    setEditing(false); // Salir del modo de edición
    // Aquí podrías agregar lógica adicional si es necesario al cancelar la edición
  };

  useEffect(() => {
    // Realiza una solicitud para obtener los datos del cliente al cargar el componente
    axios.get("http://192.168.100.171:8000/api/auth/usuarioMostrar")
      .then(response => {
        const { username, email, direcction, roles } = response.data;
        setUserName(username);
        setEmail(email);
        setDirecction(direcction);
        setRoles(roles);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);
  console.log(username, email, direcction, roles)

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

  const handleUpdatePassword = () => {
    // Realizar una solicitud para actualizar la contraseña
    axios.put("http://192.168.100.171:8000/api/auth/trabajadorPassword", { newPassword: newPassword })
      .then(response => {
        Alert.alert('Éxito', 'Contraseña actualizada correctamente');
        setNewPassword(''); // Limpiar el campo de nueva contraseña
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'No se pudo actualizar la contraseña');
      });
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
        <Text style={styles.label}>Nombre:</Text>
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
            value={direcction}
            onChangeText={(text) => setDirecction(text)}
            style={styles.input}
            placeholder="Ingrese su dirección"
          />
        ) : (
          <Text style={styles.value}>{direcction}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Roles:</Text>
        <Text style={styles.value}>{roles ? roles.join(', '): 'Ningun rol asignado'}</Text>
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
      
      {!editing && (
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
      )}
      {editing && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      )}
      {editing && (
        <TouchableOpacity style={styles.savedButton} onPress={handleSaveProfile}>
        <Text style={styles.savedButtonText}>Guardar</Text>
        </TouchableOpacity>
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
  cancelButton: {
    backgroundColor: '#FF6347',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  savedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PerfilCliente;
