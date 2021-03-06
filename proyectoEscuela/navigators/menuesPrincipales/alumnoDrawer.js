import { createDrawerNavigator,DrawerItems } from 'react-navigation';
import  NotificacionStack  from '../../navigators/alumno/notificaciones';
import  NotasStack  from '../alumno/notas';
import AvisosScreen from '../../screens/alumno/avisos/avisosScreen';
import React from 'react';
import SalirComponent from '../../components/salir';
import { View, Text, ScrollView, StyleSheet,Image, AsyncStorage } from 'react-native';


const HeaderDrawer= (props) =>(
  <View>
    <View style={[styles.container]}>
    <Image
      style={[styles.foto]}
      source={require('../../assets/fotoperfil.png')}
    />
    <Text style={[styles.texto]} >{'Bienvenido!'}</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
)


const AlumnoDrawer = createDrawerNavigator(
  {
    Notificaciones: {
      screen: NotificacionStack,
    },
    Notas: {
      screen: NotasStack,
    },
    Salir: {
      screen: SalirComponent,
    }
  },
  {
    initialRouteName: 'Notificaciones',
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: '#2089DC',
      inactiveTintColor: '#CCC',
      activeBackgroundColor: '#EEE',
      inactiveBackgroundColor: '#FFF',      
    },
    contentComponent:HeaderDrawer
  },
);


const styles = StyleSheet.create({
  container: {
    backgroundColor:'#2089DC',
    alignItems:'center',
    justifyContent:'flex-end',
    height:130
  },
  texto:{    
    color:'#fff',
    fontSize:28,
    fontWeight: 'bold',
    fontFamily:'sans-serif-medium'
  },
  foto:{
    height:50,
    width:50
  }
});

export default AlumnoDrawer;
