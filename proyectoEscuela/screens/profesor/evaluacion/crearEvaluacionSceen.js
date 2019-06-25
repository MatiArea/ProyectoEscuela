
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import  HeaderComponent  from '../../../components/header';

class CrearEvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <View >
        <HeaderComponent titulo="Crear Evaluación" abrirDrawer={this.abrirDrawer}/>
       <Text>hola crear evalu</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default CrearEvaluacionScreen;
