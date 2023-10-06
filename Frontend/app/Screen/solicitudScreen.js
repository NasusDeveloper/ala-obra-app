import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { styles } from "../../style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const FormularioSolicitud = () => {
  const [nameSolicitud, setNameSolicitud] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [fotos, setFotos] = useState([])

  const handleNameSolicitudChange = (text) => {
    setNameSolicitud(text);
  };

  const handleDescripcionChange = (text) => {
    setDescripcion(text);
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
      if (!nameSolicitud || !descripcion) {
        Alert.alert("Campos incompletos", "Por favor complete todos los campos.");
        return; // Evitar enviar la solicitud si los campos están incompletos
      }

      // Obtener el token almacenado
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      // Configurar el token en el encabezado de autorización
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Crear el objeto de solicitud
      const solicitudData = {
        nameSolicitud,
        descripcion,
        estado,
      };

      // Enviar la solicitud al servidor
      const response = await axios.post(
        "http://192.168.100.171:8000/api/auth/crearSolicitud",
        solicitudData
      );

      // Procesar la respuesta del backend
      console.log(response.data);
      clearTextInput(); // Limpia los campos después de enviar la solicitud
    } catch (error) {
      console.error(error);
    }
  };

  const clearTextInput = () => {
    // Limpia los campos de texto
    setNameSolicitud("");
    setDescripcion("");
  };

  return (
    <View style={{ marginHorizontal: 30 }}>
      <View style={[styles.inputWithLabel, { marginBottom: 10, marginTop: 30 }]}>
        <View style={styles.inputWithLabel}>
          <TextInput
            style={styles.input}
            placeholder="Nombre (mínimo 10 caracteres)"
            onChangeText={handleNameSolicitudChange}
            value={nameSolicitud}
          />
        </View>

        <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
          <TextInput
            style={styles.input}
            placeholder="Descripción (máximo 100 caracteres)"
            onChangeText={handleDescripcionChange}
            value={descripcion}
            multiline
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

        <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
          <Button
            title="Aceptar"
            onPress={handleFormSubmit}
            color="#8200d6"
          />
        </View>
      </View>
    </View>
  );
};

export default FormularioSolicitud;
