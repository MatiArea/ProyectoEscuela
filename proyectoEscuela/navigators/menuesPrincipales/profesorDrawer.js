import { createDrawerNavigator,DrawerItems } from 'react-navigation';
import  AvisoScreen  from '../../screens/preceptor/avisoScreen';
import  EvaluacionStack  from '../profesor/evaluacion';
import { View, Text, ScrollView, StyleSheet,Image } from 'react-native';
import SalirComponent from '../../components/salir';
import React from 'react';


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


const ProfesorDrawer = createDrawerNavigator(
  {
    Aviso: {
      screen: AvisoScreen,
    },
    Evaluación: {
      screen: EvaluacionStack,
    },
    Salir: {
      screen: SalirComponent,
    }
  },
  {    
    headerMode: 'none',
    initialRouteName: 'Aviso',
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

export default ProfesorDrawer;
