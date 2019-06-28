import React, {Component} from 'react';
import { View, Text, Button, StyleSheet,SafeAreaView,AsyncStorage } from 'react-native';
import  HeaderComponent  from '../../../components/header';
import Wizard from "react-native-wizard"
import * as axios from 'axios';
import {Url} from '../../../url';

class EvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {
    isLastStep  : false,
    isFirstStep : false,
    currentIndex: 0
  };

  abrirDrawer = () =>{
    this.props.abrirDrawer();
  }

//////////////////////////////////// WIZARD ////////////////////////////////////
  render() {
    
    const steps = [
      {
        component: Step1,
        props    : {
          title: "Step 1 TEST",
        }
      },
      {
        component: Step2,
        props    : {
          title: "Step 2 TEST",
        }
      }
    ];
    return (
      
        <SafeAreaView style={{flex: 1}}>
          <HeaderComponent titulo="Evaluacion" abrirDrawer={this.abrirDrawer} />
          
          <Wizard
              showNextButton={(status) => {
                status ? console.log("SHOW") : console.log("HIDE")
              }}
              showPrevButton={(status) => {
                status ? console.log("SHOW") : console.log("HIDE")
              }}
              ref={(e) => this.wizard = e}
              currentStep={(currentIndex, isFirstStep, isLastStep) => {
                this.setState({
                  isLastStep  : isLastStep,
                  isFirstStep : isFirstStep,
                  currentIndex: currentIndex
                })
              }}
              onNext={() => {console.log("next() Called")}}
              onPrev={() => {console.log("prev() Called")}}
              onFinish={() => {alert("onFinish Called")}}
              steps={steps}/>

          <View style={{bottom: 100, position: 'absolute', zIndex: 999}}>

            <Button onPress={() => {
              this.wizard.next();
            }} title={this.state.isLastStep ? "Finish" : "Next"}/>

            {this.state.isFirstStep ? undefined : <Button onPress={() => {
              this.wizard.prev();
            }} title={"Back"}/>}

          </View>
        </SafeAreaView>
    )
  }
}
//////////////////////////////////// STEP 1 ////////////////////////////////////
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state={
      materias:'',
      evaluaciones:'',
      showNextButton: false
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

  listarMaterias(){
    var estado=this.state.materias;
    

    if(estado){
    return estado.map((elem,index)=>{
      return(
        <View key={index}>
          <Text>{elem.materia.nombre}</Text>
        </View>
      )
    })}
  }





  render() {
    return (
        <View>{this.listarMaterias()}</View>
    );
  }
}
//////////////////////////////////// STEP 2 ////////////////////////////////////
class Step2 extends Component {
  constructor(props) {
    super(props);
    
    this.retornarEvaluaciones();
  }

  state = {
    showNextButton: false
  };
  

  async retornarEvaluaciones(){
    var evaluaciones;
    const usuario = await AsyncStorage.getItem('usuario');
    const legajo = JSON.parse(usuario).legajo;
    const materiaNombre = 'Matematicas';// VARIABLE DE PRUEBA    

    await axios.get(`${Url}/evaluacion/todas/alumno/${legajo}/${materiaNombre}`,)
    .then( res => {    
      evaluaciones=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });   
     
    this.setState({
      evaluaciones:evaluaciones
    })       
  }

  listarEvaluaciones(){
    var estado=this.state.evaluaciones;
    

    if(estado){
    return estado.map((elem,index)=>{
      return(
        <View key={index}>
          <Text>Fecha {elem.evaluacion.fecha} Nota{elem.nota}</Text>
        </View>
      )
    })}
  }




  render() {
    return (
        <View>{this.listarEvaluaciones()}</View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default EvaluacionScreen;
