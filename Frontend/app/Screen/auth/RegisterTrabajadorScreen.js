import React, { useEffect } from "react";
import { View, Text, SafeAreaView, ToastAndroid } from "react-native";
import { useState } from "react";
import { ScrollView, TextInput, } from "react-native-gesture-handler";
import { styles, toastConfig } from "../../../style";
import { Button } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from "axios";
import * as DocumentPicker from "expo-document-picker"

const RegisterTrabajadorScreen = () => {

  const [name, setTrabajadorName] = useState("")
  const [rut, setRut] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [direcction, setDirecction] = useState("")
  const [roles, setRoles] = useState("trabajador")
  const [tc, setTc] = useState(false)
  const [pdf, setPdf] = useState(null)

  const formatRut = (text) => {
    const cleanRut = text.replace(/[^0-9kK]/g, ""); // Remover caracteres no numéricos ni 'k' ni 'K'
    const rutLength = cleanRut.length;
  
    if (rutLength <= 9) {
      let formattedRut = "";
  
      if (rutLength <= 2) {
        formattedRut = cleanRut.replace(/^(\d{1,2})$/, "$1");
      } else if (rutLength <= 5) {
        formattedRut = cleanRut.replace(/^(\d{1,2})(\d{0,3})?$/, "$1.$2");
      } else if (rutLength <= 8) {
        formattedRut = cleanRut.replace(/^(\d{1,2})(\d{0,3})(\d{0,3})?$/, "$1.$2.$3");
      } else {
        formattedRut = cleanRut.replace(/^(\d{1,2})(\d{0,3})(\d{0,3})(\w{0,1})?$/, "$1.$2.$3-$4");
      }
  
      setRut(formattedRut);
    }
  };

  const clearTextInput = () => {
    setTrabajadorName("")
    setRut("")
    setEmail("")
    setPassword("")
    setPassword_confirmation("")
    setDirecction("")
    setRoles("trabajador")
    setTc(false)
    setPdf(null)
  }

  const navigation = useNavigation()

  const handlePickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({type: 'application/pdf'})
      if (result.type === 'success') {
        setPdf(result.uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormSubmit = () => {
    if (name && rut && email && password && password_confirmation && direcction && tc && pdf) {
      if(password === password_confirmation) {
        const formData = {
          trabajadorname: 
          name,
          rut,
          email,
          password,
          password_confirmation: password_confirmation,
          direcction: direcction,
          roles: "",
          tc,
          pdf: pdf,
        }

        //Coneccion a axios
        axios
          .post("http://192.168.100.171:8000/api/auth/signupTrabajador", formData)
          .then(Response => {
            console.log(Response.data)
            Toast.show("Registro exitoso", ToastAndroid.SHORT)
            clearTextInput()
          })
          .catch(error => {
            console.log(error)
            ToastAndroid.show("Error en la solicitud", ToastAndroid.SHORT)
          })
} else {console.log("Las contraseñas no coinciden")
    Toast.show({
      type: 'warning',
      position: 'top',
      topOffset: 0,
      text1: "Las contraseñas no coinciden"
      })
  }
} else {console.log("Debe rellenar todos los campos")
    Toast.show({
      type: 'warning',
      position: 'top',
      topOffset: 0,
      text1: "Debe rellenar todos los campos"
    })
  }
}
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
              <TextInput style={styles.input} Value={name} onChangeText={setTrabajadorName} placeholder="Escribe tu Nombre" onPress={console.log(name)} />
            </View>
            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Rut: </Text>
            <TextInput
              style={styles.input}
              value={rut}
              placeholder="Ingresa tu rut"
              onChangeText={(text) => formatRut(text)}
            />
          </View>
            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
              <Text style={styles.labelText}>Email: </Text>
              <TextInput style={styles.input} Value={email} placeholder="Ingresa tu Correo electronico" onChangeText={setEmail} onPress={console.log(email)} KeyboardType='email-address'></TextInput>
            </View>
            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
              <Text style={styles.labelText}>Contraseña: </Text>
              <TextInput style={styles.input} Value={password} placeholder="Ingresa tu Contraseña" onChangeText={setPassword} onPress={console.log(password)} secureTextEntry={true}></TextInput>
            </View>
            <View style={[styles.inputWithLabel ,{ marginBottom: 10 }]}>
              <Text style={styles.labelText}>Confirma la Contraseña </Text>
              <TextInput style={styles.input} Value={password_confirmation} placeholder="Ingresa tu Contraseña" onChangeText={setPassword_confirmation} onPress={console.log(password_confirmation)} secureTextEntry={true}></TextInput>
            </View>
            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
              <Text style={styles.labelText}>Direccion: </Text>
              <TextInput style={styles.input} Value={direcction} placeholder="Ingresa tu Direccion" onChangeText={setDirecction} onPress={console.log(direcction)} KeyboardType='roles'></TextInput>
            </View>
            <View style={[styles.inputWithLabel, {marginBottom: 10}]}>
              <Text style={styles.labelText}>PDF: </Text>
              <Button title="Seleccionar PDF" onPress={handlePickPdf} />
              {pdf && <Text>{pdf}</Text>}
            </View>
            <View style={{ flex: 1, flexDirection: 'row' , marginTop: 10}}>
              <Checkbox value={tc} onValueChange={setTc} color={tc ? '#4630EB' : undefined} />
              <Text style={styles.labelText}>He leído y acepto los términos y condiciones </Text>
            </View>
            <View style={{ width: 200, alignSelf: 'center', margin: 20}}>
            <Button title='Aceptar' onPress={handleFormSubmit} color='#8200d6' disabled={!tc} />
            </View>
            <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => { navigation.navigate("UserLoginScreen") }}>
              <Text style={{ fontWeight: 'bold', }}>Ya se ha registrado? inicie sesion</Text>
            </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default RegisterTrabajadorScreen