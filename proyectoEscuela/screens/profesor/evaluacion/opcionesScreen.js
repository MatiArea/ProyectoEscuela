import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';

import  HeaderComponent  from '../../../components/header';

class OpcionesScreen extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <View >
        <HeaderComponent titulo="Evaluación" abrirDrawer={this.abrirDrawer}/>
        <View style={[styles.container]}>
          <TouchableOpacity style={[styles.cuadrado]} onPress={() => {this.props.navigation.push('crearEvalu')}}>
            <Image
              style={[styles.foto]}
              source={require('../../../assets/evaluacion.png')}
            />
            <Text style={[styles.texto]}>Crear Evaluación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cuadrado]} onPress={() => {this.props.navigation.push('cargarEvalu')}}>
            <Image
              style={[styles.foto]}
              source={require('../../../assets/cargarevaluacion.png')}
            />
            <Text style={[styles.texto]}>Cargar Evaluación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cuadrado]} onPress={() => {this.props.navigation.push('listarEvalu')}}>
            <Image
              style={[styles.foto]}
              source={require('../../../assets/listarevaluacion.png')}
            />
            <Text style={[styles.texto]}>Listar Evaluaciones</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default OpcionesScreen;
