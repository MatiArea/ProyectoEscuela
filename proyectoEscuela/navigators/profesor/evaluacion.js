import React from 'react';
import { Image,StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import  OpcionesScreen  from '../../screens/profesor/evaluacion/opcionesScreen';
import  CrearEvaluacionScreen  from '../../screens/profesor/evaluacion/crearEvaluacionSceen';
import  CargarEvaluacionScreen  from '../../screens/profesor/evaluacion/cargarEvaluacionScreen';
import  ListarEvaluacionScreen  from '../../screens/profesor/evaluacion/listarEvaluacionScreen';
import  HeaderComponent  from '../../components/header';

const RootStack = createStackNavigator(
  {
    menu: {
      screen: OpcionesScreen,
    },
    crearEvalu: {           
      screen: CrearEvaluacionScreen,
    },
    cargarEvalu: {
        screen: CargarEvaluacionScreen,
    },
    listarEvalu: {
        screen: ListarEvaluacionScreen,
    },
  },
  {
    initialRouteName: 'menu',
    mode: 'card', // 'card' or 'modal'}
    headerMode: 'none'
  },
);

class EvaluacionStack extends React.Component {
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
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  container:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    alignItems:'flex-start',
    alignContent:'flex-start'
    
  },
  cuadrado:{
    width:150,
    height:150,
    backgroundColor:'#fff',
    borderColor:'#D0D0D0',    
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderRadius:10,
    marginTop:20
  },
  foto:{
    width:100,
    height:100
  },
  texto:{    
    fontSize:16,
    fontWeight: 'bold',      
    alignItems:'center',
    justifyContent:'center',    
    fontFamily:'sans-serif-light'
  }
});



export default EvaluacionStack;
