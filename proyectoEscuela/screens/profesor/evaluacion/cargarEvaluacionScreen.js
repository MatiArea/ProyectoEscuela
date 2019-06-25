
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import  HeaderComponent  from '../../../components/header';

class CargarEvaluacionScreen extends React.Component {
  


  render() {
    return (
      <View >
        <HeaderComponent titulo="Cargar Evaluación" abrirDrawer={this.abrirDrawer}/>
       <Text>hola cargar evalu</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default CargarEvaluacionScreen;
