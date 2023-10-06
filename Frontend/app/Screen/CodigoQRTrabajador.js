import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';


const CodigoQRTrabajador = () => {
    
    return (
        <View>
            <Image
                source={require('../../assets/images/qr.png')}
                style={{ width: 400, height: 400 }}
            />
        </View>
    );
};


export default CodigoQRTrabajador;
