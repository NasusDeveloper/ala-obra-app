import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SolicitudSoporteScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendSupportRequest = () => {
    // Aquí puedes agregar la lógica para enviar la solicitud de soporte
    // Por ejemplo, puedes hacer una solicitud a un servidor o enviar un correo electrónico al equipo de soporte

    // Reiniciamos los campos después de enviar la solicitud
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    Alert.alert('Solicitud Enviada', 'Tu solicitud de soporte ha sido enviada correctamente.');
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
