import React from 'react';
import {View, Text, Button} from 'react-native';


const PerfilTrabajador = () =>{

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
            <Button title="Select Document" />
          </View>
        </View>
      )
    }
export default PerfilTrabajador