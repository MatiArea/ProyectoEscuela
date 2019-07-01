import React from 'react';
import { Image,StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import  OpcionesScreen  from '../../screens/alumno/notas/opcionesScreen';
import  EvaluacionScreen  from '../../screens/alumno/notas/evaluacionScreen';
import  EvaluaScreen  from '../../screens/alumno/notas/evaluaScreen';
import  BoletinScreen  from '../../screens/alumno/notas//boletinScreen';
import  HeaderComponent  from '../../components/header';

const RootStack = createStackNavigator(
  {
    menu: {
      screen: OpcionesScreen,
    },
    evaluacion: {
      screen: EvaluaScreen ,
    },
    boletin: {
      screen: BoletinScreen ,
    },
  },
  {
    initialRouteName: 'menu',
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
    this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    return <RootStack />;
  }

  
}