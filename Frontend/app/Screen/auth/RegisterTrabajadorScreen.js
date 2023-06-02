import React, { useState } from "react";
import { View, Text, SafeAreaView, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native";
import Checkbox from "expo-checkbox";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const RegisterTrabajadorScreen = () => {
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
          .post("http://192.168.100.171:8000/api/auth/signup", formData)
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
      <View>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput placeholder="Rut" value={rut} onChangeText={setRut} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirmar Contraseña"
          value={password_confirmation}
          onChangeText={setPassword_confirmation}
          secureTextEntry
        />
        <TextInput
          placeholder="Dirección"
          value={direcction}
          onChangeText={setDirecction}
        />
        <Button title="Seleccionar Documento" onPress={handleDocumentSelection} />
        {selectedDocument && (
          <Text>Documento seleccionado: {selectedDocument}</Text>
        )}
        <View>
          <Checkbox value={tc} onValueChange={setTc} />
          <Text>Acepto los términos y condiciones</Text>
        </View>
        <Button title="Aceptar" onPress={handleFormSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default RegisterTrabajadorScreen;
