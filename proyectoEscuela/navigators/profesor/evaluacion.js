import React from 'react';
import { Image,StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import  OpcionesScreen  from '../../screens/profesor/evaluacion/opcionesScreen';
import  CrearEvaluacionScreen  from '../../screens/profesor/evaluacion/crearEvaluacionSceen';
import  CargarEvaluacionScreen  from '../../screens/profesor/evaluacion/cargarEvaluacionScreen';
import  ListarEvaluacionScreen  from '../../screens/profesor/evaluacion/listarEvaluacionScreen';
import  HeaderComponent  from '../../components/header';


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
    return (
    
      <View >
        <HeaderComponent titulo="Evaluación" abrirDrawer={this.abrirDrawer}/>
        <View style={[styles.container]}>
          <TouchableOpacity style={[styles.cuadrado]}>
            <Image
              style={[styles.foto]}
              source={require('../../assets/evaluacion.png')}
            />
            <Text style={[styles.texto]}>Crear Evaluación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cuadrado]}>
            <Image
              style={[styles.foto]}
              source={require('../../assets/cargarevaluacion.png')}
            />
            <Text style={[styles.texto]}>Cargar Evaluación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cuadrado]}>
            <Image
              style={[styles.foto]}
              source={require('../../assets/listarevaluacion.png')}
            />
            <Text style={[styles.texto]}>Listar Evaluaciones</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
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

const EvaluacionStackNavigator = createStackNavigator(
  {
    menu: {
      screen: OpcionesScreen,
    },
    opcion1: {
      screen: CrearEvaluacionScreen,
    },
    opcion2: {
        screen: CargarEvaluacionScreen,
    },
    opcion3: {
        screen: ListarEvaluacionScreen,
    },
  },
  {
    initialRouteName: 'menu',
    mode: 'card', // 'card' or 'modal'
  },
);

export default EvaluacionStack;
