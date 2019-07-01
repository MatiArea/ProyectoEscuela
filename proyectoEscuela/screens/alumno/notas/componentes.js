import React from 'react';
import { View, Text, Button, StyleSheet,SafeAreaView,AsyncStorage, TouchableOpacity} from 'react-native';
import  HeaderComponent  from '../../../components/header';
import { Container, Content, Card, CardItem, Body, Spinner } from 'native-base';
import Wizard from "react-native-wizard"
import * as axios from 'axios';
import {Url} from '../../../url';

//////////////////////////////////// MATERIAS////////////////////////////////////
export class Materias extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        materias:''
      }
      this.retornarMaterias();
    }  
  
  
    async retornarMaterias(){
      var materias;
      const usuario = await AsyncStorage.getItem('usuario');
      const legajo = JSON.parse(usuario).legajo;    
  
      await axios.get(`${Url}/colegio/alumno/materias/${legajo}`,)
      .then( res => {    
        materias=res.data;
      })
      .catch(function (error) {
        console.log(error);
      });   
       
      this.setState({
        materias:materias
      })
      
    }
  
   async guardarMateria(materia){
    await AsyncStorage.setItem('nombreMateria', materia);
    //cambiar el estado de la screen para re-renderizar el componente
    this.props.modificarEstado(1);
    } 
  
    listarMaterias(){
      var estado=this.state.materias;
      
  
      if(estado){
      return estado.map((elem,index)=>{
        return(
          <View key={index}>
          <Card>
            <TouchableOpacity onPress={() =>{this.guardarMateria(elem.materia.nombre)}}>
              <CardItem>           
                <Body>                
                  <Text style={{fontWeight: "bold", fontFamily:'sans-serif-light'}}>
                    {elem.materia.nombre}
                  </Text>                       
                </Body>
              </CardItem>
            </TouchableOpacity>
          </Card>
          </View>
        )
      })}
    }
  
    render() {
      if(this.state.materias == ""){
        return (
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
        );
      } else {
      return (
          <View>{this.listarMaterias()}
          <Button
        onPress={  () => {this.props.volverAtras()}}
        title="Volver"
        color="#2089DC"
          />
          </View>
      );
    }
    }
}
  
  //////////////////////////////////// EVALUACIONES ////////////////////////////////////
 export class Evaluaciones extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          evaluaciones:'', 
          estado:0
      }
      this.retornarEvaluaciones();
    }
  
    async retornarEvaluaciones(){
      var evaluaciones;
      const usuario = await AsyncStorage.getItem('usuario');
      const legajo = JSON.parse(usuario).legajo;
      const materiaNombre = await AsyncStorage.getItem('nombreMateria');    
  
      await axios.get(`${Url}/evaluacion/todas/alumno/${legajo}/${materiaNombre}`,)
      .then( res => {    
        evaluaciones=res.data;
      })
      .catch(function (error) {
        console.log(error);
      });   
       
      this.setState({
        evaluaciones:evaluaciones, 
        estado:1
      })       
    }
  
    listarEvaluaciones(){
      var estado=this.state.evaluaciones;
      
      if(estado){ 
        if((estado == "")&&(this.state.estado == 1)){
          return (
            <View>
            <Card>
              <TouchableOpacity onPress={() => {}}>
                <CardItem>           
                  <Body>                
                    <Text style={{textAlign: 'center', fontWeight: '100'}}>
                      {'No tiene evaluaciones registradas...'}
                    </Text>                        
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            </View>
          );
        } else {
      return estado.map((elem,index)=>{
        return(
          <View key={index}>
          <Card>
            <TouchableOpacity onPress={() =>{}}>
              <CardItem>           
                <Body>                
                <Text style={{fontWeight: "bold", fontFamily:'sans-serif-light'}}>
                    {`Fecha: ${elem.evaluacion.fecha}`}
                  </Text> 
                  <Text>
                    {``}
                  </Text> 
                  <Text style={{fontWeight: "bold", fontFamily:'sans-serif-light'}}>
                    {`Titulo: ${elem.evaluacion.titulo}`}
                  </Text>  
                  <Text>
                    {``}
                  </Text> 
                  <Text style={{fontWeight: "bold", fontFamily:'sans-serif-light'}}>
                    {`Temas: ${elem.evaluacion.temas}`}
                  </Text> 
                  <Text>
                    {``}
                  </Text>  
                  <Text style={{fontWeight: "bold", fontFamily:'sans-serif-light'}}>
                    {`Nota: ${elem.nota}`}
                  </Text>                  
                </Body>
              </CardItem>
            </TouchableOpacity>
          </Card>
          </View>
        )
      })}}
    }
    render() { 

      if ((this.state.evaluaciones == "")&&(this.state.estado == 0)){
        return (
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
        );
      } else {
      return (
          <View>{this.listarEvaluaciones()}
          <Button
        onPress={  () => {this.props.modificarEstado(0)}}
        title="Volver"
        color="#2089DC"
          />
          </View>
      );
    }
    }
  }