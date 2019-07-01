import React from 'react';
import { View, Text, Button, Image, StyleSheet, AsyncStorage, TouchableOpacity,TextInput } from 'react-native';
import {  Container, Card, CardItem, Body,Form, Item, Label  } from 'native-base';
import  HeaderComponent  from '../../../components/header';
import * as axios from 'axios';
import {Url} from '../../../url';
import DatePicker from 'react-native-datepicker';

class CrearEvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fecha:' ',
      folio: ' ',
      temas:' ',
      titulo:' ',
      legajoProfesor: ' ',
      division:' ',
      anio:' ',
      materia:' ',
      materias: ' ',
      estado: 0,
    }
    this.generateFolio();
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
      legajoProfesor:legajo,
      materias:materias,
      estado: 1,
    });
      
  }
  
  async generateFolio(){

    var folio;

    await axios.get(`${Url}/evaluacion/folio`)
    .then( res => {    
      folio=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({
      ...this.state,
      folio:folio,
    })
  }

  changeMat(value){
    this.setState({
      ...this.state,
      materia: value.materia.nombre,
      anio: value.materia.anio.numero,
      division: value.division.nombre,
      estado: 2,
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
                    Anio: {elem.materia.anio.numero}
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

  async saveNewEval(){
    if(this.state.folio != ' '){
      await axios.post(`${Url}/evaluacion/create`,{
        fecha: this.state.fecha,
        folio: this.state.folio,
        temas: this.state.temas,
        titulo: this.state.titulo,
        legajoProfesor: this.state.legajoProfesor,
        division: this.state.division,
        anio: this.state.anio,
        materia: this.state.materia,
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }
    this.props.navigation.navigate('menu');
        
  }

  createEval(){
    return( 
      <Form>
        <Item stackedLabel style={[styles.input]} >
          <Label style={[styles.label]}>Fecha</Label>
          <DatePicker
            style={{width: 200}}
            date={"01/07/2019"} 
            mode="date" 
            placeholder="Seleccione una fecha"
            format="DD-MM-YYYY"
            minDate="31-12-2018"
            maxDate="01-01-2020"
            confirmBtnText="Aceptar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({
              ...this.state,
              fecha: date})}}
          />
        </Item>
        <Item stackedLabel style={[styles.input]} >
          <Label style={[styles.label]}>Titulo</Label>
          <TextInput
            style={styles.input}
            placeholder={'Titulo'}
            placeholderTextColor={'#ffffff'}
            onChangeText={(text) => this.setState({titulo:text})}
            value={this.state.titulo}
          />
        </Item>
        <Item stackedLabel style={[styles.input]} >
          <Label style={[styles.label]}>Temas</Label>
          <TextInput
            style={styles.input}
            placeholder={'Temas'}
            placeholderTextColor={'#ffffff'}
            onChangeText={(text) => this.setState({temas:text})}
            value={this.state.temas}
          />
        </Item> 
        <View style={[styles.viewCenter]}>
          <Button 
              onPress={()=>{this.saveNewEval()} }
              title="Crear Evaluacion"
              color="#2089DC"
          />
        </View>
      </Form>
    );
  }


  render() {
    if((this.state.estado == 0 )&&(this.state.materias == ' ')){
      return(<View >
        <HeaderComponent titulo="Crear Evaluación" abrirDrawer={this.abrirDrawer}/>
        <View>
        <Card>
          <TouchableOpacity onPress={() => {}}>
            <CardItem>           
              <Body>                
                <Text style={[styles.texto]}>
                  {'Cargando...'}
                </Text>                        
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
        </View>
      </View>
      )}else if ((this.state.estado == 1)&&(this.state.materias != ' ')){
      return(<Container>
          <HeaderComponent titulo="Crear Evaluación" abrirDrawer={this.abrirDrawer}/>
          {this.returnMat()}
      </Container>
      )} else if ((this.state.estado == 2)&&(this.state.materia == ' ')){
      return(<View >
        <HeaderComponent titulo="Crear Evaluación" abrirDrawer={this.abrirDrawer}/>
        <View>
        <Card>
          <TouchableOpacity onPress={() => {}}>
            <CardItem>           
              <Body>                
                <Text style={[styles.texto]}>
                  {'Cargando...'}
                </Text>                        
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
        </View>
      </View>
      )} else if ((this.state.estado == 2)&&(this.state.materia != ' ')){
      return(<Container>
         <HeaderComponent titulo="Crear Evaluación" abrirDrawer={this.abrirDrawer}/>
         {this.createEval()}
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

export default CrearEvaluacionScreen;
