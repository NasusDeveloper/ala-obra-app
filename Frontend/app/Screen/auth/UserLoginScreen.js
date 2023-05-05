import React from "react";
import { View, Text, SafeAreaView, Keyboard } from "react-native";
import { useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { styles, toastConfig } from "../../../style";
import { Button } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import Checkbox from "expo-checkbox";



const UserLoginScreen = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation()
  const [tc, setTc] = useState("false")
  const clearTextInput = () => {
    setEmail('')
    setPassword('')
    setTc('false')
  }

  const handleFormSubmit = () => {
    if (email && password) {
      console.log("Inicio de sesion exitoso")
      const formData = { email, password }
      console.log(formData)
      clearTextInput()
      Toast.show({
        type: 'done',
        position: 'top',
        topOffset: 0,
        text1: "Inicio de sesion exitoso"
      })

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
            <Button title='Entrar' onPress={handleFormSubmit} color='purple' />
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>

              <TouchableWithoutFeedback onPress={()=>{navigation.navigate('SendPasswordResetEmail')}}>
                 <Text style={{fontWeight:'bold'}}>Has olvidado tu contraseña?</Text>
              </TouchableWithoutFeedback>

            </View >

            <View style={{flex: 1}}>

              <TouchableWithoutFeedback onPress={()=>{navigation.navigate('Register')}}>
                 <Text style={{fontWeight:'bold'}}>Usuario nuevo? Registrese</Text>
              
              </TouchableWithoutFeedback> 
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default UserLoginScreen
