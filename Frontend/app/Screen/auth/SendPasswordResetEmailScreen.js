import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import { styles, toastConfig } from '../../../style'

const SendPasswordResetEmailScreen = () => {
  const [email, setEmail] = useState('');

  const clearTextInput = () => {
    setEmail('');
  };

  const handleFormSubmit = () => {
    if (email) {
      const API_URL = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PWS}@cluster0.lzwva09.mongodb.net/?retryWrites=true&w=majority`; //aquí debe ir la URL de nuestro servidor

      axios.post(API_URL, {
        email: email,
      })
      .then((response) => {
        console.log('Email de recuperación de contraseña enviado con éxito');
        Toast.show({
          type: 'done',
          position: 'top',
          topOffset: 0,
          text1: 'Email de recuperación enviado. Por favor revise su Email',
        });
      })
      .catch((error) => {
        console.log('Error al enviar el correo electrónico de recuperación de contraseña:', error);
        Toast.show({
          type: 'error',
          position: 'top',
          topOffset: 0,
          text1: 'Error al enviar el correo electrónico de recuperación de contraseña',
        });
      });

      clearTextInput();
    } else {
      console.log('Email Requerido');
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        text1: 'Email Requerido',
      });
    }
  };

  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <View style={{ marginHorizontal:30}}>
        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Escriba su Email"
            onPress={console.log(email)}
            keyboardType='email-address'
          />
        </View>
        <View style={{width: 200, alignSelf: 'center', margin: 20 }}>
          <Button title="Enviar" onPress={handleFormSubmit} color= 'purple' />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendPasswordResetEmailScreen;
