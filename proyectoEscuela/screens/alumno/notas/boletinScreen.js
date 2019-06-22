import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import  HeaderComponent  from '../../../components/header';

class BoletinScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  abrirDrawer = () =>{
    this.props.navigation.openDrawer();
  }


  render() {
    return (
      <HeaderComponent titulo="Boletin" abrirDrawer={this.abrirDrawer}/>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default BoletinScreen;
