
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import  HeaderComponent  from '../../../components/header';

class ListarEvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <View >
        <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
       <Text>hola listar evalu</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default ListarEvaluacionScreen;
