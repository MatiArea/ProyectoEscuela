import React from 'react';
import { View, Text, Button, Image, StyleSheet, AsyncStorage, TouchableOpacity,ScrollView } from 'react-native';
import {  Container, Card, CardItem, Body, Item, Label, Spinner  } from 'native-base';
import  HeaderComponent  from '../../../components/header';
import * as axios from 'axios';
import {Url} from '../../../url';

class ListarEvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matSelected: ' ',
      evalSelect: ' ',
      evaluacion: ' ',
      evaluaciones: ' ',
      materias: ' ',
      estado: 0,
    }
    this.getAllMat();
  }

  async getAllMat(){

      var materias;
      const usuario = await AsyncStorage.getItem('usuario');
      const legajo = JSON.parse(usuario).legajo;
      
    
      await axios.get(`${Url}/colegio/profesor/materias/${legajo}`)
      .then( res => {    
        materias=res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      
      this.setState({
        ...this.state,
        materias:materias,
        estado: 1,
      });
        
  }

  changeMat(value){
    this.setState({
      ...this.state,
      matSelected: value,
      estado: 2,
    });
    this.getAllEval();
  }

  async getAllEval(){

    var evaluaciones;
    const usuario = await AsyncStorage.getItem('usuario');
    const legajo = JSON.parse(usuario).legajo;
    
  
    await axios.get(`${Url}/evaluacion/todas/cargadas/${this.state.matSelected.materia.nombre}/${legajo}/${this.state.matSelected.materia.anio.numero}/${this.state.matSelected.division.nombre}`)
    .then( res => {    
      evaluaciones=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    
    this.setState({ 
      ...this.state,
      evaluaciones:evaluaciones,
    });
  }

  changeEval(value){
    this.setState({
      ...this.state,
      evalSelect:value,
      estado:3,
    });
    this.getEval(value);
  }

  async getEval(datos){
    var evaluacion;

    await axios.get(`${Url}/evaluacion/display/${datos.folio}`)
    .then( res => {    
      evaluacion=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({
      ...this.state,
      evaluacion:evaluacion,
    });
  }

  returnMat(){
    return this.state.materias.map((elem,index)=>{
      return(
        <View key={index}>
          <Card>
            <TouchableOpacity onPress={() => {this.changeMat(elem)}}>
              <CardItem >           
                <Body>                
                  <Text >
                    Año: {elem.materia.anio.numero}
                  </Text>
                  <Text>
                    Division: {elem.division.nombre}
                  </Text>
                  <Text>
                    Materia: {elem.materia.nombre}
                  </Text>                        
                </Body>
              </CardItem>
            </TouchableOpacity>
          </Card>
        </View>
      );
    })
  }

  returnEval(){ 
    return this.state.evaluaciones.map((elem,index)=>{
    return(
    <View key={index}>
      <Card>
        <TouchableOpacity onPress={() => {this.changeEval(elem)}}>
          <CardItem >        
            <Body>                
              <Text>
                Fecha: {elem.fecha}
              </Text>
              <Text>
                Titulo:{elem.titulo}
              </Text>
              <Text>
                Descripcion: {elem.temas}
              </Text>                        
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    </View>
  );
})
}

returnOneEval(){
  return this.state.evaluacion.notas.map((elem,index)=>{
    return(
    <View key={index}>
      <Card>
        <TouchableOpacity onPress={() => {}}>
          <CardItem>           
            <Body>          
              <Text>
                Legajo: {elem.matricula.alumno.legajo}
              </Text>
              <Text>
                Nombre: {elem.matricula.alumno.nombre}
              </Text>
              <Text>
                Apellido: {elem.matricula.alumno.apellido}
              </Text>                        
              <Text>
                Nota: {elem.nota}
              </Text>
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    </View>
  );
  })
}

render() {
    if((this.state.estado == 0)&&(this.state.materias == ' ')){
      return (
        <View >
          <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
          <View>
          <Card>
            <TouchableOpacity onPress={() => {}}>
              <CardItem>           
              <Body style={{justifyContent:'center', flexDirection:'row'}}>                
                <Spinner color='blue'/>                      
              </Body>
              </CardItem>
            </TouchableOpacity>
          </Card>
          </View> 
        </View>
      );
    } else if ((this.state.estado == 1)&&(this.state.materias != ' ')){
        return(
        <Container>
          <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
          <ScrollView>
          {this.returnMat()}
          </ScrollView>
        </Container>  
        )} else if((this.state.estado == 2)&&(this.state.evaluaciones == ' ')){
        return (
          <View>
            <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
            <View>
            <Card>
              <TouchableOpacity onPress={() => {}}>
                <CardItem>           
                <Body style={{justifyContent:'center', flexDirection:'row'}}>                
                <Spinner color='blue'/>                      
              </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            </View>
          </View>
        );
    }else if((this.state.estado == 2)&&(this.state.evaluaciones != ' ')){
      return(
      <Container>
        <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
        <ScrollView>
          {this.returnEval()}
        </ScrollView>
      </Container> 
      )}else if ((this.state.estado == 3)&&(this.state.evaluacion == ' ')){
        return (
          <View>
            <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
            <View>
            <Card>
              <TouchableOpacity onPress={() => {}}>
                <CardItem>           
                <Body style={{justifyContent:'center', flexDirection:'row'}}>                
                <Spinner color='blue'/>                      
              </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            </View>
          </View>
        );
      }else if ((this.state.estado == 3)&&(this.state.evaluacion != ' ')){
      return(
      <Container>
          <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
          <ScrollView>
          {this.returnOneEval()}
          </ScrollView>
          <Button 
              onPress={()=>{this.props.navigation.navigate('menu');} }
              title="Volver"
              color="#2089DC"
          />
      </Container> 
      )}
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  container:{        
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
    borderBottomColor: '#2089DC',
    borderBottomWidth: 2
  },
  boton:{
    marginTop:20,
    width:50 -0,    
  },
  label:{
    fontWeight: 'bold',    
    fontFamily:'sans-serif-light'
  },
  viewCenter:{
    alignItems:'center',
    justifyContent:'center',
  },
  texto:{
    fontWeight:"bold",
    fontFamily:'sans-serif-light'
},
});

export default ListarEvaluacionScreen;

