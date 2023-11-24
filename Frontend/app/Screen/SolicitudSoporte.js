import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SolicitudSoporteScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendSupportRequest = async () => {
    try {
      const requestBody = {
        name,
        email,
        subject,
        message,
      };

      const response = await fetch("http://192.168.100.171:8000/api/auth/crearSolicitudSoporte", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        Alert.alert(
          'Solicitud Enviada',
          'Tu solicitud de soporte ha sido enviada correctamente.'
        );
      } else {
        throw new Error('Error al enviar la solicitud');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al enviar la solicitud de soporte.');
    }
  };

  const mostrarSolicitudes = async () => {
    try {
      const response = await fetch("http://192.168.100.171:8000/api/auth/SolicitudSoporte");
      if (response.ok) {
        const data = await response.json();
        console.log('Solicitudes Creadas:', data.supportRequests);
        // Aquí puedes manejar la visualización de las solicitudes en tu app
      } else {
        throw new Error('Error al obtener las solicitudes');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al obtener las solicitudes de soporte.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitud de Soporte</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        placeholder="Nombre"
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        value={subject}
        onChangeText={(text) => setSubject(text)}
        style={styles.input}
        placeholder="Asunto"
      />
      <TextInput
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={styles.messageInput}
        placeholder="Mensaje"
        multiline
      />
      <Button title="Enviar" onPress={handleSendSupportRequest} />
      <Button title="Solicitudes Creadas" onPress={mostrarSolicitudes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  messageInput: {
    height: 120,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
});

export default SolicitudSoporteScreen;
