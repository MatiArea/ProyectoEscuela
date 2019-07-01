import React from 'react';
import { Image,StyleSheet,View,Text,TouchableOpacity } from 'react-native';

import  HeaderComponent  from '../../../components/header';

class OpcionesScreen extends React.Component {

  abrirDrawer = () =>{
    this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    return (
      <View >
        <HeaderComponent titulo="Notas" abrirDrawer={this.abrirDrawer}/>
        <View style={[styles.container]}>
          <TouchableOpacity style={[styles.cuadrado]} onPress={() => {this.props.navigation.push('evaluacion')}}>
            <Image
              style={[styles.foto]}
              source={require('../../../assets/evaluacion.png')}
            />
            <Text style={[styles.texto]}>Evaluación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cuadrado]} onPress={() => {this.props.navigation.push('boletin')}}>
            <Image
              style={[styles.foto]}
              source={require('../../../assets/boletin.png')}
            />
            <Text style={[styles.texto]}>Boletin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    top:10
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
  },
  foto:{
    width:100,
    height:100
  },
  texto:{    
    fontSize:16,
    fontWeight: 'bold',    
    fontFamily:'sans-serif-light'
  }
});

export default OpcionesScreen;
