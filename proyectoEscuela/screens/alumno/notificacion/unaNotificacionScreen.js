
import React from 'react';
import {  Text, Image, StyleSheet,TouchableOpacity,AsyncStorage,View,ToastAndroid  } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import  HeaderComponent  from '../../../components/header';
import * as axios from 'axios';
import {Url} from '../../../url';

class UnaNotificacionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      notificaciones:''
    }
  }
     
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/notificacion.png')}
        style={[styles.icon]}
      />
    ),
  };

 

  abrirDrawer = () =>{
    this.props.navigation.openDrawer();
  }


  
  render() {

    return (
        <HeaderComponent titulo="Notificacion" abrirDrawer={this.abrirDrawer}/>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  texto:{
      fontWeight:"bold",
      fontFamily:'sans-serif-light'
  },
  card:{
    backgroundColor:'#B7E3E7'
  }
});
export default UnaNotificacionScreen;
