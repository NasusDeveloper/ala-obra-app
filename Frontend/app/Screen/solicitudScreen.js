import React, { useState } from "react";
import { View, TextInput, Button, Image, TouchableOpacity, Text } from "react-native";
import { styles, toastConfig } from "../../style"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from "expo-image-picker"
import axios from "axios"

const FormularioSolicitud = () => {
  const [nameSolicitud, setNameSolicitud] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fotos, setFotos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleNameSolicitudChange = (Text) => {
    setNameSolicitud(Text);
  };

  const handleDescripcionChange = (Text) => {
    setDescripcion(Text);
  };

  const handleFechaInicioChange = (Text) => {
    setFechaInicio(Text);
  };

  const handleFechaFinChange = (Text) => {
    setFechaFin(Text);
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

      // Realizar la solicitud a través de Axios
      const response = await axios.post("http://192.168.100.171:8000/api/auth/createSolicitud", {
        nameSolicitud,
        descripcion,
        fotos,
        fechaInicio,
        fechaFin,
      }, {
        headers: {
          Authorization: `Bearer ${token}` //Incluir el token en el encabezado de autorización
        }
      })

      // Procesar la respuesta del backend
      console.log(response.data);
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
        <Button title="Seleccionar Fotos" onPress={handleImageUpload} color="#8200d6" />
      </View>

      <View>
        {fotos.map((foto, index) => (
          <Image key={index} source={{ uri: foto }} style={{ width: 200, height: 200 }} />
        ))}
      </View>

      <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
      <TextInput
        style={styles.input}
        placeholder="Fecha de inicio"
        onChangeText={handleFechaInicioChange}
        value={fechaInicio}
        onPress={console.log(fechaInicio)}
      />
      </View>

      <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
      <TextInput
        style={styles.input}
        placeholder="Fecha de fin"
        onChangeText={handleFechaFinChange}
        value={fechaFin}
        onPress={console.log(fechaFin)}
      />
      </View>

      <View style={{width: 200, alignSelf: "center", margin: 20}}>
        <Button title="Aceptar" onPress={handleFormSubmit} color="#8200d6"/>
      </View>

      </View>
    </View>
  )
}


     


export default FormularioSolicitud




