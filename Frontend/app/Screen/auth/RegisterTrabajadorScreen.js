import React from "react";
import { View, Text, SafeAreaView, Keyboard, ToastAndroid } from "react-native";
import { useState } from "react";
import { ScrollView, TextInput, } from "react-native-gesture-handler";
import { styles, toastConfig } from "../../../style";
import { Button } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
//no toma el import
//import DocumentPicker from "react-native-document-picker"

import axios from "axios";

const RegisterTrabajadorScreen = () => {
  const [name, setName] = useState("")
  const [rut, setRut] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [direcction, setDirecction] = useState("")
  const [roles, setRoles] = useState("Trabajador")
  const [fotos, setFotos] = useState([])
  const [tc, setTc] = useState(false)

  const clearTextInput = () => {
    setUserName("")
    setRut("")
    setEmail("")
    setPassword("")
    setPassword_confirmation("")
    setDirecction("")
    setRoles("Trabajador")
    setTc(false)
  }
  /*
  function App() {
    const selectDoc = async () => {
      try {
        // const doc = await DocumentPicker.pick({
        //   type: [DocumentPicker.types.pdf],
        //   allowMultiSelection: true
        // });
        // const doc = await DocumentPicker.pickSingle()
        const doc = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
        })
        console.log(doc)
      } catch(err) {
        if(DocumentPicker.isCancel(err)) 
          console.log("User cancelled the upload", err);
        else 
          console.log(err)
      }
    }
  
    return (
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 28,
            textAlign: 'center',
            marginVertical: 40,
          }}>
          Document Picker
        </Text>
        <View style={{marginHorizontal: 40}}>
          <Button title="Select Document" onPress={selectDoc} />
        </View>
      </View>
    );
  }
  */
  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
      maxNumberOfFiles: 5 - fotos.length,
    });

    if (!result.cancelled) {
      setFotos([...fotos, result.uri]);
    }
  };

  const navigation = useNavigation()

  const handleFormSubmit = async () => {

    if (name && rut && email && password && password_confirmation && direcction && fotos && tc) {

      if (password === password_confirmation) {

        const formData = {
          username:
            name,
          rut,
          email,
          password,
          password_confirmation: password_confirmation,
          direcction: direcction,
          roles: "Trabajador",
          fotos,
          tc
        }
        //Coneccion a axios
        axios
          .post("http://192.168.100.171:8000/api/auth/signup", formData)
          .then(Response => {
            console.log(Response.data)
            Toast.show("Registro exitoso", ToastAndroid.SHORT)
            clearTextInput()
          })

          .catch(error => {
            console.log(error)
            ToastAndroid.show("Error en la solicitud", ToastAndroid.SHORT)
          })

      } else {
        console.log("Las contraseñas no coinciden")
        Toast.show({
          type: 'warning',
          position: 'top',
          topOffset: 0,
          text1: "Las contraseñas no coinciden"
        })
      }
    } else {
      console.log("Debe rellenar todos los campos")
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

            </View>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>

              <Text style={styles.labelText}>Direccion: </Text>

              <TextInput style={styles.input} Value={direcction} placeholder="Ingresa tu Direccion" onChangeText={setDirecction} onPress={console.log(direcction)} KeyboardType='roles'></TextInput>

            </View>
          </View>
          <View>
            <Text
              style={{
                paddingHorizontal: 9,
                fontSize: 15,
              }}>
              Certificado de antecedentes:
            </Text>
            <View style={{ marginHorizontal: 40, marginTop:5}}>
              <Button title="Select Document" color='#8200d6'/>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>

              <Checkbox value={tc} onValueChange={setTc} color={tc ? '#4630EB' : undefined} />

              <Text style={styles.labelText}>He leído y acepto los términos y condiciones </Text>

            </View>

            <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>

              <Button title='Aceptar' onPress={handleFormSubmit} color='#8200d6' />


            </View>
            <View style={{ flex:1 , flexDirection: 'row' }}>

              <TouchableWithoutFeedback onPress={() => { navigation.navigate('UserLoginScreen') }}>

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