import React, { useState } from "react";
import { View, TextInput, Button, Image, TouchableOpacity, Text } from "react-native";
import { styles, toastConfig } from "../../style"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from "expo-image-picker"
import axios from "axios"

const FormularioSolicitud = () => {
  const [nameSolicitud, setNameSolicitud] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [estado, setEstado] = useState("mostrando")
  const [fotos, setFotos] = useState([])

  const handleNameSolicitudChange = (Text) => {
    setNameSolicitud(Text);
  };

  const handleDescripcionChange = (Text) => {
    setDescripcion(Text);
  };

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

  const handleFormSubmit = async () => {
    try {

      //Obtener el token almacenado
      const token = await AsyncStorage.getItem("token")
      console.log("Token:", token)

      //Configurar el token en el encabezado de autorización
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      const formData = new FormData()

      fotos.forEach((foto, index) => {
        formData.append(`fotos[${index}]`, {
          uri: foto,
          name: `photos_${index}.jpg`,
          type: 'image/jpeg'
        })
      })

      formData.append("nameSolicitud", nameSolicitud)
      formData.append("descripcion", descripcion)
      formData.append("estado", estado)

      const response = await axios.post(
        "http://192.168.100.171:8000/api/auth/crearSolicitud",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", //Importante para enviar archivos
          }
        }
      )

      // Procesar la respuesta del backend
      console.log(response.data);
      clearTextInput() //Limpia los campos despues de enviar la solicitud
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ marginHorizontal: 30 }}>
      <View style={[styles.inputWithLabel, { marginBottom: 10, marginTop: 30 }]}>
      <View style={styles.inputWithLabel}>
      <TextInput
        style={styles.input}
        placeholder="Nombre (mínimo 10 caracteres)"
        onChangeText={handleNameSolicitudChange}
        value={nameSolicitud}
        onPress={console.log(nameSolicitud)}
      />
      </View>

      <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
      <TextInput
        style={styles.input}
        placeholder="Descripción (máximo 100 caracteres)"
        onChangeText={handleDescripcionChange}
        value={descripcion}
        multiline
        onPress={console.log(descripcion)}
      />
      </View>

      <View style={{ width: 200, alignSelf: 'center', margin: 20}}>
        <Button title="Seleccionar Fotos" onPress={handleImageUpload} color="#8200d6" name="fotos" />
      </View>

      <View>
        {fotos.map((foto, index) => (
          <Image key={index} source={{ uri: foto }} style={{ width: 200, height: 200 }} />
        ))}
      </View>

      <View style={{width: 200, alignSelf: "center", margin: 20}}>
        <Button title="Aceptar" onPress={handleFormSubmit} color="#8200d6"/>
      </View>

      </View>
    </View>
  )
} 

export default FormularioSolicitud




