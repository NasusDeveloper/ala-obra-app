import React, { useEffect } from "react"
import axios from "axios"
import { useState } from "react"

import { TouchableWithoutFeedback } from "react-native"

import { View, Text, SafeAreaView, ToastAndroid } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler"

import { Button } from "react-native"
import Checkbox from "expo-checkbox"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Toast } from "react-native-toast-message/lib/src/Toast"
import { styles, toastConfig } from "../../../style"


const UserLoginScreen = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation()
  const [tc, setTc] = useState("")
  const clearTextInput = () => {
    setEmail('')
    setPassword('')
    setTc('')
  }

  useEffect(() => {
    checkToken() //Verificar si hay un token almacenado
  }, [])

  const checkToken = async () => {
    //Verificar si hay un token almacenado
    const token = await AsyncStorage.getItem("token")
    if(token){
      navigation.navigate("HomeScreen")//Si hay un token, redirigir al usuario a la pantalla de inicio
    }
  }
 
  const handleFormSubmit = async () => {
    if (email && password) {
      try {
        const response = await axios.post("http://192.168.100.171:8000/api/auth/signin", {
          email,
          password
        })

        console.log("Inicio de sesión exitoso")

        console.log(response.data)

        clearTextInput()
        
        Toast.show({
          type: 'done',
          position: 'top',
          topOffset: 0,
          text1: "Inicio de sesión exitoso"
        })

        //Guardar el token en el almacenamiento local
        await AsyncStorage.setItem("token", response.data.token)

        //Configurar el token en el encabezado de autorización
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`

        //Redirigir al usuario a la pantalla de inicio
        navigation.navigate("HomeScreen")

      } catch (error) {
        console.log("Error al iniciar sesión:", error.message)
        ToastAndroid.show(
          "Error al iniciar sesión",
          ToastAndroid.SHORT)
      }
    } else {
      console.log("Debe rellenar todos los campos");
      ToastAndroid.show(
        "Debe rellenar todos los campos",
        ToastAndroid.SHORT
      )
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

            <Text style={styles.labelText}>Correo:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Ingresa tu Correo electronico"
              onPress={console.log(email)} KeyboardType='email-address' />

          </View>

          <View style={styles.inputWithLabel}>

            <Text style={styles.labelText}>Contraseña:</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Ingresa tu Contraseña"
              onPress={console.log(password)} secureTextEntry={true} />

          </View>

          <View style={{ flex: 1, flexDirection: 'row' , marginTop: 10}}>
              <Checkbox value={tc} onValueChange={setTc} color={tc ? '#4630EB' : undefined} />
              <Text style={styles.labelText}>Mantener sesion iniciada </Text>
            </View>

          <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
            <Button title='Entrar' onPress={handleFormSubmit} color='#8200d6' />
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>

              <TouchableWithoutFeedback onPress={()=>{navigation.navigate('SendPasswordResetEmailScreen')}}>
                 <Text style={{fontWeight:'bold'}}>Has olvidado tu contraseña?</Text>
              </TouchableWithoutFeedback>

            </View >

            <View style={{flex: 1}}>

              <TouchableWithoutFeedback onPress={()=>{navigation.navigate('RegisterScreen')}}>
                 <Text style={{fontWeight:'bold'}}>Usuario nuevo? Registrese como Cliente</Text>
              </TouchableWithoutFeedback> 

          </View>
          
          <View style={{flex: 1}}>

              <TouchableWithoutFeedback onPress={()=>{navigation.navigate('RegisterTrabajadorScreen')}}>
                 <Text style={{fontWeight:'bold'}}>Usuario nuevo? Registrese como Trabajador</Text>
              </TouchableWithoutFeedback> 
              
          </View>

        </View>
      </View>
      </ScrollView>
    </SafeAreaView>

   
  )
}
export default UserLoginScreen