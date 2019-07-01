import React, {Component} from 'react';
import { View, Text, Button, StyleSheet,SafeAreaView,AsyncStorage, TouchableOpacity} from 'react-native';
import  HeaderComponent  from '../../../components/header';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import Wizard from "react-native-wizard"
import * as axios from 'axios';
import {Url} from '../../../url';
import { Materias, Evaluaciones} from './componentes';

class EvaluaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        estado:0
    }
    this.modificarEstado = this.modificarEstado.bind(this);
    this.abrirDrawer = this.abrirDrawer.bind(this);
    this.volverAtras = this.volverAtras.bind(this);
  }

  abrirDrawer = () =>{
    this.props.navigation.navigate('DrawerOpen');
  }

  modificarEstado(valor){
      if(valor == 0){
        this.setState({
         estado:0
        });
      }

      if(valor == 1){
        this.setState({
            estado:1
           });
      }
  }

  volverAtras(){
      this.props.navigation.navigate('menu');
  }

  render() {
      switch(this.state.estado){
        case 0: return (
            <Container>
              <HeaderComponent titulo="Materias" abrirDrawer={this.abrirDrawer}/>
            <Content>
               <Materias modificarEstado={this.modificarEstado} volverAtras={this.volverAtras}/> 
            </Content>
          </Container>
        );
        break;
        case 1: return (
            <Container>
          <HeaderComponent titulo="Evaluaciones" abrirDrawer={this.abrirDrawer}/>
            <Content>
               <Evaluaciones modificarEstado={this.modificarEstado} /> 
            </Content>
          </Container>
        );
        break;
      } 
  }
}

export default EvaluaScreen;