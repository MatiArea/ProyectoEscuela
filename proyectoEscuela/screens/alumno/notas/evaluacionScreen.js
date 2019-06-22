import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import  HeaderComponent  from '../../../components/header';

class EvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  abrirDrawer = () =>{
    this.props.abrirDrawer();
  }


  render() {
    return (
      <HeaderComponent titulo="Evaluaciones" abrirDrawer={this.abrirDrawer}/>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default EvaluacionScreen;
