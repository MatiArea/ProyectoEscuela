import React from 'react';
import { Image,StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import  NotificacionScreen  from '../../screens/alumno/notificacion/notificacionScreen';
import  UnaNotificacionScreen  from '../../screens/alumno/notificacion/unaNotificacionScreen';

import  HeaderComponent  from '../../components/header';

const RootStack = createStackNavigator(
  {
    notificaciones: {
      screen: NotificacionScreen,
    },
    notificacion: {
      screen: UnaNotificacionScreen ,
    }
  },
  {
    initialRouteName: 'notificaciones',
    mode: 'card', // 'card' or 'modal'
    headerMode: 'none'
  }
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
});

export default class App extends React.Component {
  
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/notas.png')}
        style={[styles.icon]}
      />
    ),
  };

  abrirDrawer = () =>{
    this.props.navigation.openDrawer();
  }

  render() {
    return <RootStack />;
  }

  
}