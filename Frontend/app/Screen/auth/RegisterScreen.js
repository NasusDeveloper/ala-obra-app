import React from "react"
import axios from "axios"

import { View, Text, SafeAreaView, Keyboard } from "react-native"
import { useState } from "react"
import { ScrollView, TextInput, } from "react-native-gesture-handler"
import { styles, toastConfig } from "../../../style"
import { Button } from "react-native"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import Checkbox from "expo-checkbox"
import { useNavigation } from "@react-navigation/native"
import { TouchableWithoutFeedback } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [rut, setRut] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [tc, setTc] = useState("false")

  const clearTextInput = () => {
    setName('')
    setRut('')
    setEmail('')
    setPassword('')
    setPassword_confirmation('')
    setTc('false')
  }

  const navigation = useNavigation()

  const handleFormSubmit = async () => {

    if (name && rut && email && password && password_confirmation && tc) {

      if (password === password_confirmation) {

        const formData = { name, rut, email, password, password_confirmation, tc }

        console.log(formData)

        clearTextInput()

        try {
          const response = await axios.post("http://localhost:8080/api/auth/register", formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          })

          .then(response => {
            console.log(response.data)
          })
          
          .catch(error => {
            console.log(error)
          })

          Toast.show({
            type: 'done',
            position: 'top',
            topOffset: 0,
            text1: "Registro Exitoso"
          })
        } catch (error) {
          console.error(error)
          Toast.show({
            type: 'error',
            position: 'top',
            topOffset: 0,
            text1: "Error al registrar"
          })
        }
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
              <Text style={styles.labelText}>Nombre:</Text>
              <TextInput style={styles.input} Value={name} onChangeText={setName} 
              placeholder="Escribe tu Nombre" onPress={console.log(name)} />
            </View>

            <View style={styles.inputWithLabel}>
              <Text style={styles.labelText}>Rut:</Text>
              <TextInput style={styles.input} Value={rut} onChangeText={setRut} 
              placeholder="Escribe tu rut" onPress={console.log(rut)} />
            </View>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
              <Text style={styles.labelText}>Email: </Text>
              <TextInput style={styles.input} Value={email} placeholder="Ingresa tu Correo electronico"
                onChangeText={setEmail} onPress={console.log(email)} KeyboardType='email-address'></TextInput>
            </View>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
              <Text style={styles.labelText}>Contraseña: </Text>
              <TextInput style={styles.input} Value={password} placeholder="Ingresa tu Contraseña"
                onChangeText={setPassword} onPress={console.log(password)} secureTextEntry={true}></TextInput>
            </View>

            <View style={[styles.inputWithLabel ,{ marginBottom: 10 }]}>
              <Text style={styles.labelText}>Confirma la Contraseña </Text>
              <TextInput style={styles.input} Value={password_confirmation} placeholder="Ingresa tu Contraseña"
                onChangeText={setPassword_confirmation} onPress={console.log(password_confirmation)} secureTextEntry={true}></TextInput>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' , marginTop: 10}}>
              <Checkbox value={tc} onValueChange={setTc} color={tc ? '#4630EB' : undefined} />
              <Text style={styles.labelText}>He leído y acepto los términos y condiciones </Text>
            </View>

            <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
              <Button title='Aceptar' onPress={handleFormSubmit} color='purple' />
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <TouchableWithoutFeedback onPress={()=>{navigation.navigate('UserLogin')}}>
                <Text style={{ fontWeight:'bold'}}>ya se ha registrado? inicie sesion</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default RegisterScreen