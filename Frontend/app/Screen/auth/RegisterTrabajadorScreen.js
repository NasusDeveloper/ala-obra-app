import { View, Text, SafeAreaView, ToastAndroid } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ScrollView, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { TouchableWithoutFeedback } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { styles, toastConfig } from "../../../style";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import axios from "axios";

import UserLoginScreen from "./UserLoginScreen";

const RegisterTrabajadorScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [direcction, setDirecction] = useState("");
  const [roles, setRoles] = useState("Trabajador");
  const [tc, setTc] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const clearTextInput = () => {
    setName("");
    setRut("");
    setEmail("");
    setPassword("");
    setPassword_confirmation("");
    setDirecction("");
    setRoles("Trabajador");
    setTc(false);
    setSelectedDocument(null);
  };
  
  const handleFormSubmit = async () => {
    if (
      name &&
      rut &&
      email &&
      password &&
      password_confirmation &&
      direcction &&
      tc
    ) {
      if (password === password_confirmation) {
        const formData = {
          username: name,
          rut,
          email,
          password,
          password_confirmation,
          direcction,
          roles: "Trabajador",
          tc,
          document: selectedDocument,
        };

        axios
          .post("http://192.168.100.171:8000/api/auth/registro", formData)
          .then((response) => {
            console.log(response.data);
            ToastAndroid.show("Registro exitoso", ToastAndroid.SHORT);
            clearTextInput();
          })
          .catch((error) => {
            console.log(error);
            ToastAndroid.show("Error en la solicitud", ToastAndroid.SHORT);
          });
      } else {
        console.log("Las contraseñas no coinciden");
        ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT);
      }
    } else {
      console.log("Debe rellenar todos los campos");
      ToastAndroid.show(
        "Debe rellenar todos los campos",
        ToastAndroid.SHORT
      );
    }
  };

  const handleDocumentSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.cancelled) {
        setSelectedDocument(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <SafeAreaView>

      <Toast config={toastConfig} />

      <ScrollView keyboardShouldPersistTaps='handled'>

        <View style={{ marginHorizontal: 30 }}>

          <View style={[styles.inputWithLabel, { marginBottom: 10, marginTop: 30 }]}>

            <View style={{ alignSelf: 'center', marginBottom: 10 }}>

              <MaterialIcons name='construction' color='#E8C64A' size={100} />

            </View>

            <View style={styles.inputWithLabel}>

              <Text style={styles.labelText}>Nombre: </Text>

              <TextInput style={styles.input} Value={name} onChangeText={setName} placeholder="Escribe tu Nombre" onPress={console.log(name)} />

            </View>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>

              <Text style={styles.labelText}>Rut: </Text>

              <TextInput style={styles.input} Value={rut} placeholder="Ingresa tu rut" onChangeText={setRut} onPress={console.log(rut)} KeyboardType='Rut'></TextInput>

            </View>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>

              <Text style={styles.labelText}>Email: </Text>

              <TextInput style={styles.input} Value={email} placeholder="Ingresa tu Correo electronico" onChangeText={setEmail} onPress={console.log(email)} KeyboardType='email-address'></TextInput>
            </View>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>

              <Text style={styles.labelText}>Contraseña: </Text>

              <TextInput style={styles.input} Value={password} placeholder="Ingresa tu Contraseña" onChangeText={setPassword} onPress={console.log(password)} secureTextEntry={true}></TextInput>

            </View>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>

              <Text style={styles.labelText}>Confirma la Contraseña </Text>

              <TextInput style={styles.input} Value={password_confirmation} placeholder="Ingresa tu Contraseña" onChangeText={setPassword_confirmation} onPress={console.log(password_confirmation)} secureTextEntry={true}></TextInput>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  paddingHorizontal: 10,
                  marginTop: 10
                }}>
                Certificado de antecedentes:
              </Text>
              <View style={{ marginHorizontal: 40, padding: 10 }}>
                <Button title="Seleccionar Documento" onPress={handleDocumentSelection} color='#8200d6' />
              </View>

              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Checkbox value={tc} onValueChange={setTc} color={tc ? '#4630EB' : undefined} />
                <Text style={styles.labelText}>He leído y acepto los términos y condiciones </Text>
              </View>

              <View style={{padding:10}}>
                <Button title="Aceptar" onPress={handleFormSubmit} color='#8200d6' />
              </View>

            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>

              <TouchableWithoutFeedback onPress={() => { navigation.navigate("UserLoginScreen") }}>
                <Text style={{ fontWeight: 'bold', }}>Ya se ha registrado? inicie sesion</Text>
              </TouchableWithoutFeedback>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterTrabajadorScreen;
